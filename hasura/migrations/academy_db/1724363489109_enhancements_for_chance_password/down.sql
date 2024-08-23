
-- Drop the trigger that updates the change_password_request_time and change_password_request
DROP TRIGGER IF EXISTS trigger_update_change_password_request ON emails;

-- Drop the function that handles the update logic
DROP FUNCTION IF EXISTS update_change_password_request();


-- Drop the trigger that resets change_password_request and change_password_request_code when the password is changed
DROP TRIGGER IF EXISTS trigger_reset_change_password_request ON emails;

-- Drop the function that handles the reset logic
DROP FUNCTION IF EXISTS reset_change_password_request();

ALTER TABLE emails
RENAME COLUMN is_verified TO "isVerified";

ALTER TABLE emails
RENAME COLUMN verification_code TO "verificationCode";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."emails" add column "change_password_request_code" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."emails" add column "change_password_request_time" timestamptz
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."emails" add column "change_password_request" boolean
--  null default 'false';
