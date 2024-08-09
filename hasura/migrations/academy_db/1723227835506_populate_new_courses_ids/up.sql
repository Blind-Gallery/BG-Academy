UPDATE modules
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = modules.course_id
);

UPDATE user_course
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = user_course.course_id
);

UPDATE payments
SET course_new_id = (
  SELECT new_id
  FROM courses
  WHERE courses.id = payments.course_id
);
