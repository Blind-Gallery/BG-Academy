
-- Remove the trigger
DROP TRIGGER IF EXISTS create_user_course ON users;

-- EXECUTE FUNCTION create_modules_and_chapters_for_user();
DROP TRIGGER IF EXISTS assign_modules_and_chapters ON user_course;
DROP FUNCTION IF EXISTS create_modules_and_chapters_for_user();
