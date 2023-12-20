
DROP TABLE "public"."tezos_transaction_info";

DELETE FROM "public"."transaction_types" WHERE "name" = 'tezos';

DELETE FROM "public"."transaction_types" WHERE "name" = 'stripe';

DROP TABLE "public"."transaction_types";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."transactions";

DELETE FROM "public"."transactions" WHERE "type" = 'tezos';

DELETE FROM "public"."transactions" WHERE "type" = 'stripe';

DROP TABLE "public"."transactions";

DROP TABLE "public"."payments";
