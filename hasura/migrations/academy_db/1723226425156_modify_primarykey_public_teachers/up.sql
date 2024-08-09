BEGIN TRANSACTION;
ALTER TABLE "public"."teachers" DROP CONSTRAINT "professors_pkey";

ALTER TABLE "public"."teachers"
    ADD CONSTRAINT "professors_pkey" PRIMARY KEY ("new_id");
COMMIT TRANSACTION;
