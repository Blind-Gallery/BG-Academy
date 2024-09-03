-- Module 0
-- chapter 1
UPDATE chapters
SET info = E'ilithya introduces the basics of pixel shaders and expresses her excitement about helping viewers get started.'
WHERE id = '3dbd7594-ecd1-487d-a98d-6a915049b455';

-- Module 1
-- chapter 1
UPDATE chapters
SET info = E'In this chapter, ilithya explains what shaders are. Shaders are a set of code implementing algorithms to render pixels on the screen.'
WHERE id = 'b127c9e1-698c-4cd7-a534-c41c87b1893b';

-- chapter 2
UPDATE chapters
SET info = E'In this chapter, ilithya discusses pixel shaders, also known as fragment shaders, which compute the colors of a mesh. As mentioned earlier, you can think of a shader as the "skin" of a graphic.'
WHERE id = '1631e746-0efc-4e49-becb-6a0c6c44a749';

-- chapter 3
UPDATE chapters
SET info = E'In this chapter, ilithya explains that GLSL syntax is based on the C programming language. You can think of it as the grammar used in shader coding.'
WHERE id = 'e7387a97-af99-4976-87b9-6510235c89d8';

-- chapter 4
UPDATE chapters
SET info = E'In this chapter, ilithya explains UV space from the GLSL pixel shader template. UV space maps textures onto graphics and ranges from 0 to 1 on both axes, guiding how to place and manipulate objects in shaders.'
WHERE id = '9c294d3f-4df5-4532-bb81-ce6621b8dc13';

-- chapter 5
UPDATE chapters
SET info = E'In this chapter, ilithya covers UV centering & aspect ratio, using graphics to clarify the equations. You\’ll see how drawing a circle with pixel shaders places it at the origin (0,0) and how adjusting the equation can center it on the screen.'
WHERE id = '5c0eb529-985d-44de-b83d-78360313efae';

-- Module 2
-- chapter 1
UPDATE chapters
SET info = E'In this chapter, ilithya introduces the RGB color model. Additive color theory (used in screens) combines light to create colors, while subtractive color theory (used in printing) relies on pigments. For pixel shaders, we use the RGB model since screens emit light.'
WHERE id = 'ea905e11-a99c-4148-8705-338779763f35';

-- chapter 2
UPDATE chapters
SET info = E'In this chapter, ilithya explains how to create luminosity gradients. After creating a simple block of color, we explore gradients, which involve varying color intensity from light to dark.'
WHERE id = 'e22d8840-239e-42c9-b6f7-dbc76a656b1a';

-- chapter 3
UPDATE chapters
SET info = E'In this chapter, ilithya explores saturation continuum gradients. Unlike luminosity gradients, saturation continuum gradients involve blending fully saturated colors. For example, blending red and blue results in a gradient that transitions between solid colors.'
WHERE id = '40cbea88-12fd-4e7f-a374-6cf8440d9603';

-- Module 3
-- chapter 1
UPDATE chapters
SET info = E'In this chapter, ilithya discusses manipulating pixels on the screen to create shapes. Think of pixels as malleable, like clay, which can be shaped into circles, triangles, or squares.'
WHERE id = 'e982fbb2-7c2b-48a8-969b-7d7fbcc313f4';

-- chapter 2,3,4
UPDATE chapters
SET info = E'In this chapter, ilithya introduces drawing a circle. We\'ll apply mathematical principles to draw a circle in the shader, similar to math exercises you did in school but applied through code.'
WHERE id IN ('0e6008a4-5402-41ad-bec4-7d4237e46400', '974053b1-077c-4fca-bc2c-131c9bc5fcb5', '3c0d4bf4-bd5d-4bb6-bf58-730e0d242ce6');

-- chapter 5,6
UPDATE chapters
SET info = E'In this chapter, ilithya demonstrates how to draw a square or rectangle. This involves applying similar principles used for drawing a circle but adapted to create a different geometry.'
WHERE id IN ('e7a4c97a-619e-4cda-9d9f-fb080a6bd23b','b57e8b32-780f-47e5-9a9d-3a12ee6a7fd6');

-- chapter 7
UPDATE chapters
SET info = E'In this chapter, ilithya guides you through drawing a triangle. This step will help you become more comfortable with using mathematics to create various shapes in shaders.'
WHERE id = '899ecea6-9c2d-4779-9677-81057dafbb72';

-- chapter 8
UPDATE chapters
SET info = E'In this chapter, ilithya explains how to draw a ring. To achieve this, we\'ll build on our knowledge of drawing circles, adjusting our approach to create a ring shape.'
WHERE id = '04847452-264b-4bed-be37-ac2ce8b7c316';

-- Module 4
-- chapter 1
UPDATE chapters
SET info = E'In this chapter, ilithya introduces repeating space. We\’ll learn how to clone shapes and create patterns by replicating them within the available screen space.'
WHERE id = '5fc650d0-8c74-4454-90fd-bf169dd740f5';

-- chapter 2, 3
UPDATE chapters
SET info = E'In this chapter, ilithya covers linear repetition. We\’ll explore how to implement linear patterns by copying shapes and arranging them in a line.'
WHERE id IN ('4651437f-2d0a-4b0c-9fb3-0cbcf517775d', '83f27b85-5e10-4429-a9fc-6e04c8b9a6d2');

-- chapter 4
UPDATE chapters
SET info = E'In this chapter, ilithya explains grid repetition. Unlike linear repetition, grid repetition involves arranging shapes in a grid pattern.'
WHERE id = '6156514a-9bb8-4b88-bbe7-117641d5ae28';

-- chapter 5
UPDATE chapters
SET info = E'In this chapter, ilithya explores mixed repetition. We\’ll combine linear and grid patterns to create complex designs.'
WHERE id = '1c3463e5-8774-46b2-9b41-8b6c85fb2650';

-- Module 5
-- chapter 1
UPDATE chapters
SET info = E'In this chapter, ilithya introduces using a time clock to animate patterns. We\’ll learn how to create motion in pixel shaders using a time uniform.'
WHERE id = '22560dcf-970c-4e46-8a8c-c8cdc4dcb5ff';

-- chapter 2,3
UPDATE chapters
SET info = E'In this chapter, ilithya covers trigonometry for adding effects like waves. We\’ll use sine and cosine functions to create dynamic patterns.'
WHERE id IN ('c33a7b2f-e979-4247-888a-da13f03a3b06','cd1f2792-0139-4e4b-b72d-0c1f0b6bcb43');

-- Module 6
-- chapter 1
UPDATE chapters
SET info = E'ilithya concludes the course, hoping you now feel confident in creating pixel shaders. You should be ready to design illustrations, apply gradients, and experiment with patterns and colors.'
WHERE id = 'b2b58372-1a97-42b5-ac2e-c04a52fe841a';
