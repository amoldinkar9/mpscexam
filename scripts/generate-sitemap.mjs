import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://mpscexam.in';
const today = new Date().toISOString().split('T')[0];

// All 36 Districts of Maharashtra
const DISTRICTS = [
  'pune', 'mumbai', 'nashik', 'chhatrapati-sambhajinagar', 'kolhapur', 'nagpur',
  'thane', 'solapur', 'amravati', 'latur', 'nanded', 'satara', 'sangli',
  'ahilyanagar', 'ahmednagar', 'jalgaon', 'akola', 'dhule', 'chandrapur',
  'beed', 'buldhana', 'dharashiv', 'osmanabad', 'jalna', 'parbhani',
  'raigad', 'ratnagiri', 'sindhudurg', 'palghar', 'wardha', 'washim',
  'yavatmal', 'gondia', 'bhandara', 'gadchiroli', 'hingoli', 'nandurbar'
];

// High-Intent Commercial Packages
const COMMERCIAL_SLUGS = [
  'mpsc-group-c-test-series-199',
  'master25-mpsc',
  'tcs9-master25-test-series',
  'mpsc-group-c-prelims-25-test-series',
  'mpsc-clerk-typist-test-series',
  'mpsc-tax-assistant-test-series',
  'mpsc-test-series-under-200',
  'best-affordable-mpsc-test-series',
  'mpsc-25-full-length-tests',
  'mpsc-2500-concepts-test-series'
];

// High-Value AEO Intent Questions
const AEO_QUESTION_SLUGS = [
  'can-12th-pass-apply-for-mpsc-group-c',
  'can-girls-apply-for-mpsc-group-c',
  'can-graduates-apply-for-mpsc-group-c',
  'can-i-crack-mpsc-group-c-by-self-study',
  'can-i-crack-mpsc-group-c-in-6-months',
  'how-to-avoid-negative-marking-in-mpsc-group-c',
  'how-to-prepare-for-mpsc-group-c-in-3-months',
  'what-is-mpsc-tax-assistant-salary',
  'mpsc-clerk-typist-eligibility-criteria',
  'mpsc-group-c-cut-off-2026',
  'what-is-the-age-limit-for-mpsc-group-c',
  'which-is-the-best-test-series-for-mpsc-group-c',
  'how-to-calculate-mpsc-group-c-score',
  'how-to-download-mpsc-group-c-hall-ticket'
];

// News Jacking Hubs
const NEWS_SLUGS = [
  'mpsc-group-c-exam-postponed-to-3-january-2027',
  'mpsc-group-c-hall-ticket-2026',
  'mpsc-combine-answer-key-2026',
  'mpsc-exam-calendar-2026-2027',
  'mpsc-group-c-2619-posts-advertisement-017-2026',
  'mpsc-group-c-notification-2026'
];

// Topic-Wise Notes & MCQs
const TOPIC_SLUGS = [
  'mpsc-polity-73rd-74th-amendment-mcq',
  'mpsc-polity-fundamental-rights-questions',
  'mpsc-polity-directive-principles-notes',
  'mpsc-economics-gst-rbi-mcq',
  'mpsc-economics-five-year-plans',
  'mpsc-economics-budget-inflation-questions',
  'mpsc-marathi-grammar-prayog-samas-alankar',
  'mpsc-geography-census-rivers-mcq',
  'mpsc-history-shivaji-maharaj-mcq',
  'mpsc-history-1857-revolt-notes',
  'mpsc-general-science-human-body-vitamins',
  'mpsc-maths-reasoning-profit-loss-syllogism'
];

// Vernacular Marathi Native Slugs
const MARATHI_SLUGS = [
  'mpsc-gat-c-purv-pariksha-test-series',
  'mpsc-gat-c-abhyas-kasa-karava',
  'mpsc-gat-c-199-rupaye-test-series',
  'mpsc-gat-c-25-test-series',
  'mpsc-lipik-tanklekhak-bharti-2026',
  'mpsc-kar-sahayak-bharti-2026'
];

const urls = [
  {
    loc: BASE_URL,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0'
  },
  ...COMMERCIAL_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/${slug}`,
    lastmod: today,
    changefreq: 'daily',
    priority: '0.95'
  })),
  ...NEWS_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/${slug}`,
    lastmod: today,
    changefreq: 'hourly',
    priority: '0.90'
  })),
  ...AEO_QUESTION_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/${slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.85'
  })),
  ...DISTRICTS.map((district) => ({
    loc: `${BASE_URL}/mpsc-test-series-${district}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80'
  })),
  ...TOPIC_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/${slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80'
  })),
  ...MARATHI_SLUGS.map((slug) => ({
    loc: `${BASE_URL}/${slug}`,
    lastmod: today,
    changefreq: 'weekly',
    priority: '0.80'
  }))
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

for (const u of urls) {
  xml += `  <url>\n`;
  xml += `    <loc>${u.loc}</loc>\n`;
  xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
  xml += `    <priority>${u.priority}</priority>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const targetPath = path.join(rootDir, 'public', 'sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf8');

console.log(`✓ sitemap.xml generated successfully at ${targetPath}`);
console.log(`✓ Total Indexed URLs: ${urls.length}`);
