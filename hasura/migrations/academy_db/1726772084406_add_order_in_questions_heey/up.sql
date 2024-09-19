
-- What is generative art?
UPDATE questions
SET priority = 1
WHERE id = 'd190d41a-b6ae-41a2-bd6f-00481e9002a0';

-- Which style of generative art draws inspiration from natural ...
UPDATE questions
SET priority = 2
WHERE id = '95390883-1a17-406b-87c8-679af4dba456';

-- What is a defining feature of generative art?
UPDATE questions
SET priority = 3
WHERE id = '9a572d3b-2f65-4bc0-84b5-9b2f0729ee1c';

-- How do NFTs relate to generative art?
UPDATE questions
SET priority = 4
WHERE id = 'c1b7a959-3fa9-493b-a804-e0e5a59ea68f';

-- What distinguishes generative AI art from generative art?
UPDATE questions
SET priority = 5
WHERE id = '3817ebd1-a481-4e59-b510-a84cd2d2e333';

-- Who is credited with creating the earliest form of electronic art...
UPDATE questions
SET priority = 6
WHERE id = '54c6666b-eabc-4dbb-b3db-215cf1bfb02a';

-- What did the Surrealists emphasize that laid the groundwork
UPDATE questions
SET priority = 7
WHERE id = '2ca666af-fccf-480b-8916-a6272270ca86';

-- Who coined the term "Algorists" and what does
UPDATE questions
SET priority = 8
WHERE id = '5b0720f3-0eb0-4be9-9e9e-fae8eedf70a7';

-- Which artist is known for the creation of the AARON program, a system designed
UPDATE questions
SET priority = 9
WHERE id = 'f711d2d3-1505-45e0-a569-105fa9424bf7';

-- Which artist is known for creating the series "Des Ordres," exploring
UPDATE questions
SET priority = 10
WHERE id = 'e464aa98-3890-4b0d-951c-3b6258fab660';

-- Which platform, launched in 2001 by Casey Reas and Ben Fry, revolutionized 
UPDATE questions
SET priority = 11
WHERE id = 'af8c2737-c81f-42be-b78a-d06bf6038dab';

-- What subculture in the early 2000s focused on creating real-time
UPDATE questions
SET priority = 12
WHERE id = 'f9fad854-0356-4aba-acd9-276cd06c705b';

-- new question
-- Based on the text, which of the following disciplines has been significantly
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'Based on the text, which of the following disciplines has been significantly impacted by generative art?', 
null, 
E'23076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'4674105d-8dca-49d6-a705-512e66db9dfd',13);

INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Architecture.',
 E'5b76067b-5c17-447e-b9b3-91fb4e98c079', 
 E'23076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Design.',
 E'6b76067b-5c17-447e-b9b3-91fb4e98c079', 
 E'23076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Fashion.',
 E'7b76067b-5c17-447e-b9b3-91fb4e98c079', 
 E'23076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (true, E'All of the above.',
 E'8b76067b-5c17-447e-b9b3-91fb4e98c079', 
 E'23076fe5-8d6e-463b-b793-76ba7c0bd2d6');

-- new question
-- Which creative coder is primarily known for their teachings on the YouTube
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'Which creative coder is primarily known for their teachings on the YouTube channel “The Coding Train”?', 
null, 
E'25076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'4674105d-8dca-49d6-a705-512e66db9dfd',14);

INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (true, E'Daniel Shiffman.',
 E'9b80067b-5c17-447e-b9b3-91fb4e98c079', 
 E'25076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Lauren Lee McCarthy.',
 E'9b79067b-5c17-447e-b9b3-91fb4e98c079', 
 E'25076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Golan Levin.',
 E'9b78067b-5c17-447e-b9b3-91fb4e98c079', 
 E'25076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Casey Reas.',
 E'9b77067b-5c17-447e-b9b3-91fb4e98c079', 
 E'25076fe5-8d6e-463b-b793-76ba7c0bd2d6');

-- new question
-- Which artist has been creating code-based sketches on a daily basis for 10 years?
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'Which artist has been creating code-based sketches on a daily basis for 10 years?', 
null,
E'26076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'4674105d-8dca-49d6-a705-512e66db9dfd',15);

INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Herbert Franke.',
 E'9b87067b-5c17-447e-b9b4-91fb4e98c079', 
 E'26076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Marius Watz.',
 E'9b84067b-5c17-447e-b9b3-91fb4e98c079', 
 E'26076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (true, E'Zach Lieberman.',
 E'9b81067b-5c17-447e-b9b3-91fb4e98c079', 
 E'26076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Ben Fry.',
 E'9b81068b-5c17-447e-b9b3-91fb4e98c079', 
 E'26076fe5-8d6e-463b-b793-76ba7c0bd2d6');



-- new
-- Which is widely considered to be the first blockchain 
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'Which is widely considered to be the first blockchain project to introduce the concept of unique collectable digital assets?', 
null, 
E'56076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'c5a014db-7995-4cb6-8514-2377f5d47988',16);

INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Autoglyphs.',
 E'5c18067b-5c17-447e-b9b4-91fb4e98c079', 
 E'56076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (true, E'Cryptokitties.',
 E'5c17067b-5c17-447e-b9b4-91fb4e98c079', 
 E'56076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Cryptopunks.',
 E'5c19067b-5c17-447e-b9b4-91fb4e98c079', 
 E'56076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("is_correct","text", "id", "question_id") 
VALUES (false, E'Bored Ape Yacht Club.',
 E'5c19067b-5c17-447e-b9b4-91fb4e98c079', 
 E'56076fe5-8d6e-463b-b793-76ba7c0bd2d6');

-- new
-- Which blockchain platform was favored by artists seeking 
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'Which blockchain platform was favored by artists seeking a more affordable and experimental environment for releasing generative art?', 
E'7c17067b-5c17-447e-b9b4-91fb4e98c079', 
E'66076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'c5a014db-7995-4cb6-8514-2377f5d47988',17);
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'Cardano.',
 E'7c18067b-5c17-447e-b9b4-91fb4e98c079', 
 E'66076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'Tezos.',
 E'7c17067b-5c17-447e-b9b4-91fb4e98c079', 
 E'66076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'Ethereum.',
 E'7c19067b-5c17-447e-b9b4-91fb4e98c079', 
 E'66076fe5-8d6e-463b-b793-76ba7c0bd2d6');
 INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'Binance Smart Chain.',
 E'7c18057b-5c17-447e-b9b4-91fb4e98c079', 
 E'66076fe5-8d6e-463b-b793-76ba7c0bd2d6');



-- Who is the artist known for creating the "Fidenza"
UPDATE questions
SET priority = 18, module_id = 'c5a014db-7995-4cb6-8514-2377f5d47988'
WHERE id = '2743868c-bdc3-4a5f-91d1-f1efd5146cd2';


-- What is the primary purpose of the dragons in William Mapan'
INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id","priority") 
VALUES (
E'What is the primary purpose of the dragons in William Mapan\'s work?', 
E'8c17067b-5c17-447e-b9b4-91fb4e98c079', 
E'88076fe5-8d6e-463b-b793-76ba7c0bd2d6', E'c5a014db-7995-4cb6-8514-2377f5d47988',19);
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'To serve as mere decorative pieces.',
 E'8c10067b-5c17-447e-b9b4-91fb4e98c079', 
 E'88076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'To explore the concept of posthuman form and liberation.',
 E'8c17067b-5c17-447e-b9b4-91fb4e98c079', 
 E'88076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'To represent traditional dragon mythology.',
 E'8c10267b-5c17-447e-b9b4-91fb4e98c079', 
 E'88076fe5-8d6e-463b-b793-76ba7c0bd2d6');
INSERT INTO "public"."question_options"("text", "id", "question_id") 
VALUES (E'To create a digital currency system.',
 E'8c10367b-5c17-447e-b9b4-91fb4e98c079', 
 E'88076fe5-8d6e-463b-b793-76ba7c0bd2d6');

-- Which project, created by Snowfro, combines generative mechanics,
UPDATE questions
SET priority = 20, module_id = 'c5a014db-7995-4cb6-8514-2377f5d47988'
WHERE id = '49fdd3cc-4cb4-4020-becd-7c58382c6434';
