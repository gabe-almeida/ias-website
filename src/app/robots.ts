import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// AI assistant / answer-engine crawlers we explicitly welcome so the lab's
// services are discoverable inside ChatGPT, Claude, Perplexity, Gemini, etc.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI / ChatGPT training + browsing
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT live retrieval
  "ClaudeBot", // Anthropic / Claude
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "cohere-ai",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE.baseUrl}/sitemap.xml`,
    host: SITE.baseUrl,
  };
}
