
ALTER TABLE "public"."user_course" ALTER COLUMN "progress" drop default;

-- Remove the trigger
DROP TRIGGER IF EXISTS create_user_course ON users;

-- Remove the function
DROP FUNCTION IF EXISTS add_course_on_user_creation();
