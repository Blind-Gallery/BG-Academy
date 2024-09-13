alter table "public"."questions" add column "created_at" timestamptz
 null default now();
