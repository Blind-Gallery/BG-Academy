-- Drop the trigger associated with setting the first chapter as last_chapter_id_seen
DROP TRIGGER IF EXISTS trigger_set_first_chapter_on_user_course ON user_course;

-- Drop the function that sets the first chapter as last_chapter_id_seen
DROP FUNCTION IF EXISTS set_first_chapter_on_user_course();
