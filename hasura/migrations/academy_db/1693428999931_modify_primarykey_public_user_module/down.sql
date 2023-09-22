alter table "public"."user_module" drop constraint "user_module_pkey";
alter table "public"."user_module"
    add constraint "user_module_pkey"
    primary key ("id");
