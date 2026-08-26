import { expect, test } from "@playwright/test";

const viewports = [
  { width: 320, height: 720 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
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
  await expect(page.locator('header svg[viewBox="0 0 1000 1000"]')).toHaveCount(1);
  await expect(page.locator("img")).toHaveCount(12);

  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect(images.nth(index)).toHaveJSProperty("complete", true);
  }
  const imageHealth = await images.evaluateAll((items) =>
    items.every((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0),
  );
  expect(imageHealth).toBe(true);
  await expect(page.locator("#trabalhos").getByRole("heading", { name: "Impressão em PVC transparente" })).toBeVisible();
  await expect(page.locator("#trabalhos").getByRole("heading", { name: "Capas e peças em tecido" })).toBeVisible();
  await expect(page.locator("#trabalhos").getByRole("heading", { name: "Sacos personalizados em TNT" })).toBeVisible();

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

    if (viewport.width >= 1024) {
      const brandBox = await page.locator("header > div > a").first().boundingBox();
      const navigationBox = await page.getByRole("navigation", { name: "Navegação principal" }).boundingBox();
      expect(brandBox).not.toBeNull();
      expect(navigationBox).not.toBeNull();
      expect(
        (brandBox?.x ?? 0) + (brandBox?.width ?? 0),
        `${viewport.width}px header overlap`,
      ).toBeLessThanOrEqual((navigationBox?.x ?? 0) - 16);
    }
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

test("carrega o Google Analytics apenas após consentimento e permite revogá-lo", async ({ page }) => {
  const googleTagRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith("https://www.googletagmanager.com/gtag/js")) {
      googleTagRequests.push(request.url());
    }
  });
  await page.route("https://www.googletagmanager.com/gtag/js**", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });

  await page.goto("/pt/");
  const consentPanel = page.getByRole("region", { name: "Preferências de analítica" });
  await expect(consentPanel).toBeVisible();
  await expect(consentPanel.getByText("Medição e privacidade")).toBeVisible();
  expect(googleTagRequests).toEqual([]);

  await consentPanel.getByRole("button", { name: "Recusar" }).click();
  await expect(consentPanel).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem("serifil_analytics_consent"))).toBe("denied");
  expect(googleTagRequests).toEqual([]);

  await page.getByRole("button", { name: "Preferências de cookies" }).click();
  await expect(consentPanel).toBeVisible();
  await consentPanel.getByRole("button", { name: "Aceitar cookies analíticos" }).click();

  await expect.poll(() => googleTagRequests.length).toBe(1);
  expect(googleTagRequests[0]).toContain("id=G-L81181XG3M");
  expect(await page.evaluate(() => localStorage.getItem("serifil_analytics_consent"))).toBe("granted");

  const preventNavigation = async (selector: string) => {
    await page.locator(selector).first().evaluate((link) => {
      link.addEventListener("click", (event) => event.preventDefault(), {
        capture: true,
        once: true,
      });
    });
  };

  await preventNavigation('a[href="tel:+351910508706"]');
  await page.locator('a[href="tel:+351910508706"]').first().click();
  await preventNavigation('a[href^="https://wa.me/351910508706"]');
  await page.locator('a[href^="https://wa.me/351910508706"]').first().click();
  await preventNavigation('a[href^="https://www.google.com/maps/dir/"]');
  await page.locator('a[href^="https://www.google.com/maps/dir/"]').click();
  await preventNavigation('nav[aria-label="Navegação principal"] a[href="/en/"]');
  await page.locator('nav[aria-label="Navegação principal"] a[href="/en/"]').click();

  const eventNames = await page.evaluate(() =>
    (window.dataLayer ?? [])
      .filter((entry) => entry[0] === "event")
      .map((entry) => entry[1]),
  );
  expect(eventNames).toEqual(expect.arrayContaining([
    "click_to_call",
    "whatsapp_click",
    "map_click",
    "language_change",
  ]));

  await page.getByRole("button", { name: "Preferências de cookies" }).click();
  await consentPanel.getByRole("button", { name: "Recusar" }).click();
  expect(await page.evaluate(() => localStorage.getItem("serifil_analytics_consent"))).toBe("denied");

  const lastConsentUpdate = await page.evaluate(() =>
    (window.dataLayer ?? []).findLast(
      (entry) => entry[0] === "consent" && entry[1] === "update",
    ),
  );
  expect(lastConsentUpdate?.[2]).toMatchObject({
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
});

test("formulário valida e apresenta sucesso após envio", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("serifil_analytics_consent", "granted");
  });
  await page.route("https://www.googletagmanager.com/gtag/js**", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/javascript", body: "" });
  });
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

  await expect.poll(async () =>
    page.evaluate(() =>
      (window.dataLayer ?? []).find(
        (entry) => entry[0] === "event" && entry[1] === "generate_lead",
      ),
    ),
  ).not.toBeNull();
  const leadEvent = await page.evaluate(() =>
    (window.dataLayer ?? []).find(
      (entry) => entry[0] === "event" && entry[1] === "generate_lead",
    ),
  );
  expect(JSON.stringify(leadEvent)).not.toContain("Empresa Exemplo");
  expect(JSON.stringify(leadEvent)).not.toContain("producao@example.test");
  expect(JSON.stringify(leadEvent)).not.toContain("000 000 000");
});

test("publica apenas contactos configurados e o WhatsApp correto", async ({ page }) => {
  await page.goto("/pt/#contacto");
  const emailLinks = page.locator('a[href="mailto:geral@serifil.com"]');
  const phoneLinks = page.locator('a[href="tel:+351910508706"]');
  const whatsappLinks = page.locator('a[href^="https://wa.me/351910508706"]');
  const instagramLinks = page.locator('a[href="https://www.instagram.com/serifil_serigrafia/"]');
  await expect(emailLinks).toHaveCount(3);
  await expect(phoneLinks).toHaveCount(3);
  await expect(whatsappLinks).toHaveCount(2);
  await expect(instagramLinks).toHaveCount(2);
  const contact = page.locator("#contacto");
  await expect(contact.getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
  await expect(contact.getByRole("link", { name: "@serifil_serigrafia", exact: true })).toHaveAttribute("href", "https://www.instagram.com/serifil_serigrafia/");
  await expect(contact.getByText("+351 910 508 706", { exact: true })).toHaveCount(1);
  await expect(contact.getByRole("link", { name: "Ligar +351 910 508 706" })).toBeVisible();
  await expect(contact.getByRole("link", { name: "WhatsApp +351 910 508 706" })).toBeVisible();
  await expect(page.getByText("Orçamentos por formulário, e-mail, telefone ou WhatsApp")).toBeVisible();
  await expect(whatsappLinks.first()).toHaveAttribute("target", "_blank");
  await expect(instagramLinks.first()).toHaveAttribute("target", "_blank");
  await expect(contact.getByRole("link", { name: "WhatsApp +351 910 508 706" })).toHaveAttribute(
    "href",
    `https://wa.me/351910508706?text=${encodeURIComponent("Olá SERIFIL! Queria pedir um orçamento. O meu projeto é:")}`,
  );
  await expect(whatsappLinks.last()).toHaveAttribute(
    "href",
    `https://wa.me/351910508706?text=${encodeURIComponent("Olá SERIFIL! Vi o vosso site e queria pedir um orçamento.")}`,
  );

  await page.goto("/en/#contacto");
  await expect(page.locator("#contacto").getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
  await expect(page.locator("#contacto").getByRole("link", { name: "@serifil_serigrafia", exact: true })).toHaveAttribute("href", "https://www.instagram.com/serifil_serigrafia/");
  await expect(page.getByText("Quotes via form, email, phone or WhatsApp")).toBeVisible();
  await expect(page.locator("#contacto").getByRole("link", { name: "WhatsApp +351 910 508 706" })).toHaveAttribute(
    "href",
    `https://wa.me/351910508706?text=${encodeURIComponent("Hello SERIFIL! I'd like a quote. My project is:")}`,
  );
});

test("disponibiliza informação legal discreta e bilingue no rodapé", async ({ page }) => {
  await page.goto("/pt/");

  const portugueseLegal = page.locator("footer details");
  const portugueseSummary = portugueseLegal.locator("summary");
  await expect(portugueseSummary).toHaveText(/Informação legal/);
  await expect(portugueseLegal).not.toHaveAttribute("open");

  await portugueseSummary.click();
  await expect(portugueseLegal).toHaveAttribute("open");
  await expect(portugueseLegal.getByText("SERIFIL", { exact: true })).toBeVisible();
  await expect(portugueseLegal.getByText("Lisete da Silva Araújo")).toBeVisible();
  await expect(portugueseLegal.getByText("250 796 210")).toBeVisible();
  await expect(portugueseLegal.getByText("Serigrafia, impressão e personalização")).toBeVisible();
  await expect(portugueseLegal.getByText("Travessa Bernardino Jordão 90, Urgezes, Guimarães, Portugal")).toBeVisible();
  await expect(portugueseLegal.getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
  await expect(portugueseLegal.getByRole("link", { name: "+351 910 508 706" })).toHaveAttribute("href", "tel:+351910508706");
  await expect(portugueseLegal.getByText("E-mail", { exact: true })).toHaveCount(1);

  await page.goto("/en/");
  const englishLegal = page.locator("footer details");
  await englishLegal.locator("summary").click();
  await expect(englishLegal.getByText("Legal information")).toBeVisible();
  await expect(englishLegal.getByText("Screen printing, printing and customisation")).toBeVisible();
  await expect(englishLegal.getByText("Lisete da Silva Araújo")).toBeVisible();
  await expect(englishLegal.getByText("250 796 210")).toBeVisible();
  await expect(englishLegal.getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
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
  await expect(page).toHaveTitle("SERIFIL | Serigrafia em PVC, Tecido e TNT em Guimarães");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "A SERIFIL é uma empresa de serigrafia e personalização em Guimarães, especializada em PVC, tecido e TNT para sacos, capas e componentes para calçado.",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    "Impressão personalizada em PVC, tecido e TNT para empresas, marcas e diferentes setores de atividade, incluindo soluções para o setor do calçado.",
  );
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/pt/");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/");
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://serifil.com/pt/");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://serifil.com/pt/");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://serifil.com/og.jpg");
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", "SERIFIL");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);
  await expect(page.locator('meta[name="googlebot"]')).toHaveAttribute("content", /max-image-preview:large/);
});

test("publica robots, sitemap localizado e dados estruturados completos", async ({ page, request }) => {
  const faviconResponse = await request.get("/favicon.ico");
  expect(faviconResponse.ok()).toBeTruthy();
  expect(faviconResponse.headers()["content-type"]).toMatch(/image\/(?:x-icon|vnd\.microsoft\.icon)/);
  expect(Array.from((await faviconResponse.body()).subarray(0, 4))).toEqual([0, 0, 1, 0]);

  const appleIconResponse = await request.get("/apple-icon.png");
  expect(appleIconResponse.ok()).toBeTruthy();
  expect(appleIconResponse.headers()["content-type"]).toContain("image/png");

  const logoResponse = await request.get("/images/brand/serifil-logo-512.png");
  expect(logoResponse.ok()).toBeTruthy();
  expect(logoResponse.headers()["content-type"]).toContain("image/png");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBeTruthy();
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-Agent: *");
  expect(robots).toContain("Allow: /");
  expect(robots).toContain("Sitemap: https://serifil.com/sitemap.xml");

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBeTruthy();
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("<loc>https://serifil.com/pt/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/en/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/pt/servicos/sacos-tnt/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/en/servicos/non-woven-bags/</loc>");
  expect(sitemap).toContain('hreflang="pt-PT"');
  expect(sitemap).toContain('hreflang="en"');
  expect(sitemap).toContain('hreflang="x-default"');
  expect(sitemap).toContain("<image:loc>https://serifil.com/images/hero-serigrafia.webp</image:loc>");
  expect(sitemap).toContain("<image:loc>https://serifil.com/og.jpg</image:loc>");

  const rootResponse = await request.get("/");
  const rootHtml = await rootResponse.text();
  expect(rootHtml).toContain('"@type":"WebSite"');
  expect(rootHtml).toContain('"alternateName":["Serifil","Serifil Serigrafia","Serifil Guimarães","serifil.com"]');
  expect(rootHtml).toContain('"publisher":{"@id":"https://serifil.com/#business"}');

  await page.goto("/pt/");
  const structuredDataText = await page.locator('script[type="application/ld+json"]').textContent();
  const structuredData = JSON.parse(structuredDataText ?? "{}") as {
    "@type": string;
    "@id": string;
    email: string;
    sameAs: string[];
    alternateName: string[];
    taxID: string;
    vatID: string;
    knowsAbout: string[];
    logo: { url: string; width: number; height: number };
    address: { addressRegion: string };
    contactPoint: { telephone: string; availableLanguage: string[] };
    hasOfferCatalog: { itemListElement: Array<{ itemOffered: { name: string } }> };
  };

  expect(structuredData["@type"]).toBe("LocalBusiness");
  expect(structuredData["@id"]).toBe("https://serifil.com/#business");
  expect(structuredData.email).toBe("geral@serifil.com");
  expect(structuredData.sameAs).toContain("https://www.instagram.com/serifil_serigrafia/");
  expect(structuredData.alternateName).toContain("Serifil Guimarães");
  expect(structuredData.taxID).toBe("250796210");
  expect(structuredData.vatID).toBe("PT250796210");
  expect(structuredData.knowsAbout).toContain("Serigrafia");
  expect(structuredData.logo.url).toBe("https://serifil.com/images/brand/serifil-logo-512.png");
  expect(structuredData.logo.width).toBe(512);
  expect(structuredData.logo.height).toBe(512);
  expect(structuredData.address.addressRegion).toBe("Braga");
  expect(structuredData.contactPoint.telephone).toBe("+351 910 508 706");
  expect(structuredData.contactPoint.availableLanguage).toEqual(["Portuguese", "English"]);
  expect(structuredData.hasOfferCatalog.itemListElement).toHaveLength(6);
  expect(structuredData.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe("Sacos em PVC, tecido e TNT");
  expect(structuredData.hasOfferCatalog.itemListElement[2].itemOffered.name).toBe("Componentes para calçado");
});

const serviceRoutes = [
  {
    locale: "pt",
    path: "/pt/servicos/serigrafia-pvc/",
    alternate: "/en/servicos/pvc-screen-printing/",
    xDefault: "/pt/servicos/serigrafia-pvc/",
    heading: "Impressão em PVC, preparada para o suporte real.",
  },
  {
    locale: "pt",
    path: "/pt/servicos/serigrafia-tecido/",
    alternate: "/en/servicos/fabric-screen-printing/",
    xDefault: "/pt/servicos/serigrafia-tecido/",
    heading: "Impressão em tecido, pensada para a peça e para o uso.",
  },
  {
    locale: "pt",
    path: "/pt/servicos/sacos-tnt/",
    alternate: "/en/servicos/non-woven-bags/",
    xDefault: "/pt/servicos/sacos-tnt/",
    heading: "TNT: o tecido não tecido que também comunica a sua marca.",
  },
  {
    locale: "pt",
    path: "/pt/servicos/componentes-calcado/",
    alternate: "/en/servicos/footwear-components/",
    xDefault: "/pt/servicos/componentes-calcado/",
    heading: "Impressão adaptada a cada componente.",
  },
  {
    locale: "en",
    path: "/en/servicos/pvc-screen-printing/",
    alternate: "/pt/servicos/serigrafia-pvc/",
    xDefault: "/pt/servicos/serigrafia-pvc/",
    heading: "PVC printing, prepared for the actual substrate.",
  },
  {
    locale: "en",
    path: "/en/servicos/fabric-screen-printing/",
    alternate: "/pt/servicos/serigrafia-tecido/",
    xDefault: "/pt/servicos/serigrafia-tecido/",
    heading: "Fabric printing designed around the item and its use.",
  },
  {
    locale: "en",
    path: "/en/servicos/non-woven-bags/",
    alternate: "/pt/servicos/sacos-tnt/",
    xDefault: "/pt/servicos/sacos-tnt/",
    heading: "Non-woven material that carries your brand.",
  },
  {
    locale: "en",
    path: "/en/servicos/footwear-components/",
    alternate: "/pt/servicos/componentes-calcado/",
    xDefault: "/pt/servicos/componentes-calcado/",
    heading: "Printing adapted to each footwear component.",
  },
];

test("publica páginas de serviço bilingues com metadados e ligações recíprocas", async ({ page }) => {
  for (const route of serviceRoutes) {
    await page.goto(route.path);
    await expect(page.locator("html")).toHaveAttribute("lang", route.locale === "pt" ? "pt-PT" : "en");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(route.heading);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://serifil.com${route.path}`);
    await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", `https://serifil.com${route.xDefault}`);

    const alternateLanguage = route.locale === "pt" ? "en" : "pt-PT";
    await expect(page.locator(`link[hreflang="${alternateLanguage}"]`)).toHaveAttribute(
      "href",
      `https://serifil.com${route.alternate}`,
    );

    const structuredDataText = await page.locator('script[type="application/ld+json"]').textContent();
    const structuredData = JSON.parse(structuredDataText ?? "{}") as {
      "@graph": Array<{ "@type": string }>;
    };
    expect(structuredData["@graph"].some((item) => item["@type"] === "Service")).toBe(true);
    expect(structuredData["@graph"].some((item) => item["@type"] === "BreadcrumbList")).toBe(true);
  }
});

test("liga a página principal aos guias de materiais e explica TNT sem misturar idiomas", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.getByRole("link", { name: /Sacos em TNT/ }).first()).toHaveAttribute(
    "href",
    "/pt/servicos/sacos-tnt/",
  );
  await page.goto("/pt/servicos/sacos-tnt/");
  await expect(page.getByRole("heading", { name: "O que é TNT?" })).toBeVisible();
  await expect(page.getByText(/não é formada por tecelagem ou tricotagem/)).toBeVisible();

  await page.goto("/en/servicos/non-woven-bags/");
  await expect(page.getByRole("heading", { name: "What is a non-woven?" })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/\bTNT\b/);
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "pt" })).toHaveAttribute(
    "href",
    "/pt/servicos/sacos-tnt/",
  );
});

test("páginas de serviço não criam overflow horizontal nem sobreposição na galeria", async ({ page }) => {
  for (const viewport of [{ width: 320, height: 720 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    await page.goto("/pt/servicos/sacos-tnt/");
    const dimensions = await page.evaluate(() => ({
      viewport: window.innerWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
    expect(dimensions.body).toBeLessThanOrEqual(dimensions.viewport + 1);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/pt/servicos/serigrafia-pvc/");
  const galleryTitle = page.getByRole("heading", { name: "Transparência, cor e leitura." });
  const gallerySection = page.locator("section").filter({ has: galleryTitle });
  const titleBox = await galleryTitle.boundingBox();
  const firstImageBox = await gallerySection.locator("figure").first().boundingBox();
  expect(titleBox).not.toBeNull();
  expect(firstImageBox).not.toBeNull();
  expect((titleBox?.x ?? 0) + (titleBox?.width ?? 0)).toBeLessThan(firstImageBox?.x ?? 0);
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
  await expect(page).toHaveTitle("SERIFIL | PVC, Fabric and Non-Woven Screen Printing");
  await expect(page.getByText("SPECIALISTS IN SCREEN PRINTING AND CUSTOMISATION")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Footwear components" }).first()).toBeVisible();
  await expect(page.getByText(/insoles, vamps and other components/).first()).toBeVisible();
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
  await expect(page.getByText("Quotes via form, email, phone or WhatsApp")).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/en/");

  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "pt" }).click();
  await expect(page).toHaveURL(/\/pt\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
});

test("oferece atalhos de conteúdo e semântica acessível nos dois tipos de página", async ({ page, context }) => {
  await page.goto("/pt/");

  const homeSkipLink = page.getByRole("link", { name: "Saltar para o conteúdo" });
  await page.keyboard.press("Tab");
  await expect(homeSkipLink).toBeFocused();
  await homeSkipLink.press("Enter");
  await expect(page.locator("#conteudo-principal")).toBeFocused();
  await expect(page.getByRole("group", { name: /Especialidades da Serifil/ })).toHaveCount(1);

  const servicePage = await context.newPage();
  await servicePage.goto("/en/servicos/pvc-screen-printing/");
  const serviceSkipLink = servicePage.getByRole("link", { name: "Skip to content" });
  await servicePage.keyboard.press("Tab");
  await expect(serviceSkipLink).toBeFocused();
  await serviceSkipLink.press("Enter");
  await expect(servicePage.locator("#conteudo-principal")).toBeFocused();

  const contrastRatios = await servicePage.locator("section.bg-accent dd").evaluateAll((items) => {
    const luminance = (color: string) => {
      const [red, green, blue] = color.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
      const channels = [red, green, blue].map((channel) => {
        const value = channel / 255;
        return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };

    return items.map((item) => {
      const foreground = luminance(getComputedStyle(item).color);
      const section = item.closest("section");
      const background = luminance(getComputedStyle(section ?? item).backgroundColor);
      const lighter = Math.max(foreground, background);
      const darker = Math.min(foreground, background);
      return (lighter + 0.05) / (darker + 0.05);
    });
  });

  expect(contrastRatios.length).toBeGreaterThan(0);
  expect(Math.min(...contrastRatios)).toBeGreaterThanOrEqual(4.5);
  await servicePage.close();
});

test("apresenta uma página 404 personalizada, bilingue e não indexável", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  const response = await page.goto("/rota-inexistente-auditoria/");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Página não encontrada.");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Page not found.");
  await expect(page.getByRole("link", { name: "Continuar em português" })).toHaveAttribute("href", "/pt/");
  await expect(page.getByRole("link", { name: "Continue in English" })).toHaveAttribute("href", "/en/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(321);
});
