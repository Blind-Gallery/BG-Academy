-- Remove the trigger
DROP TRIGGER IF EXISTS update_next_module_trigger ON your_other_table_name;

-- Remove the function
DROP FUNCTION IF EXISTS update_next_module_id();
