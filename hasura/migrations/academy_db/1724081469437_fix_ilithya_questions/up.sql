

--- Fixes first question of Ilithya quiz (module 1, question 1)
UPDATE question_options SET is_correct = false WHERE id = '528a7b25-0046-46b0-a174-2d22e042a3c7';

UPDATE question_options SET is_correct = true WHERE id = '76c83b70-e59f-446a-bf31-8a96b6eff6f2';

--- Fixes for module 3
UPDATE question_options SET is_correct = false WHERE id = '82667748-3839-4d86-ad38-d53f1761f03f';

UPDATE question_options SET is_correct = true WHERE id = 'd1dbd325-8197-4a87-a3a5-82508d828a30';

--- Add missing questions

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'4f0867cc-2c57-4a6a-97a3-a94f71048e74', E'c882d398-8edc-438b-9c4c-9c28c11fea24', E'Vertex shader', true);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'These two GLSL built-in functions can be used interchangeably to repeat the space in a pixel aka fragment shader', null, E'0707bba0-d35f-4be6-9de2-e8d5de6e0927', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'1022cc63-1dbc-45e1-a8b6-22a38cba1882', E'0707bba0-d35f-4be6-9de2-e8d5de6e0927', E'fract() and length()', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'08b6f368-3e6d-48f5-b985-10e1d0c80d08', E'0707bba0-d35f-4be6-9de2-e8d5de6e0927', E'fract() and mod()', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'ec9da624-f3d3-4db3-b1ac-70ab0db1e444', E'0707bba0-d35f-4be6-9de2-e8d5de6e0927', E'mod() and length()', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'4b8c2f65-6afd-48d0-a9c7-3a3cefb55285', E'0707bba0-d35f-4be6-9de2-e8d5de6e0927', E'max() and fract()', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following calculation creates a zoom-in effect in the uv space:', null, E'edd72c7f-6125-4927-9478-f1de3e35f4ca', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'3b7bf4fe-8f0b-49b3-8cc4-2de7417e25e4', E'edd72c7f-6125-4927-9478-f1de3e35f4ca', E'uv *= 3.0;', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'6d2bc871-fab5-4076-8d19-a6f4e7b05e26', E'edd72c7f-6125-4927-9478-f1de3e35f4ca', E'uv += 3.0;', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'8d2bdd77-8add-4a50-89db-4c4273dbf004', E'edd72c7f-6125-4927-9478-f1de3e35f4ca', E'uv -= 3.0;', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'e99589df-c91f-45cf-bf84-52a2d40cd0cf', E'edd72c7f-6125-4927-9478-f1de3e35f4ca', E'uv /= 3.0;', true);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following calculation creates a zoom-out effect in the uv space:', null, E'55fc9cdd-85d9-4d78-828f-61b9eace2683', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'aa599411-6275-4be5-bb8d-eefeb0d7f83c', E'55fc9cdd-85d9-4d78-828f-61b9eace2683', E'uv *= 3.0;', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'61e5ef07-a40a-49c2-add1-52f9f8639b5d', E'55fc9cdd-85d9-4d78-828f-61b9eace2683', E'uv += 3.0;', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'7ba1e873-e5e7-4587-9c88-f841d3d39918', E'55fc9cdd-85d9-4d78-828f-61b9eace2683', E'uv -= 3.0;', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'595bdfed-4022-440e-9ee2-b8dc97f09d94', E'55fc9cdd-85d9-4d78-828f-61b9eace2683', E'uv /= 3.0;', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to make a fullscreen linear repetition with vertical lines:', null, E'9d43be05-d75e-4775-9f27-769f93837618', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'f5727b6f-1820-4df2-92d7-1180d3eefb07', E'9d43be05-d75e-4775-9f27-769f93837618', E'float pattern = fract(uv.x * 4.0);', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'7abbab78-c35d-48f9-b36f-d6ef9a335766', E'9d43be05-d75e-4775-9f27-769f93837618', E'float pattern = fract(uv.y * 4.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'67f595d9-09e7-46fa-b898-8ad634b0b99b', E'9d43be05-d75e-4775-9f27-769f93837618', E'float pattern = fract(uv * 4.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'fc4cd24a-16c5-4e69-9663-4dfaf4ba65b8', E'9d43be05-d75e-4775-9f27-769f93837618', E'float pattern = fract(uv.x * uv.y); ', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to make a fullscreen linear repetition with circles or ellipses:', null, E'e76ae3c7-fdc9-4fb2-bbcb-6d56ea0d3ea3', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'193bb298-da9f-4a8d-b539-cee99cc25b58', E'e76ae3c7-fdc9-4fb2-bbcb-6d56ea0d3ea3', E'float pattern = fract(length(uv.x) * 4.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'5d69d73b-5ce9-452c-a610-0b71804e84ff', E'e76ae3c7-fdc9-4fb2-bbcb-6d56ea0d3ea3', E'float pattern = fract(length(uv.y) * 4.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'37d4728f-d0f0-4345-aa22-a7878706f717', E'e76ae3c7-fdc9-4fb2-bbcb-6d56ea0d3ea3', E'float pattern = fract(length(uv.xx) * 4.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'd84bb1e2-a3ab-4e48-a300-4576b7d8bc16', E'e76ae3c7-fdc9-4fb2-bbcb-6d56ea0d3ea3', E'float pattern = fract(length(uv.xy) * 4.0);', true);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to make a fullscreen grid repetition with centered circles or ellipses:', null, E'd865cb8f-5be3-44c2-9956-08eefe17ff07', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'1f1a1d4e-7f3c-4407-958e-97d601c134b2', E'd865cb8f-5be3-44c2-9956-08eefe17ff07', E'float pattern = fract(distance(uv, vec2(0.0)) * 8.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'8c368aaa-1cd6-41ec-a60a-f705682403df', E'd865cb8f-5be3-44c2-9956-08eefe17ff07', E'float pattern = distance(fract(uv * 8.0), vec2(0.0)); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'd85159a7-48f6-4db7-a2a3-92b1f752059d', E'd865cb8f-5be3-44c2-9956-08eefe17ff07', E'float pattern = distance(fract(uv * 8.0), vec2(0.5)); ', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'd279fd96-516a-40e8-9e16-8778319d66df', E'd865cb8f-5be3-44c2-9956-08eefe17ff07', E'float pattern = fract(distance(uv, vec2(0.5)) * 8.0);', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to make a fullscreen grid repetition with squares or rectangles:', null, E'46047732-05e2-47dc-aed9-08f835b62941', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'1ee282d7-30e9-4330-b5df-c05a14be336c', E'46047732-05e2-47dc-aed9-08f835b62941', E'float pattern = max(abs(fract(uv.x * 12.0)), abs(fract(uv.x * 12.0))); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'5cfbb300-2b65-4b02-9ea0-e251780689a9', E'46047732-05e2-47dc-aed9-08f835b62941', E'float pattern = max(abs(fract(uv.x * 12.0)), abs(fract(uv.y * 12.0)));', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'78d67590-4334-4739-860a-9e8958ee4737', E'46047732-05e2-47dc-aed9-08f835b62941', E'float pattern = max(abs(uv.x * 12.0), abs(fract(uv.y * 12.0)));', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'086ba3bb-64fb-4fb7-9e2e-fd5a999dabe0', E'46047732-05e2-47dc-aed9-08f835b62941', E'float pattern = max(abs(fract(uv.x * 12.0)), abs(uv.y * 12.0)); ', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output two separated predefined patterns of the same color at the same time:', null, E'584d1ac0-a79f-43b0-a819-591258760a8d', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'1ae3b768-00f6-405f-99d2-750de209e8fa', E'584d1ac0-a79f-43b0-a819-591258760a8d', E'vec3  color = vec3(pattern * patternTwo, 0.0, 0.0);', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'dfb16401-fd41-46c0-b180-687e650f520d', E'584d1ac0-a79f-43b0-a819-591258760a8d', E'vec3  color = vec3(pattern + patternTwo, 0.0, 0.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'41a7bd6c-291b-4bce-8251-0fb06563c142', E'584d1ac0-a79f-43b0-a819-591258760a8d', E'vec3  color = vec3(pattern - patternTwo, 0.0, 0.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'2782007f-0091-4fcc-b0bc-b7600069fbd4', E'584d1ac0-a79f-43b0-a819-591258760a8d', E'vec3  color = vec3(pattern / patternTwo, 0.0, 0.0); ', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'This GLSL built-in function can be used to output two different predefined patterns at the same time:', null, E'4243764f-d99e-4d2b-a938-431d9899acbd', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'803a3fa5-4b43-4a53-818d-1b8452eda9ac', E'4243764f-d99e-4d2b-a938-431d9899acbd', E'fract() ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'5b0b26ad-8695-46d5-bd80-932faab6a9ac', E'4243764f-d99e-4d2b-a938-431d9899acbd', E'mod() ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'3ec9748f-14ba-46ee-b2aa-f56a511dc104', E'4243764f-d99e-4d2b-a938-431d9899acbd', E'mix() ', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'f1dfa1af-a21a-417d-9a3a-e1ba13966ccf', E'4243764f-d99e-4d2b-a938-431d9899acbd', E'length() ', false);

INSERT INTO "public"."questions"("text", "answer_id", "id", "module_id") VALUES (E'The following is an equation to output two separated predefined patterns with different colors and a blending mode effect at the same time:', null, E'5fa55917-16b7-4d81-a01a-7d93ddd75f5a', E'8efe00aa-57ad-4498-bc39-bb86c1743f42');

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'2fb9539e-4c98-49f2-8386-c34175ebc99e', E'5fa55917-16b7-4d81-a01a-7d93ddd75f5a', E'vec3  color = vec3(pattern + patternTwo, 0.0, 0.0); ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'14be3e1c-8d67-407d-a498-e055deec3dcd', E'5fa55917-16b7-4d81-a01a-7d93ddd75f5a', E'vec3  color = vec3(pattern, 0.0, patternTwo);', true);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'6a890636-662e-47d9-a603-80623f4f5a82', E'5fa55917-16b7-4d81-a01a-7d93ddd75f5a', E'vec3  color = vec3(pattern, 0.0, 0.0) + patternTwo; ', false);

INSERT INTO "public"."question_options"("id", "question_id", "text", "is_correct") VALUES (E'b97ee09e-804a-4a6e-b373-8b7924f763ed', E'5fa55917-16b7-4d81-a01a-7d93ddd75f5a', E'vec3  color = vec3(pattern - patternTwo, 0.0, 0.0); ', false);
