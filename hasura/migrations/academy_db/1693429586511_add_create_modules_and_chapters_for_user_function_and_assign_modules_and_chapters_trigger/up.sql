CREATE OR REPLACE FUNCTION create_modules_and_chapters_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_module (user_id, module_id)
    SELECT NEW.user_id, modules.id
    FROM modules
    WHERE modules.course_id = NEW.course_id;
    
    INSERT INTO user_chapter (user_id, chapter_id)
    SELECT NEW.user_id, chapters.chapter_id
    FROM chapters
    WHERE chapters.module_id IN (SELECT id FROM modules WHERE course_id = NEW.course_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_modules_and_chapters
AFTER INSERT ON user_course
FOR EACH ROW
EXECUTE FUNCTION create_modules_and_chapters_for_user();
