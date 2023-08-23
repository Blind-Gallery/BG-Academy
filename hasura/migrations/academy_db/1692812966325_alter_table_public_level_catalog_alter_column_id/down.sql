alter table "public"."level_catalog" alter column "id" set default nextval('level_catalog_id_seq'::regclass);
ALTER TABLE "public"."level_catalog" ALTER COLUMN "id" TYPE integer;
