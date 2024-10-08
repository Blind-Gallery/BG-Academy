
alter table "public"."questions" add column "created_at" timestamptz
 null default now();

alter table "public"."questions" add column "updated_at" timestamptz
 null default now();

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
CREATE TRIGGER "set_public_questions_updated_at"
BEFORE UPDATE ON "public"."questions"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_questions_updated_at" ON "public"."questions"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "public"."questions" add column "priority" integer
 not null default '0';

alter table "public"."question_options" add column "created_at" timestamptz
 null default now();

alter table "public"."question_options" add column "updated_at" timestamptz
 null default now();

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
CREATE TRIGGER "set_public_question_options_updated_at"
BEFORE UPDATE ON "public"."question_options"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_question_options_updated_at" ON "public"."question_options"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';

alter table "public"."question_options" add column "priority" integer
 not null default '0';
