"""
Backend regression tests for EtherAuthority Interns.

Covers:
- Health
- Auth (login/me/wrong password)
- Games/Dapps public list, top, slug (view increment), like
- Blogs listing, slug, top
- Search
- Admin CRUD + workflow (games) and blogs
- Admin stats (auth required)
- Contact + Newsletter public
- Upload single/multiple (admin)
- Categories CRUD (admin)
- Admin Newsletter list/export/delete
"""
from __future__ import annotations

import os
import time
from typing import Any, Iterator

import pytest
import requests
from requests import Response, Session

# ---------------- Config (loaded from environment, never hardcoded) ----------------


def _load_backend_url() -> str:
    url = os.environ.get("REACT_APP_BACKEND_URL", "")
    if not url:
        env_path = "/app/frontend/.env"
        if os.path.exists(env_path):
            with open(env_path, encoding="utf-8") as f:
                for line in f:
                    if line.startswith("REACT_APP_BACKEND_URL="):
                        url = line.strip().split("=", 1)[1]
                        break
    return url.rstrip("/")


BASE_URL: str = _load_backend_url()
API: str = f"{BASE_URL}/api"

# Admin credentials MUST come from the environment. No hardcoded secrets.
# The .env-managed defaults are read by the seeder on boot; the test suite
# must be given the same values through TEST_ADMIN_EMAIL / TEST_ADMIN_PASSWORD
# (or ADMIN_EMAIL / ADMIN_PASSWORD as a fallback).
ADMIN_EMAIL: str = os.environ.get("TEST_ADMIN_EMAIL") or os.environ.get("ADMIN_EMAIL", "")
ADMIN_PASSWORD: str = os.environ.get("TEST_ADMIN_PASSWORD") or os.environ.get("ADMIN_PASSWORD", "")

if not ADMIN_EMAIL or not ADMIN_PASSWORD:
    # Try to read from backend/.env at runtime (still not a hardcode).
    backend_env = "/app/backend/.env"
    if os.path.exists(backend_env):
        with open(backend_env, encoding="utf-8") as f:
            for line in f:
                key, _, val = line.strip().partition("=")
                val = val.strip().strip('"').strip("'")
                if key == "ADMIN_EMAIL" and not ADMIN_EMAIL:
                    ADMIN_EMAIL = val
                elif key == "ADMIN_PASSWORD" and not ADMIN_PASSWORD:
                    ADMIN_PASSWORD = val

assert ADMIN_EMAIL and ADMIN_PASSWORD, (
    "ADMIN_EMAIL and ADMIN_PASSWORD must be provided via environment variables"
    " (TEST_ADMIN_EMAIL/TEST_ADMIN_PASSWORD or ADMIN_EMAIL/ADMIN_PASSWORD)."
)


# ---------------- Fixtures ----------------


@pytest.fixture(scope="session")
def api_client() -> Session:
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api_client: Session) -> str:
    r = api_client.post(
        f"{API}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
    )
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    return r.json()["token"]


@pytest.fixture(scope="session")
def admin_client(admin_token: str) -> Session:
    s = requests.Session()
    s.headers.update(
        {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {admin_token}",
        }
    )
    return s


# ---------------- Helpers ----------------


def _assert_pagination_shape(payload: dict[str, Any]) -> None:
    """Validate a paginated list response envelope."""
    assert "items" in payload and isinstance(payload["items"], list)
    for key in ("total", "page", "limit", "totalPages"):
        assert key in payload, f"missing '{key}' in payload"


def _assert_facets_shape(payload: dict[str, Any]) -> None:
    assert "facets" in payload
    facets = payload["facets"]
    assert "blockchains" in facets and "categories" in facets


def _assert_only_approved(items: list[dict[str, Any]]) -> None:
    for it in items:
        assert it.get("status") == "APPROVED"


# ---------------- Health ----------------


class TestHealth:
    def test_health(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/health")
        assert r.status_code == 200
        j = r.json()
        assert j.get("ok") == True  # noqa: E712 - explicit value check per code review
        assert j.get("service") == "etherauthority-api"


# ---------------- Auth ----------------


class TestAuth:
    def test_login_success(self, api_client: Session) -> None:
        r = api_client.post(
            f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert r.status_code == 200
        d = r.json()
        assert "token" in d and isinstance(d["token"], str) and len(d["token"]) > 20
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"

    def test_login_wrong_password(self, api_client: Session) -> None:
        r = api_client.post(
            f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrongpass"}
        )
        assert r.status_code == 401

    def test_login_bad_format(self, api_client: Session) -> None:
        r = api_client.post(f"{API}/auth/login", json={"email": "notanemail", "password": ""})
        assert r.status_code == 400

    def test_me_authenticated(self, admin_client: Session) -> None:
        r = admin_client.get(f"{API}/auth/me")
        assert r.status_code == 200
        u = r.json()["user"]
        assert u["email"] == ADMIN_EMAIL
        assert u["role"] == "admin"

    def test_me_no_auth(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/auth/me")
        assert r.status_code == 401


# ---------------- Games / Dapps public ----------------


@pytest.mark.parametrize("resource", ["games", "dapps"])
class TestProjectsPublic:
    def test_list_default(self, api_client: Session, resource: str) -> None:
        r = api_client.get(f"{API}/{resource}?sort=rank_asc")
        assert r.status_code == 200
        payload: dict[str, Any] = r.json()
        _assert_pagination_shape(payload)
        _assert_facets_shape(payload)
        _assert_only_approved(payload["items"])

    def test_top(self, api_client: Session, resource: str) -> None:
        r = api_client.get(f"{API}/{resource}/top?limit=5")
        assert r.status_code == 200
        items: list[dict[str, Any]] = r.json()["items"]
        assert isinstance(items, list)
        assert len(items) <= 5
        ranks = [i.get("rank") or 0 for i in items]
        assert ranks == sorted(ranks)

    def test_slug_and_view_increment(self, api_client: Session, resource: str) -> None:
        items = api_client.get(f"{API}/{resource}?limit=1").json()["items"]
        if not items:
            pytest.skip(f"No {resource} seeded")
        slug: str = items[0]["slug"]
        first = api_client.get(f"{API}/{resource}/slug/{slug}").json()
        views1: int = first["item"]["views"]
        second = api_client.get(f"{API}/{resource}/slug/{slug}").json()
        assert second["item"]["views"] == views1 + 1
        assert "related" in second and isinstance(second["related"], list)

    def test_slug_not_found(self, api_client: Session, resource: str) -> None:
        r = api_client.get(f"{API}/{resource}/slug/does-not-exist-xxx")
        assert r.status_code == 404

    def test_like(self, api_client: Session, resource: str) -> None:
        items = api_client.get(f"{API}/{resource}?limit=1").json()["items"]
        if not items:
            pytest.skip()
        slug: str = items[0]["slug"]
        before: int = api_client.get(f"{API}/{resource}/slug/{slug}").json()["item"]["likes"]
        r = api_client.post(f"{API}/{resource}/slug/{slug}/like")
        assert r.status_code == 200
        assert r.json()["likes"] == before + 1


# ---------------- Search ----------------


class TestSearch:
    def test_search_crypto(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/search?q=crypto")
        assert r.status_code == 200
        d = r.json()
        assert "games" in d and "dapps" in d and "blogs" in d
        assert isinstance(d["games"], list)

    def test_search_empty(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/search?q=")
        assert r.status_code == 200
        d = r.json()
        assert d == {"games": [], "dapps": [], "blogs": []}


# ---------------- Blogs ----------------


class TestBlogs:
    def test_list_public(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/blogs")
        assert r.status_code == 200
        d = r.json()
        assert "items" in d and "facets" in d
        for it in d["items"]:
            assert it["status"] in ("APPROVED", "PUBLISHED")

    def test_top(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/blogs/top?limit=6")
        assert r.status_code == 200
        assert len(r.json()["items"]) <= 6

    def test_slug(self, api_client: Session) -> None:
        items = api_client.get(f"{API}/blogs?limit=1").json()["items"]
        if not items:
            pytest.skip("no blogs seeded")
        slug: str = items[0]["slug"]
        r = api_client.get(f"{API}/blogs/slug/{slug}")
        assert r.status_code == 200
        d = r.json()
        assert d["item"]["slug"] == slug
        assert isinstance(d["related"], list)


# ---------------- Admin protected ----------------


class TestAdminAuthGuards:
    def test_create_game_unauth(self, api_client: Session) -> None:
        r = api_client.post(
            f"{API}/games",
            json={"title": "TEST_unauth", "shortDesc": "x", "blockchain": "Eth", "category": "RPG"},
        )
        assert r.status_code == 401

    def test_admin_stats_unauth(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/admin/stats")
        assert r.status_code == 401

    def test_admin_stats_authed(self, admin_client: Session) -> None:
        r = admin_client.get(f"{API}/admin/stats")
        assert r.status_code == 200
        d = r.json()
        assert "counts" in d and "recent" in d and "top" in d
        assert "games" in d["counts"] and "dapps" in d["counts"] and "blogs" in d["counts"]


# ---------------- Game CRUD & workflow ----------------
# Split from a single high-complexity function into small, focused tests using
# a per-class fixture that creates one game and cleans it up.


def _make_game_payload() -> dict[str, Any]:
    return {
        "title": f"TEST_Game_{int(time.time() * 1000)}",
        "shortDesc": "A test game",
        "description": "Long desc",
        "blockchain": "Ethereum",
        "category": "RPG",
        "features": ["a", "b"],
        "techStack": ["Solidity"],
    }


@pytest.fixture(scope="class")
def created_game(admin_client: Session) -> Iterator[dict[str, Any]]:
    payload = _make_game_payload()
    r = admin_client.post(f"{API}/games", json=payload)
    assert r.status_code == 201, r.text
    item = r.json()["item"]
    yield item
    # Cleanup (idempotent - ignore errors if a delete-test already removed it).
    try:
        admin_client.delete(f"{API}/games/{item['id']}", timeout=5)
    except requests.RequestException:
        pass


class TestGameCRUD:
    def test_create(self, created_game: dict[str, Any]) -> None:
        assert created_game["status"] == "PENDING"
        assert created_game["title"].startswith("TEST_Game_")
        assert "slug" in created_game

    def test_approve_and_public_visibility(
        self, admin_client: Session, api_client: Session, created_game: dict[str, Any]
    ) -> None:
        gid: str = created_game["id"]
        r = admin_client.post(f"{API}/games/{gid}/approve")
        assert r.status_code == 200
        assert r.json()["item"]["status"] == "APPROVED"

        r = api_client.get(f"{API}/games/slug/{created_game['slug']}")
        assert r.status_code == 200

    def test_feature_toggle(self, admin_client: Session, created_game: dict[str, Any]) -> None:
        r = admin_client.post(f"{API}/games/{created_game['id']}/feature")
        assert r.status_code == 200
        assert r.json()["item"]["featured"] == True  # noqa: E712 - explicit per code review

    def test_set_rank(self, admin_client: Session, created_game: dict[str, Any]) -> None:
        r = admin_client.post(f"{API}/games/{created_game['id']}/rank", json={"rank": 42})
        assert r.status_code == 200
        assert r.json()["item"]["rank"] == 42

    def test_update_title(self, admin_client: Session, created_game: dict[str, Any]) -> None:
        gid: str = created_game["id"]
        new_title: str = created_game["title"] + "_v2"
        r = admin_client.put(f"{API}/games/{gid}", json={"title": new_title})
        assert r.status_code == 200
        assert r.json()["item"]["title"] == new_title

        # Verify persistence
        r = admin_client.get(f"{API}/games/{gid}")
        assert r.status_code == 200
        assert r.json()["item"]["title"] == new_title

    def test_reject(self, admin_client: Session, created_game: dict[str, Any]) -> None:
        r = admin_client.post(f"{API}/games/{created_game['id']}/reject")
        assert r.status_code == 200
        assert r.json()["item"]["status"] == "REJECTED"

    def test_delete_and_gone(self, admin_client: Session, created_game: dict[str, Any]) -> None:
        gid: str = created_game["id"]
        r = admin_client.delete(f"{API}/games/{gid}")
        assert r.status_code == 200
        r = admin_client.get(f"{API}/games/{gid}")
        assert r.status_code == 404


# ---------------- Blog CRUD ----------------


def _make_blog_payload() -> dict[str, Any]:
    return {
        "title": f"TEST_Blog_{int(time.time() * 1000)}",
        "excerpt": "excerpt",
        "content": "<p>Hello</p>",
        "category": "Updates",
        "status": "DRAFT",
    }


class TestBlogCRUD:
    def test_full_cycle(self, admin_client: Session) -> None:
        r = admin_client.post(f"{API}/blogs", json=_make_blog_payload())
        assert r.status_code == 201, r.text
        item: dict[str, Any] = r.json()["item"]
        bid: str = item["id"]

        r = admin_client.post(f"{API}/blogs/{bid}/publish")
        assert r.status_code == 200
        assert r.json()["item"]["status"] == "PUBLISHED"

        r = admin_client.post(f"{API}/blogs/{bid}/unpublish")
        assert r.status_code == 200
        assert r.json()["item"]["status"] == "DRAFT"

        r = admin_client.post(f"{API}/blogs/{bid}/feature")
        assert r.status_code == 200

        r = admin_client.put(f"{API}/blogs/{bid}", json={"excerpt": "updated"})
        assert r.status_code == 200
        assert r.json()["item"]["excerpt"] == "updated"

        r = admin_client.delete(f"{API}/blogs/{bid}")
        assert r.status_code == 200


# ---------------- Contact / Newsletter ----------------


class TestPublicForms:
    def test_contact_submit(self, api_client: Session) -> None:
        r = api_client.post(
            f"{API}/contact",
            json={
                "name": "TEST_User",
                "email": "test_contact@example.com",
                "subject": "Hello",
                "message": "This is a test message",
            },
        )
        assert r.status_code == 201
        assert r.json()["ok"] == True  # noqa: E712 - explicit per code review

    def test_contact_invalid(self, api_client: Session) -> None:
        r = api_client.post(f"{API}/contact", json={"name": "x"})
        assert r.status_code == 400

    def test_newsletter_subscribe(self, api_client: Session) -> None:
        email = f"test_news_{int(time.time() * 1000)}@example.com"
        r = api_client.post(f"{API}/newsletter", json={"email": email})
        assert r.status_code == 201
        # idempotent upsert
        r2 = api_client.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 201

    def test_newsletter_invalid(self, api_client: Session) -> None:
        r = api_client.post(f"{API}/newsletter", json={"email": "invalid"})
        assert r.status_code == 400


# ---------------- Upload ----------------


# 1x1 transparent PNG bytes.
_PNG_BYTES: bytes = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8\xcf"
    b"\xc0\x00\x00\x00\x03\x00\x01\x00\x18\xdd\x8d\xb4\x00\x00\x00\x00IEND\xaeB`\x82"
)


class TestUpload:
    def test_upload_single_unauth(self) -> None:
        r = requests.post(
            f"{API}/upload/single",
            files={"file": ("test.png", _PNG_BYTES, "image/png")},
        )
        assert r.status_code == 401

    def test_upload_single_authed(self, admin_token: str) -> None:
        r = requests.post(
            f"{API}/upload/single",
            headers={"Authorization": f"Bearer {admin_token}"},
            files={"file": ("test.png", _PNG_BYTES, "image/png")},
        )
        assert r.status_code == 200, r.text
        j = r.json()
        assert "url" in j and j["url"].startswith("/uploads/")

    def test_upload_multiple_authed(self, admin_token: str) -> None:
        r = requests.post(
            f"{API}/upload/multiple",
            headers={"Authorization": f"Bearer {admin_token}"},
            files=[
                ("files", ("a.png", _PNG_BYTES, "image/png")),
                ("files", ("b.png", _PNG_BYTES, "image/png")),
            ],
        )
        assert r.status_code == 200, r.text
        urls: list[str] = r.json()["urls"]
        assert len(urls) == 2
        assert all(u.startswith("/uploads/") for u in urls)

    def test_upload_status_unauth(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/upload/status")
        assert r.status_code == 401

    def test_upload_status_authed(self, admin_client: Session) -> None:
        r = admin_client.get(f"{API}/upload/status")
        assert r.status_code == 200
        d = r.json()
        assert d.get("storage") == "local"

    def test_upload_single_returns_storage(self, admin_token: str) -> None:
        r = requests.post(
            f"{API}/upload/single",
            headers={"Authorization": f"Bearer {admin_token}"},
            files={"file": ("test.png", _PNG_BYTES, "image/png")},
        )
        assert r.status_code == 200
        j = r.json()
        assert j.get("storage") == "local"
        assert j["url"].startswith("/uploads/")


# ---------------- Categories ----------------


class TestCategories:
    _created_ids: list[str] = []

    def test_list_public(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/categories")
        assert r.status_code == 200
        d = r.json()
        assert "items" in d and isinstance(d["items"], list)
        assert len(d["items"]) > 0
        types = {c["type"] for c in d["items"]}
        assert {"game", "dapp", "blog"}.issubset(types)

    @pytest.mark.parametrize("t", ["game", "dapp", "blog"])
    def test_list_filter_by_type(self, api_client: Session, t: str) -> None:
        r = api_client.get(f"{API}/categories?type={t}")
        assert r.status_code == 200
        items = r.json()["items"]
        assert len(items) > 0
        for c in items:
            assert c["type"] == t

    def test_create_requires_auth(self, api_client: Session) -> None:
        r = api_client.post(f"{API}/categories", json={"name": "Unauth", "type": "game"})
        assert r.status_code == 401

    def test_create_and_dup(self, admin_client: Session) -> None:
        name = f"TEST_Cat_{int(time.time() * 1000)}"
        r = admin_client.post(f"{API}/categories", json={"name": name, "type": "game"})
        assert r.status_code == 201, r.text
        item = r.json()["item"]
        assert item["name"] == name
        assert item["type"] == "game"
        assert "slug" in item
        TestCategories._created_ids.append(item["id"])

        # Duplicate same type -> 409
        r2 = admin_client.post(f"{API}/categories", json={"name": name, "type": "game"})
        assert r2.status_code == 409

        # Same name different type allowed
        r3 = admin_client.post(f"{API}/categories", json={"name": name, "type": "dapp"})
        assert r3.status_code == 201, r3.text
        TestCategories._created_ids.append(r3.json()["item"]["id"])

        r4 = admin_client.post(f"{API}/categories", json={"name": name, "type": "blog"})
        assert r4.status_code == 201
        TestCategories._created_ids.append(r4.json()["item"]["id"])

    def test_update_and_delete(self, admin_client: Session) -> None:
        name = f"TEST_UpdCat_{int(time.time() * 1000)}"
        r = admin_client.post(f"{API}/categories", json={"name": name, "type": "game"})
        assert r.status_code == 201
        cid: str = r.json()["item"]["id"]

        new_name = name + "_v2"
        r = admin_client.put(f"{API}/categories/{cid}", json={"name": new_name})
        assert r.status_code == 200
        u = r.json()["item"]
        assert u["name"] == new_name
        assert u["slug"]

        r = admin_client.delete(f"{API}/categories/{cid}")
        assert r.status_code == 200

        r = admin_client.put(f"{API}/categories/nonexistent-id-xyz", json={"name": "foo"})
        assert r.status_code == 404

        r = admin_client.delete(f"{API}/categories/nonexistent-id-xyz")
        assert r.status_code == 404

    def test_cleanup_created(self, admin_client: Session) -> None:
        for cid in TestCategories._created_ids:
            admin_client.delete(f"{API}/categories/{cid}")


# ---------------- Admin Newsletter ----------------


def _subscribe(api_client: Session, email: str) -> Response:
    return api_client.post(f"{API}/newsletter", json={"email": email})


class TestAdminNewsletter:
    def test_unauth_list(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/admin/newsletter")
        assert r.status_code == 401

    def test_unauth_export(self, api_client: Session) -> None:
        r = api_client.get(f"{API}/admin/newsletter/export.csv")
        assert r.status_code == 401

    def test_seed_and_list(self, admin_client: Session, api_client: Session) -> None:
        email = f"test_ns_admin_{int(time.time() * 1000)}@example.com"
        assert _subscribe(api_client, email).status_code == 201

        r = admin_client.get(f"{API}/admin/newsletter")
        assert r.status_code == 200
        d = r.json()
        assert "items" in d and isinstance(d["items"], list)
        emails = [s["email"] for s in d["items"]]
        assert email in emails

    def test_export_csv(self, admin_client: Session, api_client: Session) -> None:
        email = f"test_csv_{int(time.time() * 1000)}@example.com"
        _subscribe(api_client, email)

        r = admin_client.get(f"{API}/admin/newsletter/export.csv")
        assert r.status_code == 200
        ctype: str = r.headers.get("Content-Type", "")
        assert "text/csv" in ctype
        lines = r.text.strip().split("\n")
        assert lines[0].replace('"', "") == "email,subscribedAt"
        assert len(lines) >= 2

    def test_delete_subscriber(self, admin_client: Session, api_client: Session) -> None:
        email = f"test_del_{int(time.time() * 1000)}@example.com"
        assert _subscribe(api_client, email).status_code == 201

        items = admin_client.get(f"{API}/admin/newsletter").json()["items"]
        target = next((s for s in items if s["email"] == email), None)
        assert target != None  # noqa: E711 - explicit per code review
        sid: str = target["id"]

        r = admin_client.delete(f"{API}/admin/newsletter/{sid}")
        assert r.status_code == 200

        items2 = admin_client.get(f"{API}/admin/newsletter").json()["items"]
        assert not any(s["id"] == sid for s in items2)

        r = admin_client.delete(f"{API}/admin/newsletter/nonexistent-id-xyz")
        assert r.status_code == 404
