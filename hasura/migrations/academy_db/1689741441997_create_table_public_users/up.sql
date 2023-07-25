CREATE TABLE "public"."users" ("id" uuid NOT NULL, "name" text, "lastname" text, "pfp" text, PRIMARY KEY ("id") , UNIQUE ("id"));COMMENT ON TABLE "public"."users" IS E'stores only user information';
