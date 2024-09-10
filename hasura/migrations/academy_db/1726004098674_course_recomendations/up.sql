
CREATE TABLE "public"."course_recommendations" ("quote" text NOT NULL, "social" text NOT NULL, "name" text NOT NULL, "role" text NOT NULL, "pfp" text NOT NULL, "course_id" text NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), PRIMARY KEY ("id") , FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON UPDATE cascade ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO "public"."course_recommendations"("quote", "social", "name", "role", "pfp", "course_id", "id") VALUES (E'ilithya’s course starts from the beginning, providing a newcomer to shaders (🙋🏻‍♂️) an opportunity to build a solid foundation for the future. ilithya provides very easy-to-understand explanations that have been difficult for me to grasp in the past.\n\n Highly recommend this course!\'', E'https://x.com/richardegil', E'Richard Gil', E'Artist/Developer/Designer', E'https://pbs.twimg.com/profile_images/1060707742585892865/s1CoTb3p_400x400.jpg', E'5f1f6044-21ba-4409-880e-02cd36568697', E'85dd2b28-98f0-454d-8017-856fd4760191');
