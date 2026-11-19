import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // serve the static site as-is. vite is only the dev server and test runner; there's no build.
  root: "site",
  plugins: [
    {
      // vite only hot-reloads files it imports. the config is fetched at runtime and the
      // stylesheet is a plain <link>, so reload the page when either changes.
      name: "reload-ring",
      configureServer(server) {
        server.watcher.on("change", (file) => {
          if (/\.(css|toml)$/.test(file)) {
            server.ws.send({ type: "full-reload" });
          }
        });
      },
    },
  ],
  test: {
    // tests live outside the site root so they aren't published
    dir: `${import.meta.dirname}/test`,
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
