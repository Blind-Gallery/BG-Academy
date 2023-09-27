BEGIN TRANSACTION;
ALTER TABLE "public"."user_question" DROP CONSTRAINT "user_question_pkey";

ALTER TABLE "public"."user_question"
    ADD CONSTRAINT "user_question_pkey" PRIMARY KEY ("user_id", "question_id");
COMMIT TRANSACTION;
