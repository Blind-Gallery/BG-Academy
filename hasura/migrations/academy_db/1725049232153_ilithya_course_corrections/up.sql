UPDATE courses
SET description = E'"This course is designed for beginners eager to dive into the world of computational thinking and creative coding with pixel shaders, commonly known as fragment shaders, in GLSL. While shaders may initially seem complex, this course will help you see them in a new light. Whether you\'re completely new to shaders or have hesitated to get started, we’re here to guide you through every step.\nShaders don’t have to be intimidating—it’s all about how you approach and interpret them. We’ll turn those initial frustrations into \'aha\' moments, shining a light on what might have seemed like a dark tunnel. Let’s get started on this exciting journey together, and by the end, you’ll be creating shader visual designs with confidence!"'
WHERE id = E'5f1f6044-21ba-4409-880e-02cd36568697';

UPDATE courses
SET onchain_id = 2
WHERE id = '5f1f6044-21ba-4409-880e-02cd36568697';

UPDATE chapters
SET title = 'Course Introduction'
WHERE id = '3dbd7594-ecd1-487d-a98d-6a915049b455';

UPDATE chapters
SET title = 'Course Ending'
WHERE id = 'b2b58372-1a97-42b5-ac2e-c04a52fe841a';

--- this last one needs more context
UPDATE teachers
SET description = E'ilithya is a multidisciplinary artist and technologist with a background in creative development and design from México, based in Germany. She has a B.A. in Marketing and is a self-taught programmer working at the intersection of art and technology. Her preferred medium to produce is shaders in OpenGL Shading Language. In 2016, she began teaching programming and creative coding.'
WHERE id = 'f7b3b3b4-0b3b-4b3b-8b3b-0b3b3b3b3b3b';