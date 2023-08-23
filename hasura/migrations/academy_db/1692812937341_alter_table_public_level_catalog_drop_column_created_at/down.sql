comment on column "public"."level_catalog"."created_at" is E'catalog of levels';
alter table "public"."level_catalog" alter column "created_at" set default now();
alter table "public"."level_catalog" alter column "created_at" drop not null;
alter table "public"."level_catalog" add column "created_at" timestamptz;
