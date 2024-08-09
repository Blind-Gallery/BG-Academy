ALTER TABLE modules
DROP COLUMN course_id;

ALTER TABLE modules
RENAME COLUMN course_new_id TO course_id;

ALTER TABLE user_course
DROP COLUMN course_id;

ALTER TABLE user_course
RENAME COLUMN course_new_id TO course_id;

ALTER TABLE payments
DROP COLUMN course_id;

ALTER TABLE payments
RENAME COLUMN course_new_id TO course_id;