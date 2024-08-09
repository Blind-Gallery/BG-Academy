BEGIN TRANSACTION;
ALTER TABLE "public"."courses" DROP CONSTRAINT "course_pkey";

ALTER TABLE "public"."courses"
    ADD CONSTRAINT "course_pkey" PRIMARY KEY ("new_id");
COMMIT TRANSACTION;
