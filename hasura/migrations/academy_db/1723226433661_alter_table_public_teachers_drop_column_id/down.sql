alter table "public"."teachers" alter column "id" set default nextval('professors_id_seq'::regclass);
alter table "public"."teachers" alter column "id" drop not null;
alter table "public"."teachers" add column "id" int4;
