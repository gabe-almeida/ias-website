import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { revalidatePath } from "next/cache";

// On-demand ISR: when a post is created/updated/deleted in /admin, refresh the
// affected public pages so changes appear live without a redeploy.
const revalidateFor = (slug?: string | null) => {
  revalidatePath("/science-hub");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/science-hub/${slug}`);
};

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  try {
    revalidateFor(doc?.slug);
    // Slug changed → also clear the old URL.
    if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
      revalidatePath(`/science-hub/${previousDoc.slug}`);
    }
  } catch (err) {
    req.payload.logger.error({ err }, "revalidatePost failed");
  }
  return doc;
};

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  try {
    revalidateFor(doc?.slug);
  } catch (err) {
    req.payload.logger.error({ err }, "revalidatePostDelete failed");
  }
  return doc;
};
