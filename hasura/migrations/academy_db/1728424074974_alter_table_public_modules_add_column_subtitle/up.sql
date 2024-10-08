alter table "public"."modules" add column "subtitle" text
 null;


-- Update subtitles for countable modules using IDs (storing only "Module #")
UPDATE "public"."modules"
SET "subtitle" = 'Module 1'
WHERE "id" = '86bc521b-42de-476f-a738-cf7dcb4bcb6d';

UPDATE "public"."modules"
SET "subtitle" = 'Module 2'
WHERE "id" = '28e8a011-ad3b-4f2f-8687-ce17485c434d';

UPDATE "public"."modules"
SET "subtitle" = 'Module 3'
WHERE "id" = 'ba883c86-a829-4df4-832a-acd10f0adf97';

UPDATE "public"."modules"
SET "subtitle" = 'Module 4'
WHERE "id" = '8efe00aa-57ad-4498-bc39-bb86c1743f42';

UPDATE "public"."modules"
SET "subtitle" = 'Module 5'
WHERE "id" = '466b727c-f5fa-402c-a9e6-e34317c54fcd';