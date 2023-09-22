BEGIN TRANSACTION;
ALTER TABLE "public"."user_course" DROP CONSTRAINT "user_course_pkey";

ALTER TABLE "public"."user_course"
    ADD CONSTRAINT "user_course_pkey" PRIMARY KEY ("course_id", "user_id");
COMMIT TRANSACTION;
