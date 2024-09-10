
alter table "public"."users" add column "customer_id" text
 null;

alter table "public"."courses" add column "sku" text
 null;

---- A History of Generative Art
UPDATE courses
SET sku = 'AHOA'
WHERE id = '9df7cd5f-d9b3-4f37-9693-15ed1be65cf5';

---- Introduction to pixel shaders
UPDATE courses
SET sku = 'IPS'
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';