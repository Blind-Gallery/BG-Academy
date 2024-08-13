INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Map', E'528a7b25-0046-46b0-a174-2d22e042a3c7', E'76c83b70-e59f-446a-bf31-8a96b6eff6f2');

UPDATE questions SET answer_id = '528a7b25-0046-46b0-a174-2d22e042a3c7' WHERE id = '76c83b70-e59f-446a-bf31-8a96b6eff6f2';