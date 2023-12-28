CREATE OR REPLACE FUNCTION update_next_module_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Update the next_module_id of the previous module
    UPDATE modules
    SET next_module_id = NEW.id
    WHERE id = NEW.previous_module_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to execute the function after INSERT
CREATE TRIGGER update_next_module_trigger
AFTER INSERT ON modules
FOR EACH ROW
WHEN (NEW.previous_module_id IS NOT NULL)
EXECUTE FUNCTION update_next_module_id();
