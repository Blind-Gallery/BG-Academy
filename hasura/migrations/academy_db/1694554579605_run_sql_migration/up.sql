DROP TRIGGER IF EXISTS assign_last_chapter ON user_course;
DROP FUNCTION IF EXISTS assign_last_chapter_id();

CREATE OR REPLACE FUNCTION assign_last_chapter_id()
RETURNS TRIGGER AS $$
BEGIN
    SELECT id INTO NEW.last_chapter_id_seen
    FROM chapters
    WHERE previous_chapter_id IS NULL
    AND module_id = (
        SELECT module_id FROM modules
        WHERE course_id = NEW.course_id
        ORDER BY module_id ASC
        LIMIT 1
    );

    IF NEW.last_chapter_id_seen IS NULL THEN
        NEW.last_chapter_id_seen := NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_last_chapter
BEFORE INSERT ON user_course
FOR EACH ROW
EXECUTE FUNCTION assign_last_chapter_id();
