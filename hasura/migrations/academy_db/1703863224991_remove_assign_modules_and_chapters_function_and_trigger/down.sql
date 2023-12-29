DROP TRIGGER IF EXISTS create_user_course ON users;

DROP TRIGGER IF EXISTS assign_modules_and_chapters ON user_course;
DROP FUNCTION IF EXISTS create_modules_and_chapters_for_user();


-- Remove the trigger
DROP TRIGGER IF EXISTS create_user_course ON users;

-- Remove the function
DROP FUNCTION IF EXISTS add_course_on_user_creation();


CREATE OR REPLACE FUNCTION add_course_on_user_creation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_course (user_id, course_id, last_chapter_id_seen)
    VALUES (NEW.id, 1, NULL);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_course
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION add_course_on_user_creation();

alter table "public"."user_course" alter column "progress" set default '0';

CREATE OR REPLACE FUNCTION create_modules_and_chapters_for_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_module (user_id, module_id)
    SELECT NEW.user_id, modules.id
    FROM modules
    WHERE modules.course_id = NEW.course_id;
    
    INSERT INTO user_chapter (user_id, chapter_id)
    SELECT NEW.user_id, chapters.id
    FROM chapters
    WHERE chapters.module_id IN (SELECT id FROM modules WHERE course_id = NEW.course_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER assign_modules_and_chapters
AFTER INSERT ON user_course
FOR EACH ROW
EXECUTE FUNCTION create_modules_and_chapters_for_user();
