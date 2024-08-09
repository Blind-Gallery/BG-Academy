
CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."teachers" add column "new_id" uuid
 null default gen_random_uuid();

alter table "public"."courses" add column "teacher_new_id" text
 null;

alter table "public"."teachers" alter column "new_id" set not null;
alter table "public"."teachers" add constraint "teachers_new_id_key" unique ("new_id");

ALTER TABLE "public"."teachers" ALTER COLUMN "new_id" TYPE text;

alter table "public"."courses"
  add constraint "courses_teacher_new_id_fkey"
  foreign key ("teacher_new_id")
  references "public"."teachers"
  ("new_id") on update cascade on delete cascade;

UPDATE courses
SET teacher_new_id = (
    SELECT new_id
    FROM teachers
    WHERE teachers.id = courses.teacher_id
);

ALTER TABLE courses
DROP COLUMN teacher_id;

ALTER TABLE courses
RENAME COLUMN teacher_new_id TO teacher_id;
BEGIN TRANSACTION;
ALTER TABLE "public"."teachers" DROP CONSTRAINT "professors_pkey";

ALTER TABLE "public"."teachers"
    ADD CONSTRAINT "professors_pkey" PRIMARY KEY ("new_id");
COMMIT TRANSACTION;

alter table "public"."teachers" drop column "id" cascade;

alter table "public"."teachers" rename column "new_id" to "id";
