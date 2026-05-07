import { promises as fs } from 'node:fs';
import path from 'node:path';

const DOMAIN = 'https://cyber.coding-academy.co.il';

function toIsoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function ensureLeadingSlash(value) {
  if (!value) return '/';
  return value.startsWith('/') ? value : `/${value}`;
}

function buildUrl(pathname) {
  const normalized = ensureLeadingSlash(pathname);
  if (normalized === '/') return `${DOMAIN}/`;
  return `${DOMAIN}${normalized}`;
}

function extractQuizPaths(source) {
  const match = source.match(/const ROUTED_EXAMS:[\s\S]*?=\s*\{([\s\S]*?)\};/);
  if (!match) return [];

  const body = match[1];
  const routes = [];
  const routeRegex = /'[^']+'\s*:\s*'([^']+)'/g;
  let routeMatch;

  while ((routeMatch = routeRegex.exec(body)) !== null) {
    routes.push(routeMatch[1]);
  }

  return routes;
}

function extractArticleSlugs(source) {
  const slugs = [];
  const slugRegex = /slug:\s*'([^']+)'/g;
  let slugMatch;

  while ((slugMatch = slugRegex.exec(source)) !== null) {
    slugs.push(slugMatch[1]);
  }

  return slugs;
}

function createUrlEntry(pathname, changefreq, priority, lastmod) {
  return [
    '  <url>',
    `    <loc>${buildUrl(pathname)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

async function run() {
  const rootDir = process.cwd();
  const examsScreenPath = path.join(rootDir, 'src', 'components', 'ExamsScreen', 'ExamsScreen.tsx');
  const articlesPath = path.join(rootDir, 'src', 'data', 'articles.ts');
  const outputPath = path.join(rootDir, 'public', 'sitemap.xml');

  const [examsSource, articlesSource] = await Promise.all([
    fs.readFile(examsScreenPath, 'utf8'),
    fs.readFile(articlesPath, 'utf8'),
  ]);

  const quizPaths = extractQuizPaths(examsSource);
  const articleSlugs = extractArticleSlugs(articlesSource);
  const lastmod = toIsoDate();

  const staticEntries = [
    createUrlEntry('/', 'weekly', '1.0', lastmod),
    createUrlEntry('/quiz', 'weekly', '0.9', lastmod),
    createUrlEntry('/articles', 'weekly', '0.8', lastmod),
  ];

  const quizEntries = quizPaths.map((quizPath) => createUrlEntry(quizPath, 'monthly', '0.8', lastmod));
  const articleEntries = articleSlugs.map((slug) => createUrlEntry(`/articles/${slug}`, 'monthly', '0.7', lastmod));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...quizEntries,
    ...articleEntries,
    '</urlset>',
    '',
  ].join('\n');

  await fs.writeFile(outputPath, xml, 'utf8');
  console.log(`Sitemap generated with ${3 + quizEntries.length + articleEntries.length} URLs.`);
}

run().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exit(1);
});
