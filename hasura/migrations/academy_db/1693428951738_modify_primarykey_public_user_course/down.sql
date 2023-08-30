alter table "public"."user_course" drop constraint "user_course_pkey";
alter table "public"."user_course"
    add constraint "user_course_pkey"
    primary key ("id");
