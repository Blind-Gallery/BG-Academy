CREATE TABLE "public"."user_question" ("id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "user_id" text NOT NULL, "question_id" uuid NOT NULL, "answer_id" uuid NOT NULL, "is_correct_answer" boolean NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("answer_id") REFERENCES "public"."question_options"("id") ON UPDATE cascade ON DELETE cascade);
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_user_question_updated_at"
BEFORE UPDATE ON "public"."user_question"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_question_updated_at" ON "public"."user_question"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
