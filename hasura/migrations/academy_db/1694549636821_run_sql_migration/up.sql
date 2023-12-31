DROP TRIGGER IF EXISTS assign_modules_and_chapters ON user_course;
DROP FUNCTION IF EXISTS create_modules_and_chapters_for_user();

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


DROP TRIGGER IF EXISTS assign_last_chapter ON user_course;
DROP FUNCTION IF EXISTS assign_last_chapter_id();


-- Crea la función para asignar last_chapter_id_seen
CREATE OR REPLACE FUNCTION assign_last_chapter_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Encuentra el chapter_id cuyo previous_chapter_id es nulo
    SELECT chapter_id INTO NEW.last_chapter_id_seen
    FROM chapters
    WHERE previous_chapter_id IS NULL
    AND module_id = (
        SELECT module_id FROM modules
        WHERE course_id = NEW.course_id
        ORDER BY module_id ASC
        LIMIT 1
    );

    -- Si no se encuentra un chapter_id adecuado, asignar NULL a last_chapter_id_seen
    IF NEW.last_chapter_id_seen IS NULL THEN
        NEW.last_chapter_id_seen := NULL;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crea el trigger para asignar last_chapter_id_seen cuando se inserta un nuevo registro en usuario_curso
CREATE TRIGGER assign_last_chapter
BEFORE INSERT ON user_course
FOR EACH ROW
EXECUTE FUNCTION assign_last_chapter_id();
