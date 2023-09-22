alter table "public"."emails" alter column "id" set default gen_random_uuid();
ALTER TABLE "public"."emails" ALTER COLUMN "id" TYPE uuid;
