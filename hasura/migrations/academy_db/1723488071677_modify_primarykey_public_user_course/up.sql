alter table "public"."user_course"
    add constraint "user_course_pkey"
    primary key ("course_id", "user_id");
