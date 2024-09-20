UPDATE courses
SET release_date = null
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';

-- "Which artist, known for their work with \"Fake it till you make it,\"...
UPDATE questions
SET priority = 0
WHERE id = 'de54ee2d-3893-402c-b9aa-8ad555dcdb4b';

-- show course flag
UPDATE courses
SET visible = false
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';