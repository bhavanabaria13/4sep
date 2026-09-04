

dappradaar=# SELECT column_name, data_type
dappradaar-# FROM information_schema.columns
dappradaar-# WHERE table_name = 'User'
dappradaar-# ORDER BY ordinal_position;
 column_name |          data_type
-------------+-----------------------------
 id          | text
 email       | text
 password    | text
 name        | text
 role        | text
 createdAt   | timestamp without time zone
 updatedAt   | timestamp without time zone
(7 rows)


INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'admin@etherauthority.com',
    'Admin@123',
    'Administrator',
    'admin',
    NOW(),
    NOW()
);

INSERT INTO "User" (
    id,
    email,
    password,
    name,
    role,
    "createdAt",
    "updatedAt"
)
VALUES (
    gen_random_uuid()::text,
    'admin@etherauthority.com',
    '$2a$12$3wCmbSqKSW.TkKydY0fKJe91Lg2StQNljgEvh6zDFMYcsQAv/aHXe',
    'Administrator',
    'admin',
    NOW(),
    NOW()
);


Frontend: React + Vite
Backend: Express 4
Database: PostgreSQL + Prisma 5
Auth: JWT
Uploads: Multer
Cloudinary support: પહેલેથી codeમાં છે
Backend હાલ app.listen()થી ચાલે છે
Frontend API હાલમાં hard-coded http://localhost:8001/api છે