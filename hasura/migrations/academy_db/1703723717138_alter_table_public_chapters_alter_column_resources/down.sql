alter table "public"."chapters" add constraint "chapters_resources_key" unique ("resources");
alter table "public"."chapters" alter column "resources" set not null;
