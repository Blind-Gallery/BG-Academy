alter table "public"."user_question" drop constraint "user_question_pkey";
alter table "public"."user_question"
    add constraint "user_question_pkey"
    primary key ("id");
