import { test } from "@playwright/test";

test("capturas visuais completas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const loadImages = async () => {
    const images = page.locator("img");
    for (let index = 0; index < await images.count(); index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
  };

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await loadImages();
  await page.screenshot({ path: "test-results/serifil-desktop-complete.png", fullPage: true });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await loadImages();
  await page.screenshot({ path: "test-results/serifil-mobile-complete.png", fullPage: true });
});
