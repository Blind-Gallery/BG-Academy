CREATE TABLE "public"."course" ("id" serial NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "thumbnail" text NOT NULL, "language" text NOT NULL, "certificate" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"));
