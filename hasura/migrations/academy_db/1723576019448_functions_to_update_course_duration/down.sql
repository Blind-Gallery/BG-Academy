-- Drop the trigger for insert/update on the chapters table
DROP TRIGGER IF EXISTS update_module_and_course_duration_after_insert_update ON chapters;

-- Drop the trigger for delete on the chapters table
DROP TRIGGER IF EXISTS update_module_and_course_duration_after_delete ON chapters;

-- Drop the function for insert/update duration handling
DROP FUNCTION IF EXISTS update_module_and_course_duration_after_insert_update();

-- Drop the function for delete duration handling
DROP FUNCTION IF EXISTS update_module_and_course_duration_after_delete();
