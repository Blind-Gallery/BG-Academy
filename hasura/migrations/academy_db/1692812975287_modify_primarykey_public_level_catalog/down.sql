alter table "public"."level_catalog" drop constraint "level_catalog_pkey";
alter table "public"."level_catalog"
    add constraint "level_catalog_pkey"
    primary key ("name");
