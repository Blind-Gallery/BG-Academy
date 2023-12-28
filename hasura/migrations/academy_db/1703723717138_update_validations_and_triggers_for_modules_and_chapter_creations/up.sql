
alter table "public"."chapters" add constraint "chapters_resources_key" unique ("resources");

alter table "public"."chapters" alter column "description" drop not null;

alter table "public"."chapters" alter column "info" drop not null;

CREATE OR REPLACE FUNCTION update_next_chapter_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the next_chapter_id of the previous chapter
    UPDATE chapters
    SET next_chapter_id = NEW.id
    WHERE id = NEW.previous_chapter_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function after INSERT
CREATE TRIGGER update_next_chapter_trigger
AFTER INSERT ON chapters
FOR EACH ROW
WHEN (NEW.previous_chapter_id IS NOT NULL)
EXECUTE FUNCTION update_next_chapter_id();

CREATE OR REPLACE FUNCTION update_next_module_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the next_module_id of the previous module
    UPDATE modules
    SET next_module_id = NEW.id
    WHERE id = NEW.previous_module_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function after INSERT
CREATE TRIGGER update_next_module_trigger
AFTER INSERT ON modules
FOR EACH ROW
WHEN (NEW.previous_module_id IS NOT NULL)
EXECUTE FUNCTION update_next_module_id();

alter table "public"."chapters" alter column "resources" drop not null;
alter table "public"."chapters" drop constraint "chapters_resources_key";
