
DELETE FROM "public"."question_options" WHERE "id" = '75a6d4a6-d5f3-4c1d-bb24-444332e7a737';

DELETE FROM "public"."question_options" WHERE "id" = 'efd837da-03f5-45ce-b186-cb2fe38cb9bd';

DELETE FROM "public"."question_options" WHERE "id" = '42a5dc34-5189-4a21-b55b-8d2b7ce5f2eb';

DELETE FROM "public"."question_options" WHERE "id" = 'cc9525fc-25e4-41e9-9e93-e95205a7ef02';

DELETE FROM "public"."questions" WHERE "id" = 'a3d8e4eb-5f76-4244-9853-c201491d989c';

--- no down migration

-- A SQL block that does nothing
DO $$ 
BEGIN
    -- This is an empty block
END $$;
