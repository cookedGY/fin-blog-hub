import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const postsFile = join(rootDir, "client/src/data/posts.tsx");
const outputFile = join(rootDir, "client/public/rss.xml");
const siteUrl = "https://finbloghub.space";

const source = readFileSync(postsFile, "utf8");
const postBlocks = source.match(/\{\s*slug:[\s\S]*?content:/g) ?? [];

const escapeXml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const getField = (block, field) => {
  const match = block.match(new RegExp(`${field}:\\s*["']([\\s\\S]*?)["'],`));
  return match?.[1]?.replace(/\\u2014/g, "—").replace(/\\u2013/g, "–") ?? "";
};

const toRssDate = (dateText) => {
  const parsed = new Date(dateText);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toUTCString();
  }

  const monthYear = new Date(`${dateText} 1`);
  if (!Number.isNaN(monthYear.getTime())) {
    return monthYear.toUTCString();
  }

  return new Date().toUTCString();
};

const items = postBlocks
  .map((block) => ({
    slug: getField(block, "slug"),
    title: getField(block, "title"),
    date: getField(block, "date"),
    description: getField(block, "description"),
  }))
  .filter((post) => post.slug && post.title)
  .map((post) => {
    const link = `${siteUrl}/post/${post.slug}`;

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${escapeXml(toRssDate(post.date))}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
  })
  .join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DeCodes Life by Dekena Wade</title>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Finance, AI, culture, career growth, and personal essays from Dekena Wade.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

writeFileSync(outputFile, rss);
