ALTER TABLE "public"."courses" ALTER COLUMN "onchain_id" drop default;
alter table "public"."courses" alter column "onchain_id" drop not null;
