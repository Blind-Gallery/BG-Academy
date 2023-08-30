alter table "public"."user_module" alter column "id" set default gen_random_uuid();
alter table "public"."user_module" alter column "id" drop not null;
alter table "public"."user_module" add column "id" uuid;
