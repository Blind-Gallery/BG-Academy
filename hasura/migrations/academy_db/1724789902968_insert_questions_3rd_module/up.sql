---- Create questions for the 3rd module
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Which platform, launched in 2001 by Casey Reas and Ben Fry, revolutionized generative art by providing a simple programming language and integrated development environment for visual arts?', null, E'af8c2737-c81f-42be-b78a-d06bf6038dab', E'4674105d-8dca-49d6-a705-512e66db9dfd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Net.art.', E'7a8ddff3-39a6-463e-b935-cd47190f74b3', E'af8c2737-c81f-42be-b78a-d06bf6038dab');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Processing.', E'b63705bc-9c71-4c3b-b952-7733a1dce4dc', E'af8c2737-c81f-42be-b78a-d06bf6038dab');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Demoscene.', E'3d3e24ac-7865-416b-987c-18af527bb043', E'af8c2737-c81f-42be-b78a-d06bf6038dab');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'p5.js.', E'2def4879-f5ff-4750-bd3e-3acf7803fd00', E'af8c2737-c81f-42be-b78a-d06bf6038dab');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'What subculture in the early 2000s focused on creating real-time audiovisual demos that pushed the limits of computer hardware and software?', null, E'f9fad854-0356-4aba-acd9-276cd06c705b', E'4674105d-8dca-49d6-a705-512e66db9dfd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Net.art.', E'1e3ad354-42a0-4982-94e2-ab3b0351f982', E'f9fad854-0356-4aba-acd9-276cd06c705b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Demoscene.', E'0dbecb05-2dda-4227-b629-c2727e5940d0', E'f9fad854-0356-4aba-acd9-276cd06c705b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Generative. Design', E'4a20cdf0-fb2e-4126-a1ed-5c30e19689dc', E'f9fad854-0356-4aba-acd9-276cd06c705b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Digital Minimalism.', E'6a5072e4-0a9b-4be7-8f2f-2464b2d662e0', E'f9fad854-0356-4aba-acd9-276cd06c705b');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Who is the artist known for creating the "Fidenza" series, a seminal work in long-form generative art?', null, E'2743868c-bdc3-4a5f-91d1-f1efd5146cd2', E'4674105d-8dca-49d6-a705-512e66db9dfd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Dmitri Cherniak.', E'34712719-e197-47b2-80f7-3d21ef1a9073', E'2743868c-bdc3-4a5f-91d1-f1efd5146cd2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Emily Xie.', E'6c792f32-01bb-4b87-a7e9-b5a8e98ddf1f', E'2743868c-bdc3-4a5f-91d1-f1efd5146cd2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Tyler Hobbs.', E'a50de4f5-9325-41b4-b003-b779fc4c5c3e', E'2743868c-bdc3-4a5f-91d1-f1efd5146cd2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Monica Rizzolli.', E'31651f82-bfc7-4b8a-a654-70ee66ea78e6', E'2743868c-bdc3-4a5f-91d1-f1efd5146cd2');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Which project, created by Snowfro, combines generative mechanics, pop art aesthetics, and blockchain distribution to symbolize the potential of long-form generative art?', null, E'49fdd3cc-4cb4-4020-becd-7c58382c6434', E'4674105d-8dca-49d6-a705-512e66db9dfd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Chromie Squiggles.', E'b299c770-011a-4362-b2bb-11869ef8d6a4', E'49fdd3cc-4cb4-4020-becd-7c58382c6434');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Memories of Qilin.', E'e663ddf2-7274-4f23-b658-88cee6aec17a', E'49fdd3cc-4cb4-4020-becd-7c58382c6434');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Meridian.', E'69f25f7a-7404-491b-ac6d-53b4b3a2709c', E'49fdd3cc-4cb4-4020-becd-7c58382c6434');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Fragments of an Infinite Field.', E'00fc077f-4058-4032-9559-66e48856654b', E'49fdd3cc-4cb4-4020-becd-7c58382c6434');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Which artist, known for their work with "Fake it till you make it," explores the aesthetics and culture of the internet?', null, E'de54ee2d-3893-402c-b9aa-8ad555dcdb4b', E'4674105d-8dca-49d6-a705-512e66db9dfd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Matt DesLauriers.', E'f45f21fc-dadc-4136-87c5-f72c653c654e', E'de54ee2d-3893-402c-b9aa-8ad555dcdb4b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Golan Levin.', E'21a3edab-ab98-4d7b-b8ff-71df81167217', E'de54ee2d-3893-402c-b9aa-8ad555dcdb4b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Maya Man.', E'9bfa76e0-17af-4119-9f1f-5989256b7d8f', E'de54ee2d-3893-402c-b9aa-8ad555dcdb4b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Zach Lieberman.', E'e1178108-589c-4d5c-8eb0-7c26614e6a79', E'de54ee2d-3893-402c-b9aa-8ad555dcdb4b');
