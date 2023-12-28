alter table "public"."chapters" add constraint "chapters_resources_key" unique ("resources");
alter table "public"."chapters" alter column "resources" set not null;

-- Remove the trigger
DROP TRIGGER IF EXISTS update_next_module_trigger ON your_other_table_name;

-- Remove the function
DROP FUNCTION IF EXISTS update_next_module_id();

-- Drop the trigger
DROP TRIGGER IF EXISTS update_next_chapter_trigger ON your_table_name;

-- Drop the function
DROP FUNCTION IF EXISTS update_next_chapter_id();

alter table "public"."chapters" alter column "info" set not null;

alter table "public"."chapters" alter column "description" set not null;

alter table "public"."chapters" drop constraint "chapters_resources_key";