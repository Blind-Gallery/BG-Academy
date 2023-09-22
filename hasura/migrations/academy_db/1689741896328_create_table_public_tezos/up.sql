CREATE TABLE "public"."tezos" ("id" uuid NOT NULL, "wallet" text NOT NULL, "signedMessage" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("wallet") , FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("wallet"), UNIQUE ("signedMessage"));COMMENT ON TABLE "public"."tezos" IS E'stores tezos information from a user';
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
CREATE TRIGGER "set_public_tezos_updated_at"
BEFORE UPDATE ON "public"."tezos"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_tezos_updated_at" ON "public"."tezos"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
