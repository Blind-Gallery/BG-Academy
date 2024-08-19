
UPDATE question_options
SET is_correct = true
WHERE id = '01cc3ca4-dc0e-4c1d-bd02-683f15e24cde';

UPDATE questions 
SET answer_id = '01cc3ca4-dc0e-4c1d-bd02-683f15e24cde'
WHERE id = '76c83b70-e59f-446a-bf31-8a96b6eff6f2';

--- question 1 chapter 3
UPDATE question_options
SET text = 'max() and abs()', is_correct = true
WHERE id = 'da524458-39c2-40ad-8c7e-8bd0d9ee63e6';

UPDATE question_options
SET text = 'mix() and abs()', is_correct = false
WHERE id = '41f17c85-b619-4d1b-8b66-152547e2c32a';

UPDATE question_options
SET text = 'min() and abs()', is_correct = false
WHERE id = '82667748-3839-4d86-ad38-d53f1761f03f';

UPDATE question_options
SET text = 'length() and abs()', is_correct = false
WHERE id = 'd1dbd325-8197-4a87-a3a5-82508d828a30';

INSERT INTO "public"."questions"("id", "module_id", "text", "answer_id") VALUES (E'a3d8e4eb-5f76-4244-9853-c201491d989c', E'ba883c86-a829-4df4-832a-acd10f0adf97', E'The following is an equation to draw a well-defined (sharp) square at the center of the screen with a given normalized screen coordinate system between -0.5 and 0.5 and an aspect ratio:', null);

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = max(abs(uv.x), abs(uv.y));', E'cc9525fc-25e4-41e9-9e93-e95205a7ef02', E'a3d8e4eb-5f76-4244-9853-c201491d989c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float square = step(0.25, max(abs(uv.x), abs(uv.y)));', E'42a5dc34-5189-4a21-b55b-8d2b7ce5f2eb', E'a3d8e4eb-5f76-4244-9853-c201491d989c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = step(0.25, length(abs(uv.x)));', E'efd837da-03f5-45ce-b186-cb2fe38cb9bd', E'a3d8e4eb-5f76-4244-9853-c201491d989c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = step(0.25, min(abs(uv.x), abs(uv.y)));', E'75a6d4a6-d5f3-4c1d-bb24-444332e7a737', E'a3d8e4eb-5f76-4244-9853-c201491d989c');
