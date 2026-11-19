// screenshots of the ring are committed to __screenshots__/, so PRs show what a change looks like.
// after an intended change, run `pnpm test:update` and commit the results.
import { fetchConfig } from "fairy-ring/lib";
import "fairy-ring/standalone";
import { expect, test } from "vitest";
import { page } from "vitest/browser";

const CONFIG_URL = "/fairy-ring.toml";

test("config is valid", async () => {
  // throws with a readable message if not
  await fetchConfig({ url: CONFIG_URL });
});

test("widget", async () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "/fairy-ring.css";
  const loaded = new Promise((resolve) => (link.onload = resolve));
  document.head.append(link);
  await loaded;

  const el = document.createElement("fairy-ring");
  el.className = "wip-ring";
  el.setAttribute("config-url", CONFIG_URL);
  document.body.append(el);

  await expect.poll(() => el.shadowRoot?.querySelector('[part~="home"]')).toBeTruthy();
  await expect.element(page.elementLocator(el)).toMatchScreenshot();
});
