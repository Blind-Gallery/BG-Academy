
DELETE FROM "public"."course_recommendations" WHERE "id" = '7eb7c0c7-8200-465b-9f76-79f4b377d325';

alter table "public"."course_recommendations" alter column "twitter" set not null;

ALTER TABLE course_recommendations DROP COLUMN farcaster;

ALTER TABLE course_recommendations RENAME COLUMN twitter TO social;