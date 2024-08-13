CREATE OR REPLACE FUNCTION update_module_and_course_duration_after_insert_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the module duration
    UPDATE modules
    SET duration = (
        SELECT COALESCE(SUM(duration), 0)
        FROM chapters
        WHERE module_id = NEW.module_id
    )
    WHERE id = NEW.module_id;

    -- Update the course duration
    UPDATE courses
    SET duration = (
        SELECT COALESCE(SUM(m.duration), 0)
        FROM modules m
        WHERE m.course_id = (
            SELECT course_id
            FROM modules
            WHERE id = NEW.module_id
        )
    )
    WHERE id = (
        SELECT course_id
        FROM modules
        WHERE id = NEW.module_id
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_module_and_course_duration_after_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the module duration
    UPDATE modules
    SET duration = (
        SELECT COALESCE(SUM(duration), 0)
        FROM chapters
        WHERE module_id = OLD.module_id
    )
    WHERE id = OLD.module_id;

    -- Update the course duration
    UPDATE courses
    SET duration = (
        SELECT COALESCE(SUM(m.duration), 0)
        FROM modules m
        WHERE m.course_id = (
            SELECT course_id
            FROM modules
            WHERE id = OLD.module_id
        )
    )
    WHERE id = (
        SELECT course_id
        FROM modules
        WHERE id = OLD.module_id
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_module_and_course_duration_after_insert_update
AFTER INSERT OR UPDATE ON chapters
FOR EACH ROW
EXECUTE FUNCTION update_module_and_course_duration_after_insert_update();

CREATE TRIGGER update_module_and_course_duration_after_delete
AFTER DELETE ON chapters
FOR EACH ROW
EXECUTE FUNCTION update_module_and_course_duration_after_delete();
