CREATE TABLE "public"."question_options" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "question_id" uuid NOT NULL, "option" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."question_options" IS E'options for questions (answers)';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
