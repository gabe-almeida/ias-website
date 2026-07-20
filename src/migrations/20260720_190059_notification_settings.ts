import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`notification_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`notify_to\` text DEFAULT 'nick@etrlabs.com' NOT NULL,
  	\`notify_from\` text DEFAULT 'IAS Website <onboarding@resend.dev>' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`notification_settings\`;`)
}
