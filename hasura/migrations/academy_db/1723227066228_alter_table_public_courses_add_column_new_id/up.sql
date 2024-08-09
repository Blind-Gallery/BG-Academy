alter table "public"."courses" add column "new_id" text
 not null unique default gen_random_uuid();
