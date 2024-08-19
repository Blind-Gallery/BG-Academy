
--- Fixes first question of Ilithya quiz (module 1, question 1)
UPDATE question_options SET is_correct = false WHERE id = '528a7b25-0046-46b0-a174-2d22e042a3c7';

UPDATE question_options SET is_correct = true WHERE id = '76c83b70-e59f-446a-bf31-8a96b6eff6f2';

--- Fixes for module 3
UPDATE question_options SET is_correct = false WHERE id = '82667748-3839-4d86-ad38-d53f1761f03f';

UPDATE question_options SET is_correct = true WHERE id = 'd1dbd325-8197-4a87-a3a5-82508d828a30';
INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'4f0867cc-2c57-4a6a-97a3-a94f71048e74', E'c882d398-8edc-438b-9c4c-9c28c11fea24', E'Vertex shader', true);
