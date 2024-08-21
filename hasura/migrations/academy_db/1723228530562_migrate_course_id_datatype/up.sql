
alter table "public"."courses" add column "new_id" text
 not null unique default gen_random_uuid();

alter table "public"."modules" add column "course_new_id" text
 null;

alter table "public"."modules"
  add constraint "modules_course_new_id_fkey"
  foreign key ("course_new_id")
  references "public"."courses"
  ("new_id") on update cascade on delete cascade;

alter table "public"."payments" add column "course_new_id" text
 null;

alter table "public"."payments"
  add constraint "payments_course_new_id_fkey"
  foreign key ("course_new_id")
  references "public"."courses"
  ("new_id") on update cascade on delete cascade;

alter table "public"."user_course" add column "course_new_id" text
 null;

alter table "public"."user_course"
  add constraint "user_course_course_new_id_fkey"
  foreign key ("course_new_id")
  references "public"."courses"
  ("new_id") on update cascade on delete cascade;

UPDATE modules
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = modules.course_id
);

UPDATE user_course
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = user_course.course_id
);

UPDATE payments
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = payments.course_id
);

ALTER TABLE modules
DROP COLUMN course_id;

ALTER TABLE modules
RENAME COLUMN course_new_id TO course_id;

ALTER TABLE user_course
DROP COLUMN course_id;

ALTER TABLE user_course
RENAME COLUMN course_new_id TO course_id;

ALTER TABLE payments
DROP COLUMN course_id;

ALTER TABLE payments
RENAME COLUMN course_new_id TO course_id;
BEGIN TRANSACTION;
ALTER TABLE "public"."courses" DROP CONSTRAINT "course_pkey";

ALTER TABLE "public"."courses"
    ADD CONSTRAINT "course_pkey" PRIMARY KEY ("new_id");
COMMIT TRANSACTION;

alter table "public"."courses" rename column "id" to "onchain_id";

alter table "public"."courses" rename column "new_id" to "id";
