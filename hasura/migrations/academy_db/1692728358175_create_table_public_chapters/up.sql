CREATE TABLE "public"."chapters" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "module_id" uuid NOT NULL, "next_chapter_id" uuid, "previous_chapter_id" uuid, "resources" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "duration" text NOT NULL, "info" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON UPDATE cascade ON DELETE cascade);COMMENT ON TABLE "public"."chapters" IS E'chapters of a module';
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
CREATE TRIGGER "set_public_chapters_updated_at"
BEFORE UPDATE ON "public"."chapters"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_chapters_updated_at" ON "public"."chapters"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
