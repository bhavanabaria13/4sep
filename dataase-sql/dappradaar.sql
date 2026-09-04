--
-- PostgreSQL database dump
--

\restrict EaXHSfMvIifmvmRKhMHyufokP9DnnUptfJKyxtdVgL8nem4Rir0I7fGvml5RZdN

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED',
    'DRAFT',
    'PUBLISHED'
);


ALTER TYPE public."Status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Blog" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    status public."Status" DEFAULT 'DRAFT'::public."Status" NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    thumbnail text,
    banner text,
    category text NOT NULL,
    tags text[] DEFAULT ARRAY[]::text[],
    author text DEFAULT 'Admin'::text NOT NULL,
    "readingTime" integer DEFAULT 5 NOT NULL,
    views integer DEFAULT 0 NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "metaTitle" text,
    "metaDesc" text,
    "publishedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Blog" OWNER TO postgres;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    type text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: ContactMessage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ContactMessage" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ContactMessage" OWNER TO postgres;

--
-- Name: Dapp; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dapp" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "shortDesc" text NOT NULL,
    description text NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    rank integer DEFAULT 999 NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    thumbnail text,
    logo text,
    banner text,
    blockchain text NOT NULL,
    category text NOT NULL,
    website text,
    github text,
    "videoUrl" text,
    gallery text[] DEFAULT ARRAY[]::text[],
    features text[] DEFAULT ARRAY[]::text[],
    "techStack" text[] DEFAULT ARRAY[]::text[],
    views integer DEFAULT 0 NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "metaTitle" text,
    "metaDesc" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Dapp" OWNER TO postgres;

--
-- Name: Game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Game" (
    id text NOT NULL,
    title text NOT NULL,
    slug text NOT NULL,
    "shortDesc" text NOT NULL,
    description text NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    rank integer DEFAULT 999 NOT NULL,
    featured boolean DEFAULT false NOT NULL,
    thumbnail text,
    logo text,
    banner text,
    blockchain text NOT NULL,
    category text NOT NULL,
    website text,
    github text,
    "videoUrl" text,
    gallery text[] DEFAULT ARRAY[]::text[],
    features text[] DEFAULT ARRAY[]::text[],
    "techStack" text[] DEFAULT ARRAY[]::text[],
    views integer DEFAULT 0 NOT NULL,
    likes integer DEFAULT 0 NOT NULL,
    "metaTitle" text,
    "metaDesc" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Game" OWNER TO postgres;

--
-- Name: NewsletterSub; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NewsletterSub" (
    id text NOT NULL,
    email text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."NewsletterSub" OWNER TO postgres;

--
-- Name: Setting; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Setting" (
    key text NOT NULL,
    value text NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Setting" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'admin'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Blog" (id, title, slug, excerpt, content, status, featured, thumbnail, banner, category, tags, author, "readingTime", views, likes, "metaTitle", "metaDesc", "publishedAt", "createdAt", "updatedAt") FROM stdin;
cms7c05r8000yjbzwzrprpk31	EtherAuthority Interns – Building the Future of Web3	etherauthority-interns-building-the-future-of-web3	Welcome to EtherAuthority Interns! We're a group of passionate builders working on exciting blockchain projects.	<h2>Introducing our program</h2><p>Welcome to EtherAuthority Interns! We're a group of passionate builders working on exciting blockchain projects. Over the past months, our interns have shipped multiple production dApps and games, from DeFi tools to on-chain RPGs.</p><p>In this post, we'll share the journey, the wins, and the lessons learned by our talented team.</p>	PUBLISHED	t	https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Announcements	{intro,web3,interns}	Admin	5	0	0	\N	\N	2026-07-30 09:49:01.6	2026-07-30 09:49:01.604	2026-07-30 09:49:01.604
cms7c05ra000zjbzwom1we17g	Top 5 Games Built by Our Incredible Interns	top-5-games-built-by-our-incredible-interns	Here are 5 amazing blockchain games built by our talented interns.	<h2>The lineup</h2><p>Our interns have built 5 stunning blockchain games that push the boundaries of on-chain gameplay. From Crypto Legends to Meta Racers, discover them all.</p>	PUBLISHED	f	https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Updates	{games,showcase}	Admin	4	0	0	\N	\N	2026-07-30 09:49:01.606	2026-07-30 09:49:01.607	2026-07-30 09:49:01.607
cms7c05rc0010jbzw6qm5yevg	How to Build Your First dApp on Ethereum	how-to-build-your-first-dapp-on-ethereum	A step-by-step guide for interns and beginners to build their first dApp.	<h2>Setup</h2><p>Install Hardhat, MetaMask, and set up a React project.</p><h2>Contract</h2><p>Write a minimal ERC-20 contract, deploy to Sepolia and integrate with your frontend using Ethers.js.</p>	PUBLISHED	f	https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Tutorials	{tutorial,dapp}	Admin	7	0	0	\N	\N	2026-07-30 09:49:01.608	2026-07-30 09:49:01.608	2026-07-30 09:49:01.608
cms7c05re0011jbzwswdwk7yv	The Future of Gaming is Decentralized	the-future-of-gaming-is-decentralized	Why blockchain gaming is the next big revolution in the gaming industry.	<h2>Ownership</h2><p>Web3 gaming shifts asset ownership back to the player, unlocking real economies and portable identities across titles.</p>	PUBLISHED	f	https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Web3	{gaming,future}	Admin	6	0	0	\N	\N	2026-07-30 09:49:01.609	2026-07-30 09:49:01.61	2026-07-30 09:49:01.61
cms7c05ri0013jbzwiy1cqk0r	Intern Spotlight: Amazing Builders of EtherAuthority	intern-spotlight-amazing-builders-of-etherauthority	Let's shine a light on our talented interns and their incredible work.	<h2>Meet the team</h2><p>Meet the builders behind our top projects. From smart contract wizards to frontend artists, our interns represent the future of Web3.</p>	PUBLISHED	f	https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGRhcmslMjBuZW9uJTIwYmx1ZSUyMHB1cnBsZSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Announcements	{team,spotlight}	Admin	3	0	0	\N	\N	2026-07-30 09:49:01.614	2026-07-30 09:49:01.615	2026-07-30 09:49:01.615
cms7c05rg0012jbzwtzq7ivkk	New dApp Project: VoteChain	new-dapp-project-votechain	VoteChain is a decentralized voting platform built for transparency.	<h2>What is VoteChain?</h2><p>VoteChain enables secure, transparent, and privacy-preserving voting for DAOs, communities, and organizations.</p>	PUBLISHED	f	https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Updates	{dao,governance}	Admin	4	2	0	\N	\N	2026-07-30 09:49:01.611	2026-07-30 09:49:01.612	2026-08-04 12:38:05.481
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, slug, type, "createdAt") FROM stdin;
cms7c05eu0000jbzwr9c9ikbh	RPG	rpg	game	2026-07-30 09:49:01.071
cms7c05f70001jbzw3ieu4nxo	Strategy	strategy	game	2026-07-30 09:49:01.071
cms7c05f70002jbzwbqodfgpn	Card	card	game	2026-07-30 09:49:01.071
cms7c05f70003jbzwwb87o1l3	Racing	racing	game	2026-07-30 09:49:01.071
cms7c05f70004jbzwj3qgyu7c	Adventure	adventure	game	2026-07-30 09:49:01.071
cms7c05f70005jbzwz3kuodda	Action	action	game	2026-07-30 09:49:01.071
cms7c05f70006jbzwkeyj2m7i	Puzzle	puzzle	game	2026-07-30 09:49:01.071
cms7c05f70007jbzwbbriwdhz	Sports	sports	game	2026-07-30 09:49:01.071
cms7c05f70008jbzwttse6cua	DeFi	defi	dapp	2026-07-30 09:49:01.071
cms7c05f70009jbzw7mqkjkf0	DAO	dao	dapp	2026-07-30 09:49:01.071
cms7c05f7000ajbzw3a5d7541	NFT	nft	dapp	2026-07-30 09:49:01.071
cms7c05f7000bjbzwduoyukp6	Tools	tools	dapp	2026-07-30 09:49:01.071
cms7c05f7000cjbzwx38jxubw	Social	social	dapp	2026-07-30 09:49:01.071
cms7c05f7000djbzww15mra5u	Bridge	bridge	dapp	2026-07-30 09:49:01.071
cms7c05f7000ejbzw9eebsbbe	Wallet	wallet	dapp	2026-07-30 09:49:01.071
cms7c05f7000fjbzws10lppy9	Marketplace	marketplace	dapp	2026-07-30 09:49:01.071
cms7c05f7000gjbzw58dqh94t	Announcements	announcements	blog	2026-07-30 09:49:01.071
cms7c05f7000hjbzwpardquhy	Updates	updates	blog	2026-07-30 09:49:01.071
cms7c05f7000ijbzwk8dskso1	Tutorials	tutorials	blog	2026-07-30 09:49:01.071
cms7c05f7000jjbzw55lrd7yn	Web3	web3	blog	2026-07-30 09:49:01.071
cms7c05f7000kjbzwl6obqa70	Product	product	blog	2026-07-30 09:49:01.071
cms7c05f7000ljbzw0umbmw66	Community	community	blog	2026-07-30 09:49:01.071
\.


--
-- Data for Name: ContactMessage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ContactMessage" (id, name, email, subject, message, "createdAt") FROM stdin;
\.


--
-- Data for Name: Dapp; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Dapp" (id, title, slug, "shortDesc", description, status, rank, featured, thumbnail, logo, banner, blockchain, category, website, github, "videoUrl", gallery, features, "techStack", views, likes, "metaTitle", "metaDesc", "createdAt", "updatedAt") FROM stdin;
cms7c05oc000sjbzwin1enuhu	StakeHub	stakehub	A decentralized staking platform.	Stake across multiple protocols with one click. Auto-compounding vaults and detailed analytics.	APPROVED	1	t	https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Ethereum	DeFi	https://stakehub.xyz	\N	\N	{https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85,https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{Auto-compounding,Multi-chain,"Real-time analytics"}	{Solidity,React,Ethers.js}	32100	11200	\N	\N	2026-07-30 09:49:01.501	2026-07-30 09:49:01.501
cms7c05oq000tjbzw47jw67zq	VoteChain	votechain	Decentralized voting made transparent.	On-chain governance platform with delegation, snapshots and privacy-preserving votes.	APPROVED	2	f	https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Polygon	DAO	https://votechain.io	\N	\N	{https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{"Delegated voting",Snapshots,"Privacy proofs"}	{Solidity,Next.js}	21400	9600	\N	\N	2026-07-30 09:49:01.515	2026-07-30 09:49:01.515
cms7c05pn000ujbzw364tx591	NFT Launchpad	nft-launchpad	Launch and discover NFT projects.	Turn-key NFT launchpad with vetted projects and community curation.	APPROVED	3	f	https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	BNB Chain	NFT	https://nftlaunchpad.app	\N	\N	{https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{"Whitelist mgmt","Vested drops"}	{React,Solidity}	17600	9600	\N	\N	2026-07-30 09:49:01.547	2026-07-30 09:49:01.547
cms7c05qi000vjbzwd3lpusl8	Chain Analyzer	chain-analyzer	Analyze blockchain data in real-time.	Powerful on-chain analytics with dashboards, alerts and API access.	APPROVED	4	f	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Ethereum	Tools	https://chainanalyzer.app	\N	\N	{https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{"Custom dashboards",Alerts,API}	{Node.js,"The Graph"}	14300	6100	\N	\N	2026-07-30 09:49:01.579	2026-07-30 09:49:01.579
cms7c05qr000wjbzwgq94guy2	Web3 Connect	web3-connect	Connect, chat and earn in web3 space.	Web3-native social network with token-gated communities and reputation.	APPROVED	5	f	https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1642104704074-907c0698cbd9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Arbitrum	Social	https://web3connect.social	\N	\N	{https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85}	{"Token gating","On-chain identities",Rewards}	{Next.js,Solidity}	12900	4700	\N	\N	2026-07-30 09:49:01.588	2026-07-30 09:49:01.588
cms7c05r1000xjbzwgurcr72q	SwapForge	swapforge	Aggregated DEX with best-price routing.	Meta-aggregator that finds the best swap route across dozens of DEXs.	APPROVED	6	f	https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3MlMjBhcHB8ZW58MHx8fHwxNzgzMzQ2NTAyfDA&ixlib=rb-4.1.0&q=85	Ethereum	DeFi	\N	\N	\N	{}	{"Best price routing","Gas optimization"}	{Solidity}	8800	3100	\N	\N	2026-07-30 09:49:01.598	2026-07-30 09:49:01.598
\.


--
-- Data for Name: Game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Game" (id, title, slug, "shortDesc", description, status, rank, featured, thumbnail, logo, banner, blockchain, category, website, github, "videoUrl", gallery, features, "techStack", views, likes, "metaTitle", "metaDesc", "createdAt", "updatedAt") FROM stdin;
cms7c05lf000njbzw5e3knbx6	Chain Empires	chain-empires	Build, conquer and rule the decentralized world.	A strategy game where players build kingdoms, forge alliances and battle for glory across chains.	APPROVED	2	f	https://images.unsplash.com/photo-1608741869829-8eb30661c7be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1608741869829-8eb30661c7be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	Polygon	Strategy	https://chainempires.io	\N	\N	{https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBjaXR5JTIwZGFyayUyMG5pZ2h0fGVufDB8fHx8MTc4MzM0NjUwMnww&ixlib=rb-4.1.0&q=85,https://images.unsplash.com/photo-1552820728-8b83bb896128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{"Cross-chain battles","NFT armies","Guild wars"}	{Unity,Solidity,"Polygon SDK"}	18700	8900	\N	\N	2026-07-30 09:49:01.395	2026-07-30 09:49:01.395
cms7c05lx000pjbzwdsf29ylb	Meta Racers	meta-racers	High speed NFT racing experience.	Race NFT cars on procedurally generated tracks. Own, upgrade and trade your vehicles.	APPROVED	4	f	https://images.unsplash.com/photo-1552820728-8b83bb896128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1552820728-8b83bb896128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Avalanche	Racing	https://metaracers.xyz	\N	\N	{https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600,https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85}	{"Live PvP racing","Custom garages",Sponsorships}	{"Unreal Engine","Avalanche SDK"}	15200	7100	\N	\N	2026-07-30 09:49:01.413	2026-07-30 09:49:01.413
cms7c05lo000ojbzwlx2ajb3t	Battle Cards	battle-cards	Collect, trade and battle with unique cards.	A collectible card game where every card is an NFT with unique abilities and rarities.	APPROVED	3	f	https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBjaXR5JTIwZGFyayUyMG5pZ2h0fGVufDB8fHx8MTc4MzM0NjUwMnww&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBjaXR5JTIwZGFyayUyMG5pZ2h0fGVufDB8fHx8MTc4MzM0NjUwMnww&ixlib=rb-4.1.0&q=85	BNB Chain	Card	https://battlecards.gg	\N	\N	{https://images.unsplash.com/photo-1552820728-8b83bb896128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600,https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85}	{"NFT card packs","Ranked ladder","Weekly tournaments"}	{React,Solidity,Node.js}	15202	7101	\N	\N	2026-07-30 09:49:01.404	2026-07-30 11:57:32.65
cms7c05ne000rjbzwyv9qpwyx	Skyline Warriors	skyline-warriors	Team-based tactical action in the metaverse.	Tactical shooter with cross-chain economies and cosmetic NFTs.	APPROVED	6	f	https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	Ethereum	Action	\N	\N	\N	{https://images.unsplash.com/photo-1608741869829-8eb30661c7be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85}	{"5v5 matches","Cosmetic NFTs"}	{Unity}	7202	3300	\N	\N	2026-07-30 09:49:01.466	2026-08-13 07:03:47.918
cms7c05ja000mjbzwsyd5yudv	Crypto Legends	crypto-legends	An epic RPG adventure set in a decentralized world. Play, earn and own your journey.	Crypto Legends is a blockchain RPG game where players explore a vast world, complete quests, collect NFTs and battle monsters. All assets are owned by players and can be traded in the marketplace.	APPROVED	1	t	https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85	Ethereum	RPG	https://cryptolegends.game	https://github.com/etherauthority/crypto-legends		{https://images.unsplash.com/photo-1608741869829-8eb30661c7be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85,https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxjeWJlcnB1bmslMjBjaXR5JTIwZGFyayUyMG5pZ2h0fGVufDB8fHx8MTc4MzM0NjUwMnww&ixlib=rb-4.1.0&q=85,https://images.unsplash.com/photo-1552820728-8b83bb896128?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600}	{"True asset ownership with NFTs","Play-to-earn economy","Exciting quests and gameplay","Built on Ethereum blockchain"}	{Solidity,React,IPFS,"The Graph"}	24502	12300	\N	\N	2026-07-30 09:49:01.319	2026-07-30 11:50:34.656
cms7c05m8000qjbzwbfewc4by	Lost Realms	lost-realms	Explore mysterious realms and earn rewards.	Adventure through fantastical worlds, defeat mythical beasts and claim epic loot as NFTs.	APPROVED	5	f	https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?crop=entropy&cs=srgb&fm=jpg&q=85&w=200	https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600	Solana	Adventure	https://lostrealms.io	\N	\N	{https://images.unsplash.com/photo-1698450998458-0bc1045788a1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85,https://images.unsplash.com/photo-1608741869829-8eb30661c7be?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMGdhbWUlMjBmYW50YXN5JTIwc2NyZWVuc2hvdHxlbnwwfHx8fDE3ODMzNDY1MDJ8MA&ixlib=rb-4.1.0&q=85}	{"Open-world exploration","Loot drops","Fast Solana txs"}	{Unity,Rust,Solana}	9302	4201	\N	\N	2026-07-30 09:49:01.424	2026-07-30 11:51:36.028
\.


--
-- Data for Name: NewsletterSub; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."NewsletterSub" (id, email, "createdAt") FROM stdin;
\.


--
-- Data for Name: Setting; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Setting" (key, value, "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, password, name, role, "createdAt", "updatedAt") FROM stdin;
a6f4ad43-9ab2-4a44-955c-2a9bd4d1f75c	admin@etherauthority.com	$2a$12$3wCmbSqKSW.TkKydY0fKJe91Lg2StQNljgEvh6zDFMYcsQAv/aHXe	Administrator	admin	2026-07-30 17:14:13.485	2026-07-30 17:14:13.485
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
345e0cd6-1304-467a-9605-7d04cb2ce463	d2db1d88eef594c67eb94ea2678df19932efb5b7c50922ed18fe6953e8a382bf	2026-07-30 15:16:59.575611+05:30	20260730094659_30july	\N	\N	2026-07-30 15:16:59.34749+05:30	1
\.


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: ContactMessage ContactMessage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ContactMessage"
    ADD CONSTRAINT "ContactMessage_pkey" PRIMARY KEY (id);


--
-- Name: Dapp Dapp_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dapp"
    ADD CONSTRAINT "Dapp_pkey" PRIMARY KEY (id);


--
-- Name: Game Game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Game"
    ADD CONSTRAINT "Game_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSub NewsletterSub_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NewsletterSub"
    ADD CONSTRAINT "NewsletterSub_pkey" PRIMARY KEY (id);


--
-- Name: Setting Setting_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Setting"
    ADD CONSTRAINT "Setting_pkey" PRIMARY KEY (key);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Blog_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Blog_slug_key" ON public."Blog" USING btree (slug);


--
-- Name: Category_name_type_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_type_key" ON public."Category" USING btree (name, type);


--
-- Name: Category_slug_type_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_type_key" ON public."Category" USING btree (slug, type);


--
-- Name: Dapp_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Dapp_slug_key" ON public."Dapp" USING btree (slug);


--
-- Name: Game_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Game_slug_key" ON public."Game" USING btree (slug);


--
-- Name: NewsletterSub_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "NewsletterSub_email_key" ON public."NewsletterSub" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict EaXHSfMvIifmvmRKhMHyufokP9DnnUptfJKyxtdVgL8nem4Rir0I7fGvml5RZdN

