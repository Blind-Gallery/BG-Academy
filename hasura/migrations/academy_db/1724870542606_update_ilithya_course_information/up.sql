---- update options for chapter 3
UPDATE question_options
SET text = E'Objective-C'
WHERE id = 'ca5c3603-ebcf-4e93-80cf-300eb7aeccc2';

UPDATE question_options
SET text = E'Curl'
WHERE id = 'd034a826-8568-423a-bb59-c44d6bfed59b';

UPDATE question_options
SET text = E'C'
WHERE id = '6d59b061-e439-4c62-8608-a90a3081cb8b';

UPDATE question_options
SET text = E'JavaScript'
WHERE id = 'ae795883-c479-497f-9e73-425f66802ce5';

UPDATE question_options
SET text = E'highp'
WHERE id = '3c6abc05-7936-400d-8215-621b62283f62';

UPDATE question_options
SET text = E'abs()'
WHERE id = 'ed34da57-0c51-4c8b-a584-5ee113445efc';

UPDATE question_options
SET text = E'bool'
WHERE id = '24bce739-afbc-4261-aff7-219c6a12f57f';

UPDATE question_options
SET text = E'cos()'
WHERE id = '8cf672a0-4612-46a0-a4c7-58f2137d11c1';

---- update thumbnail video of ilithya course
UPDATE courses
SET thumbnail_video = E'1003674865'
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';