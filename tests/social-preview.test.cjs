const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { Writable } = require("node:stream");
const { test } = require("node:test");
const handler = require("../api/index.js").default;

function decode(value) {
  return value.replace(/&(?:amp|quot|#x27|#39|lt|gt);/g, (entity) => ({
    "&amp;": "&", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&lt;": "<", "&gt;": ">",
  }[entity]));
}

async function request(url) {
  let html = "";
  const response = new Writable({
    write(chunk, encoding, done) { html += chunk.toString(); done(); },
  });
  response.writeHead = (status, statusText, headers) => {
    response.statusCode = status;
    response.headers = headers;
  };
  await handler({ method: "GET", headers: { host: "localhost" }, url }, response);
  return { html, status: response.statusCode, headers: response.headers };
}

async function render(url) {
  const { html, status } = await request(url);
  assert.equal(status, 200, url);

  const head = html.match(/<head>(.*?)<\/head>/s)[1];
  const meta = new Map();
  for (const [tag] of head.matchAll(/<meta\b[^>]*>/g)) {
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)]
      .map(([, key, value]) => [key, decode(value)]));
    const key = attrs.property || attrs.name;
    if (!key) continue;
    assert(!meta.has(key), `Duplicate ${key} on ${url}`);
    meta.set(key, attrs.content);
  }
  return { html, head, meta };
}

function checkPreview({ head, meta }, pathname, type) {
  const url = `https://www.varunks.xyz${pathname}`;
  assert.equal(meta.get("og:url"), url);
  assert(head.includes(`<link rel="canonical" href="${url}"`));
  assert.equal(meta.get("og:type"), type);
  assert.equal(meta.get("twitter:card"), "summary_large_image");
  assert.equal(meta.get("twitter:title"), meta.get("og:title"));
  assert.equal(meta.get("description"), meta.get("og:description"));
  assert.equal(meta.get("twitter:description"), meta.get("og:description"));
  assert.equal(meta.get("twitter:image"), meta.get("og:image"));
  assert(meta.get("og:description"));
  assert(meta.get("og:image:alt"));
  assert(meta.get("twitter:image:alt"));

  const image = new URL(meta.get("og:image"));
  assert.equal(image.origin, "https://www.varunks.xyz");
  assert.match(image.pathname, /\.(png|jpe?g)$/i);
  assert(fs.existsSync(path.join(__dirname, "../public", image.pathname)), image.href);
}

for (const file of fs.readdirSync(path.join(__dirname, "../app/routes/posts"))) {
  if (!file.endsWith(".mdx")) continue;
  const pathname = `/posts/${file.replace(/\.mdx$/, "")}`;
  test(`${pathname} has its own preview in the initial HTML`, async () => {
    const page = await render(pathname);
    checkPreview(page, pathname, "article");
    const heading = decode(page.html.match(/<h1\b[^>]*>(.*?)<\/h1>/s)[1].replace(/<[^>]+>/g, ""));
    assert.equal(page.meta.get("og:title"), heading);
    assert.notEqual(page.meta.get("og:description"), "A blog about the stuff I find interesting");
    const title = decode(page.head.match(/<title>(.*?)<\/title>/s)[1]);
    assert.equal(title, heading);
  });
}

test("/ has a website preview", async () => {
  const page = await render("/");
  checkPreview(page, "/", "website");
  assert.equal(page.meta.get("og:title"), "A blog by Varun KS");
});

for (const pathname of ["/posts", "/posts/", "/posts?utm_source=shared"]) {
  test(`${pathname} permanently redirects to the canonical blog list`, async () => {
    const response = await request(pathname);
    assert.equal(response.status, 301);
    assert.deepEqual(response.headers.location, ["/"]);
  });
}

test("the homepage lists every post and the Blog link points home", async () => {
  const { html } = await render("/");
  assert.match(html, /<a[^>]*href="\/"[^>]*>Blog<\/a>/);
  assert(!html.includes('href="/posts"'));
  for (const file of fs.readdirSync(path.join(__dirname, "../app/routes/posts"))) {
    if (file.endsWith(".mdx")) {
      assert(html.includes(`href="/posts/${file.replace(/\.mdx$/, "")}"`), file);
    }
  }
});

test("tracking parameters and trailing slashes use the clean canonical URL", async () => {
  const pathname = "/posts/dont-toss-that-thin-soap-sliver";
  checkPreview(await render(`${pathname}/?utm_source=shared`), pathname, "article");
});

test("fallback and soap previews are 1200 by 630 PNGs", () => {
  for (const image of ["blog.png", "soap-bar-wear.png"]) {
    const buffer = fs.readFileSync(path.join(__dirname, "../public/social", image));
    assert.equal(buffer.toString("ascii", 1, 4), "PNG");
    assert.equal(buffer.readUInt32BE(16), 1200);
    assert.equal(buffer.readUInt32BE(20), 630);
  }
});
