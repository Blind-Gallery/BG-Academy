
alter table "public"."courses" add column "visible" boolean
 null default 'true';

alter table "public"."courses" add column "release_date" timestamptz
 null;

alter table "public"."courses" add column "discount_price" numeric
 null;

---- ilithya course
UPDATE courses
SET discount_price = 75
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';

UPDATE courses
SET price = 99
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';

UPDATE courses
SET release_date = '2024-09-03T18:00:00.075383+01:00'
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';

---- heeey course
UPDATE courses
SET visible = false
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';

UPDATE courses
SET discount_price = 40
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';

UPDATE courses
SET price = 50
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';


---- 