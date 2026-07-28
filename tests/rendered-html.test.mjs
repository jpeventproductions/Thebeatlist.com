import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Pocket Stage one-page journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /The Beat List \| Where Producers Get Heard/);
  assert.match(html, /Where Producers/);
  assert.match(html, /aria-label="The room responds\."/);
  assert.match(html, /NASHVILLE MUSIC BOOST/);
  assert.match(html, /NASHVILLE BEAT BATTLE/);
  assert.match(html, /Vendor application/);
  assert.match(html, /BUILT WITH NASHVILLE PARTNERS/);
  assert.match(html, /Stories from the closeout record/);
  assert.match(html, /J Pierson built it from inside the room/);
  assert.match(html, /Skip to content/);
  assert.match(html, /aria-expanded="false"/);
});

test("keeps cinematic motion optional and all hidden systems wired", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);
  assert.match(page, /import\("lenis"\)/);
  assert.match(page, /ScrollTrigger/);
  assert.match(page, /localStorage/);
  assert.match(page, /experienceOpen/);
  assert.match(page, /bracketOpen/);
  assert.match(page, /function bracketCapacity/);
  assert.match(page, /Add producer/);
  assert.match(page, /32 positions/);
  assert.match(page, /boostOpen/);
  assert.match(page, /vendor/);
  assert.match(page, /Producer Accelerator Support/);
  assert.match(page, /youtube-nocookie\.com/);
  assert.match(page, /EVENTBRITE_PROFILE/);
  assert.match(page, /beat-battle-motion\.mp4/);
  assert.match(page, /thebeatlistofficial@gmail\.com/);
  assert.match(css, /mix-blend-mode: multiply/);
  assert.match(css, /@media \(max-width: 1100px\)/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 640px\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(layout, /themeColor: "#f6f4ee"/);
  assert.match(packageJson, /"gsap"/);
  assert.match(packageJson, /"lenis"/);
});
