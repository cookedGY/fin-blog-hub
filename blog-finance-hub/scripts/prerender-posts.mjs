import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const postsFile = join(rootDir, "client/src/data/posts.tsx");
const templateFile = join(rootDir, "dist/public/index.html");
const outputRoot = join(rootDir, "dist/public/post");
const siteUrl = "https://finbloghub.space";
const fallbackImage = `${siteUrl}/og-image.png`;

const source = readFileSync(postsFile, "utf8");
const template = readFileSync(templateFile, "utf8");

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeJson = (value) => JSON.stringify(value ?? "");

const getStringField = (block, field) => {
  const doubleQuoted = block.match(new RegExp(`${field}:\\s*"([\\s\\S]*?)",`));
  if (doubleQuoted) return doubleQuoted[1].replace(/\\u2014/g, "—").replace(/\\u2013/g, "–");

  const singleQuoted = block.match(new RegExp(`${field}:\\s*'([\\s\\S]*?)',`));
  return singleQuoted?.[1]?.replace(/\\u2014/g, "—").replace(/\\u2013/g, "–") ?? "";
};

const getArrayField = (block, field) => {
  const match = block.match(new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\],`));
  if (!match) return [];

  return [...match[1].matchAll(/["']([^"']+)["']/g)].map((item) => item[1]);
};

const findObjectBlocks = (text) => {
  const blocks = [];
  const slugPattern = /["']([^"']+)["']:\s*\{/g;
  let match;

  while ((match = slugPattern.exec(text))) {
    const start = match.index;
    let depth = 0;
    let end = start;
    let inString = false;
    let quote = "";
    let escaped = false;

    for (let index = text.indexOf("{", start); index < text.length; index += 1) {
      const char = text[index];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === quote) {
          inString = false;
        }
        continue;
      }

      if (char === '"') {
        inString = true;
        quote = char;
        continue;
      }

      if (char === "{") depth += 1;
      if (char === "}") depth -= 1;

      if (depth === 0) {
        end = index + 1;
        break;
      }
    }

    blocks.push(text.slice(start, end));
    slugPattern.lastIndex = end;
  }

  return blocks;
};

const extractContent = (block) => {
  const marker = "content:";
  const contentStart = block.indexOf(marker);
  if (contentStart === -1) return "";

  const fragmentStart = block.indexOf("<>", contentStart);
  const fragmentEnd = block.lastIndexOf("</>");
  if (fragmentStart === -1 || fragmentEnd === -1 || fragmentEnd <= fragmentStart) return "";

  return block.slice(fragmentStart + 2, fragmentEnd);
};

const jsxToStaticHtml = (jsx) => {
  const withLinks = jsx.replace(
    /<Link\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/Link>/g,
    '<a href="$1">$2</a>'
  );

  return withLinks
    .replace(/\sclassName="[^"]*"/g, "")
    .replace(/\starget="_blank"/g, ' target="_blank"')
    .replace(/\srel="noopener noreferrer"/g, ' rel="noopener noreferrer"')
    .replace(/\sstyle=\{\{[\s\S]*?\}\}/g, "")
    .replace(/<([A-Z][A-Za-z0-9]*)([^>]*)\/>/g, "")
    .replace(/<([a-z0-9]+)([^>]*)\/>/gi, "")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\{[\s\S]*?\}/g, "")
    .replace(/\n\s+/g, "\n")
    .trim();
};

const stripTags = (html) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const replaceOrInsertMeta = (html, selector, tag) => {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<meta\\s+${escapedSelector}[^>]*>`);
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
};

const replaceTitle = (html, title) => html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);

const injectHead = (html, post) => {
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.description;
  const image = post.thumbnail || fallbackImage;
  const url = `${siteUrl}/post/${post.slug}`;
  const keywords = post.seoKeywords.join(", ");
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Dekena Wade",
    },
    keywords,
    mainEntityOfPage: url,
  };

  let output = replaceTitle(html, `${title} | DeCodes Life`);
  output = replaceOrInsertMeta(output, 'name="description"', `<meta name="description" content="${escapeHtml(description)}" />`);
  output = replaceOrInsertMeta(output, 'name="keywords"', `<meta name="keywords" content="${escapeHtml(keywords)}" />`);
  output = replaceOrInsertMeta(output, 'property="og:title"', `<meta property="og:title" content="${escapeHtml(title)}" />`);
  output = replaceOrInsertMeta(output, 'property="og:description"', `<meta property="og:description" content="${escapeHtml(description)}" />`);
  output = replaceOrInsertMeta(output, 'property="og:image"', `<meta property="og:image" content="${escapeHtml(image)}" />`);
  output = replaceOrInsertMeta(output, 'property="og:type"', '<meta property="og:type" content="article" />');
  output = replaceOrInsertMeta(output, 'name="twitter:title"', `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  output = replaceOrInsertMeta(output, 'name="twitter:description"', `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  output = replaceOrInsertMeta(output, 'name="twitter:image"', `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
  output = output.replace("</head>", `    <link rel="canonical" href="${escapeHtml(url)}" />\n    <script type="application/ld+json">${escapeJson(schema)}</script>\n  </head>`);

  return output;
};

const injectArticleFallback = (html, post) => {
  const articleHtml = jsxToStaticHtml(post.content);
  const plainText = stripTags(articleHtml);
  const fallback = `
    <article class="crawler-readable-post" data-prerendered-post="${escapeHtml(post.slug)}">
      <p>${escapeHtml(post.tag)} • ${escapeHtml(post.date)} • By Dekena Wade</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p>${escapeHtml(post.description)}</p>
      ${articleHtml}
    </article>
    <script type="application/json" id="prerendered-post-data">${escapeJson({
      slug: post.slug,
      title: post.title,
      description: post.description,
      text: plainText,
    })}</script>`;

  return html.replace('<div id="root"></div>', `<div id="root">${fallback}\n    </div>`);
};

const posts = findObjectBlocks(source)
  .map((block) => ({
    slug: getStringField(block, "slug"),
    tag: getStringField(block, "tag"),
    title: getStringField(block, "title"),
    date: getStringField(block, "date"),
    description: getStringField(block, "description"),
    thumbnail: getStringField(block, "thumbnail"),
    seoTitle: getStringField(block, "seoTitle"),
    seoDescription: getStringField(block, "seoDescription"),
    seoKeywords: getArrayField(block, "seoKeywords"),
    content: extractContent(block),
  }))
  .filter((post) => post.slug && post.title && post.content);

for (const post of posts) {
  const pageDir = join(outputRoot, post.slug);
  const html = injectArticleFallback(injectHead(template, post), post);

  mkdirSync(pageDir, { recursive: true });
  writeFileSync(join(pageDir, "index.html"), html);
}

console.log(`Prerendered ${posts.length} article pages.`);
