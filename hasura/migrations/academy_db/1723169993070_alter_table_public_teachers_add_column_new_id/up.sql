CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."teachers" add column "new_id" uuid
 null default gen_random_uuid();
