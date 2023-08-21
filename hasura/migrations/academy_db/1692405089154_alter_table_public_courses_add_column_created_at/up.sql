alter table "public"."courses" add column "created_at" timestamptz
 null default now();
