-- Drop the trigger associated with updating the answer_id
DROP TRIGGER IF EXISTS trigger_update_answer_id ON question_options;

-- Drop the function that updates the answer_id
DROP FUNCTION IF EXISTS update_answer_id();
