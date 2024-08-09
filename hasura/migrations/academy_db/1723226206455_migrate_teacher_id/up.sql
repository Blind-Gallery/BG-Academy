ALTER TABLE courses
DROP COLUMN teacher_id;

ALTER TABLE courses
RENAME COLUMN teacher_new_id TO teacher_id;