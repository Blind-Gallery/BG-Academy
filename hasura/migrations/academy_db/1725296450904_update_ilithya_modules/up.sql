---- ilithya modules
-- welcome
UPDATE modules
SET description = 'ilithya introduces the basics of pixel shaders and expresses her excitement about helping viewers get started.'
WHERE id = 'a6a98f91-6bf6-4795-98b0-33822993a960';

-- basics
UPDATE modules
SET description = 'In this module, ilithya explains shaders as algorithms for rendering 3D graphics, likening them to materials or skin.'
WHERE id = '86bc521b-42de-476f-a738-cf7dcb4bcb6d';

-- colors
UPDATE modules
SET description = 'In this module, ilithya covers color, essential for pixel shaders. She contrasts additive color theory used in screens with subtractive color theory for printed materials.'
WHERE id = '28e8a011-ad3b-4f2f-8687-ce17485c434d';

-- geometries
UPDATE modules
SET description = 'In this module, ilithya explores geometries, encouraging you to think of them as malleable like clay. Using GLSL, you can manipulate pixels to create and shape 2D forms, such as circles or squares.'
WHERE id = 'ba883c86-a829-4df4-832a-acd10f0adf97';

-- patterns
UPDATE modules
SET description = 'In this module, ilithya delves into patterns, extending the concept of bending space to include creating patterns through repetition. By cloning shapes within the available screen space, you can add complexity and design to your shaders.'
WHERE id = '8efe00aa-57ad-4498-bc39-bb86c1743f42';

-- motion
UPDATE modules
SET description = 'In this module, ilithya introduces animation in patterns by modifying color variables. Building on RGB color, geometries, and repetition, you’ll learn how to create motion in pixel shaders, such as the moving lines in the example pattern.'
WHERE id = '466b727c-f5fa-402c-a9e6-e34317c54fcd';

-- goodbye
UPDATE modules
SET description = 'ilithya concludes the course, hoping you now feel confident in creating pixel shaders. You should be ready to design illustrations, apply gradients, and experiment with patterns and colors.'
WHERE id = 'dafb0e22-8aac-4098-aab4-100beafef5fa';