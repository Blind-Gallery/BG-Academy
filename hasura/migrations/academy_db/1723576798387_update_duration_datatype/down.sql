-- Step 1: Remove the default value from the duration column in each table
ALTER TABLE chapters
ALTER COLUMN duration DROP DEFAULT;

ALTER TABLE modules
ALTER COLUMN duration DROP DEFAULT;

ALTER TABLE courses
ALTER COLUMN duration DROP DEFAULT;

-- Step 2: Change the duration column from INT back to TEXT
ALTER TABLE chapters
ALTER COLUMN duration TYPE TEXT USING duration::TEXT;

ALTER TABLE modules
ALTER COLUMN duration TYPE TEXT USING duration::TEXT;

ALTER TABLE courses
ALTER COLUMN duration TYPE TEXT USING duration::TEXT;

-- Step 3: (Optional) Reapply a default value if necessary, here assuming '0' as default
ALTER TABLE chapters
ALTER COLUMN duration SET DEFAULT '0';

ALTER TABLE modules
ALTER COLUMN duration SET DEFAULT '0';

ALTER TABLE courses
ALTER COLUMN duration SET DEFAULT '0';
