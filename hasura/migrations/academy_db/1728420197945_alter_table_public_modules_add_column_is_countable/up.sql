-- Up Migration: Add the is_countable column and update the necessary records
ALTER TABLE "public"."modules" 
ADD COLUMN "is_countable" BOOLEAN NOT NULL DEFAULT 'true';

-- Update the specific modules to be not countable
UPDATE "public"."modules"
SET "is_countable" = false
WHERE "id" IN ('a6a98f91-6bf6-4795-98b0-33822993a960', 'dafb0e22-8aac-4098-aab4-100beafef5fa');
