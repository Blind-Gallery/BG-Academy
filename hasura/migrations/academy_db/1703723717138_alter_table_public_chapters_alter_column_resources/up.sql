alter table "public"."chapters" alter column "resources" drop not null;
alter table "public"."chapters" drop constraint "chapters_resources_key";
