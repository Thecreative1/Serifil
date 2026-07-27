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
  await page.goto("/pt/");
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
    await page.goto("/pt/");
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
  await page.goto("/pt/");
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
  await page.goto("/pt/#orcamento");
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
  await page.getByLabel("Serviço pretendido").selectOption({ label: "Sacos em PVC, tecido e TNT" });
  await page.getByLabel("Quantidade aproximada").fill("500");
  await page.getByLabel("Data pretendida").fill("2030-12-20");
  await page.getByLabel("Mensagem").fill("Precisamos de sacos impressos a uma cor para uma série de produção.");
  await page.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Enviar pedido" }).click();

  await expect(page.getByRole("heading", { name: "Pedido enviado." })).toBeVisible();
  await expect(page.getByText("Recebemos os detalhes do seu projeto e entraremos em contacto assim que possível.")).toBeVisible();
  await expect(page.getByRole("status")).toBeFocused();
});

test("publica apenas contactos configurados e o WhatsApp correto", async ({ page }) => {
  await page.goto("/pt/#contacto");
  await expect(page.locator('#contacto a[href^="mailto:"]')).toHaveCount(0);
  const phoneLinks = page.locator('a[href="tel:+351910508706"]');
  const whatsappLinks = page.locator('a[href="https://wa.me/351910508706"]');
  await expect(phoneLinks).toHaveCount(2);
  await expect(whatsappLinks).toHaveCount(2);
  await expect(page.locator("#contacto").getByRole("link", { name: "+351 910 508 706" })).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Ligar +351 910 508 706" })).toBeVisible();
  await expect(page.getByRole("link", { name: "WhatsApp +351 910 508 706" })).toBeVisible();
  await expect(whatsappLinks.first()).toHaveAttribute("target", "_blank");
});

test("apresenta a localização e direções de forma acessível", async ({ page }) => {
  await page.goto("/pt/#contacto");

  const directions = page.getByRole("link", { name: "Obter direções" });
  await expect(directions).toHaveAttribute(
    "href",
    "https://www.google.com/maps/dir/?api=1&destination=41.4279368%2C-8.2991756",
  );
  await expect(directions).toHaveAttribute("target", "_blank");

  const map = page.locator('iframe[title="Mapa com a localização da SERIFIL em Guimarães"]');
  await expect(map).toHaveCount(1);
  await expect(map).toHaveAttribute("loading", "lazy");
  await expect(map).toHaveAttribute("src", /41\.4279368,-8\.2991756/);
});

test("publica metadados canónicos e de partilha corretos", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page).toHaveTitle("Serifil | Serigrafia em PVC, Tecido e TNT em Guimarães");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "Impressão e personalização em PVC, tecido e TNT para sacos, capas, porta-fatos, componentes e outras aplicações. Produção em Guimarães para empresas e marcas, incluindo o setor do calçado.",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    "Impressão personalizada em PVC, tecido e TNT para empresas, marcas e diferentes setores de atividade, incluindo soluções para o setor do calçado.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/pt/");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://serifil.com/pt/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://serifil.com/og.png");
});

test("comunica materiais, setores e componentes de calçado nas duas línguas", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.getByText("ESPECIALISTAS EM SERIGRAFIA E PERSONALIZAÇÃO")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Impressão adaptada a diferentes materiais e aplicações." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Componentes para calçado" }).first()).toBeVisible();
  await expect(page.getByText(/palmilhas, palas e outros componentes/).first()).toBeVisible();
  await expect(page.getByLabel("Serviço pretendido").locator("option")).toHaveText([
    "Selecione uma opção",
    "Sacos em PVC, tecido e TNT",
    "Capas e porta-fatos",
    "Componentes para calçado",
    "Serigrafia têxtil e roupa profissional",
    "Produção personalizada para empresas",
    "Gravação ou corte laser",
    "Outro",
  ]);

  await page.goto("/en/");
  await expect(page).toHaveTitle("Serifil | PVC, Fabric and Non-Woven Screen Printing");
  await expect(page.getByText("SPECIALISTS IN SCREEN PRINTING AND CUSTOMISATION")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Footwear components" }).first()).toBeVisible();
  await expect(page.getByText(/insoles, uppers and other components/).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/\bTNT\b/);
  await expect(page.getByLabel("Required service").locator("option")).toHaveText([
    "Select an option",
    "PVC, fabric and non-woven bags",
    "Covers and garment bags",
    "Footwear components",
    "Textile printing and workwear",
    "Custom production for businesses",
    "Laser engraving or cutting",
    "Other",
  ]);
});

test("publica a versão inglesa completa e permite trocar de idioma", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("We print ideas.");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await expect(page.getByRole("form", { name: "Quote request form" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get directions" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/en/");

  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "pt" }).click();
  await expect(page).toHaveURL(/\/pt\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
});
