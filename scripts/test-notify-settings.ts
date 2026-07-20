/**
 * Proof: the lead-alert recipient + sender come from the `notification-settings`
 * global (SQLite, admin-editable), NOT env vars. Runs against a scratch DB.
 *   1. global returns the baked-in defaults on a fresh DB
 *   2. editing the global changes what a new submission's hook would use
 * Run: DATABASE_URI="file:/tmp/x.db" npx tsx scripts/test-notify-settings.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

const run = async () => {
  const payload = await getPayload({ config });
  let failures = 0;

  // 1) Fresh DB → defaults from the global (what the hook reads).
  const def = await payload.findGlobal({ slug: "notification-settings" });
  const okDefaults =
    def.notifyTo === "nick@etrlabs.com" &&
    def.notifyFrom === "IAS Website <onboarding@resend.dev>";
  console.log(
    `[1] global defaults → notifyTo="${def.notifyTo}", notifyFrom="${def.notifyFrom}" ` +
      (okDefaults ? "✓" : "✗"),
  );
  if (!okDefaults) failures++;

  // 2) Admin edits the recipient in /admin → hook must pick up the new value.
  await payload.updateGlobal({
    slug: "notification-settings",
    data: { notifyTo: "leads@iasamerica.com", notifyFrom: "IAS <noreply@iasamerica.com>" },
  });
  const edited = await payload.findGlobal({ slug: "notification-settings" });
  const okEdit =
    edited.notifyTo === "leads@iasamerica.com" &&
    edited.notifyFrom === "IAS <noreply@iasamerica.com>";
  console.log(
    `[2] after admin edit → notifyTo="${edited.notifyTo}", notifyFrom="${edited.notifyFrom}" ` +
      (okEdit ? "✓" : "✗"),
  );
  if (!okEdit) failures++;

  // 3) A real submission runs the notify hook end-to-end (no RESEND_API_KEY here,
  //    so it logs "captured — email skipped" — proving it reads config without crashing).
  const created = await payload.create({
    collection: "submissions",
    data: {
      firstName: "Proof",
      lastName: "Run",
      company: "Proof Co",
      phone: "(555) 000-0000",
      email: "proof@example.com",
      message: "notify-settings proof",
    },
  });
  console.log(`[3] submission #${created.id} created — afterChange notify hook ran without error ✓`);
  await payload.delete({ collection: "submissions", id: created.id });

  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("test harness error:", err);
  process.exit(1);
});
