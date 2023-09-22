BEGIN TRANSACTION;
ALTER TABLE "public"."level_catalog" DROP CONSTRAINT "level_catalog_pkey";

ALTER TABLE "public"."level_catalog"
    ADD CONSTRAINT "level_catalog_pkey" PRIMARY KEY ("id");
COMMIT TRANSACTION;
