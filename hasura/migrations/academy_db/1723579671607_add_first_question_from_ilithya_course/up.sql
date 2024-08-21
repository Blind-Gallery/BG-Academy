
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'A shader in WebGL is also known as a mesh', null, E'76c83b70-e59f-446a-bf31-8a96b6eff6f2', E'86bc521b-42de-476f-a738-cf7dcb4bcb6d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Curve', E'8e2762dc-77a7-4e01-984f-a5e156eba3cb', E'76c83b70-e59f-446a-bf31-8a96b6eff6f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'UV', E'e6b0d171-515b-4308-b334-cdd69f1ee51a', E'76c83b70-e59f-446a-bf31-8a96b6eff6f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Material', E'01cc3ca4-dc0e-4c1d-bd02-683f15e24cde', E'76c83b70-e59f-446a-bf31-8a96b6eff6f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Map', E'528a7b25-0046-46b0-a174-2d22e042a3c7', E'76c83b70-e59f-446a-bf31-8a96b6eff6f2');

UPDATE questions SET answer_id = '528a7b25-0046-46b0-a174-2d22e042a3c7' WHERE id = '76c83b70-e59f-446a-bf31-8a96b6eff6f2';