
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user_course" add column "soul_bound_token_id" integer
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user_course" add column "certificate_image_cid" text
--  null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."user_course" add column "certificate_cid" text
--  null;

alter table "public"."tezos" drop constraint "tezos_id_fkey",
  add constraint "tezos_id_fkey"
  foreign key ("id")
  references "public"."users"
  ("id") on update set null on delete set null;

comment on column "public"."users"."lastname" is E'stores only user information';
alter table "public"."users" alter column "lastname" drop not null;
alter table "public"."users" add column "lastname" text;
