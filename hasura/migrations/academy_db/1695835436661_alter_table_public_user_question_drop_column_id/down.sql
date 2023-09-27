alter table "public"."user_question" alter column "id" set default nextval('user_question_id_seq'::regclass);
alter table "public"."user_question" alter column "id" drop not null;
alter table "public"."user_question" add column "id" int4;
