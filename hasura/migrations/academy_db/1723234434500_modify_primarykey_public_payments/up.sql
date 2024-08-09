alter table "public"."payments"
    add constraint "payments_pkey"
    primary key ("course_id", "user_id");
