UPDATE courses
SET teacher_new_id = (
    SELECT new_id
    FROM teachers
    WHERE teachers.id = courses.teacher_id
);
