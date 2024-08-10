alter table "public"."courses" alter column "onchain_id" set not null;
alter table "public"."courses" alter column "onchain_id" set default nextval('course_id_seq'::regclass);
