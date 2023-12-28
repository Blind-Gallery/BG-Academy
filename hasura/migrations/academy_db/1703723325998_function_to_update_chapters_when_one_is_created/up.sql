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
