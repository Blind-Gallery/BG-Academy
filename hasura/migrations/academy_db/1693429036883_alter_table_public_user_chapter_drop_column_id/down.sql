alter table "public"."user_chapter" alter column "id" set default gen_random_uuid();
alter table "public"."user_chapter" alter column "id" drop not null;
alter table "public"."user_chapter" add column "id" uuid;
