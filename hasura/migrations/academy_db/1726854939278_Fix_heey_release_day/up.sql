UPDATE courses
SET release_date = '2024-09-30T16:00:00.075383+00:00'
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';

alter table "public"."questions" alter column "priority" drop not null;

-- remove questions using priority as null
-- "Which artist, known for their work with \"Fake it till you make it,\"...
UPDATE questions
SET priority = null
WHERE id = 'de54ee2d-3893-402c-b9aa-8ad555dcdb4b';

-- show course flag
UPDATE courses
SET visible = true
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';
