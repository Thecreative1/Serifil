import { test } from "@playwright/test";

test("capturas visuais completas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });

  const loadImages = async () => {
    const images = page.locator("img");
    for (let index = 0; index < await images.count(); index += 1) {
      await images.nth(index).scrollIntoViewIfNeeded();
    }
    const frames = page.locator("iframe");
    for (let index = 0; index < await frames.count(); index += 1) {
      await frames.nth(index).scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
  };

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pt/");
  await page.waitForLoadState("networkidle");
  await loadImages();
  await page.screenshot({ path: "test-results/serifil-desktop-complete.png", fullPage: true });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/");
  await page.waitForLoadState("networkidle");
  await loadImages();
  await page.screenshot({ path: "test-results/serifil-mobile-complete.png", fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pt/quadros/");
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Retelagem").check();
  await page.getByLabel("77T").check();
  await page.getByLabel("Gravar o desenho na tela").check();
  await page.getByRole("button", { name: "Mais cores" }).click();
  await page.screenshot({ path: "test-results/serifil-quadros-desktop.png", fullPage: true });

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en/quadros/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "test-results/serifil-quadros-mobile.png", fullPage: true });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/rota-inexistente-auditoria/");
  await page.waitForLoadState("networkidle");
  await page.screenshot({ path: "test-results/serifil-404-complete.png", fullPage: true });
});
