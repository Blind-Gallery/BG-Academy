CREATE OR REPLACE FUNCTION add_course_on_user_creation()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_course (user_id, course_id, last_chapter_id_seen)
    VALUES (NEW.user_id, 1, NULL);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_user_course
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION add_course_on_user_creation();
