
alter table "public"."users" drop column "lastname" cascade;

alter table "public"."tezos" drop constraint "tezos_id_fkey",
  add constraint "tezos_id_fkey"
  foreign key ("id")
  references "public"."users"
  ("id") on update cascade on delete cascade;

alter table "public"."user_course" add column if not exists "certificate_cid" text
 null;

ALTER TABLE "public"."user_course" ADD COLUMN IF NOT EXISTS "certificate_image_cid" text NULL;

alter table "public"."user_course" add column if not exists "soul_bound_token_id" integer
 null;
