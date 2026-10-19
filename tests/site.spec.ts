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
  await expect(heading).toContainText("Serigrafia e impressão");
  await expect(heading).toContainText("industrial em");
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
  await page.getByLabel("Prazo pretendido").fill("2020-01-01");
  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(page.getByText("Escolha uma data a partir de hoje.")).toBeVisible();

  await page.getByLabel("Nome").fill("Empresa Exemplo");
  await page.getByLabel("E-mail").fill("producao@example.test");
  await page.getByLabel("Telefone").fill("000 000 000");
  await page.getByLabel("Serviço pretendido").selectOption({ label: "Serigrafia industrial" });
  await page.getByLabel("Quantidade aproximada").fill("500");
  await page.getByLabel("Material ou suporte").fill("TNT 80 gr");
  await page.getByLabel("Dimensões").fill("30 x 40 cm");
  await page.getByLabel("Número de cores").fill("1 cor");
  await page.getByLabel("Fornecimento do material").selectOption({ label: "Forneço o material" });
  await page.getByLabel("Prazo pretendido").fill("2030-12-20");
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

test("ferramenta de quadros desenha, resume e envia o pedido sem preços", async ({ page }) => {
  let submittedBody = "";
  await page.addInitScript(() => {
    localStorage.setItem("serifil_analytics_consent", "denied");
  });
  await page.route("https://formspree.io/f/xzdnyead", async (route) => {
    submittedBody = route.request().postData() ?? "";
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/pt/quadros/");
  await expect(page.locator("h1")).toHaveText("Quadros de serigrafia à medida Desenhe o seu quadro.");
  await expect(page.locator("main")).not.toContainText(/SERIFIL (fabrica|produz)|fabricamos/i);
  await expect(page.locator("main")).not.toContainText(/€|\beuros?\b/i);

  const summary = page.getByRole("region", { name: "O seu pedido" });
  const widthInput = page.getByLabel("Largura (cm)");
  await expect(summary).toContainText("50 × 60 cm");

  await page.getByRole("button", { name: "40 × 50", exact: true }).click();
  await expect(summary).toContainText("40 × 50 cm");
  await page.getByRole("button", { name: "Rodar" }).click();
  await expect(summary).toContainText("50 × 40 cm");
  await widthInput.fill("70");
  await expect(summary).toContainText("70 × 40 cm");
  await widthInput.fill("5");
  await widthInput.press("Enter");
  await expect(widthInput).toHaveValue("20");

  const handle = page.locator('[data-handle="resize"] rect').last();
  await handle.scrollIntoViewIfNeeded();
  const box = await handle.boundingBox();
  expect(box).not.toBeNull();
  const start = { x: (box?.x ?? 0) + (box?.width ?? 0) / 2, y: (box?.y ?? 0) + (box?.height ?? 0) / 2 };
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x + 120, start.y, { steps: 6 });
  await page.mouse.up();
  await expect(widthInput).not.toHaveValue("20");
  await expect(page.getByLabel("Altura (cm)")).toHaveValue("40");

  await page.getByLabel("Retelagem").check();
  await page.getByLabel("90T").check();
  await page.getByLabel("Gravar o desenho na tela").check();
  const colours = page.locator("#screen-colours");
  const quantity = page.locator("#screen-quantity");
  await page.getByRole("button", { name: "Mais cores" }).click();
  await page.getByRole("button", { name: "Mais cores" }).click();
  await expect(colours).toHaveText("3");
  await expect(quantity).toHaveText("3");
  await expect(page.getByRole("button", { name: "Menos quadros" })).toBeDisabled();
  await expect(page.getByText("Um quadro por cor: com 3 cores são precisos pelo menos 3 quadros.")).toBeVisible();
  await page.getByRole("button", { name: "Menos cores" }).click();
  await expect(quantity).toHaveText("2");
  await page.getByRole("button", { name: "Mais cores" }).click();
  await page.getByRole("button", { name: "Mais quadros" }).click();
  await expect(quantity).toHaveText("4");
  await page.getByRole("button", { name: "Menos cores" }).click();
  await expect(quantity).toHaveText("4");
  await page.getByRole("button", { name: "Mais cores" }).click();
  await expect(colours).toHaveText("3");
  await expect(quantity).toHaveText("4");
  await expect(summary).toContainText("Retelagem");
  await expect(summary).toContainText("90T");
  await expect(summary).toContainText("Com gravação, 3 cores");

  const whatsappHref = await summary.getByRole("link", { name: "Enviar resumo por WhatsApp" }).getAttribute("href");
  expect(whatsappHref).toContain("https://wa.me/351910508706?text=");
  expect(decodeURIComponent(whatsappHref?.split("text=")[1] ?? "")).toContain("Malha: 90T");
  expect(decodeURIComponent(whatsappHref?.split("text=")[1] ?? "")).toContain("Envio o desenho a seguir nesta conversa.");
  await expect(summary.getByText("Envie o desenho para a gravação")).toBeVisible();
  const emailHref = await summary.getByRole("link", { name: "Enviar desenho por e-mail" }).getAttribute("href");
  expect(emailHref).toMatch(/^mailto:geral@serifil\.com\?subject=/);
  const emailBody = decodeURIComponent(emailHref?.split("body=")[1] ?? "");
  expect(emailBody).toContain("Malha: 90T");
  expect(emailBody).toContain("Anexe o ficheiro do desenho antes de enviar.");
  await expect(page.getByText("O desenho não segue por este formulário")).toBeVisible();

  const form = page.getByRole("form", { name: "Pedido de quadros de serigrafia" });
  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(form.getByText("Indique o seu nome.")).toBeVisible();
  await form.getByLabel("Nome").fill("Estamparia Exemplo");
  await form.getByLabel("E-mail").fill("quadros@example.test");
  await form.getByLabel("Telefone").fill("000 000 000");
  await form.getByLabel(/Autorizo o tratamento/).check();
  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(page.getByRole("heading", { name: "Pedido enviado." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Enviar desenho por e-mail" })).toHaveCount(2);
  expect(submittedBody).toContain("quadro_malha");
  expect(submittedBody).toContain("90T");
  expect(submittedBody).toContain("Retelagem");

  await page.goto("/en/quadros/");
  await expect(page.locator("h1")).toHaveText("Custom screen printing frames Draw your screen.");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/en/quadros/");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute("href", "https://serifil.com/pt/quadros/");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "pt" })).toHaveAttribute(
    "href",
    "/pt/quadros/",
  );
  await expect(page.getByRole("region", { name: "Your request" })).toContainText("50 × 60 cm");

  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/pt/quadros/");
  const dimensions = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
  }));
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport + 1);
});

test("quadros de serigrafia publicados: nos serviços, indexáveis e com dados estruturados", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/pt/quadros/", "/en/quadros/"]) {
    expect(sitemap).toContain(`<loc>https://serifil.com${path}</loc>`);
  }
  expect(sitemap).toContain("https://serifil.com/images/quadros/quadros-serigrafia-og.jpg");
  expect((await request.get("/images/quadros/quadros-serigrafia-og.jpg")).status()).toBe(200);

  const cases = [
    {
      locale: "pt",
      servicePage: "/pt/servicos/sacos-tnt/",
      guide: "/pt/guias/fotolitos/",
      name: "Quadros de serigrafia",
      title: "Quadros de Serigrafia à Medida e Retelagem | SERIFIL",
    },
    {
      locale: "en",
      servicePage: "/en/servicos/non-woven-bags/",
      guide: "/en/guias/film-positives/",
      name: "Screen printing frames",
      title: "Custom Screen Printing Frames and Re-meshing | SERIFIL",
    },
  ];

  for (const item of cases) {
    const path = `/${item.locale}/quadros/`;
    await page.goto(`/${item.locale}/`);
    const listLink = page.locator(`#servicos nav a[href="${path}"]`);
    await expect(listLink).toHaveCount(1);
    await expect(listLink).toContainText("06");
    await expect(listLink).toContainText(item.name);
    const homeData = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(homeData).toContain(`https://serifil.com${path}`);

    for (const source of [item.servicePage, item.guide]) {
      await page.goto(source);
      await expect(page.locator(`main a[href="${path}"]`), source).toHaveCount(1);
    }

    await page.goto(path);
    await expect(page).toHaveTitle(item.title);
    expect(item.title.length).toBeLessThanOrEqual(60);
    expect(((await page.locator('meta[name="description"]').getAttribute("content")) ?? "").length).toBeLessThanOrEqual(160);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index, follow/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://serifil.com${path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://serifil.com/images/quadros/quadros-serigrafia-og.jpg",
    );

    const data = JSON.parse((await page.locator('script[type="application/ld+json"]').first().textContent()) ?? "{}");
    const graph: Array<Record<string, unknown>> = data["@graph"];
    expect(graph.map((node) => node["@type"])).toEqual(
      expect.arrayContaining(["WebPage", "Service", "FAQPage", "BreadcrumbList"]),
    );
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    expect(faq?.mainEntity).toHaveLength(6);
    expect(JSON.stringify(faq)).not.toContain("](/");

    await expect(page.locator(`main a[href="${item.guide}"]`)).toHaveCount(1);
    await expect(page.locator('main img[src="/images/guias/telas-serigrafia.webp"]')).toHaveAttribute(
      "alt",
      /serigrafia|screen printing/i,
    );
  }
});

test("publica apenas contactos configurados e o WhatsApp correto", async ({ page }) => {
  await page.goto("/pt/#contacto");
  const emailLinks = page.locator('a[href="mailto:geral@serifil.com"]');
  const phoneLinks = page.locator('a[href="tel:+351910508706"]');
  const whatsappLinks = page.locator('a[href^="https://wa.me/351910508706"]');
  const instagramLinks = page.locator('a[href="https://www.instagram.com/serifil_serigrafia/"]');
  const facebookLinks = page.locator('a[href="https://www.facebook.com/profile.php?id=61594421650535"]');
  await expect(emailLinks).toHaveCount(3);
  await expect(phoneLinks).toHaveCount(3);
  await expect(whatsappLinks).toHaveCount(2);
  await expect(instagramLinks).toHaveCount(2);
  await expect(facebookLinks).toHaveCount(2);
  const contact = page.locator("#contacto");
  await expect(contact.getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
  await expect(contact.getByRole("link", { name: "@serifil_serigrafia", exact: true })).toHaveAttribute("href", "https://www.instagram.com/serifil_serigrafia/");
  await expect(contact.getByRole("link", { name: "Serifil - Serigrafia Industrial", exact: true })).toHaveAttribute("href", "https://www.facebook.com/profile.php?id=61594421650535");
  await expect(page.locator("footer").getByRole("link", { name: "Facebook Serifil - Serigrafia Industrial" })).toHaveAttribute("href", "https://www.facebook.com/profile.php?id=61594421650535");
  await expect(contact.getByText("+351 910 508 706", { exact: true })).toHaveCount(1);
  await expect(contact.getByRole("link", { name: "Ligar +351 910 508 706" })).toBeVisible();
  await expect(contact.getByRole("link", { name: "WhatsApp +351 910 508 706" })).toBeVisible();
  await expect(page.getByText("Orçamentos por formulário, e-mail, telefone ou WhatsApp")).toBeVisible();
  await expect(whatsappLinks.first()).toHaveAttribute("target", "_blank");
  await expect(instagramLinks.first()).toHaveAttribute("target", "_blank");
  await expect(facebookLinks.first()).toHaveAttribute("target", "_blank");
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
  await expect(page.locator("#contacto").getByRole("link", { name: "Serifil - Serigrafia Industrial", exact: true })).toHaveAttribute("href", "https://www.facebook.com/profile.php?id=61594421650535");
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
  await expect(portugueseLegal.getByText("Serigrafia, impressão industrial e personalização")).toBeVisible();
  await expect(portugueseLegal.getByText("Travessa Bernardino Jordão 90, Urgezes, 4810-480 Guimarães, Portugal")).toBeVisible();
  await expect(portugueseLegal.getByRole("link", { name: "geral@serifil.com" })).toHaveAttribute("href", "mailto:geral@serifil.com");
  await expect(portugueseLegal.getByRole("link", { name: "+351 910 508 706" })).toHaveAttribute("href", "tel:+351910508706");
  await expect(portugueseLegal.getByText("E-mail", { exact: true })).toHaveCount(1);

  await page.goto("/en/");
  const englishLegal = page.locator("footer details");
  await englishLegal.locator("summary").click();
  await expect(englishLegal.getByText("Legal information")).toBeVisible();
  await expect(englishLegal.getByText("Screen printing, industrial printing and customisation")).toBeVisible();
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
  await expect(page).toHaveTitle("Serigrafia e Impressão Industrial em Guimarães | SERIFIL");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "SERIFIL – Serigrafia e impressão industrial em Guimarães. Impressão em PVC, têxtil, TNT, componentes, sacos, porta-fatos e outros suportes para empresas.",
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    "Serigrafia e impressão industrial para empresas em Guimarães. Impressão em PVC, têxtil, TNT e componentes, sobre materiais fornecidos pelo cliente ou em projetos completos.",
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

test("mostra pré-visualização de partilha na raiz e nos serviços e liga o DTF aos quadros", async ({ page, request }) => {
  // A raiz escolhe o idioma no cliente: lê-se o HTML exportado, antes do redirecionamento.
  const rootHtml = await (await request.get("/")).text();
  expect(rootHtml).toContain('<meta property="og:image" content="https://serifil.com/og.jpg"/>');
  expect(rootHtml).toContain('<link rel="alternate" hrefLang="x-default" href="https://serifil.com/pt/"/>');
  expect(rootHtml).toContain('<meta name="robots" content="noindex, follow"/>');

  for (const [path, image] of [
    ["/pt/servicos/serigrafia-pvc/", "pvc-og.jpg"],
    ["/en/servicos/footwear-components/", "footwear-og.jpg"],
  ]) {
    await page.goto(path);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `https://serifil.com/images/servicos/${image}`);
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    expect((await request.get(`/images/servicos/${image}`)).ok()).toBeTruthy();
    await expect(page).toHaveTitle(/ \| SERIFIL$/);
  }

  for (const locale of ["pt", "en"]) {
    await page.goto(`/${locale}/dtf/`);
    await expect(page.locator(`main a[href="/${locale}/quadros/"]`)).toHaveCount(1);
    await page.goto(`/${locale}/quadros/`);
    await expect(page.locator(`main a[href="/${locale}/dtf/"]`)).toHaveCount(1);
  }
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
    address: { addressRegion: string; postalCode: string };
    contactPoint: { telephone: string; availableLanguage: string[] };
    hasOfferCatalog: { itemListElement: Array<{ itemOffered: { name: string } }> };
  };

  expect(structuredData["@type"]).toBe("LocalBusiness");
  expect(structuredData["@id"]).toBe("https://serifil.com/#business");
  expect(structuredData.email).toBe("geral@serifil.com");
  expect(structuredData.sameAs).toContain("https://www.instagram.com/serifil_serigrafia/");
  expect(structuredData.sameAs).toContain("https://www.facebook.com/profile.php?id=61594421650535");
  expect(structuredData.alternateName).toContain("Serifil Guimarães");
  expect(structuredData.taxID).toBe("250796210");
  expect(structuredData.vatID).toBe("PT250796210");
  expect(structuredData.knowsAbout).toContain("Serigrafia");
  expect(structuredData.logo.url).toBe("https://serifil.com/images/brand/serifil-logo-512.png");
  expect(structuredData.logo.width).toBe(512);
  expect(structuredData.logo.height).toBe(512);
  expect(structuredData.address.addressRegion).toBe("Braga");
  expect(structuredData.address.postalCode).toBe("4810-480");
  expect(structuredData.contactPoint.telephone).toBe("+351 910 508 706");
  expect(structuredData.contactPoint.availableLanguage).toEqual(["Portuguese", "English"]);
  // Oito serviços de impressão e, no fim, os quadros de serigrafia e o DTF ao metro (com páginas próprias).
  expect(structuredData.hasOfferCatalog.itemListElement).toHaveLength(10);
  expect(structuredData.hasOfferCatalog.itemListElement[8].itemOffered.url).toBe("https://serifil.com/pt/quadros/");
  expect(structuredData.hasOfferCatalog.itemListElement[9].itemOffered.url).toBe("https://serifil.com/pt/dtf/");
  expect(structuredData.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe("Serigrafia Industrial");
  expect(structuredData.hasOfferCatalog.itemListElement.map((offer) => offer.itemOffered.name)).toEqual(
    expect.arrayContaining(["Impressão em PVC", "Impressão em Componentes", "Sacos Personalizados", "Porta-fatos e Capas"]),
  );
  expect(structuredData.knowsAbout).toContain("Impressão industrial");
  expect(structuredData.knowsAbout).toContain("Quadros de serigrafia");
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
  await expect(page.getByText("SERIGRAFIA E IMPRESSÃO INDUSTRIAL PARA EMPRESAS", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A sua produção. A nossa impressão." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Serigrafia Industrial" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Sacos Personalizados" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "O cliente fornece o material" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Projeto completo" })).toBeVisible();
  await expect(page.locator("#setores")).toContainText("Calçado");
  await expect(page.locator("#setores")).toContainText("Têxtil-lar");
  await expect(page.getByText(/palmilhas, palas e outros componentes/).first()).toBeVisible();
  await expect(page.getByLabel("Serviço pretendido").locator("option")).toHaveText([
    "Selecione uma opção",
    "Serigrafia industrial",
    "Impressão em PVC",
    "Impressão em têxtil",
    "Impressão em TNT",
    "Impressão em componentes",
    "Sacos personalizados",
    "Porta-fatos e capas",
    "Projetos especiais e produção personalizada",
    "Outro",
  ]);
  await expect(page.getByLabel("Fornecimento do material").locator("option")).toHaveText([
    "Selecione uma opção",
    "Forneço o material",
    "Preciso do fornecimento do material",
    "A definir",
  ]);

  await page.goto("/en/");
  await expect(page).toHaveTitle("Industrial Screen Printing in Guimarães | SERIFIL");
  await expect(page.getByText("INDUSTRIAL SCREEN PRINTING FOR BUSINESSES")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Component Printing" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "The client supplies the material" })).toBeVisible();
  await expect(page.locator("#setores")).toContainText("Home textiles");
  await expect(page.getByText(/insoles, vamps and other components/).first()).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/\bTNT\b/);
  await expect(page.getByLabel("Required service").locator("option")).toHaveText([
    "Select an option",
    "Industrial screen printing",
    "PVC printing",
    "Textile printing",
    "Non-woven printing",
    "Component printing",
    "Custom bags",
    "Garment bags and covers",
    "Special projects and custom production",
    "Other",
  ]);
});

test("publica a versão inglesa completa e permite trocar de idioma", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Industrial screen");
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

test("publica a secção de guias em português com artigo completo, SEO e ligações válidas", async ({ page, request }) => {
  await page.goto("/pt/");
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "Guias" })).toHaveAttribute(
    "href",
    "/pt/guias/",
  );
  await page.goto("/en/");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Guides" })).toHaveAttribute(
    "href",
    "/en/guias/",
  );

  await page.goto("/pt/guias/");
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-PT");
  await expect(page).toHaveTitle("Guias de Serigrafia | SERIFIL");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Guias de Serigrafia");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/");
  await page.getByRole("link", { name: "Fotolitos: o que são e para que servem na serigrafia" }).click();
  await expect(page).toHaveURL(/\/pt\/guias\/fotolitos\/$/);

  const title = "Fotolitos: o que são e para que servem na serigrafia";
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  await expect(page).toHaveTitle(`${title} | SERIFIL`);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /fotolito/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/fotolitos/");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://serifil.com/images/guias/mesa-exposicao.webp");

  for (const heading of [
    "O que é um fotolito?",
    "Fotolito e tela: qual é a diferença?",
    "Como as cores e a preparação influenciam o orçamento",
    "Que ficheiros deve enviar",
    "Repetir uma encomenda: o que considerar",
  ]) {
    await expect(page.getByRole("heading", { level: 2, name: heading })).toBeVisible();
  }

  await expect(page.locator("body")).not.toContainText(/oficina da SERIFIL|instalações da SERIFIL/i);
  await expect(page.getByText("Preparação da impressão").first()).toBeVisible();

  const main = page.locator("main");
  await expect(main.getByRole("link", { name: "Pedir orçamento" })).toHaveAttribute("href", "/pt/#orcamento");
  await expect(main.getByRole("link", { name: "serigrafia em PVC", exact: true })).toHaveAttribute("href", "/pt/servicos/serigrafia-pvc/");
  await expect(main.getByRole("link", { name: "WhatsApp +351 910 508 706" })).toHaveAttribute(
    "href",
    `https://wa.me/351910508706?text=${encodeURIComponent("Olá SERIFIL! Queria pedir um orçamento. O meu projeto é:")}`,
  );

  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}") as {
    "@graph": Array<{ "@type": string; headline?: string; datePublished?: string; inLanguage?: string }>;
  };
  const article = structuredData["@graph"].find((item) => item["@type"] === "Article");
  expect(article?.headline).toBe(title);
  expect(article?.datePublished).toBe("2026-09-14");
  expect(article?.inLanguage).toBe("pt-PT");
  expect(structuredData["@graph"].some((item) => item["@type"] === "BreadcrumbList")).toBe(true);

  const images = main.locator("img");
  expect(await images.count()).toBeGreaterThanOrEqual(6);
  for (let index = 0; index < await images.count(); index += 1) {
    await images.nth(index).scrollIntoViewIfNeeded();
    await expect(images.nth(index)).toHaveJSProperty("complete", true);
  }
  expect(await images.evaluateAll((items) => items.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);

  const invalidAnchors = await main.locator('a[href^="#"]').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href") ?? "").filter((href) => !document.querySelector(href)),
  );
  expect(invalidAnchors).toEqual([]);

  const internalPaths = await main.locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link.getAttribute("href") ?? "").split("#")[0]))],
  );
  for (const path of internalPaths) {
    expect((await request.get(path)).ok(), path).toBe(true);
  }

  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://serifil.com/pt/guias/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/pt/guias/fotolitos/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/en/guias/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/en/guias/film-positives/</loc>");
  expect(sitemap).toContain("<image:loc>https://serifil.com/images/guias/filmadora-fotolitos.webp</image:loc>");
});

test("guias não criam overflow horizontal e mantêm a navegação móvel", async ({ page }) => {
  for (const viewport of [{ width: 320, height: 720 }, { width: 375, height: 812 }, { width: 1024, height: 768 }, { width: 1440, height: 900 }]) {
    await page.setViewportSize(viewport);
    for (const path of ["/pt/guias/", "/pt/guias/fotolitos/"]) {
      await page.goto(path);
      const dimensions = await page.evaluate(() => ({
        viewport: window.innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(dimensions.document, `${path} ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      expect(dimensions.body, `${path} ${viewport.width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/pt/guias/fotolitos/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const mobileNavigation = page.getByRole("navigation", { name: "Navegação móvel" });
  await expect(mobileNavigation.getByRole("link", { name: "Serviços" })).toHaveAttribute("href", "/pt/#servicos");
  await expect(mobileNavigation.getByRole("link", { name: "Guias" })).toHaveAttribute("href", "/pt/guias/");
});

test("publica o guia em inglês com hreflang recíproco e ligações válidas", async ({ page, request }) => {
  await page.goto("/pt/guias/fotolitos/");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/guias/film-positives/");
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).getByRole("link", { name: "en", exact: true })).toHaveAttribute(
    "href",
    "/en/guias/film-positives/",
  );

  await page.goto("/en/guias/film-positives/");
  const title = "Film positives: what they are and what they do in screen printing";
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://serifil.com/en/guias/film-positives/");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/fotolitos/");
  await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/fotolitos/");
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "en_GB");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "pt" })).toHaveAttribute(
    "href",
    "/pt/guias/fotolitos/",
  );
  await expect(page.locator("main").getByRole("link", { name: "Request a quote" })).toHaveAttribute("href", "/en/#orcamento");
  await expect(page.locator("body")).not.toContainText(/\bTNT\b|fotolito|Pedir orçamento|SERIFIL workshop/);

  const structuredData = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? "{}") as {
    "@graph": Array<{ "@type": string; headline?: string; inLanguage?: string }>;
  };
  const article = structuredData["@graph"].find((item) => item["@type"] === "Article");
  expect(article?.headline).toBe(title);
  expect(article?.inLanguage).toBe("en");

  const internalPaths = await page.locator("main").locator('a[href^="/"]').evaluateAll((links) =>
    [...new Set(links.map((link) => (link.getAttribute("href") ?? "").split("#")[0]))],
  );
  for (const path of internalPaths) {
    expect((await request.get(path)).ok(), path).toBe(true);
  }

  await page.goto("/en/guias/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Screen Printing Guides");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/");
  await expect(page.getByRole("link", { name: title })).toHaveAttribute("href", "/en/guias/film-positives/");
});

test("mantém menus consistentes: item ativo, contacto rápido e sem sobreposição nas duas línguas", async ({ page }) => {
  await page.goto("/pt/");
  await expect(page.getByRole("navigation", { name: "Navegação principal" }).locator('a[aria-current="true"]')).toHaveCount(0);

  const cases = [
    { path: "/pt/servicos/sacos-tnt/", navigation: "Navegação principal", active: "Serviços" },
    { path: "/pt/guias/", navigation: "Navegação principal", active: "Guias" },
    { path: "/pt/guias/fotolitos/", navigation: "Navegação principal", active: "Guias" },
    { path: "/en/servicos/non-woven-bags/", navigation: "Main navigation", active: "Services" },
    { path: "/en/guias/film-positives/", navigation: "Main navigation", active: "Guides" },
    { path: "/pt/quadros/", navigation: "Navegação principal", active: "Serviços" },
    { path: "/en/quadros/", navigation: "Main navigation", active: "Services" },
  ];
  for (const item of cases) {
    await page.goto(item.path);
    const navigation = page.getByRole("navigation", { name: item.navigation });
    await expect(navigation.locator('a[aria-current="true"]'), item.path).toHaveCount(1);
    await expect(navigation.getByRole("link", { name: item.active, exact: true }), item.path).toHaveAttribute("aria-current", "true");
    await expect(page.locator('div.fixed a[href^="https://wa.me/351910508706"]'), item.path).toBeVisible();
    await expect(page.locator('div.fixed a[href="tel:+351910508706"]'), item.path).toBeVisible();
  }

  const labels = async (path: string, navigation: string) => {
    await page.goto(path);
    return page.getByRole("navigation", { name: navigation }).locator("a").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")?.replace(/^\/(pt|en)\//, "/") ?? ""),
    );
  };
  expect((await labels("/pt/guias/fotolitos/", "Navegação principal")).slice(0, 6)).toEqual(
    (await labels("/en/guias/film-positives/", "Main navigation")).slice(0, 6),
  );

  for (const path of ["/pt/", "/en/"]) {
    for (const width of [1024, 1280, 1440]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const navigation = path === "/pt/" ? "Navegação principal" : "Main navigation";
      const brandBox = await page.locator("header > div > a").first().boundingBox();
      const navigationBox = await page.getByRole("navigation", { name: navigation }).boundingBox();
      expect((brandBox?.x ?? 0) + (brandBox?.width ?? 0), `${path} ${width}px`).toBeLessThanOrEqual((navigationBox?.x ?? 0) - 16);
    }
  }
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

test("calculadora de DTF estima o filme, resume e envia o pedido", async ({ page }) => {
  let submittedBody = "";
  await page.addInitScript(() => {
    localStorage.setItem("serifil_analytics_consent", "denied");
  });
  await page.route("https://formspree.io/f/xzdnyead", async (route) => {
    submittedBody = route.request().postData() ?? "";
    await route.fulfill({ status: 200, contentType: "application/json", body: "{}" });
  });

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/pt/dtf/");
  await expect(page.locator("h1")).toHaveText("DTF ao metro · Estampagem de t-shirts Encha o seu metro.");
  // O filme é impresso por um parceiro: o site não o diz nem afirma que a SERIFIL o imprime.
  await expect(page.locator("main")).not.toContainText(/parceiro|imprimimos/i);

  const summary = page.getByRole("region", { name: "O seu pedido" });
  // Começa com um só desenho: 10 A4, dois por fila. A quarta fila já não cabe no primeiro metro
  // e passa para a segunda folha, para nenhum desenho ficar cortado.
  await expect(page.locator('[id^="dtf-design-"]')).toHaveCount(1);
  await expect(page.getByRole("button", { name: "Remover desenho 1" })).toHaveCount(0);
  await expect(summary).toContainText("1,70 m");
  await expect(summary).toContainText("15,30 € + IVA");
  // Os 7 € por metro são o custo do parceiro: nunca aparecem no site.
  await expect(page.locator("main")).not.toContainText(/7 €|7,00 €/);

  // Um desenho novo fica selecionado; cada um seleciona-se no cartão ou nas peças do filme.
  await expect(page.locator("#dtf-design-1")).toHaveClass(/border-accent/);
  await page.getByRole("button", { name: "Peito 10 × 10" }).click();
  await expect(page.locator("#dtf-design-2")).toHaveClass(/border-accent/);
  await page.locator("#dtf-design-1 p").first().click();
  await expect(page.locator("#dtf-design-1")).toHaveClass(/border-accent/);
  await expect(page.locator("#dtf-design-2")).not.toHaveClass(/border-accent/);

  await page.getByRole("button", { name: "Remover desenho 1" }).click();
  await page.getByLabel("Quantidade").fill("20");
  await page.getByLabel("Quantidade").press("Enter");
  await expect(summary).toContainText("0,50 m");
  await expect(summary).toContainText("4,50 € + IVA");
  await expect(page.getByText("Cabem 45 num metro.")).toBeVisible();

  // Mínimo de meio metro, mesmo com um só desenho.
  await page.getByLabel("Quantidade").fill("1");
  await page.getByLabel("Quantidade").press("Enter");
  await expect(summary).toContainText("0,50 m");
  await expect(summary).toContainText("4,50 € + IVA");

  // A partir de 10 m, o metro passa a 8,50 €.
  await page.getByLabel("Largura (cm)").fill("30");
  await page.getByLabel("Largura (cm)").press("Enter");
  await page.getByLabel("Altura (cm)").fill("42");
  await page.getByLabel("Altura (cm)").press("Enter");
  await page.getByLabel("Quantidade").fill("33");
  await page.getByLabel("Quantidade").press("Enter");
  await expect(summary).toContainText("11,00 m");
  await expect(summary).toContainText("93,50 € + IVA");
  await page.getByLabel("Largura (cm)").fill("10");
  await page.getByLabel("Largura (cm)").press("Enter");
  await page.getByLabel("Altura (cm)").fill("10");
  await page.getByLabel("Altura (cm)").press("Enter");
  await page.getByLabel("Quantidade").fill("20");
  await page.getByLabel("Quantidade").press("Enter");

  await page.getByRole("button", { name: "A4 21 × 30" }).click();
  await expect(page.getByLabel("Largura (cm)").last()).toHaveValue("21");
  await page.getByLabel("Quantidade").last().fill("4");
  await page.getByLabel("Quantidade").last().press("Enter");
  await expect(summary).toContainText("21 × 30 cm × 4");

  await page.getByLabel("Filme e aplicação").check();
  await expect(summary).toContainText("Sob orçamento");

  const whatsappHref = await summary.getByRole("link", { name: "Enviar resumo por WhatsApp" }).getAttribute("href");
  expect(decodeURIComponent(whatsappHref?.split("text=")[1] ?? "")).toContain("Aplicação: Sob orçamento");

  const form = page.getByRole("form", { name: "Pedido de DTF ao metro" });
  await form.getByLabel("Nome").fill("Loja Exemplo");
  await form.getByLabel("E-mail").fill("dtf@example.test");
  await form.getByLabel("Telefone").fill("000 000 000");
  await form.getByLabel(/Autorizo o tratamento/).check();
  await form.getByRole("button", { name: "Enviar pedido" }).click();
  await expect(page.getByRole("heading", { name: "Pedido enviado." })).toBeVisible();
  expect(submittedBody).toContain("dtf_desenhos");
  expect(submittedBody).toContain("Filme e aplicação");

  await page.goto("/en/dtf/");
  await expect(page.locator("h1")).toHaveText("DTF transfers · T-shirt printing Fill your metre.");
  await expect(page.getByRole("region", { name: "Your request" })).toContainText("€15.30 + VAT");
});

test("DTF ao metro publicado: nos serviços, indexável e no sitemap", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of ["/pt/dtf/", "/en/dtf/"]) {
    expect(sitemap).toContain(`<loc>https://serifil.com${path}</loc>`);
  }

  for (const item of [
    { locale: "pt", name: "DTF ao metro", servicePage: "/pt/servicos/serigrafia-tecido/" },
    { locale: "en", name: "DTF by the metre", servicePage: "/en/servicos/fabric-screen-printing/" },
  ]) {
    const path = `/${item.locale}/dtf/`;
    await page.goto(`/${item.locale}/`);
    const listLink = page.locator(`#servicos nav a[href="${path}"]`);
    await expect(listLink).toHaveCount(1);
    await expect(listLink).toContainText(item.name);

    await page.goto(item.servicePage);
    await expect(page.locator(`main nav a[href="${path}"]`)).toBeVisible();

    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://serifil.com${path}`);
  }
});

test("guia do DTF publicado em PT e EN, ligado à calculadora", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain("<loc>https://serifil.com/pt/guias/o-que-e-dtf/</loc>");
  expect(sitemap).toContain("<loc>https://serifil.com/en/guias/what-is-dtf/</loc>");

  await page.goto("/pt/guias/");
  await expect(page.locator('main a[href="/pt/guias/o-que-e-dtf/"]').first()).toBeVisible();

  await page.goto("/pt/guias/o-que-e-dtf/");
  await expect(page.locator("h1")).toHaveText("DTF: o que é e como funciona a impressão DTF em têxtil");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/guias/what-is-dtf/");
  await expect(page.locator('main a[href="/pt/dtf/"]').first()).toBeVisible();
  // O guia não diz quem imprime o filme nem mostra o custo de 7 € por metro.
  await expect(page.locator("main")).not.toContainText(/parceiro|7 €|7,00 €/i);

  await page.goto("/pt/dtf/");
  await expect(page.locator('main a[href="/pt/guias/o-que-e-dtf/"]')).toHaveCount(1);

  await page.goto("/en/guias/what-is-dtf/");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/o-que-e-dtf/");
  await expect(page.locator("main")).not.toContainText(/partner|€7(?!\d)/i);
});

test("páginas de serviço ligam aos guias; tecido liga ao DTF", async ({ page }) => {
  for (const path of ["/pt/servicos/serigrafia-pvc/", "/pt/servicos/sacos-tnt/", "/pt/servicos/componentes-calcado/"]) {
    await page.goto(path);
    await expect(page.locator('main a[href="/pt/guias/fotolitos/"]')).toHaveCount(1);
    await expect(page.locator('main a[href="/pt/guias/o-que-e-dtf/"]')).toHaveCount(0);
  }

  await page.goto("/pt/servicos/serigrafia-tecido/");
  await expect(page.locator('main a[href="/pt/guias/fotolitos/"]')).toHaveCount(1);
  // O guia do DTF aparece nos guias relacionados e na pergunta sobre poucas peças a cores.
  await expect(page.locator('main a[href="/pt/guias/o-que-e-dtf/"]')).toHaveCount(2);
  await page.getByText("E para poucas peças com muitas cores?").click();
  await expect(page.getByRole("link", { name: "guia do DTF" })).toBeVisible();

  await page.goto("/en/servicos/fabric-screen-printing/");
  await expect(page.locator('main a[href="/en/guias/what-is-dtf/"]')).toHaveCount(2);
  await expect(page.locator('main a[href="/en/guias/film-positives/"]')).toHaveCount(1);
});

test("a raiz envia os motores de busca para /pt/ e os visitantes para o seu idioma", async ({ browser }) => {
  const googlebot = await browser.newContext({
    userAgent: "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    locale: "en-US",
  });
  const botPage = await googlebot.newPage();
  await botPage.goto("/");
  await expect(botPage).toHaveURL(/\/pt\/$/);
  await googlebot.close();

  const visitor = await browser.newContext({ locale: "en-GB" });
  const visitorPage = await visitor.newPage();
  await visitorPage.goto("/");
  await expect(visitorPage).toHaveURL(/\/en\/$/);
  await visitor.close();
});

test("estampagem de t-shirts e guia da serigrafia publicados e ligados", async ({ page, request }) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const path of [
    "/pt/servicos/estampagem-t-shirts/",
    "/en/servicos/t-shirt-printing/",
    "/pt/guias/o-que-e-serigrafia/",
    "/en/guias/what-is-screen-printing/",
  ]) {
    expect(sitemap).toContain(`<loc>https://serifil.com${path}</loc>`);
  }

  await page.goto("/pt/");
  await expect(page.locator('#servicos nav a[href="/pt/servicos/estampagem-t-shirts/"]')).toHaveCount(1);

  await page.goto("/pt/servicos/estampagem-t-shirts/");
  await expect(page.locator("h1")).toContainText("T-shirts estampadas em serigrafia.");
  await expect(page).toHaveTitle("Estampagem de T-shirts em Serigrafia em Guimarães | SERIFIL");
  // As duas técnicas aparecem em separado, com a serigrafia (feita pela SERIFIL) em destaque.
  const techniques = page.locator("section[aria-labelledby=\"tecnicas\"] article");
  await expect(techniques).toHaveCount(2);
  await expect(techniques.first()).toContainText("Feita na SERIFIL");
  await expect(techniques.first()).toContainText("Serigrafia");
  await expect(techniques.nth(1)).toContainText("DTF");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://serifil.com/images/servicos/tshirts-og.jpg");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/servicos/t-shirt-printing/");
  // Só serigrafia e DTF: a SERIFIL não faz bordado nem sublimação.
  await expect(page.locator("main")).not.toContainText(/bordad|sublima/i);
  await expect(page.locator('main a[href="/pt/guias/o-que-e-serigrafia/"]').first()).toBeAttached();
  await expect(page.locator('main a[href="/pt/guias/o-que-e-dtf/"]').first()).toBeAttached();
  await expect(page.locator('main nav a[href="/pt/dtf/"]')).toBeVisible();

  await page.goto("/pt/guias/o-que-e-serigrafia/");
  await expect(page.locator("h1")).toHaveText("Serigrafia: o que é e como funciona");
  await expect(page.locator('link[hreflang="en"]')).toHaveAttribute("href", "https://serifil.com/en/guias/what-is-screen-printing/");
  for (const href of ["/pt/guias/fotolitos/", "/pt/guias/o-que-e-dtf/", "/pt/dtf/", "/pt/quadros/", "/pt/servicos/estampagem-t-shirts/"]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeAttached();
  }

  await page.goto("/pt/servicos/serigrafia-pvc/");
  await expect(page.locator('main a[href="/pt/guias/o-que-e-serigrafia/"]')).toHaveCount(1);

  await page.goto("/en/guias/what-is-screen-printing/");
  await expect(page.locator('link[hreflang="pt-PT"]')).toHaveAttribute("href", "https://serifil.com/pt/guias/o-que-e-serigrafia/");
});
