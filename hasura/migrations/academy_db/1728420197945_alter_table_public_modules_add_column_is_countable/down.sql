-- Down Migration: Revert by dropping the is_countable column
ALTER TABLE "public"."modules" 
DROP COLUMN "is_countable";
