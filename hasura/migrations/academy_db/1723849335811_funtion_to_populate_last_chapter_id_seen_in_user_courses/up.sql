CREATE OR REPLACE FUNCTION set_first_chapter_on_user_course()
RETURNS TRIGGER AS $$
DECLARE
    first_module_id UUID;
    first_chapter_id UUID;
BEGIN
    -- Find the first module of the course (the one without a previous_module_id)
    SELECT id INTO first_module_id
    FROM modules
    WHERE course_id = NEW.course_id AND previous_module_id IS NULL
    LIMIT 1;

    -- Find the first chapter of the first module (the one without a previous_chapter_id)
    SELECT id INTO first_chapter_id
    FROM chapters
    WHERE module_id = first_module_id AND previous_chapter_id IS NULL
    LIMIT 1;

    -- Update last_chapter_id_seen with the first chapter's id
    UPDATE user_course
    SET last_chapter_id_seen = first_chapter_id
    WHERE user_id = NEW.user_id AND course_id = NEW.course_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_first_chapter_on_user_course
AFTER INSERT ON user_course
FOR EACH ROW
EXECUTE FUNCTION set_first_chapter_on_user_course();
