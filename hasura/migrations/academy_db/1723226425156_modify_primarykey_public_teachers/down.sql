alter table "public"."teachers" drop constraint "teachers_pkey";
alter table "public"."teachers"
    add constraint "professors_pkey"
    primary key ("id");
