alter table "public"."courses" alter column "id" set default nextval('course_id_seq'::regclass);
alter table "public"."courses" alter column "id" drop not null;
alter table "public"."courses" add column "id" int4;
