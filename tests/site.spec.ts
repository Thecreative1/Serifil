import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test("estrutura, imagens e navegação principal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const heading = page.locator("h1");
  await expect(heading).toHaveCount(1);
  await expect(heading).toContainText("Imprimimos ideias.");
  await expect(heading).toContainText("Entregamos resultados.");
  await expect(page.locator("img")).toHaveCount(1);

  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect(images.nth(index)).toHaveJSProperty("complete", true);
  }
  const imageHealth = await images.evaluateAll((items) =>
    items.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
  );
  expect(imageHealth).toBe(true);

  await page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Serviços" }).click();
  await expect(page.locator("#servicos h2")).toBeInViewport();

  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") ?? "").filter((href) => href.length > 1 && !document.querySelector(href)),
  );
  expect(invalidAnchors).toEqual([]);
});

test("sem overflow horizontal nos tamanhos pedidos", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document, `${viewport.width}px document overflow`).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.body, `${viewport.width}px body overflow`).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
});

test("menu móvel fecha por Escape e por navegação", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const openButton = page.getByRole("button", { name: "Abrir menu" });
  await openButton.click();
  await expect(openButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();
  const closeButton = page.getByRole("button", { name: "Fechar menu" });
  const mobileQuoteLink = page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Pedir orçamento" });
  await expect(closeButton).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");

  await page.keyboard.press("Shift+Tab");
  await expect(mobileQuoteLink).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(openButton).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

  await openButton.click();
  await page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Processo" }).click();
  await expect(openButton).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#processo h2")).toBeInViewport();
});

test("formulário valida e apresenta sucesso após envio", async ({ page }) => {
  await page.route("https://formspree.io/f/xzdnyead", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/#orcamento");
  await page.waitForLoadState("networkidle");
  const form = page.getByRole("form", { name: "Formulário de pedido de orçamento" });

  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(page.getByText("Indique o seu nome.")).toBeVisible();
  await expect(page.getByText("Introduza um endereço de e-mail válido.")).toBeVisible();
  await page.getByLabel("Data pretendida").fill("2020-01-01");
  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(page.getByText("Escolha uma data a partir de hoje.")).toBeVisible();

  await page.getByLabel("Nome").fill("Empresa Exemplo");
  await page.getByLabel("E-mail").fill("producao@example.test");
  await page.getByLabel("Telefone").fill("000 000 000");
  await page.getByLabel("Serviço pretendido").selectOption({ label: "Sacos em tecido para calçado" });
  await page.getByLabel("Quantidade aproximada").fill("500");
  await page.getByLabel("Data pretendida").fill("2030-12-20");
  await page.getByLabel("Mensagem").fill("Precisamos de sacos impressos a uma cor para uma série de produção.");
  await page.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Enviar pedido" }).click();

  await expect(page.getByRole("heading", { name: "Pedido enviado." })).toBeVisible();
  await expect(page.getByText("Recebemos os detalhes do seu projeto e entraremos em contacto assim que possível.")).toBeVisible();
  await expect(page.getByRole("status")).toBeFocused();
});

test("não publica contactos vazios ou links falsos", async ({ page }) => {
  await page.goto("/#contacto");
  await expect(page.locator('#contacto a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('#contacto a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('a[href*="wa.me"]')).toHaveCount(0);
});

test("publica metadados canónicos e de partilha corretos", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://thecreative1.github.io/Serifil/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://thecreative1.github.io/Serifil/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://thecreative1.github.io/Serifil/images/hero-serigrafia.webp");
});
