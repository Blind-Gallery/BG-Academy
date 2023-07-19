CREATE TABLE "public"."emails" ("id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "email" text NOT NULL, "password" text NOT NULL, "verificationCode" text NOT NULL, PRIMARY KEY ("email") , FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("email"), UNIQUE ("verificationCode"));COMMENT ON TABLE "public"."emails" IS E'tracks login with email';
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
CREATE TRIGGER "set_public_emails_updated_at"
BEFORE UPDATE ON "public"."emails"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_emails_updated_at" ON "public"."emails"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
