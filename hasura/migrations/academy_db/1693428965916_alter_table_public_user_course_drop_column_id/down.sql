alter table "public"."user_course" alter column "id" set default nextval('user_course_id_seq'::regclass);
alter table "public"."user_course" alter column "id" drop not null;
alter table "public"."user_course" add column "id" int4;
