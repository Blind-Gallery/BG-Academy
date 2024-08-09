
alter table "public"."teachers" rename column "id" to "new_id";

alter table "public"."teachers" alter column "id" set default nextval('professors_id_seq'::regclass);
alter table "public"."teachers" alter column "id" drop not null;
alter table "public"."teachers" add column "id" int4;

alter table "public"."teachers" drop constraint "teachers_pkey";
alter table "public"."teachers"
    add constraint "professors_pkey"
    primary key ("id");

-- no down migration
--- no down migration
alter table "public"."courses" drop constraint "courses_teacher_new_id_fkey";

ALTER TABLE "public"."teachers" ALTER COLUMN "new_id" TYPE uuid;

alter table "public"."teachers" drop constraint "teachers_new_id_key";
alter table "public"."teachers" alter column "new_id" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."courses" add column "teacher_new_id" text
--  null;

alter table "public"."teachers" drop column "new_id" cascade
alter table "public"."teachers" drop column "new_id";
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
