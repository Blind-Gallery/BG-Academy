comment on column "public"."level_catalog"."updated_at" is E'catalog of levels';
alter table "public"."level_catalog" alter column "updated_at" set default now();
alter table "public"."level_catalog" alter column "updated_at" drop not null;
alter table "public"."level_catalog" add column "updated_at" timestamptz;
