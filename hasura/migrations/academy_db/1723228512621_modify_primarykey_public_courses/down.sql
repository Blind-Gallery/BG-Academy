alter table "public"."courses" drop constraint "courses_pkey";
alter table "public"."courses"
    add constraint "course_pkey"
    primary key ("id");
