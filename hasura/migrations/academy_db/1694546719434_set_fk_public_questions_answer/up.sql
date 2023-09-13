alter table "public"."questions"
  add constraint "questions_answer_fkey"
  foreign key ("answer")
  references "public"."question_options"
  ("id") on update cascade on delete cascade;
