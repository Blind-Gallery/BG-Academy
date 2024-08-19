CREATE OR REPLACE FUNCTION update_answer_id()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if the inserted or updated question_option is marked as correct
    IF NEW.is_correct THEN
        -- Update the answer_id in the questions table with the new correct option
        UPDATE questions
        SET answer_id = NEW.id
        WHERE id = NEW.question_id;
    ELSE
        -- If is_correct is set to false, check if the question's answer_id was this option
        IF OLD.is_correct THEN
            -- Find if there are any other correct options for this question
            UPDATE questions
            SET answer_id = (SELECT id FROM question_options WHERE question_id = OLD.question_id AND is_correct LIMIT 1)
            WHERE id = OLD.question_id AND answer_id = OLD.id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
