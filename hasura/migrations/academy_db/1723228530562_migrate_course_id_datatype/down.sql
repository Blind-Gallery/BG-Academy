
alter table "public"."courses" rename column "id" to "new_id";

alter table "public"."courses" alter column "id" set default nextval('course_id_seq'::regclass);
alter table "public"."courses" alter column "id" drop not null;
alter table "public"."courses" add column "id" int4;

alter table "public"."courses" drop constraint "courses_pkey";
alter table "public"."courses"
    add constraint "course_pkey"
    primary key ("id");

-- no down migration for this change
-- no down migration for this change
alter table "public"."user_course" drop constraint "user_course_course_new_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user_course" add column "course_new_id" text
--  null;

alter table "public"."payments" drop constraint "payments_course_new_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."payments" add column "course_new_id" text
--  null;

alter table "public"."modules" drop constraint "modules_course_new_id_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."modules" add column "course_new_id" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."courses" add column "new_id" text
--  not null unique default gen_random_uuid();
