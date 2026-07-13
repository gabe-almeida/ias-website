/**
 * Proof harness for the public lead-capture path (submissions collection).
 * Exercises the SAME code the REST endpoint (POST /api/submissions) runs:
 *   1. a real submission is captured (create succeeds, row persists)
 *   2. the honeypot rejects spam (create with `website` throws, nothing stored)
 *   3. the email-notify afterChange hook runs (logs "no RESEND_API_KEY" here)
 * Cleans up the docs it creates. Run: `npx tsx scripts/test-submission.ts`
 */
import { getPayload } from "payload";
import config from "../src/payload.config.ts";

const run = async () => {
  const payload = await getPayload({ config });
  let failures = 0;

  // 1) Real submission — must succeed and persist.
  const created = await payload.create({
    collection: "submissions",
    data: {
      firstName: "Nick",
      lastName: "ETRLabs",
      company: "ETR Labs",
      industry: "Chemical & Materials",
      phone: "(555) 111-2222",
      email: "nick@etrlabs.example",
      message: "Need PFAS panel on 3 water samples, 5-day TAT.",
    },
  });
  console.log(`[1] real submission created → id=${created.id}, company="${created.company}"`);

  const found = await payload.findByID({ collection: "submissions", id: created.id });
  if (found?.email === "nick@etrlabs.example") {
    console.log(`[1] ✓ persisted & re-read (email=${found.email}, createdAt=${found.createdAt})`);
  } else {
    console.log("[1] ✗ could not re-read the created submission");
    failures++;
  }

  // 2) Honeypot — a bot filling `website` must be rejected (nothing stored).
  let rejected = false;
  try {
    await payload.create({
      collection: "submissions",
      data: {
        firstName: "Bot",
        lastName: "Spam",
        company: "SpamCo",
        phone: "0",
        email: "bot@spam.example",
        website: "http://spammy.example",
      },
    });
  } catch {
    rejected = true;
  }
  console.log(rejected ? "[2] ✓ honeypot rejected the spam create" : "[2] ✗ honeypot did NOT reject spam");
  if (!rejected) failures++;
  const spam = await payload.find({
    collection: "submissions",
    where: { email: { equals: "bot@spam.example" } },
  });
  console.log(
    spam.totalDocs === 0
      ? "[2] ✓ no spam row persisted"
      : `[2] ✗ ${spam.totalDocs} spam row(s) leaked into the DB`,
  );
  if (spam.totalDocs !== 0) failures++;

  // Cleanup the real test doc so we don't leave fixtures in the admin.
  await payload.delete({ collection: "submissions", id: created.id });
  console.log(`[cleanup] deleted test submission id=${created.id}`);

  console.log(failures === 0 ? "\nALL CHECKS PASSED" : `\n${failures} CHECK(S) FAILED`);
  process.exit(failures === 0 ? 0 : 1);
};

run().catch((err) => {
  console.error("test harness error:", err);
  process.exit(1);
});
