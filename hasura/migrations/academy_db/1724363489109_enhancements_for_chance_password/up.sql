
alter table "public"."emails" add column "change_password_request" boolean
 null default 'false';

alter table "public"."emails" add column "change_password_request_time" timestamptz
 null;

alter table "public"."emails" add column "change_password_request_code" text
 null;

ALTER TABLE emails
RENAME COLUMN "isVerified" TO is_verified;

ALTER TABLE emails
RENAME COLUMN "verificationCode" TO verification_code;

CREATE OR REPLACE FUNCTION update_change_password_request()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if change_password_request_code is not null
    IF NEW.change_password_request_code IS NOT NULL THEN
        -- Update change_password_request_time to the current timestamp and change_password_request to true
        NEW.change_password_request_time := NOW();
        NEW.change_password_request := TRUE;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trigger_update_change_password_request
BEFORE INSERT OR UPDATE ON emails
FOR EACH ROW
EXECUTE FUNCTION update_change_password_request();


CREATE OR REPLACE FUNCTION reset_change_password_request()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the password is being updated and is different from the old one
    IF NEW.password IS DISTINCT FROM OLD.password THEN
        -- Reset the change_password_request and change_password_request_code
        NEW.change_password_request := FALSE;
        NEW.change_password_request_code := NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reset_change_password_request
BEFORE UPDATE ON emails
FOR EACH ROW
EXECUTE FUNCTION reset_change_password_request();
