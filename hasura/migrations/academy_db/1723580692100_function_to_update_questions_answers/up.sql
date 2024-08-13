CREATE OR REPLACE FUNCTION update_answer_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the inserted or updated question_option is marked as correct
    IF NEW.is_correct THEN
        -- Update the answer_id in the questions table
        UPDATE questions
        SET answer_id = NEW.id
        WHERE id = NEW.question_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_answer_id
AFTER INSERT OR UPDATE ON question_options
FOR EACH ROW
EXECUTE FUNCTION update_answer_id();
