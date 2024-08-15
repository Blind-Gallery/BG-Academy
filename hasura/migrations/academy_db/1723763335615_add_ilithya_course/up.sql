
INSERT INTO "public"."modules"("duration", "course_id", "description", "title", "you_will_learn", "you_will_learn_title", "created_at", "updated_at", "id", "next_module_id", "previous_module_id") VALUES (0, E'5f1f6044-21ba-4409-880e-02cd36568697', null, E'Color', E'Basic setup of a pixel shader template in GLSL', null, E'2024-08-15T20:15:35.942493+00:00', E'2024-08-15T20:15:35.942493+00:00', E'28e8a011-ad3b-4f2f-8687-ce17485c434d', null, E'86bc521b-42de-476f-a738-cf7dcb4bcb6d');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (978, null, null, E'Wikipedia: Additive Color https://en.wikipedia.org/wiki/Additive_color  Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  Shader Template Gist https://gist.github.com/ilithya/4c4415c013b2d18e6c83bbc34c2e47e8  ColorKit Color Picker https://colorkit.co/color/91eab9/', E'RGB Color Model', E'993310480', E'2024-08-15T20:17:46.239962+00:00', E'2024-08-15T20:17:46.239962+00:00', E'ea905e11-a99c-4148-8705-338779763f35', E'28e8a011-ad3b-4f2f-8687-ce17485c434d', null, null);

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1212, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Luminosity Gradients', E'993312285', E'2024-08-15T20:19:06.826639+00:00', E'2024-08-15T20:19:06.826639+00:00', E'e22d8840-239e-42c9-b6f7-dbc76a656b1a', E'28e8a011-ad3b-4f2f-8687-ce17485c434d', null, E'ea905e11-a99c-4148-8705-338779763f35');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (646, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary https://thebookofshaders.com/glossary/  The Book of Shaders Glossary: mix()  https://thebookofshaders.com/glossary/?search=mix', E'Saturation Continuum Gradients', E'993313186', E'2024-08-15T20:20:18.655412+00:00', E'2024-08-15T20:20:18.655412+00:00', E'40cbea88-12fd-4e7f-a374-6cf8440d9603', E'28e8a011-ad3b-4f2f-8687-ce17485c434d', null, E'e22d8840-239e-42c9-b6f7-dbc76a656b1a');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The RGB color model one can think of to compare when writing pixel aka fragment shaders in GLSL is:', null, E'bb7c86ac-1563-46ad-965e-352fe26a735a', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'8-bit', E'e60eb14f-715e-4a1d-ba72-6245e42926cb', E'bb7c86ac-1563-46ad-965e-352fe26a735a');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Percentage', E'35f9a881-149b-4f5c-96ab-543b79d2c9d1', E'bb7c86ac-1563-46ad-965e-352fe26a735a');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'12-bit', E'570e70bc-619c-4c06-8449-cd677b18548c', E'bb7c86ac-1563-46ad-965e-352fe26a735a');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'16-bit', E'a072c280-4f53-455b-8dc2-188e423622d1', E'bb7c86ac-1563-46ad-965e-352fe26a735a');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The yellow color represented in RGB percentage as (100%, 100%, 0%) is equivalent in GLSL floating-point numbers as:', null, E'51281e94-2f62-4765-b8c7-2f2af47bc685', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3(100.0, 100.0, 0.0)', E'11944e97-c99d-4f8f-8937-8086f837b74f', E'51281e94-2f62-4765-b8c7-2f2af47bc685');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2(1.0, 1.0, 0.0)', E'fbe71545-bb36-43ce-a63b-c2eb41a99600', E'51281e94-2f62-4765-b8c7-2f2af47bc685');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3(1.0, 0.0, 0.0)', E'ec25eeaf-004d-450e-b0a5-3bfe708ef448', E'51281e94-2f62-4765-b8c7-2f2af47bc685');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3(1.0, 1.0, 0.0)', E'9d2b52cb-e84b-471c-ab54-b48b1ec01f03', E'51281e94-2f62-4765-b8c7-2f2af47bc685');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The bright sea green color represented in RGB percentage as (57%, 92%, 73%) is equivalent in GLSL floating-point numbers as:', null, E'595d7687-0a24-47e0-ad2f-e9494fcb3213', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3(57.0, 92.0, 73.0)', E'f8a3855a-2d41-4621-9a0d-8cc5f4de39b8', E'595d7687-0a24-47e0-ad2f-e9494fcb3213');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2(0.57, 0.92, 0.73)', E'7d04fe88-f3ac-4a73-8a2a-173ccdc2c6ca', E'595d7687-0a24-47e0-ad2f-e9494fcb3213');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3(0.57, 0.92, 0.73)', E'dbc3f4f5-361f-472f-b574-4d1068200738', E'595d7687-0a24-47e0-ad2f-e9494fcb3213');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3(5.7, 9.2, 7.3)', E'86bf5b43-24ba-4141-8c74-d3ff4282411c', E'595d7687-0a24-47e0-ad2f-e9494fcb3213');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Luminosity gradients have:', null, E'138e1257-ba48-4a0c-aab9-a9743820bd72', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'A dark and light area', E'29bb334e-a8d4-4d5f-ac8d-9c461d6ca0ba', E'138e1257-ba48-4a0c-aab9-a9743820bd72');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'A yellow and black area', E'd481963e-a173-4245-a0de-fb7f3adeea53', E'138e1257-ba48-4a0c-aab9-a9743820bd72');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Two different saturated colors', E'371f94c3-290f-4f9c-8e7b-612699bf295c', E'138e1257-ba48-4a0c-aab9-a9743820bd72');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Two different gradient colors', E'2f4fd4c5-2245-4b90-89a7-2f7deff368e0', E'138e1257-ba48-4a0c-aab9-a9743820bd72');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output an horizontal red luminosity gradient:', null, E'efd5e519-2157-48c4-bb53-c3f0a0008614', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(uv.y, 0.0, 0.0);', E'08b8ddd3-1c95-4306-b4ec-3f40d09ab431', E'efd5e519-2157-48c4-bb53-c3f0a0008614');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(0.0, uv.x, 0.0);', E'6d58069b-44f9-4b4b-8d0f-79a187c7180a', E'efd5e519-2157-48c4-bb53-c3f0a0008614');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3 color = vec3(uv.x, 0.0, 0.0);', E'af9402f8-f6ec-4d64-92fe-e3e3aef54e6a', E'efd5e519-2157-48c4-bb53-c3f0a0008614');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(0.0, uv.y, 0.0);', E'211bdb60-f811-4725-ac30-940d363a0139', E'efd5e519-2157-48c4-bb53-c3f0a0008614');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output a vertical blue luminosity gradient:', null, E'fbbe835d-54a9-479c-ad67-1c5040edce82', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3 color = vec3(0.0, 0.0, uv.y);', E'6473fd95-cf36-4625-8349-e222eedfb8c1', E'fbbe835d-54a9-479c-ad67-1c5040edce82');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(0.0, 0.0, uv.x);', E'e7113b65-70df-480d-bca5-30371baf9776', E'fbbe835d-54a9-479c-ad67-1c5040edce82');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(0.0, uv.y, 0.0); ', E'db8858f3-9f38-4b73-ae0d-d3352a0f123b', E'fbbe835d-54a9-479c-ad67-1c5040edce82');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = vec3(0.0, uv.x, 0.0);', E'ffb9c469-9941-4c3a-9bd5-f35ec197361a', E'fbbe835d-54a9-479c-ad67-1c5040edce82');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'Saturation Continuum Gradients have:', null, E'5f1117b2-88e8-485a-973f-55f9bcf465c1', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'A dark and light area', E'028750e6-57e8-473a-b9ef-69551091ef00', E'5f1117b2-88e8-485a-973f-55f9bcf465c1');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'A yellow and black area', E'0ce6f515-3263-417a-99df-2b71d3b50cfc', E'5f1117b2-88e8-485a-973f-55f9bcf465c1');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Two different saturated colors', E'4f2eb5e9-91d6-48b1-a1fb-e7681f446f48', E'5f1117b2-88e8-485a-973f-55f9bcf465c1');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Two different gradient colors', E'2d5d2c43-b6ce-4947-ac1c-dc24beb43aeb', E'5f1117b2-88e8-485a-973f-55f9bcf465c1');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'This is a GLSL built-in function used to make a saturation continuum gradient with two predefined color variables:', null, E'0601d16e-b87d-4801-a512-3b282f61e018', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'abs()', E'a4c48346-6d07-42e4-9dd5-06094e713139', E'0601d16e-b87d-4801-a512-3b282f61e018');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'mix()', E'cedf61ff-af1b-4c36-8b65-7758e1f03b8f', E'0601d16e-b87d-4801-a512-3b282f61e018');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'max()', E'736b2720-14a6-4301-8372-e951d509d20c', E'0601d16e-b87d-4801-a512-3b282f61e018');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'step()', E'1b0adb87-0293-419b-8a5e-03af20777976', E'0601d16e-b87d-4801-a512-3b282f61e018');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output an horizontal saturation continuum gradient, starting from red on the left side to blue on the right side, given two predefined color variables:', null, E'5390ddc8-d655-439a-8493-8703b61b5c46', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(blue, red, uv.x);', E'd013cb5e-3319-4d93-8419-618f5fbf18e0', E'5390ddc8-d655-439a-8493-8703b61b5c46');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(red, blue, uv.y);', E'604a3027-cb11-4429-86ce-271454499cfd', E'5390ddc8-d655-439a-8493-8703b61b5c46');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(red, blue, uv);', E'd75eeaec-070f-4c89-8c09-977508135e48', E'5390ddc8-d655-439a-8493-8703b61b5c46');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3 color = mix(red, blue, uv.x);', E'8457fa58-7f60-40a4-90ea-e3a293fb53cf', E'5390ddc8-d655-439a-8493-8703b61b5c46');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output a vertical saturation continuum gradient, starting from blue on the bottom side to red on the top side, given two predefined color variables:', null, E'e2b2ec61-1f48-4a17-9a49-ace9b3504886', E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(blue, red, uv.x);', E'079db638-8e57-479c-9f52-c191308afc99', E'e2b2ec61-1f48-4a17-9a49-ace9b3504886');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec3 color = mix(blue, red, uv.y); ', E'85747708-5f37-486e-8fdf-aaacc80eb334', E'e2b2ec61-1f48-4a17-9a49-ace9b3504886');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(red, blue, uv.y);', E'76c91f22-cd8f-423c-a100-70e6dfcda255', E'e2b2ec61-1f48-4a17-9a49-ace9b3504886');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 color = mix(red, blue, uv.x); ', E'df8531be-26b7-4d94-83bf-4255c0509b0f', E'e2b2ec61-1f48-4a17-9a49-ace9b3504886');

INSERT INTO "public"."modules"("duration", "course_id", "description", "title", "you_will_learn", "you_will_learn_title", "created_at", "updated_at", "id", "next_module_id", "previous_module_id") VALUES (0, E'5f1f6044-21ba-4409-880e-02cd36568697', null, E'Geometries', E'Explorations of the RGB color model and gradients to understand how pixel shaders work', null, E'2024-08-15T20:30:45.316649+00:00', E'2024-08-15T20:30:45.316649+00:00', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'28e8a011-ad3b-4f2f-8687-ce17485c434d');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (230, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Bending Space', E'993313932', E'2024-08-15T20:32:15.956506+00:00', E'2024-08-15T20:32:15.956506+00:00', E'e982fbb2-7c2b-48a8-969b-7d7fbcc313f4', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, null);

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (947, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary: length() https://thebookofshaders.com/glossary/?search=length  The Book of Shaders Glossary: step() https://thebookofshaders.com/glossary/?search=step', E'Circle Pt.1', E'993315527', E'2024-08-15T20:35:06.629438+00:00', E'2024-08-15T20:35:06.629438+00:00', E'0e6008a4-5402-41ad-bec4-7d4237e46400', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'e982fbb2-7c2b-48a8-969b-7d7fbcc313f4');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1030, null, null, E'The Book of Shaders Glossary: distance()  https://thebookofshaders.com/glossary/?search=distance  Khronos GLSL Functions: distance https://registry.khronos.org/OpenGL-Refpages/gl4/html/distance.xhtml', E'Circle Pt.2', E'996396132', E'2024-08-15T20:36:12.898837+00:00', E'2024-08-15T20:36:12.898837+00:00', E'974053b1-077c-4fca-bc2c-131c9bc5fcb5', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'0e6008a4-5402-41ad-bec4-7d4237e46400');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (548, null, null, E'The Book of Shaders Glossary: smoothstep()  https://thebookofshaders.com/glossary/?search=smoothstep', E'Circle Pt.3 ', E'993316806', E'2024-08-15T20:42:14.678464+00:00', E'2024-08-15T20:42:14.678464+00:00', E'3c0d4bf4-bd5d-4bb6-bf58-730e0d242ce6', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'974053b1-077c-4fca-bc2c-131c9bc5fcb5');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (795, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary: abs() https://thebookofshaders.com/glossary/?search=abs  The Book of Shaders Glossary: max() https://thebookofshaders.com/glossary/?search=max  Khronos GLSL Functions: max https://registry.khronos.org/OpenGL-Refpages/gl4/html/max.xhtml', E'Square Pt.1', E'993317488', E'2024-08-15T20:44:55.604671+00:00', E'2024-08-15T20:44:55.604671+00:00', E'e7a4c97a-619e-4cda-9d9f-fb080a6bd23b', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'3c0d4bf4-bd5d-4bb6-bf58-730e0d242ce6');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (892, null, null, E'The Book of Shaders Glossary: min()  https://thebookofshaders.com/glossary/?search=min  The Book of Shaders Glossary: max() https://thebookofshaders.com/glossary/?search=max  The Book of Shaders Glossary: smoothstep()  https://thebookofshaders.com/glossary/?search=smoothstep  The Book of Shaders Glossary: step() https://thebookofshaders.com/glossary/?search=step', E'Square Pt.2', E'996394555', E'2024-08-15T20:45:49.690158+00:00', E'2024-08-15T20:45:49.690158+00:00', E'b57e8b32-780f-47e5-9a9d-3a12ee6a7fd6', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'e7a4c97a-619e-4cda-9d9f-fb080a6bd23b');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1500, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Triangle', E'996397195', E'2024-08-15T20:47:02.321215+00:00', E'2024-08-15T20:47:02.321215+00:00', E'899ecea6-9c2d-4779-9677-81057dafbb72', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'b57e8b32-780f-47e5-9a9d-3a12ee6a7fd6');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1136, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary: abs() https://thebookofshaders.com/glossary/?search=abs', E'Ring', E'996397146', E'2024-08-15T20:47:58.233397+00:00', E'2024-08-15T20:47:58.233397+00:00', E'04847452-264b-4bed-be37-ac2ce8b7c316', E'ba883c86-a829-4df4-832a-acd10f0adf97', null, E'899ecea6-9c2d-4779-9677-81057dafbb72');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The space in a pixel aka fragment shader can be bend by moving the:', null, E'78d95c3f-f708-447e-b865-2811f76bc051', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Fixed space', E'1aaec66b-e8b3-4e00-9e6a-1d8c378a47b9', E'78d95c3f-f708-447e-b865-2811f76bc051');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Cardinal space', E'92390baa-1f62-4778-8958-ff02eceb7b12', E'78d95c3f-f708-447e-b865-2811f76bc051');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Global space', E'59ca23b8-52b3-4942-8290-5464d9515b6c', E'78d95c3f-f708-447e-b865-2811f76bc051');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Coordinate space', E'df3d285a-8f2e-4110-b62e-f3c830473042', E'78d95c3f-f708-447e-b865-2811f76bc051');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is a calculation to push the horizontal axis of a pixel aka fragment shader coordinate system towards what one could think of light:', null, E'cac0cba4-46c6-4701-9d68-747e2596277c', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'uv.x += 0.5;', E'd3868879-7f01-4c98-a6f9-4685bb3c78ad', E'cac0cba4-46c6-4701-9d68-747e2596277c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'uv.x -= 0.5;', E'0a49be3c-352a-4d71-ae4b-aecde6bbf60c', E'cac0cba4-46c6-4701-9d68-747e2596277c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'uv.y += 0.5;', E'9767fc2d-b081-4667-af13-536d48246543', E'cac0cba4-46c6-4701-9d68-747e2596277c');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'uv -= 0.5;', E'5ce94824-02dc-40b4-bd5d-4ff2dd807ccc', E'cac0cba4-46c6-4701-9d68-747e2596277c');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'These two GLSL built-in functions can be used interchangeably to draw a circle or ellipse:', null, E'99aaadb1-28ce-4c9f-9d28-06e3ca0f62a3', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'length() and mix()', E'b3597112-e62d-455c-86df-77e1d661076a', E'99aaadb1-28ce-4c9f-9d28-06e3ca0f62a3');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'mix() and abs()', E'1e6567ac-c86a-43dc-bcf1-cbbb94d9549e', E'99aaadb1-28ce-4c9f-9d28-06e3ca0f62a3');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'max() and length()', E'3b1ebf4a-8cce-472a-8246-588fe08b69ad', E'99aaadb1-28ce-4c9f-9d28-06e3ca0f62a3');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'length() and distance() ', E'7433385a-64b2-472c-88b3-c1833fc06fb7', E'99aaadb1-28ce-4c9f-9d28-06e3ca0f62a3');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'This GLSL built-in function can be used to make a well-defined (sharp) circle:', null, E'e764abc4-f3e7-4061-8aed-dbb0a583348b', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'abs()', E'688bd5c0-e0c1-4e81-aad5-fb726f6db24b', E'e764abc4-f3e7-4061-8aed-dbb0a583348b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'smoothstep()', E'219b7737-8dda-4f23-a83a-f06521552e9d', E'e764abc4-f3e7-4061-8aed-dbb0a583348b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'step()', E'a695f38f-0eb2-4567-86e0-d11103205fa0', E'e764abc4-f3e7-4061-8aed-dbb0a583348b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'max()', E'6479eb82-b36c-4f88-8f79-e71ba6ac16ee', E'e764abc4-f3e7-4061-8aed-dbb0a583348b');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is a uv equation to draw a circle with an aspect ratio at the center of the screen when used as length(uv) or distance(uv, vec2(0.0)):', null, E'a4f57813-f481-4a8b-9154-657511480c1e', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2 uv = gl_FragCoord.x / u_resolution;', E'4f1fd6c0-4dc3-4585-a681-7edbd3029c66', E'a4f57813-f481-4a8b-9154-657511480c1e');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2 uv = gl_FragCoord.xy / u_resolution;', E'c5e59f9d-b083-4aef-9833-dcc25a6ef640', E'a4f57813-f481-4a8b-9154-657511480c1e');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'vec2 uv = (gl_FragCoord.xy - (u_resolution * 0.5)) / u_resolution; ', E'3d19a6dd-4f08-4778-8a00-a2c6f3f94f71', E'a4f57813-f481-4a8b-9154-657511480c1e');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2 uv = (gl_FragCoord.xy - (u_resolution.xy * 0.25)) / u_resolution;', E'492523b8-ba01-4f13-b743-96fa8da98b0f', E'a4f57813-f481-4a8b-9154-657511480c1e');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'These two GLSL built-in functions can be used together to draw a square or rectangle:', null, E'4e26542a-4946-4237-b7fc-8274917160fa', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = max(abs(uv.x), abs(uv.y));', E'd1dbd325-8197-4a87-a3a5-82508d828a30', E'4e26542a-4946-4237-b7fc-8274917160fa');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float square = step(0.25, max(abs(uv.x), abs(uv.y))); ', E'82667748-3839-4d86-ad38-d53f1761f03f', E'4e26542a-4946-4237-b7fc-8274917160fa');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = step(0.25, length(abs(uv.x)));', E'da524458-39c2-40ad-8c7e-8bd0d9ee63e6', E'4e26542a-4946-4237-b7fc-8274917160fa');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float square = step(0.25, min(abs(uv.x), abs(uv.y)));', E'41f17c85-b619-4d1b-8b66-152547e2c32a', E'4e26542a-4946-4237-b7fc-8274917160fa');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to draw a well-defined (sharp) triangle at the center of the screen with a given normalized screen coordinate system between -0.5 and 0.5 and an aspect ratio:', null, E'5f492f84-e647-4241-bf03-b96b630b94c8', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = step(0.1, min(abs(uv.x), abs(uv.y)));', E'2c252dca-1cca-4108-aa54-ad085b4ddf4b', E'5f492f84-e647-4241-bf03-b96b630b94c8');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = max(abs(uv.x) + uv.y, abs(uv.y));', E'd912520f-bbf0-45e4-81c0-719621970a4e', E'5f492f84-e647-4241-bf03-b96b630b94c8');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float triangle = step(0.1, max(abs(uv.x) + uv.y, abs(uv.y)));', E'607cba9e-84db-48d5-9524-fb69620e8955', E'5f492f84-e647-4241-bf03-b96b630b94c8');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = min(abs(uv.x) + uv.x, abs(uv.y));', E'8ba3cae3-0fec-4bf6-8207-359d69b98126', E'5f492f84-e647-4241-bf03-b96b630b94c8');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to draw a reversed (peak facing south) well-defined (sharp) triangle at the center of the screen with a given normalized screen coordinate system between -0.5 and 0.5 and an aspect ratio:', null, E'f4ab43c9-af5c-4dbc-9dae-fc1a574e6ad5', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = step(0.1, min(abs(uv.x), abs(uv.y)));', E'bd1766aa-0857-419b-8f77-6161ab641e0b', E'f4ab43c9-af5c-4dbc-9dae-fc1a574e6ad5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = max(abs(uv.x) - uv.y, abs(uv.y));', E'48c5ad81-a933-4400-bec5-6fcfe364104f', E'f4ab43c9-af5c-4dbc-9dae-fc1a574e6ad5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float triangle = step(0.1, max(abs(uv.x) - uv.y, abs(uv.y)));', E'7484619a-21f7-4c34-96fb-0b9d115735ac', E'f4ab43c9-af5c-4dbc-9dae-fc1a574e6ad5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float triangle = min(abs(uv.x) - uv.x, abs(uv.y));', E'0b97dbd7-1ede-4fa1-b245-240a5b5da229', E'f4ab43c9-af5c-4dbc-9dae-fc1a574e6ad5');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to draw a well-defined (sharp) ring at the center of the screen with a given normalized screen coordinate system between -0.5 and 0.5 and an aspect ratio:', null, E'ba91fa74-bff8-41c8-8212-3ee92ae06556', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float ring = step(0.1, abs(length(uv) - 0.25));', E'df890371-042f-4553-9a6e-55e3c192be0c', E'ba91fa74-bff8-41c8-8212-3ee92ae06556');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float ring = abs(length(uv) - 0.25);', E'384f8065-c49e-46d4-adac-0d614a819dfc', E'ba91fa74-bff8-41c8-8212-3ee92ae06556');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float ring = step(0.1, 0.2, abs(length(uv) - 0.25));', E'81183645-02ef-4f95-be37-cc2817650044', E'ba91fa74-bff8-41c8-8212-3ee92ae06556');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float ring = step(0.1, length(uv) - 0.25);', E'c0988e22-decb-444e-899f-86391875b3fb', E'ba91fa74-bff8-41c8-8212-3ee92ae06556');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'This GLSL built-in function can be used to make a solid ring with blurred edges:', null, E'6f8a3e53-8095-4177-8f80-7bae79246db5', E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'abs()', E'caa19314-baf6-4487-a597-c40cdf7d1689', E'6f8a3e53-8095-4177-8f80-7bae79246db5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'smoothstep()', E'a3b18129-1f05-44bc-91f7-7a3180e776fb', E'6f8a3e53-8095-4177-8f80-7bae79246db5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'step()', E'ed41515e-ae70-40c8-8397-20a5061e622f', E'6f8a3e53-8095-4177-8f80-7bae79246db5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'max()', E'79b86940-346f-45db-a376-317171044b79', E'6f8a3e53-8095-4177-8f80-7bae79246db5');

INSERT INTO "public"."modules"("duration", "course_id", "description", "title", "you_will_learn", "you_will_learn_title", "created_at", "updated_at", "id", "next_module_id", "previous_module_id") VALUES (0, E'5f1f6044-21ba-4409-880e-02cd36568697', null, E'Patterns', E'Creating abstract artwork inspired by patterns and geometric art through the use of code and mathematics', null, E'2024-08-15T20:58:17.906503+00:00', E'2024-08-15T20:58:17.906503+00:00', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, E'ba883c86-a829-4df4-832a-acd10f0adf97');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1310, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary: fract()  https://thebookofshaders.com/glossary/?search=fract  The Book of Shaders Glossary: mod()  https://thebookofshaders.com/glossary/?search=mod', E'Repeating Space', E'993319448', E'2024-08-15T21:00:04.02077+00:00', E'2024-08-15T21:00:04.02077+00:00', E'5fc650d0-8c74-4454-90fd-bf169dd740f5', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, null);

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1114, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Linear Repetition Pt.1', E'993320561', E'2024-08-15T21:01:02.646131+00:00', E'2024-08-15T21:01:02.646131+00:00', E'4651437f-2d0a-4b0c-9fb3-0cbcf517775d', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, E'5fc650d0-8c74-4454-90fd-bf169dd740f5');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (904, null, null, E'', E'Linear Repetition Pt.2', E'993321046', E'2024-08-15T21:02:05.373369+00:00', E'2024-08-15T21:02:05.373369+00:00', E'83f27b85-5e10-4429-a9fc-6e04c8b9a6d2', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, E'4651437f-2d0a-4b0c-9fb3-0cbcf517775d');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1332, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Grid Repetition', E'993322492', E'2024-08-15T21:03:08.066856+00:00', E'2024-08-15T21:03:08.066856+00:00', E'6156514a-9bb8-4b88-bbe7-117641d5ae28', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, E'83f27b85-5e10-4429-a9fc-6e04c8b9a6d2');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1121, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr', E'Mix Repetition ', E'993322709', E'2024-08-15T21:03:59.158272+00:00', E'2024-08-15T21:03:59.158272+00:00', E'1c3463e5-8774-46b2-9b41-8b6c85fb2650', E'8efe00aa-57ad-4498-bc39-bb86c1743f42', null, E'6156514a-9bb8-4b88-bbe7-117641d5ae28');

INSERT INTO "public"."modules"("duration", "course_id", "description", "title", "you_will_learn", "you_will_learn_title", "created_at", "updated_at", "id", "next_module_id", "previous_module_id") VALUES (0, E'5f1f6044-21ba-4409-880e-02cd36568697', null, E'Motion', E'Visual understanding of how the usage of trigonometry equations and other math functions aid in drawing and adding motion to our sketches', null, E'2024-08-15T22:59:03.841639+00:00', E'2024-08-15T22:59:03.841639+00:00', E'466b727c-f5fa-402c-a9e6-e34317c54fcd', null, E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1572, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  Three.js Documentation: Clock https://threejs.org/docs/index.html?q=clock#api/en/core/Clock', E'Time Clock', E'996399268', E'2024-08-15T23:00:23.719776+00:00', E'2024-08-15T23:00:23.719776+00:00', E'22560dcf-970c-4e46-8a8c-c8cdc4dcb5ff', E'466b727c-f5fa-402c-a9e6-e34317c54fcd', null, null);

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (999, null, null, E'Shader Template (using Three.js v.166.0) https://codepen.io/ilithya/pen/wvOLPZr  The Book of Shaders Glossary: sin()  https://thebookofshaders.com/glossary/?search=sin  The Book of Shaders Glossary: cos()  https://thebookofshaders.com/glossary/?search=cos  The Book of Shaders Glossary: tan()  https://thebookofshaders.com/glossary/?search=tan', E'Trigonometry Pt.1', E'993324950', E'2024-08-15T23:01:21.072618+00:00', E'2024-08-15T23:01:21.072618+00:00', E'c33a7b2f-e979-4247-888a-da13f03a3b06', E'466b727c-f5fa-402c-a9e6-e34317c54fcd', null, E'22560dcf-970c-4e46-8a8c-c8cdc4dcb5ff');

INSERT INTO "public"."chapters"("duration", "description", "info", "resources", "title", "video_id", "created_at", "updated_at", "id", "module_id", "next_chapter_id", "previous_chapter_id") VALUES (1170, null, null, E'The Book of Shaders Glossary: clamp()  https://thebookofshaders.com/glossary/?search=clamp  The Book of Shaders Glossary: mix()  https://thebookofshaders.com/glossary/?search=mix', E'Trigonometry Pt.2', E'993328502', E'2024-08-15T23:02:12.592861+00:00', E'2024-08-15T23:02:12.592861+00:00', E'cd1f2792-0139-4e4b-b72d-0c1f0b6bcb43', E'466b727c-f5fa-402c-a9e6-e34317c54fcd', null, E'c33a7b2f-e979-4247-888a-da13f03a3b06');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'In the pixel aka fragment shader template used in this course u_time is an example of a type qualifier known as:', null, E'971d26a4-4c94-4bb0-aee6-bbda3be25c5b', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Precision', E'b09db526-50fd-4fdf-8922-635963195717', E'971d26a4-4c94-4bb0-aee6-bbda3be25c5b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Attribute', E'91352a30-f671-4c14-83f5-394405e34e14', E'971d26a4-4c94-4bb0-aee6-bbda3be25c5b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Uniform', E'4fa109b7-e20f-4f10-9ef3-2a1908b120ec', E'971d26a4-4c94-4bb0-aee6-bbda3be25c5b');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Varying', E'6c3dcc0d-f496-40ff-b913-455ab5131b4c', E'971d26a4-4c94-4bb0-aee6-bbda3be25c5b');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The uniforms available in the fragment shader template for this course were defined in the:', null, E'c882d398-8edc-438b-9c4c-9c28c11fea24', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Three.js template', E'cd586755-3d35-45b9-9b49-88bdfa81b183', E'c882d398-8edc-438b-9c4c-9c28c11fea24');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Pixel shader', E'569ae368-0e8a-4c4f-b381-0cac6f128477', E'c882d398-8edc-438b-9c4c-9c28c11fea24');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'HTML template', E'5d917a31-2373-41be-be91-d529f8e105ee', E'c882d398-8edc-438b-9c4c-9c28c11fea24');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'u_time is equivalent to a clock counting in:', null, E'e39314d6-f025-4209-97a1-83028afcac73', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Minutes', E'3fcac7b7-ebd1-496d-8b4d-cb9c36a96efd', E'e39314d6-f025-4209-97a1-83028afcac73');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Milliseconds', E'6d7cf676-45f3-4482-8309-1a6aa3e856de', E'e39314d6-f025-4209-97a1-83028afcac73');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'Seconds', E'8eba6d4a-02d3-450f-88ad-99770484a14e', E'e39314d6-f025-4209-97a1-83028afcac73');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'Fractions of time', E'3d7ffa66-d529-47f6-ae91-d404a61c5cab', E'e39314d6-f025-4209-97a1-83028afcac73');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an example of u_time defined as a variable inside the void main() of a fragment shader:', null, E'eca92a9f-3e18-4aad-a7d0-bc60fd4115a0', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'time = u_time;', E'c5d4e87a-919f-4a05-a286-a11f058ebf04', E'eca92a9f-3e18-4aad-a7d0-bc60fd4115a0');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec3 time = u_time;', E'9bb45216-efa7-4c00-be5b-64f4a8ad9c49', E'eca92a9f-3e18-4aad-a7d0-bc60fd4115a0');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'vec2 time = u_time;', E'3091b486-4536-4b94-afae-853f550d0be2', E'eca92a9f-3e18-4aad-a7d0-bc60fd4115a0');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float time = u_time;', E'ab20dea2-4570-4aa3-a5b9-2471ab79d8f9', E'eca92a9f-3e18-4aad-a7d0-bc60fd4115a0');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to move a fullscreen linear repetition with vertical lines from left to right continuously:', null, E'ca2a00c3-c31b-41db-990e-af5d5ae88dbb', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 + u_time);', E'59ca3529-38a7-4756-8b42-5a1c3d2ace25', E'ca2a00c3-c31b-41db-990e-af5d5ae88dbb');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float pattern = fract(uv.x * 4.0 - u_time);', E'fb837df0-a972-46c0-9b27-ab512f024925', E'ca2a00c3-c31b-41db-990e-af5d5ae88dbb');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 * u_time);', E'94c6b3a8-1fcb-4af6-a44b-8d87fcabf2c8', E'ca2a00c3-c31b-41db-990e-af5d5ae88dbb');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 / u_time);', E'6c8288f8-8cf6-437d-a471-dbc97d8f5643', E'ca2a00c3-c31b-41db-990e-af5d5ae88dbb');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'These three GLSL built-in functions can be used to add motion to our sketches with trigonometry:', null, E'3485268b-8e9c-467f-b259-6215504c9fcc', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'sin(), mix(), cos()', E'752a9165-4126-409b-a655-d7cfe3efd8b9', E'3485268b-8e9c-467f-b259-6215504c9fcc');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'cos(), sin()', E'76dbd194-0033-4f09-9eca-1493db99a8c8', E'3485268b-8e9c-467f-b259-6215504c9fcc');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'sin(), tan(), cos()', E'83fe5208-c92d-4193-978b-635e57309f05', E'3485268b-8e9c-467f-b259-6215504c9fcc');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'sin(), tan(), length()', E'b1e51b57-8c23-4400-b7ef-0fd17ce79272', E'3485268b-8e9c-467f-b259-6215504c9fcc');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to move a fullscreen linear repetition with vertical lines back and forth (bouncing) infinitely:', null, E'4c985a5d-e047-40e4-b8b3-7db16c1e06f2', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float pattern = fract(uv.x * 4.0 - sin(u_time));', E'9f94f799-47dd-49d3-b2d0-50acf3265a86', E'4c985a5d-e047-40e4-b8b3-7db16c1e06f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - tan(u_time)); ', E'6b009700-6c4e-466d-86b1-2100e51c7ac2', E'4c985a5d-e047-40e4-b8b3-7db16c1e06f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - u_time);', E'7af18ee9-f71e-446a-b59a-64b4e122edd3', E'4c985a5d-e047-40e4-b8b3-7db16c1e06f2');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - abs(u_time));', E'ee053bd9-52c1-4015-9a8c-1f543c7e501e', E'4c985a5d-e047-40e4-b8b3-7db16c1e06f2');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to move a fullscreen linear repetition with vertical lines from left to right with an abrupt and fast-end movement, from which after it starts again repeating that motion:', null, E'ac23acd2-cb16-4204-ad4e-27bd86e1c8d7', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - sin(u_time)); ', E'0ff0c901-dc77-48bc-a528-506c85f97eca', E'ac23acd2-cb16-4204-ad4e-27bd86e1c8d7');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'float pattern = fract(uv.x * 4.0 - tan(u_time));', E'15ec648e-ee1c-48f2-a02e-3d3b2dfbfaeb', E'ac23acd2-cb16-4204-ad4e-27bd86e1c8d7');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - u_time);', E'3185ddc6-1ef0-4f0c-af12-39f72fadcfa3', E'ac23acd2-cb16-4204-ad4e-27bd86e1c8d7');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'float pattern = fract(uv.x * 4.0 - abs(u_time));', E'b7e14340-d697-4a09-847e-97caff5eae61', E'ac23acd2-cb16-4204-ad4e-27bd86e1c8d7');

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The GLSL built-in function cos() can be think of as a mirror from the GLSL built-in function:', null, E'1f83b98a-d3c9-42d0-a196-faf8dbe91bb5', E'466b727c-f5fa-402c-a9e6-e34317c54fcd');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'tan()', E'c968ca3c-00de-4531-9766-9f17f5695e05', E'1f83b98a-d3c9-42d0-a196-faf8dbe91bb5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'abs()', E'0792a69a-9116-4506-84ea-70c5364d854a', E'1f83b98a-d3c9-42d0-a196-faf8dbe91bb5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (true, E'sin()', E'8d0c07cc-fa3e-4d38-a761-8e1185ecbb65', E'1f83b98a-d3c9-42d0-a196-faf8dbe91bb5');

INSERT INTO "public"."question_options"("is_correct", "text", "id", "question_id") VALUES (false, E'length()', E'353ed0b3-6e25-436e-a071-d0b78d5ce9a1', E'1f83b98a-d3c9-42d0-a196-faf8dbe91bb5');
