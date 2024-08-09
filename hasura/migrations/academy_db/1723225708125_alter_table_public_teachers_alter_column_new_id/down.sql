alter table "public"."teachers" drop constraint "teachers_new_id_key";
alter table "public"."teachers" alter column "new_id" drop not null;
