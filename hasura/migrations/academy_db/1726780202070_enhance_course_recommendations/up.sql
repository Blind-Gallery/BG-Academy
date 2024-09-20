
ALTER TABLE
course_recommendations
RENAME COLUMN social TO twitter;

ALTER TABLE
course_recommendations
ADD COLUMN farcaster TEXT;
alter table "public"."course_recommendations" alter column "twitter" drop not null;

INSERT INTO "public"."course_recommendations"("quote", "twitter", "name", "role", "pfp", "course_id", "id", "farcaster") VALUES (E'I\'ve been using shaders to create generative art for a few years, and I can say this course is a great resource to learn fragment shaders if you want to get started.', E'https://x.com/camillerouxart', E'Camille Roux', E'Artist', E'https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=336/https%3A%2F%2Fi.imgur.com%2FKIWqYJC.jpg', E'5f1f6044-21ba-4409-880e-02cd36568697', E'7eb7c0c7-8200-465b-9f76-79f4b377d325', E'https://warpcast.com/camilleroux');
