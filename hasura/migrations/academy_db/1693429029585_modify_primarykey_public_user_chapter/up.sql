BEGIN TRANSACTION;
ALTER TABLE "public"."user_chapter" DROP CONSTRAINT "user_chapter_pkey";

ALTER TABLE "public"."user_chapter"
    ADD CONSTRAINT "user_chapter_pkey" PRIMARY KEY ("user_id", "chapter_id");
COMMIT TRANSACTION;
