alter table "public"."modules" alter column "course_id" set default nextval('modules_course_id_seq'::regclass);
