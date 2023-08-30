BEGIN TRANSACTION;
ALTER TABLE "public"."user_module" DROP CONSTRAINT "user_module_pkey";

ALTER TABLE "public"."user_module"
    ADD CONSTRAINT "user_module_pkey" PRIMARY KEY ("user_id", "module_id");
COMMIT TRANSACTION;
