alter table "public"."teachers" alter column "new_id" set not null;
alter table "public"."teachers" add constraint "teachers_new_id_key" unique ("new_id");
