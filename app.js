/* Yanmar Amplify consolidated application scripts. */

/* ===== Source: ym-final-board-upgrade.js ===== */
/* Yanmar Amplify V11 - one clean enhancement layer, no duplicate tools */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  const iconPaths = {
    home: '<path class="ym-i-line" d="M3.5 11.2 12 4l8.5 7.2"/><path class="ym-i-line" d="M5.5 10.5V20h13v-9.5M9.5 20v-6h5v6"/>',
    knowledge: '<path class="ym-i-line" d="M4 5.5h5.2c1.5 0 2.8.8 2.8 2.2V20c0-1.4-1.3-2.2-2.8-2.2H4zM20 5.5h-5.2c-1.5 0-2.8.8-2.8 2.2V20c0-1.4 1.3-2.2 2.8-2.2H20z"/><path class="ym-i-red" d="M7 9h2.5M14.5 9H17"/>',
    generator: '<rect class="ym-i-line" x="3" y="6.5" width="18" height="10.5" rx="1.5"/><path class="ym-i-line" d="M6 9.5h7v4H6zM16 9.5h2v4h-2M6 17v2M18 17v2M4.5 20h15"/><circle class="ym-i-fill" cx="17" cy="11.5" r=".9"/>',
    pump: '<circle class="ym-i-line" cx="10.5" cy="13" r="5"/><path class="ym-i-line" d="M10.5 8V5h7v3M15.5 13H21v5h-4M5.5 13H3"/><path class="ym-i-red" d="M8.5 15.5c2.8.5 4.7-1.3 4.7-4"/>',
    engine: '<path class="ym-i-line" d="M5 8h3V5h8v3h3v10H5zM3 11h2M19 11h2M8 18v2M16 18v2"/><rect class="ym-i-red" x="8.5" y="10.5" width="7" height="4.5" rx=".7"/>',
    models: '<path class="ym-i-line" d="M6 5h12M6 12h12M6 19h12"/><circle class="ym-i-red" cx="4" cy="5" r=".8"/><circle class="ym-i-red" cx="4" cy="12" r=".8"/><circle class="ym-i-red" cx="4" cy="19" r=".8"/>',
    visual: '<rect class="ym-i-line" x="3.5" y="5" width="17" height="14" rx="1.5"/><circle class="ym-i-red" cx="8.2" cy="9.2" r="1.4"/><path class="ym-i-line" d="m5.5 17 4.3-4.5 2.8 2.7 2.1-2 3.8 3.8"/>',
    assets: '<path class="ym-i-line" d="M3.5 7h6l1.5 2h9.5v10H3.5zM3.5 7V5h6l1.5 2"/><path class="ym-i-red" d="M12 11v5m0 0-2-2m2 2 2-2"/>',
    document: '<path class="ym-i-line" d="M6 3.5h8l4 4V21H6z"/><path class="ym-i-line" d="M14 3.5V8h4M9 12h6M9 16h6"/><path class="ym-i-red" d="M9 19h4"/>',
    gallery: '<rect class="ym-i-line" x="3.5" y="5" width="17" height="14" rx="1.5"/><path class="ym-i-line" d="m5.5 17 4-4 3 3 2-2 4 3"/><circle class="ym-i-red" cx="16.5" cy="9" r="1.3"/>',
    comparison: '<rect class="ym-i-line" x="3.5" y="5" width="7" height="14" rx="1"/><rect class="ym-i-line" x="13.5" y="5" width="7" height="14" rx="1"/><path class="ym-i-red" d="M7 9h1.5M7 13h1.5M15.5 9H17M15.5 13H17"/>',
    calculator: '<rect class="ym-i-line" x="5" y="3.5" width="14" height="17" rx="1.5"/><path class="ym-i-line" d="M8 6.5h8v3H8zM8 13h1M12 13h1M16 13h1M8 17h1M12 17h1"/><path class="ym-i-red" d="M16 16v2M15 17h2"/>',
    copy: '<path class="ym-i-line" d="M5 3.5h10l4 4V21H5zM15 3.5V8h4M8 11h6M8 15h4"/><path class="ym-i-red" d="m13.5 18.5 4.8-4.8 1.5 1.5-4.8 4.8-2 .5z"/>',
    activation: '<path class="ym-i-line" d="M5 5h14v14H5zM8 9h8M8 13h5"/><path class="ym-i-red" d="m13.5 16 1.5 1.5 3-3"/>',
    channel: '<path class="ym-i-line" d="m4 10 10-4v12L4 14zM4 10v4M8 15l1.5 4h3"/><path class="ym-i-red" d="M17 9c1 .7 1.5 1.7 1.5 3S18 14.3 17 15M19.5 7c1.7 1.3 2.5 3 2.5 5s-.8 3.7-2.5 5"/>',
    calendar: '<rect class="ym-i-line" x="4" y="5.5" width="16" height="14.5" rx="1.5"/><path class="ym-i-line" d="M4 9.5h16M8 3.5v4M16 3.5v4"/><path class="ym-i-red" d="M8 13h3v3H8z"/>',
    local: '<path class="ym-i-line" d="M12 21s6-5.3 6-11a6 6 0 1 0-12 0c0 5.7 6 11 6 11Z"/><circle class="ym-i-red" cx="12" cy="10" r="2"/>',
    kpi: '<path class="ym-i-line" d="M4 20h16M6 17v-6h3v6M11 17V7h3v10M16 17v-3h3v3"/><path class="ym-i-red" d="m6 8 5-3 4 3 4-4"/>',
    support: '<path class="ym-i-line" d="M5 13v-2a7 7 0 0 1 14 0v2M5 13H3.5v4H7v-6M19 13h1.5v4H17v-6M17 18c-1 1.5-2.5 2-5 2"/><circle class="ym-i-fill" cx="11" cy="20" r=".8"/>',
    feedback: '<path class="ym-i-line" d="M4 5h16v11H9l-4 4v-4H4z"/><path class="ym-i-red" d="m9 10 2 2 4-4"/>',
    share: '<circle class="ym-i-line" cx="6" cy="12" r="2.2"/><circle class="ym-i-line" cx="18" cy="6" r="2.2"/><circle class="ym-i-line" cx="18" cy="18" r="2.2"/><path class="ym-i-red" d="m8 11 7.8-4M8 13l7.8 4"/>',
    admin: '<path class="ym-i-line" d="m12 3 7 3v5c0 4.8-2.7 8-7 10-4.3-2-7-5.2-7-10V6z"/><path class="ym-i-red" d="m9 12 2 2 4-5"/>',
    region: '<circle class="ym-i-line" cx="11" cy="11" r="7.5"/><path class="ym-i-line" d="M3.5 11h15M11 3.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5M11 3.5c-2 2-3 4.5-3 7.5s1 5.5 3 7.5"/><path class="ym-i-red" d="M18 14.5c2 0 3.5 1.5 3.5 3.5 0 2-3.5 4-3.5 4s-3.5-2-3.5-4c0-2 1.5-3.5 3.5-3.5Z"/>',
    distributor: '<path class="ym-i-line" d="M4 9h16v11H4zM3 9l2-5h14l2 5M8 20v-6h5v6"/><path class="ym-i-red" d="M3 9c0 1.5 1 2.5 2.5 2.5S8 10.5 8 9c0 1.5 1 2.5 2.5 2.5S13 10.5 13 9c0 1.5 1 2.5 2.5 2.5S18 10.5 18 9c0 1.5 1 2.5 2.5 2.5"/>',
    usage: '<path class="ym-i-line" d="M3.5 12h3l2-5 3.5 10 3-7 2 2h3.5"/><path class="ym-i-red" d="M4 20h16"/>',
    scope: '<path class="ym-i-line" d="M4 19V9h5v10M10 19V5h5v14M16 19v-7h4v7M3 19h18"/><path class="ym-i-red" d="M5 6h3M17 9h3"/>',
    roles: '<circle class="ym-i-line" cx="9" cy="8" r="3"/><path class="ym-i-line" d="M3.5 20c.5-4 2.3-6 5.5-6s5 2 5.5 6M16 8.5a2.5 2.5 0 1 1 1 4.8M16 15c2.8.2 4.2 1.8 4.5 5"/><path class="ym-i-red" d="M15 4h6v4"/>',
    bell: '<path class="ym-i-line" d="M6 16h12l-1.5-2V9a4.5 4.5 0 0 0-9 0v5zM10 19h4"/><circle class="ym-i-fill" cx="18.5" cy="5.5" r="2"/>',
    approval: '<path class="ym-i-line" d="M7 3.5h10V7h3v14H4V7h3zM9 3.5V7h6V3.5"/><path class="ym-i-red" d="m8 14 2.5 2.5L16 11"/>',
    analytics: '<path class="ym-i-line" d="M4 20h16M6 17v-5h3v5M11 17V6h3v11M16 17V9h3v8"/><path class="ym-i-red" d="m6 8 5-4 4 3 4-3"/>',
    results: '<circle class="ym-i-line" cx="12" cy="12" r="8"/><circle class="ym-i-line" cx="12" cy="12" r="4"/><path class="ym-i-red" d="m12 12 7-7M16 5h3v3"/>',
    export: '<path class="ym-i-line" d="M5 14v6h14v-6M12 3v12M8 11l4 4 4-4"/><path class="ym-i-red" d="M7 20h10"/>',
    roadmap: '<path class="ym-i-line" d="M5 5h14v14H5zM8 9h8M8 13h5"/><circle class="ym-i-fill" cx="16" cy="16" r="2"/>',
    activity: '<circle class="ym-i-line" cx="12" cy="12" r="8"/><path class="ym-i-line" d="M12 7v5l3 2"/><path class="ym-i-red" d="M5 5 3 7"/>',
    review: '<path class="ym-i-line" d="M7 4h10v3h3v14H4V7h3zM9 4v3h6V4"/><path class="ym-i-red" d="m8 14 2 2 5-5M8 18h8"/>',
    add: '<path class="ym-i-line" d="M6 3.5h9l4 4V21H6zM15 3.5V8h4"/><path class="ym-i-red" d="M12 11v6M9 14h6"/>',
    library: '<path class="ym-i-line" d="M4 5h5v14H4zM10 5h5v14h-5zM16 5h4v14h-4z"/><path class="ym-i-red" d="M5.5 9h2M11.5 9h2M17 9h2"/>',
    version: '<path class="ym-i-line" d="M5 7h10l4 4v9H5zM15 7v4h4"/><path class="ym-i-red" d="M3 11a8 8 0 0 1 3-6M3 11l-1.5-2M3 11l2-1"/>',
    search: '<circle class="ym-i-line" cx="10.5" cy="10.5" r="6.5"/><path class="ym-i-red" d="m15.5 15.5 5 5"/>',
    moon: '<path class="ym-i-line" d="M18.5 16.5A8 8 0 0 1 8 5.5a8.2 8.2 0 1 0 10.5 11Z"/>',
    menu: '<path class="ym-i-line" d="M4 7h16M4 12h16M4 17h16"/>',
    arrow: '<path class="ym-i-line" d="M5 12h14M14 7l5 5-5 5"/>'
  };

  function svg(name, className = "") {
    return '<svg class="' + className + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (iconPaths[name] || iconPaths.document) + "</svg>";
  }

  function track(action, detail = "", category = "Portal") {
    try {
      if (typeof window.addUsageEvent === "function") {
        window.addUsageEvent(action, detail, category);
      }
    } catch (error) {
      /* Tracking remains optional in the standalone file. */
    }
  }

  function cleanLegacyLayers() {
    [
      "#ym-master-search",
      "#ym-comparison-tool",
      "#ym-tco-tool",
      "#ym-copy-tool",
      "#ym-connected-workflow",
      "#ym-admin-result-bridge",
      "#template-studio-modal",
      ".template-studio-modal"
    ].forEach((selector) => $$(selector).forEach((node) => node.remove()));

    $$("#demo .translation-status").forEach((node) => node.remove());
    const seenUpgradeIds = new Set();
    $$("[id^='ym-']").forEach((node) => {
      if (seenUpgradeIds.has(node.id)) node.remove();
      else seenUpgradeIds.add(node.id);
    });

  }

  const iconAssignments = [
    ['[data-page="home"]', "home"],
    ['[data-page="demo"]', "knowledge"],
    ['[data-page="ydg"]', "generator"],
    ['[data-page="ydg-models"]', "models"],
    ['[data-page="ydp"]', "pump"],
    ['[data-page="ydp-models"]', "models"],
    ['[data-page="lseries"]', "engine"],
    ['[data-page="lseries-models"]', "models"],
    ['[data-page="visuals"]', "visual"],
    ['[data-page="assets"]', "assets"],
    ['[data-page="brochure-library"]', "document"],
    ['[data-page="visual-workspace"]', "gallery"],
    ['[data-page="competitive-intelligence"]', "comparison"],
    ['[data-page="tco-calculator"]', "calculator"],
    ['[data-page="website-copy"]', "copy"],
    ['[data-page="activation"]', "activation"],
    ['[data-page="channel-playbook"]', "channel"],
    ['[data-page="calendar"]', "calendar"],
    ['[data-page="local"]', "local"],
    ['[data-page="kpis"]', "kpi"],
    ['[data-page="support"]', "support"],
    ['[data-page="feedback"]', "feedback"],
    ['[data-page="contribute"]', "share"],
    ['[data-admin-target="admin"]', "admin"],
    ['[data-admin-target="admin-region-scope"]', "region"],
    ['[data-admin-target="admin-calendar-manager"]', "calendar"],
    ['[data-admin-target="admin-distributor-manager"]', "distributor"],
    ['[data-admin-target="admin-regional-status"]', "kpi"],
    ['[data-admin-target="admin-usage-tracking"]', "usage"],
    ['[data-admin-target="admin-comparison-tool"]', "scope"],
    ['[data-admin-tool-target="competitive-intelligence"]', "comparison"],
    ['[data-admin-tool-target="tco-calculator"]', "calculator"],
    ['[data-admin-target="admin-role-access"]', "roles"],
    ['[data-admin-target="admin-notification-center"]', "bell"],
    ['[data-admin-target="admin-approval-workflow"]', "approval"],
    ['[data-admin-target="admin-campaign-analytics"]', "analytics"],
    ['[data-admin-target="admin-campaign-results"]', "results"],
    ['[data-admin-target="admin-export-center"]', "export"],
    ['[data-admin-target="admin-demo-readiness"]', "roadmap"],
    ['[data-admin-target="admin-activity-logbook"]', "activity"],
    ['[data-admin-target="admin-contribution-review"]', "review"],
    ['[data-admin-target="admin-content-manager"]', "add"],
    ['[data-admin-target="admin-content-library"]', "library"],
    ['[data-admin-target="admin-version-control"]', "version"]
  ];

  function setNavIcon(button, iconName) {
    if (!button || !button.classList.contains("nav-button")) return;
    let holder = $(".nav-icon", button);
    if (!holder) {
      holder = document.createElement("span");
      holder.className = "nav-icon";
      button.prepend(holder);
    }
    holder.innerHTML = svg(iconName);
    holder.dataset.ymIcon = iconName;
  }

  function applyIcons() {
    $$('[data-page] > .nav-icon, [data-admin-target] > .nav-icon, [data-admin-tool-target] > .nav-icon').forEach((icon) => {
      if (!icon.parentElement?.classList.contains("nav-button")) icon.remove();
    });
    iconAssignments.forEach(([selector, iconName]) => {
      $$(selector).forEach((button) => setNavIcon(button, iconName));
    });

    const adminComparison = $('[data-admin-target="admin-comparison-tool"] .nav-text');
    if (adminComparison) adminComparison.textContent = "Scope performance";

    const visualWorkspace = $('[data-page="visual-workspace"] .nav-text');
    if (visualWorkspace) visualWorkspace.textContent = "Gallery / assets";

    const contentAssets = $('[data-page="assets"] .nav-text');
    if (contentAssets) contentAssets.textContent = "Content library";

    const productCardIcons = [
      ['#home .product-card[data-page="ydg"]', "generator"],
      ['#home .product-card[data-page="ydp"]', "pump"],
      ['#home .product-card[data-page="lseries"]', "engine"],
      ['#home .product-card[data-page="support"]', "support"],
      ['#home .product-card[data-page="contribute"]', "share"]
    ];
    productCardIcons.forEach(([selector, iconName]) => {
      $$(selector).forEach((card) => {
        const box = $(".icon-box", card);
        if (box) box.innerHTML = svg(iconName);
      });
    });

    $$("button, article, .product-card").forEach((element) => {
      const text = (element.textContent || "").trim();
      if (/^Documents?$|^Documenten$/i.test(text) || /brochure library/i.test(text)) {
        const box = $(".icon-box", element);
        if (box) box.innerHTML = svg("document");
      }
    });
  }

  function decorateHeaderButton(button, iconName) {
    if (!button) return;
    const plainText = (button.textContent || "").trim();
    button.innerHTML = svg(iconName, "ym-header-icon") + '<span class="ym-button-label">' + esc(plainText) + "</span>";
    button.title = plainText;
  }

  function decorateHeader() {
    const languageLabel = $("#language-control-label");
    if (languageLabel && !$(".ym-language-label-icon", languageLabel)) {
      languageLabel.insertAdjacentHTML("afterbegin", svg("region", "ym-language-label-icon"));
    }
    decorateHeaderButton($("#theme-toggle"), "moon");
    decorateHeaderButton($("#admin-toggle"), "admin");

    ["theme-toggle", "admin-toggle"].forEach((id) => {
      const button = $("#" + id);
      if (!button || button.dataset.ymDecorated) return;
      button.dataset.ymDecorated = "true";
      button.addEventListener("click", () => {
        setTimeout(() => {
          decorateHeaderButton(button, id === "theme-toggle" ? "moon" : "admin");
          updateSearchIndex();
        }, 80);
      });
    });

    const language = $("#language-select");
    if (language && !language.dataset.ymDecorated) {
      language.dataset.ymDecorated = "true";
      language.addEventListener("change", () => setTimeout(() => {
        decorateHeaderButton($("#theme-toggle"), "moon");
        decorateHeaderButton($("#admin-toggle"), "admin");
        updateSearchIndex();
      }, 120));
    }
  }

  let searchItems = [];
  let searchActiveIndex = -1;

  const searchAliases = {
    home: "dashboard welcome start overview",
    demo: "portal knowledge training tutorial help how to guide",
    ydg: "generator diesel power YDG products toolkit",
    "ydg-models": "generator models selector specifications",
    ydp: "water pump diesel dewatering YDP toolkit",
    "ydp-models": "pump models selector flow head",
    lseries: "engine motor L-Series industrial",
    "lseries-models": "engine models selector",
    visuals: "campaign images social posts gallery",
    assets: "content library downloads materials",
    "brochure-library": "documents brochure pdf arabic brochure datasheet",
    "visual-workspace": "gallery assets images visuals marine post",
    "competitive-intelligence": "comparison builder competitor sheet evidence",
    "tco-calculator": "TCO total cost ownership calculator sheet",
    "website-copy": "SEO SEA Google website copy meta title description",
    activation: "starter activation playbook workflow",
    "channel-playbook": "channel playbook LinkedIn email website social",
    calendar: "campaign calendar planning month schedule",
    local: "distributor example local case",
    kpis: "measurement KPI results reporting",
    support: "request support localization help",
    feedback: "feedback report issue idea",
    contribute: "share content assets results upload contribution"
  };

  function isAdminMode() {
    return document.body.classList.contains("admin-mode") ||
      document.body.classList.contains("admin-view") ||
      ($("#admin")?.classList.contains("active") && $(".admin-sidebar")?.offsetParent !== null);
  }

  function updateSearchIndex() {
    const admin = isAdminMode();
    const selector = admin
      ? ".admin-sidebar .nav-button[data-admin-target], .admin-sidebar .nav-button[data-admin-tool-target]"
      : ".sidebar:not(.admin-sidebar) .nav-button[data-page]";
    searchItems = $$(selector).map((button) => {
      const label = ($(".nav-text", button)?.textContent || button.textContent || "").trim();
      const target = button.dataset.page || button.dataset.adminTarget || button.dataset.adminToolTarget || "";
      const group = button.closest(".admin-sidebar") ? "Admin" : "Distributor";
      const aliases = searchAliases[target] || "";
      return {
        button,
        label,
        target,
        group,
        iconName: $(".nav-icon", button)?.dataset.ymIcon || (admin ? "admin" : "document"),
        haystack: (label + " " + target + " " + aliases).toLowerCase()
      };
    }).filter((item) => item.label);
  }

  function scoreSearch(item, query) {
    const normalized = query.toLowerCase().trim();
    const tokens = normalized.split(/\s+/).filter(Boolean);
    if (!tokens.length) return 1;
    if (!tokens.every((token) => item.haystack.includes(token))) return 0;
    let score = tokens.reduce((sum, token) => sum + (item.label.toLowerCase().startsWith(token) ? 8 : 3), 0);
    if (item.label.toLowerCase().includes(normalized)) score += 15;
    if (item.haystack.startsWith(normalized)) score += 8;
    return score;
  }

  function renderSearchResults(query = "") {
    const results = $("#ym-global-search-results");
    if (!results) return;
    updateSearchIndex();
    const ranked = searchItems
      .map((item) => ({ item, score: scoreSearch(item, query) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label))
      .slice(0, 8);
    searchActiveIndex = -1;
    results.innerHTML = ranked.length ? ranked.map(({ item }, index) => (
      '<button type="button" class="ym-search-result" data-result-index="' + index + '">' +
        '<span class="nav-icon">' + svg(item.iconName) + "</span>" +
        "<span><strong>" + esc(item.label) + "</strong><small>" + esc(item.group) + "</small></span>" +
        '<span class="ym-result-arrow">›</span>' +
      "</button>"
    )).join("") : '<div class="ym-search-empty">No matching portal function found.</div>';

    ranked.forEach(({ item }, index) => {
      const resultButton = $('[data-result-index="' + index + '"]', results);
      resultButton?.addEventListener("click", () => {
        item.button.click();
        $("#ym-global-search-input").value = "";
        results.classList.remove("show");
        track("Portal search navigation", item.label, item.group);
      });
    });
    results.classList.add("show");
  }

  function setupSearch() {
    const tools = $(".header-tools");
    if (!tools || $("#ym-global-search")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "ym-global-search";
    wrapper.id = "ym-global-search";
    wrapper.innerHTML =
      '<div class="ym-global-search-shell">' +
        svg("search", "ym-global-search-icon") +
        '<input class="ym-global-search-input" id="ym-global-search-input" type="search" autocomplete="off" aria-label="Search products, documents and tools" placeholder="Search..." />' +
        '<button class="ym-search-clear" id="ym-search-clear" type="button" aria-label="Clear search">×</button>' +
      "</div>" +
      '<div class="ym-search-results" id="ym-global-search-results" role="listbox"></div>';
    tools.prepend(wrapper);

    const input = $("#ym-global-search-input");
    const results = $("#ym-global-search-results");
    input.addEventListener("focus", () => renderSearchResults(input.value));
    input.addEventListener("input", () => renderSearchResults(input.value));
    input.addEventListener("keydown", (event) => {
      const buttons = $$(".ym-search-result", results);
      if (event.key === "ArrowDown" && buttons.length) {
        event.preventDefault();
        searchActiveIndex = (searchActiveIndex + 1) % buttons.length;
      } else if (event.key === "ArrowUp" && buttons.length) {
        event.preventDefault();
        searchActiveIndex = (searchActiveIndex - 1 + buttons.length) % buttons.length;
      } else if (event.key === "Enter" && searchActiveIndex >= 0) {
        event.preventDefault();
        buttons[searchActiveIndex]?.click();
      } else if (event.key === "Escape") {
        results.classList.remove("show");
        return;
      } else {
        return;
      }
      buttons.forEach((button, index) => button.classList.toggle("active", index === searchActiveIndex));
      buttons[searchActiveIndex]?.scrollIntoView({ block: "nearest" });
    });
    $("#ym-search-clear").addEventListener("click", () => {
      input.value = "";
      input.focus();
      renderSearchResults("");
    });
    document.addEventListener("click", (event) => {
      if (!wrapper.contains(event.target)) results.classList.remove("show");
    });
    updateSearchIndex();
  }

  function setupResponsiveNavigation() {
    if (document.body.dataset.ymResponsiveNav === "true") return;
    const tools = $(".header-tools");
    const distributorSidebar = $(".layout > .sidebar:not(.admin-sidebar)");
    const adminSidebar = $("main > .admin-sidebar");
    if (!tools || !distributorSidebar || !adminSidebar) return;

    document.body.dataset.ymResponsiveNav = "true";
    distributorSidebar.id = distributorSidebar.id || "ym-distributor-navigation";
    adminSidebar.id = adminSidebar.id || "ym-admin-navigation";

    const toggle = document.createElement("button");
    toggle.className = "header-action secondary ym-nav-toggle";
    toggle.id = "ym-nav-toggle";
    toggle.type = "button";
    toggle.title = "Open portal navigation";
    toggle.setAttribute("aria-label", "Open portal navigation");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = svg("menu", "ym-header-icon");
    tools.prepend(toggle);

    const backdrop = document.createElement("button");
    backdrop.className = "ym-nav-backdrop";
    backdrop.type = "button";
    backdrop.tabIndex = -1;
    backdrop.setAttribute("aria-label", "Close portal navigation");
    document.body.appendChild(backdrop);

    const activeSidebar = () => document.body.classList.contains("admin-mode") ? adminSidebar : distributorSidebar;
    const sync = () => {
      const open = document.body.classList.contains("ym-nav-open");
      const target = activeSidebar();
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-controls", target.id);
      toggle.setAttribute("aria-label", open ? "Close portal navigation" : "Open portal navigation");
      toggle.title = open ? "Close navigation" : "Open navigation";
    };
    const close = () => {
      document.body.classList.remove("ym-nav-open");
      sync();
    };

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("ym-nav-open");
      sync();
      if (document.body.classList.contains("ym-nav-open")) {
        requestAnimationFrame(() => $(".nav-button.active", activeSidebar())?.focus({ preventScroll: true }));
      }
    });
    backdrop.addEventListener("click", close);
    document.addEventListener("click", (event) => {
      if (event.target.closest(".sidebar .nav-button, #admin-back-button")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && document.body.classList.contains("ym-nav-open")) close();
    });

    const wideScreen = window.matchMedia("(min-width: 1201px)");
    const handleWidth = (event) => {
      if (event.matches) close();
    };
    if (typeof wideScreen.addEventListener === "function") wideScreen.addEventListener("change", handleWidth);
    else wideScreen.addListener(handleWidth);

    let lastAdminMode = document.body.classList.contains("admin-mode");
    const roleObserver = new MutationObserver((mutations) => {
      if (!mutations.some((mutation) => mutation.attributeName === "class")) return;
      const currentAdminMode = document.body.classList.contains("admin-mode");
      if (currentAdminMode !== lastAdminMode) {
        lastAdminMode = currentAdminMode;
        close();
      } else {
        sync();
      }
    });
    roleObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    sync();
  }

  const routeAliases = {
    campaigns: "visuals",
    "ydg-models": "ydg",
    "ydp-models": "ydp",
    "lseries-models": "lseries",
    "brochure-library": "assets",
    "visual-workspace": "assets"
  };

  function setGuaranteedRole(adminMode, sharedAdminTool = false) {
    document.body.classList.toggle("admin-mode", adminMode);
    document.body.classList.toggle("admin-shared-tool-mode", adminMode && sharedAdminTool);
    document.body.classList.remove("ym-nav-open");
    syncRoleShell();
    updateSearchIndex();
    const navToggle = $("#ym-nav-toggle");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function guaranteedScrollTo(target) {
    if (!target) return false;
    const headerHeight = $(".topbar")?.getBoundingClientRect().height || 72;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 14;
    const top = Math.max(0, Math.round(targetTop));
    const performScroll = () => {
      try {
        window.scrollTo({ top, behavior: "auto" });
      } catch (error) {
        window.scrollTo(0, top);
      }
      const scroller = document.scrollingElement || document.documentElement;
      if (scroller && Math.abs(scroller.scrollTop - top) > 8) scroller.scrollTop = top;
      target.classList.add("ym-route-arrival");
      window.setTimeout(() => target.classList.remove("ym-route-arrival"), 520);
    };
    requestAnimationFrame(performScroll);
    window.setTimeout(performScroll, 90);
    return true;
  }

  function activateGuaranteedPage(target, adminRoute, sharedAdminTool = false) {
    const page = adminRoute && !sharedAdminTool
      ? $("#admin")
      : (target.matches?.("main > .page") ? target : target.closest?.("main > .page"));
    if (!page) return false;

    $$("main > .page").forEach((candidate) => {
      const active = candidate === page;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-hidden", String(!active));
    });
    page.removeAttribute("aria-hidden");
    return true;
  }

  function openGuaranteedRoute(rawTarget, adminRoute = false, sharedAdminTool = false) {
    const targetId = routeAliases[rawTarget] || rawTarget;
    const target = document.getElementById(targetId);
    if (!target) return false;

    setGuaranteedRole(adminRoute, sharedAdminTool);
    activateGuaranteedPage(target, adminRoute, sharedAdminTool);
    if (adminRoute) {
      $$(".admin-sidebar .nav-button[data-admin-target]").forEach((button) => {
        const active = !sharedAdminTool && (button.dataset.adminTarget === targetId || (targetId === "admin" && button.dataset.adminTarget === "admin"));
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      $$(".admin-sidebar .nav-button[data-admin-tool-target]").forEach((button) => {
        const active = sharedAdminTool && button.dataset.adminToolTarget === targetId;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
    } else {
      $$(".sidebar:not(.admin-sidebar) .nav-button[data-page]").forEach((button) => {
        const active = (routeAliases[button.dataset.page] || button.dataset.page) === targetId;
        button.classList.toggle("active", active);
        if (active) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
      const activeLabel = $("#active-label");
      const activeButton = $('.sidebar:not(.admin-sidebar) .nav-button[data-page="' + rawTarget + '"]') ||
        $('.sidebar:not(.admin-sidebar) .nav-button[data-page="' + targetId + '"]');
      if (activeLabel && activeButton) activeLabel.textContent = $(".nav-text", activeButton)?.textContent.trim() || targetId;
    }

    guaranteedScrollTo(target);
    track("Opened portal section", targetId, sharedAdminTool ? "Admin shared tool" : (adminRoute ? "Admin" : "Distributor"));
    return true;
  }

  function setupGuaranteedNavigation() {
    if (document.body.dataset.ymGuaranteedNavigation === "true") return;
    document.body.dataset.ymGuaranteedNavigation = "true";

    document.addEventListener("click", (event) => {
      const adminToolButton = event.target.closest("[data-admin-tool-target]");
      if (adminToolButton) {
        event.preventDefault();
        openGuaranteedRoute(adminToolButton.dataset.adminToolTarget, true, true);
        return;
      }

      const adminButton = event.target.closest("[data-admin-target]");
      if (adminButton) {
        event.preventDefault();
        openGuaranteedRoute(adminButton.dataset.adminTarget, true);
        return;
      }

      const distributorButton = event.target.closest("[data-page]");
      if (distributorButton) {
        event.preventDefault();
        openGuaranteedRoute(distributorButton.dataset.page, false);
        return;
      }

      const homeCard = event.target.closest("[data-ym-home-target]");
      if (homeCard) {
        event.preventDefault();
        openGuaranteedRoute(homeCard.dataset.ymHomeTarget, false);
      }
    }, true);

    const adminToggle = $("#admin-toggle");
    if (adminToggle) {
      adminToggle.addEventListener("click", () => {
        adminToggle.dataset.ymRoleBefore = String(document.body.classList.contains("admin-mode"));
      }, true);
      adminToggle.addEventListener("click", () => {
        const before = adminToggle.dataset.ymRoleBefore === "true";
        window.setTimeout(() => {
          let actual = document.body.classList.contains("admin-mode");
          if (actual === before) {
            setGuaranteedRole(!before);
            actual = !before;
          }
          guaranteedScrollTo($(actual ? "#admin" : "#home"));
        }, 30);
      });
    }
  }

  function improveHome() {
    const heroMain = $("#home .hero-main");
    if (!heroMain || $(".ym-welcome-banner", heroMain)) return;
    const eyebrow = $(":scope > .eyebrow", heroMain);
    const heading = $(":scope > h1", heroMain);
    const copy = $(":scope > .hero-copy", heroMain);
    const banner = document.createElement("div");
    banner.className = "ym-welcome-banner";
    const copyWrap = document.createElement("div");
    copyWrap.className = "ym-welcome-copy";
    if (eyebrow) {
      eyebrow.textContent = "Distributor dashboard";
      copyWrap.appendChild(eyebrow);
    }
    if (heading) {
      heading.innerHTML = 'Welcome back,<span>Distributor</span>';
      copyWrap.appendChild(heading);
    }
    if (copy) {
      copy.textContent = "Everything you need to activate products, create local content and report results in one connected workspace.";
      copyWrap.appendChild(copy);
    }
    const visual = document.createElement("div");
    visual.className = "ym-welcome-visual";
    visual.innerHTML =
      '<div class="ym-welcome-globe">' + svg("region") + "</div>" +
      '<div><strong>Active distributor context</strong><span id="ym-welcome-distributor">Yanmar Europe Distributor</span><span>Market strategy, language and actions update together.</span></div>';
    banner.append(copyWrap, visual);
    heroMain.prepend(banner);

    const productGrid = $("#home .product-grid");
    if (productGrid) {
      productGrid.classList.add("ym-category-grid");
      productGrid.innerHTML = [
        { target: "ydg", image: "assets/YDG5500-white-background.png", title: "Generators", text: "YDG products and support", alt: "Yanmar YDG diesel generator" },
        { target: "ydp", image: "assets/YDP-white-background.png", title: "Water pumps", text: "YDP products and support", alt: "Yanmar YDP diesel water pump" },
        { target: "lseries", image: "assets/L-series-white-background.png", title: "Engines", text: "L-Series products and support", alt: "Yanmar L-Series diesel engine" },
        { target: "brochure-library", icon: "document", title: "Documents", text: "Brochures and datasheets", alt: "Product documents" }
      ].map((item) => (
        '<button class="product-card ym-category-card" type="button" data-ym-home-target="' + item.target + '">' +
          '<div class="ym-category-media">' + (item.image
            ? '<img src="' + item.image + '" alt="' + item.alt + '" loading="eager" decoding="async" />'
            : '<span class="ym-category-document">' + svg(item.icon) + '</span>') + "</div>" +
          "<h2>" + item.title + "</h2><p>" + item.text + '</p><span class="card-link">Open ›</span>' +
        "</button>"
      )).join("");
      if (!productGrid.previousElementSibling?.classList.contains("ym-category-label")) {
        productGrid.insertAdjacentHTML("beforebegin", '<p class="label ym-category-label">Product categories</p>');
      }
    }

    const distributorSearch = $("#distributor-search");
    const distributorSelect = $("#distributor-select");
    const update = () => {
      const output = $("#ym-welcome-distributor");
      const fullName = distributorSearch?.value || distributorSelect?.value || "Selected distributor";
      if (output) output.textContent = fullName;
      if (distributorSearch) distributorSearch.title = fullName;
    };
    distributorSearch?.addEventListener("change", update);
    distributorSearch?.addEventListener("input", update);
    distributorSelect?.addEventListener("change", update);
    update();
  }

  const distributorGuides = [
    { title: "Home dashboard", icon: "home", target: "home", purpose: "Start with the active campaign, recommended actions and distributor context.", steps: ["Confirm the distributor in the header.", "Review pending actions and active campaigns.", "Open the recommended toolkit or calendar item.", "Complete the activity and report the result."], why: "Keeps daily activation focused and avoids searching through the whole portal." },
    { title: "YDG Toolkit", icon: "generator", target: "ydg", purpose: "Use only generator-specific messages, models, assets and objections.", steps: ["Open YDG Toolkit.", "Choose the relevant generator model.", "Check approved value propositions and proof points.", "Open matching documents, campaign material or comparison tools."], why: "Prevents pump and engine content from appearing in generator work." },
    { title: "YDP Toolkit", icon: "pump", target: "ydp", purpose: "Use pump-specific support for dewatering, irrigation and flood response.", steps: ["Open YDP Toolkit.", "Choose the required flow/head use-case.", "Select approved YDP material.", "Localize the CTA and verify model claims."], why: "Makes pump communication practical for local applications." },
    { title: "L-Series Engines", icon: "engine", target: "lseries", purpose: "Find engine positioning, model information and OEM application support.", steps: ["Open L-Series Engines.", "Select the engine or application context.", "Review technical fit and service arguments.", "Use only verified engine data in local communication."], why: "Keeps industrial engine content separate from generator and pump communication." },
    { title: "Content library", icon: "assets", target: "assets", purpose: "Find approved brochures, product files and sales-ready downloads.", steps: ["Open Content library.", "Filter by product and content type.", "Open the file details and approval status.", "Download and record how it will be used."], why: "Supports consistent local sales communication with traceable assets." },
    { title: "Gallery / assets", icon: "gallery", target: "visual-workspace", purpose: "Select visual campaign material without editing it inside the portal.", steps: ["Open Gallery / assets.", "Filter by product category.", "Review channel and localization guidance.", "Download the asset and follow the recommended external workflow."], why: "Speeds up publication while keeping production work in the preferred design software." },
    { title: "Comparison Builder", icon: "comparison", target: "competitive-intelligence", purpose: "Build evidence-led product comparisons with one verified Yanmar reference and up to four independent alternatives.", steps: ["Choose Generators, Water Pumps or Engines.", "Select the Yanmar model; verified Yanmar values load automatically.", "Enter each competitor brand, model and comparable facts manually.", "Select only the comparison points that matter for the customer.", "Review the sheet, save the draft and export PNG, JPG, CSV or PDF."], why: "Creates clear sales support without an unreliable crawler and keeps missing evidence visible instead of inventing claims." },
    { title: "TCO Calculator", icon: "calculator", target: "tco-calculator", purpose: "Compare lifecycle cost for YDG, YDP or L-Series with up to four alternatives.", steps: ["Choose product, currency, annual hours and years.", "Use a workload preset or enter local assumptions.", "Add alternatives and complete purchase, fuel, service, downtime and residual values.", "Resolve realism warnings before calculation.", "Calculate, save and export the professional TCO sheet."], why: "Moves the sales conversation beyond purchase price to verified lifecycle value." },
    { title: "Website Growth Guide", icon: "copy", target: "website-copy", purpose: "Generate complete local copy and improve SEO/SEA quality without writing everything from scratch.", steps: ["Choose product, region, segment and goal.", "Add an optional focus keyword.", "Generate the full draft.", "Use the SEO score and improvement tips.", "Improve, validate technical claims and download the text."], why: "Helps distributors produce stronger website copy even with limited SEO knowledge." },
    { title: "Campaign Calendar", icon: "calendar", target: "calendar", purpose: "Plan, complete and report category-specific activation work.", steps: ["Open the calendar.", "Filter by category and channel.", "Review campaign and localization deadlines.", "Mark completed activity and add result evidence."], why: "Connects planning with measurable distributor activation." },
    { title: "Request Support", icon: "support", target: "support", purpose: "Ask Yanmar for localization, product, campaign or asset help.", steps: ["Select the request type and product.", "Describe the local need and deadline.", "Attach the relevant context.", "Submit and follow the status in the portal."], why: "Creates one traceable support route instead of scattered email requests." },
    { title: "Feedback", icon: "feedback", target: "feedback", purpose: "Report a problem, improvement idea or content gap.", steps: ["Choose the distributor and topic.", "Explain what happened and the desired outcome.", "Add supporting context.", "Submit so Yanmar can review and respond."], why: "Turns distributor experience into actionable platform improvement." },
    { title: "Share content / results", icon: "share", target: "contribute", purpose: "Send local content, examples and campaign evidence to the responsible Yanmar admin.", steps: ["Select the distributor, product and market.", "Upload or describe the local contribution.", "Add language and usage context.", "Submit for review and possible sharing with other admins or distributors."], why: "Connects distributor work to approval, learning and admin tracking." }
  ];

  const adminGuides = [
    { title: "Admin Overview", icon: "admin", target: "admin", purpose: "See open requests, distributor signals and actions that need Yanmar follow-up.", steps: ["Open Yanmar admin view.", "Review priority notifications and open work.", "Select a region or distributor when needed.", "Open the relevant workflow and assign follow-up."], why: "Gives admins one operational starting point." },
    { title: "Region Scope", icon: "region", target: "admin-region-scope", purpose: "Set the region and country context used by admin views.", steps: ["Choose one or more regions.", "Narrow to countries when required.", "Apply the scope.", "Review all downstream analytics in the selected context."], why: "Stops unrelated markets from being mixed in reporting." },
    { title: "Campaign Calendar", icon: "calendar", target: "admin-calendar-manager", purpose: "Plan campaigns, localization deadlines and distributor tasks.", steps: ["Choose category, market and period.", "Create or update the campaign item.", "Assign distributors and status.", "Publish so it appears in distributor calendar views."], why: "Connects central planning with local execution." },
    { title: "Distributor Manager", icon: "distributor", target: "admin-distributor-manager", purpose: "Create, update and review distributor records and market context.", steps: ["Search or select the distributor.", "Review country, region, language and product scope.", "Update details or add a new record.", "Save and verify the distributor selector."], why: "Keeps personalization and reporting tied to one distributor record." },
    { title: "Status / KPIs", icon: "kpi", target: "admin-regional-status", purpose: "Review activation progress and follow-up needs by scope.", steps: ["Set the admin region/country scope.", "Compare activity, completion and open follow-up.", "Open the distributor detail.", "Record the next action."], why: "Makes distributor adoption visible and actionable." },
    { title: "Usage Tracking", icon: "usage", target: "admin-usage-tracking", purpose: "Inspect downloads, tool use, contributions and portal actions.", steps: ["Filter by region, country or distributor.", "Review the activity timeline.", "Open important events such as downloads, sheets or submissions.", "Export when a follow-up report is needed."], why: "Shows how the portal is actually being used." },
    { title: "Scope Performance", icon: "scope", target: "admin-comparison-tool", purpose: "Compare regional and country adoption metrics, not product specifications.", steps: ["Select regions and/or countries.", "Apply the comparison scope.", "Review activity, downloads, follow-up and adoption.", "Use the outcome to prioritize support."], why: "Separates platform performance comparison from the Product Comparison Builder." },
    { title: "Asset Approval", icon: "approval", target: "admin-approval-workflow", purpose: "Review submitted local assets before release.", steps: ["Open the approval queue.", "Check brand, claims, language and evidence.", "Approve, request changes or reject with a reason.", "Release approved material to the correct markets."], why: "Protects brand consistency without blocking local contribution." },
    { title: "Campaign Analytics", icon: "analytics", target: "admin-campaign-analytics", purpose: "Review campaign activity against assigned markets and goals.", steps: ["Choose the campaign.", "Review participating distributors and channels.", "Compare activity and reported outcomes.", "Record recommendations for the next cycle."], why: "Links campaign planning to adoption and learning." },
    { title: "Campaign Results", icon: "results", target: "admin-campaign-results", purpose: "Review evidence and outcomes reported by distributors.", steps: ["Open submitted reports.", "Check metrics and supporting notes.", "Confirm the result status.", "Share useful learning with other admins or markets."], why: "Creates a closed loop from campaign task to evidence." },
    { title: "Contribution Review", icon: "review", target: "admin-contribution-review", purpose: "Review distributor examples, copy and local market assets.", steps: ["Open the contribution.", "Check product, region, permission and quality.", "Add review notes.", "Approve for the library or return for changes."], why: "Turns local work into reusable organizational knowledge." },
    { title: "Content Library", icon: "library", target: "admin-content-library", purpose: "Manage the central set of approved files and content.", steps: ["Filter by product, market and status.", "Open the content record.", "Review version, owner and approval.", "Update or release it to selected distributors."], why: "Keeps distributor downloads current and traceable." },
    { title: "Admin Sharing", icon: "share", target: "admin-content-library", purpose: "Share approved content and learning between regional admins.", steps: ["Open an approved content or result record.", "Choose the receiving admin region.", "Add context and restrictions.", "Share and confirm it appears in the receiving workflow."], why: "Helps one region reuse relevant work from another without losing ownership or context." },
    { title: "Export & evidence", icon: "export", target: "admin-export-center", purpose: "Create board, CRM or assessment-ready exports from tracked portal data.", steps: ["Choose the export package.", "Apply region and date filters.", "Check that demo and verified data are clearly separated.", "Download and store the export in the approved location."], why: "Supports governance, assessment evidence and management reporting." }
  ];

  function openGuideTarget(target, role) {
    if (role === "admin") {
      const button = $('[data-admin-target="' + target + '"]');
      if (button) button.click();
      return;
    }
    const button = $('[data-page="' + target + '"]');
    if (button) button.click();
  }

  function setupPortalKnowledge() {
    const page = $("#demo");
    if (!page || $("#ym-knowledge-shell")) return;
    const header = $(".page-header", page);
    if (header) {
      $(".label", header).textContent = "Portal knowledge";
      $("h1", header).textContent = "Learn Yanmar Amplify";
      $(".intro", header).textContent = "Choose a role and feature to see exactly what it does, how to use it and why it matters.";
    }
    Array.from(page.children).forEach((child) => {
      if (child !== header) child.classList.add("ym-training-hidden");
    });

    const shell = document.createElement("div");
    shell.className = "ym-knowledge-shell";
    shell.id = "ym-knowledge-shell";
    shell.innerHTML =
      '<aside class="ym-knowledge-menu">' +
        '<div class="ym-role-switch"><button type="button" class="active" data-ym-guide-role="distributor">Distributor</button><button type="button" data-ym-guide-role="admin">Admin</button></div>' +
        '<div class="ym-guide-list" id="ym-guide-list"></div>' +
      "</aside>" +
      '<article class="ym-knowledge-detail" id="ym-knowledge-detail"></article>';
    if (header) header.after(shell);
    else page.prepend(shell);

    let role = "distributor";
    const renderDetail = (item) => {
      const detail = $("#ym-knowledge-detail");
      detail.innerHTML =
        '<p class="label">' + esc(role === "admin" ? "Admin guide" : "Distributor guide") + "</p>" +
        "<h2>" + esc(item.title) + "</h2>" +
        '<p class="ym-guide-purpose">' + esc(item.purpose) + "</p>" +
        '<div class="ym-guide-columns">' +
          '<div class="ym-guide-column"><h3>How to use it</h3><ol>' + item.steps.map((step) => "<li>" + esc(step) + "</li>").join("") + "</ol></div>" +
          '<div class="ym-guide-column"><h3>Connected workflow</h3><ul>' +
            "<li>Distributor context, category and market filters stay connected.</li>" +
            "<li>Downloads, saves, submissions and results feed usage tracking.</li>" +
            "<li>Approved contributions can move between distributor and admin workflows.</li>" +
            "<li>Demo data stays separate from verified claims and official files.</li>" +
          "</ul></div>" +
        "</div>" +
        '<div class="ym-guide-why"><strong>Why this is useful</strong><p>' + esc(item.why) + "</p></div>" +
        '<div class="ym-step-footer"><span class="ym-inline-status">You can return to Portal knowledge at any time.</span><button class="primary-button" type="button" id="ym-open-guide-feature">Open feature</button></div>';
      $("#ym-open-guide-feature")?.addEventListener("click", () => {
        openGuideTarget(item.target, role);
        track("Opened feature from Portal knowledge", item.title, role);
      });
    };

    const renderList = () => {
      const items = role === "admin" ? adminGuides : distributorGuides;
      const list = $("#ym-guide-list");
      list.innerHTML = items.map((item, index) => (
        '<button type="button" class="ym-guide-button' + (index === 0 ? " active" : "") + '" data-ym-guide-index="' + index + '">' +
          '<span class="nav-icon">' + svg(item.icon) + "</span>" +
          "<strong>" + esc(item.title) + "</strong><span>›</span>" +
        "</button>"
      )).join("");
      $$("[data-ym-guide-index]", list).forEach((button) => {
        button.addEventListener("click", () => {
          $$("[data-ym-guide-index]", list).forEach((candidate) => candidate.classList.remove("active"));
          button.classList.add("active");
          renderDetail(items[Number(button.dataset.ymGuideIndex)]);
        });
      });
      renderDetail(items[0]);
    };

    $$("[data-ym-guide-role]", shell).forEach((button) => {
      button.addEventListener("click", () => {
        role = button.dataset.ymGuideRole;
        $$("[data-ym-guide-role]", shell).forEach((candidate) => candidate.classList.toggle("active", candidate === button));
        renderList();
      });
    });
    renderList();
  }

  function createToolWorkflow(sectionId, steps) {
    const section = $("#" + sectionId);
    if (!section || $(".ym-tool-nav", section)) return null;
    section.classList.add("ym-tool-shell");
    const header = $(".page-header, .section-hero", section);
    const cards = Array.from(section.children).filter((child) => child.matches?.("article.section-card"));
    if (!cards.length) return null;

    const nav = document.createElement("div");
    nav.className = "ym-tool-nav";
    nav.style.setProperty("--ym-step-count", String(steps.length));
    nav.setAttribute("aria-label", "Tool steps");
    nav.innerHTML = steps.map((step, index) => (
      '<button type="button" class="ym-tool-tab' + (index === 0 ? " active" : "") + '" data-ym-tool-step="' + index + '">' +
        "<span>" + (index + 1) + "</span><strong>" + esc(step.title) + "</strong>" +
      "</button>"
    )).join("");
    if (header) header.after(nav);
    else section.prepend(nav);

    cards.forEach((card, index) => {
      card.classList.add("ym-tool-panel");
      card.classList.toggle("active", index === 0);
      const help = document.createElement("div");
      help.className = "ym-step-help";
      help.innerHTML = "<p><strong>Step " + (index + 1) + ".</strong> " + esc(steps[index]?.help || "") + "</p>";
      const sectionTop = $(".section-top", card);
      if (sectionTop) sectionTop.after(help);
      else card.prepend(help);
    });

    const activate = (index, scroll = true) => {
      const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
      cards.forEach((card, cardIndex) => card.classList.toggle("active", cardIndex === safeIndex));
      $$("[data-ym-tool-step]", nav).forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === safeIndex));
      if (scroll) nav.scrollIntoView({ block: "start", behavior: "smooth" });
      return safeIndex;
    };
    $$("[data-ym-tool-step]", nav).forEach((button) => button.addEventListener("click", () => activate(Number(button.dataset.ymToolStep))));
    return { section, cards, nav, activate };
  }

  function addStepFooter(card, previousIndex, nextIndex, workflow, nextLabel = "Continue") {
    if (!card || $(".ym-step-footer", card)) return;
    const footer = document.createElement("div");
    footer.className = "ym-step-footer";
    footer.innerHTML =
      '<span class="ym-inline-status">Your entries stay available while you move between steps.</span>' +
      "<div>" +
        (previousIndex >= 0 ? '<button type="button" class="header-action secondary" data-ym-previous>Back</button> ' : "") +
        (nextIndex >= 0 ? '<button type="button" class="primary-button" data-ym-next>' + esc(nextLabel) + "</button>" : "") +
      "</div>";
    card.appendChild(footer);
    $("[data-ym-previous]", footer)?.addEventListener("click", () => workflow.activate(previousIndex));
    $("[data-ym-next]", footer)?.addEventListener("click", () => workflow.activate(nextIndex));
  }

  function setupComparison() {
    const workflow = createToolWorkflow("competitive-intelligence", [
      { title: "Add alternatives", help: "Add one official URL, product name or pasted specification at a time. Repeat this step for every competitor." },
      { title: "Verify facts", help: "Select only comparable facts, edit unclear values and confirm the evidence source." },
      { title: "Build sheet", help: "Choose the Yanmar model, market context and CTA, then generate the customer-facing sheet." },
      { title: "Saved drafts", help: "Open, continue or export a saved comparison without rebuilding it." }
    ]);
    if (!workflow) return;
    const { cards } = workflow;

    const market = $("#ci-source-market");
    ["North America", "Central America", "Caribbean", "South America"].forEach((label) => {
      if (market && !Array.from(market.options).some((option) => option.textContent === label)) {
        market.add(new Option(label, label));
      }
    });

    const sourceStatus = $("#ci-source-status");
    if (sourceStatus) {
      sourceStatus.insertAdjacentHTML("afterend",
        '<div class="ym-smart-panel" id="ym-comparison-status">' +
          '<div class="ym-smart-head"><strong>Comparison readiness</strong><span class="ym-smart-badge">Start with a source</span></div>' +
          '<ul class="ym-smart-list"><li>Add an official source or paste specification text.</li><li>You can repeat this step for unlimited alternatives.</li><li>Only selected, verified fields appear in the final sheet.</li></ul>' +
        "</div>"
      );
    }

    const actionRow = $("#ci-analyze-source")?.parentElement;
    if (actionRow && !$("#ym-add-comparison-alternative")) {
      const add = document.createElement("button");
      add.type = "button";
      add.className = "header-action secondary";
      add.id = "ym-add-comparison-alternative";
      add.textContent = "Clear for next alternative";
      actionRow.appendChild(add);
      add.addEventListener("click", () => {
        ["ci-source-input", "ci-source-text", "ci-image-url"].forEach((id) => {
          const field = $("#" + id);
          if (field) field.value = "";
        });
        $("#ci-source-input")?.focus();
      });
    }

    const reviewSummary = $("#ci-review-summary");
    if (reviewSummary && !$("#ym-field-count")) {
      reviewSummary.insertAdjacentHTML("afterend", '<div class="ym-inline-status" id="ym-field-count">0 comparison points selected.</div>');
    }

    const updateReadiness = () => {
      const panel = $("#ym-comparison-status");
      const fieldList = $("#ci-field-list");
      const selected = fieldList ? $$('input[type="checkbox"]:checked', fieldList).length : 0;
      const products = fieldList ? $$(".ci-evidence-card, [data-product-index], .ci-field-group", fieldList).length : 0;
      const hasSource = Boolean($("#ci-source-input")?.value.trim() || $("#ci-source-text")?.value.trim());
      const badge = $(".ym-smart-badge", panel);
      if (panel && badge) {
        panel.classList.remove("good", "warning", "danger");
        if (selected > 0) {
          panel.classList.add("good");
          badge.textContent = selected + " points ready";
        } else if (hasSource || products > 0) {
          panel.classList.add("warning");
          badge.textContent = "Select facts";
        } else {
          badge.textContent = "Start with a source";
        }
      }
      const count = $("#ym-field-count");
      if (count) count.textContent = selected + " comparison point" + (selected === 1 ? "" : "s") + " selected.";
    };

    $("#ci-source-form")?.addEventListener("input", updateReadiness);
    $("#ci-field-list")?.addEventListener("change", updateReadiness);
    $("#ci-select-recommended")?.addEventListener("click", () => setTimeout(updateReadiness, 20));
    $("#ci-select-all")?.addEventListener("click", () => setTimeout(updateReadiness, 20));
    $("#ci-analyze-source")?.addEventListener("click", () => setTimeout(() => {
      updateReadiness();
      if ($("#ci-field-list")?.children.length) workflow.activate(1);
    }, 220));

    $("#ci-generate")?.addEventListener("click", () => setTimeout(() => {
      const model = $("#ci-yanmar-model")?.value || "";
      const asset = model.startsWith("ydp:")
        ? "assets/YDP-white-background.png"
        : (model.includes("3700") ? "assets/YDG3700-white-background.png" : "assets/YDG5500-white-background.png");
      const yanmarImage = $(".comparison-product.yanmar .comparison-product-media img");
      if (yanmarImage) {
        yanmarImage.src = asset;
        yanmarImage.alt = (model.split(":")[1] || "Yanmar product") + " on white background";
      }
      workflow.activate(2, false);
      track("Generated comparison sheet", $("#ci-comparison-title")?.value || "Comparison", "Comparison");
    }, 90));

    $("#ci-print")?.addEventListener("click", () => track("Downloaded comparison PDF", $("#ci-comparison-title")?.value || "Comparison", "Comparison"));
    $("#ci-download-html")?.addEventListener("click", () => track("Downloaded comparison HTML", $("#ci-comparison-title")?.value || "Comparison", "Comparison"));
    $("#ci-download-csv")?.addEventListener("click", () => track("Downloaded comparison CSV", $("#ci-comparison-title")?.value || "Comparison", "Comparison"));
    $("#ci-save")?.addEventListener("click", () => track("Saved comparison draft", $("#ci-comparison-title")?.value || "Comparison", "Comparison"));
    $("#ci-saved-list")?.addEventListener("click", (event) => {
      if (event.target.closest("[data-ci-load-draft]")) {
        setTimeout(() => workflow.activate(2), 40);
      }
    });

    addStepFooter(cards[0], -1, 1, workflow, "Next: verify facts");
    addStepFooter(cards[1], 0, 2, workflow, "Next: build sheet");
    addStepFooter(cards[2], 1, 3, workflow, "Open saved drafts");
    addStepFooter(cards[3], 2, -1, workflow);
    updateReadiness();
  }

  const currencyToEur = {
    EUR: 1,
    USD: 0.92,
    CAD: 0.67,
    GBP: 1.17,
    SAR: 0.245,
    AED: 0.25,
    PLN: 0.23,
    SEK: 0.088,
    NOK: 0.087,
    DKK: 0.134,
    ZAR: 0.05,
    AUD: 0.61,
    JPY: 0.006,
    KRW: 0.00068,
    THB: 0.025,
    INR: 0.011,
    CNY: 0.127
  };

  function numberValue(field) {
    if (!field) return NaN;
    const normalized = String(field.value || "").trim().replace(/\s/g, "").replace(",", ".");
    return normalized === "" ? NaN : Number(normalized);
  }

  function validateTco() {
    const section = $("#tco-calculator");
    if (!section) return { issues: [], critical: [] };
    const currency = $("#tco-currency")?.value || "EUR";
    const fx = currencyToEur[currency] || 1;
    const issues = [];
    const critical = [];
    $$("input[type='number']", section).forEach((field) => field.classList.remove("ym-input-warning", "ym-input-danger"));
    const flag = (field, message, isCritical = false) => {
      if (!field) return;
      field.classList.add(isCritical ? "ym-input-danger" : "ym-input-warning");
      (isCritical ? critical : issues).push(message);
    };

    const hoursField = $("#tco-hours");
    const yearsField = $("#tco-years");
    const fuelPriceField = $("#tco-fuel-price");
    const downtimeCostField = $("#tco-downtime-cost");
    const hours = numberValue(hoursField);
    const years = numberValue(yearsField);
    const fuelPriceEur = numberValue(fuelPriceField) * fx;
    const downtimeCostEur = numberValue(downtimeCostField) * fx;

    if (!Number.isFinite(hours) || hours <= 0) flag(hoursField, "Annual operating hours must be above zero.", true);
    else if (hours > 8760) flag(hoursField, "Annual hours exceed the total hours in a year.", true);
    else if (hours > 5000) flag(hoursField, "More than 5,000 operating hours per year is unusually high; verify the duty cycle.");
    else if (hours < 50) flag(hoursField, "Fewer than 50 annual hours may not provide a meaningful TCO comparison.");

    if (!Number.isFinite(years) || years < 1) flag(yearsField, "Ownership period must be at least one year.", true);
    else if (years > 20) flag(yearsField, "More than 20 years is outside the normal planning range.", true);
    else if (years > 12) flag(yearsField, "A period above 12 years needs extra residual-value and maintenance evidence.");

    if (!Number.isFinite(fuelPriceEur) || fuelPriceEur <= 0) flag(fuelPriceField, "Fuel price must be above zero.", true);
    else if (fuelPriceEur < 0.25 || fuelPriceEur > 4.5) flag(fuelPriceField, "Fuel price is outside a broad real-world range after currency normalization.");

    if (Number.isFinite(downtimeCostEur) && downtimeCostEur > 2000) {
      flag(downtimeCostField, "Downtime cost per hour is very high; verify the business-impact assumption.");
    }

    const optionIds = new Set();
    $$('[id^="standalone-tco-"][id$="-purchase"]', section).forEach((field) => {
      const optionId = field.id.replace(/^standalone-tco-/, "").replace(/-purchase$/, "");
      optionIds.add(optionId);
    });
    optionIds.forEach((optionId) => {
      const get = (name) => $("#standalone-tco-" + optionId + "-" + name);
      const label = get("label")?.value || optionId;
      const purchaseField = get("purchase");
      const fuelField = get("fuel");
      const serviceField = get("service");
      const partsField = get("parts");
      const downtimeField = get("downtime");
      const residualField = get("residual");
      const purchaseEur = numberValue(purchaseField) * fx;
      const fuel = numberValue(fuelField);
      const servicePartsEur = (Number(numberValue(serviceField) || 0) + Number(numberValue(partsField) || 0)) * fx;
      const downtime = numberValue(downtimeField);
      const residualEur = numberValue(residualField) * fx;

      if (Number.isFinite(purchaseEur) && purchaseEur > 150000) flag(purchaseField, label + ": purchase price is unusually high for portable equipment.");
      if (Number.isFinite(fuel) && fuel > 30) flag(fuelField, label + ": fuel use above 30 litres/hour is probably a unit or decimal error.", true);
      else if (Number.isFinite(fuel) && fuel > 15) flag(fuelField, label + ": fuel use is high; verify load and measurement conditions.");
      if (Number.isFinite(downtime) && downtime > hours) flag(downtimeField, label + ": downtime exceeds annual operating hours.", true);
      else if (Number.isFinite(downtime) && downtime > 1500) flag(downtimeField, label + ": downtime above 1,500 hours requires strong evidence.");
      if (Number.isFinite(purchaseEur) && purchaseEur > 0 && servicePartsEur > purchaseEur * 0.6) {
        flag(serviceField, label + ": annual service and parts exceed 60% of purchase price.");
        partsField?.classList.add("ym-input-warning");
      }
      if (Number.isFinite(residualEur) && Number.isFinite(purchaseEur) && residualEur > purchaseEur) {
        flag(residualField, label + ": residual value cannot normally exceed purchase price.", true);
      }
    });

    const panel = $("#ym-tco-smart-panel");
    if (panel) {
      panel.classList.remove("good", "warning", "danger");
      const badge = $(".ym-smart-badge", panel);
      const list = $(".ym-smart-list", panel);
      const all = critical.concat(issues);
      if (critical.length) {
        panel.classList.add("danger");
        badge.textContent = critical.length + " critical";
      } else if (issues.length) {
        panel.classList.add("warning");
        badge.textContent = issues.length + " to verify";
      } else {
        panel.classList.add("good");
        badge.textContent = "Inputs look plausible";
      }
      list.innerHTML = (all.length ? all.slice(0, 8) : [
        "No obvious realism issues detected.",
        "Final values still require local commercial and technical verification.",
        "Currency conversion is not applied to output; it is used only for plausibility ranges."
      ]).map((message) => "<li>" + esc(message) + "</li>").join("");
    }
    return { issues, critical };
  }

  function setupTco() {
    const tcoSection = $("#tco-calculator");
    if (tcoSection && !$("#ym-tco-drafts-card")) {
      const draftsCard = document.createElement("article");
      draftsCard.className = "section-card";
      draftsCard.id = "ym-tco-drafts-card";
      draftsCard.innerHTML =
        '<div class="section-top"><div><p class="label">Saved calculations</p><h2>TCO drafts</h2></div><div class="icon-box">' + svg("library") + "</div></div>" +
        '<div class="ym-draft-list" id="ym-tco-draft-list"><div class="ci-empty-state">No TCO drafts saved yet.</div></div>';
      tcoSection.appendChild(draftsCard);
    }
    const workflow = createToolWorkflow("tco-calculator", [
      { title: "Set assumptions", help: "Choose product, currency, annual hours and ownership period. Start with a workload preset if useful." },
      { title: "Add options", help: "Enter Yanmar values and add as many alternatives as needed. Smart checks flag likely unit or realism errors." },
      { title: "Review sheet", help: "Compare total, annual and hourly ownership cost, then save or print the verified sheet." },
      { title: "Saved drafts", help: "Open a previous TCO calculation, continue editing its values or remove an obsolete draft." }
    ]);
    if (!workflow) return;
    const { cards } = workflow;

    const setupCard = cards[0];
    const presets = document.createElement("div");
    presets.className = "ym-preset-row";
    presets.innerHTML =
      '<button type="button" class="ym-preset-button" data-ym-tco-preset="light">Light use · 500 h · 3 y</button>' +
      '<button type="button" class="ym-preset-button" data-ym-tco-preset="professional">Professional · 1,000 h · 5 y</button>' +
      '<button type="button" class="ym-preset-button" data-ym-tco-preset="intensive">Intensive · 2,000 h · 5 y</button>';
    $(".tco-page-grid", setupCard)?.insertAdjacentElement("afterend", presets);
    const presetValues = {
      light: { hours: 500, years: 3 },
      professional: { hours: 1000, years: 5 },
      intensive: { hours: 2000, years: 5 }
    };
    $$("[data-ym-tco-preset]", presets).forEach((button) => button.addEventListener("click", () => {
      const values = presetValues[button.dataset.ymTcoPreset];
      $("#tco-hours").value = values.hours;
      $("#tco-years").value = values.years;
      validateTco();
      track("Applied TCO workload preset", button.textContent.trim(), "TCO");
    }));

    const inputCard = cards[1];
    const smartPanel = document.createElement("div");
    smartPanel.className = "ym-smart-panel";
    smartPanel.id = "ym-tco-smart-panel";
    smartPanel.innerHTML =
      '<div class="ym-smart-head"><strong>Smart realism check</strong><span class="ym-smart-badge">Checking inputs</span></div>' +
      '<ul class="ym-smart-list"></ul>';
    const grid = $("#standalone-tco-grid", inputCard);
    if (grid) grid.before(smartPanel);
    else inputCard.appendChild(smartPanel);

    $("#tco-calculator")?.addEventListener("input", (event) => {
      if (event.target.matches("input, select")) validateTco();
    });
    $("#tco-add-alternative")?.addEventListener("click", () => setTimeout(validateTco, 40));

    const productLine = $("#tco-product-line");
    productLine?.addEventListener("change", () => {
      const defaults = {
        YDG: "YDG5500V Stage V",
        YDP: "YDP30N",
        "L-Series": "L100V"
      };
      const model = $("#tco-model-name");
      if (model) model.value = defaults[productLine.value] || model.value;
      const title = $("#tco-sheet-title");
      if (title) title.value = "Yanmar " + productLine.value + " total cost of ownership";
    });

    const calculate = $("#tco-calculate");
    calculate?.addEventListener("click", (event) => {
      const result = validateTco();
      if (result.critical.length) {
        const proceed = window.confirm("Some values appear unrealistic or use the wrong unit. Continue with this TCO calculation anyway?");
        if (!proceed) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
      }
      setTimeout(() => {
        workflow.activate(2, false);
        track("Calculated TCO sheet", $("#tco-sheet-title")?.value || "TCO", $("#tco-product-line")?.value || "TCO");
      }, 70);
    }, true);
    const renderTcoDrafts = () => {
      const list = $("#ym-tco-draft-list");
      if (!list) return;
      let drafts = [];
      try { drafts = JSON.parse(localStorage.getItem("yanmarStandaloneTcoSheetsV1") || "[]"); } catch (error) { drafts = []; }
      if (!drafts.length) {
        list.innerHTML = '<div class="ci-empty-state">No TCO drafts saved yet.</div>';
        return;
      }
      list.innerHTML = drafts.map((draft) => (
        '<div class="ym-draft-row">' +
          '<div><strong>' + esc(draft.title || "TCO draft") + '</strong><span>' + esc(new Date(draft.generatedAt || Date.now()).toLocaleString()) + ' · ' + esc(draft.model || "Yanmar model") + '</span></div>' +
          '<button type="button" class="header-action secondary" data-ym-open-tco="' + esc(draft.id) + '">Open & edit</button>' +
          '<button type="button" class="header-action secondary" data-ym-delete-tco="' + esc(draft.id) + '">Delete</button>' +
        "</div>"
      )).join("");
    };

    const loadTcoDraft = (draft) => {
      if (!draft) return;
      $("#tco-sheet-title").value = draft.title || "Yanmar total cost of ownership sheet";
      $("#tco-model-name").value = draft.model || "Yanmar reference";
      const inferredLine = /^YDP/i.test(draft.model || "") ? "YDP" : (/^L/i.test(draft.model || "") ? "L-Series" : "YDG");
      if ($("#tco-product-line")) $("#tco-product-line").value = inferredLine;
      const assumptions = draft.assumptions || {};
      if ($("#tco-hours")) $("#tco-hours").value = assumptions.hours ?? 750;
      if ($("#tco-years")) $("#tco-years").value = assumptions.years ?? 5;
      if ($("#tco-fuel-price")) $("#tco-fuel-price").value = assumptions.fuelPrice ?? 1.75;
      if ($("#tco-downtime-cost")) $("#tco-downtime-cost").value = assumptions.downtimeCost ?? 65;
      if ($("#tco-currency") && assumptions.currency) $("#tco-currency").value = assumptions.currency;

      const desired = Array.isArray(draft.rows) ? draft.rows.length : 1;
      while ($$('[id^="standalone-tco-"][id$="-purchase"]').length < desired) $("#tco-add-alternative")?.click();
      const removeButtons = $$("[data-tco-remove]");
      while ($$('[id^="standalone-tco-"][id$="-purchase"]').length > desired && removeButtons.length) {
        removeButtons.pop()?.click();
      }
      setTimeout(() => {
        const optionIds = $$('[id^="standalone-tco-"][id$="-purchase"]').map((field) => field.id.replace(/^standalone-tco-/, "").replace(/-purchase$/, ""));
        (draft.rows || []).forEach((row, index) => {
          const optionId = optionIds[index];
          if (!optionId) return;
          ["label", "purchase", "setup", "fuel", "service", "parts", "downtime", "finance", "residual"].forEach((fieldName) => {
            const field = $("#standalone-tco-" + optionId + "-" + fieldName);
            if (field) field.value = row[fieldName] ?? "";
          });
        });
        validateTco();
        workflow.activate(1);
        track("Opened TCO draft", draft.title || "TCO", "TCO");
      }, 60);
    };

    $("#ym-tco-draft-list")?.addEventListener("click", (event) => {
      const open = event.target.closest("[data-ym-open-tco]");
      const remove = event.target.closest("[data-ym-delete-tco]");
      let drafts = [];
      try { drafts = JSON.parse(localStorage.getItem("yanmarStandaloneTcoSheetsV1") || "[]"); } catch (error) { drafts = []; }
      if (open) loadTcoDraft(drafts.find((draft) => draft.id === open.dataset.ymOpenTco));
      if (remove) {
        const next = drafts.filter((draft) => draft.id !== remove.dataset.ymDeleteTco);
        try {
          localStorage.setItem("yanmarStandaloneTcoSheetsV1", JSON.stringify(next));
        } catch (error) {
          /* The current session remains usable when browser storage is unavailable. */
        }
        renderTcoDrafts();
      }
    });

    $("#tco-save")?.addEventListener("click", () => {
      setTimeout(renderTcoDrafts, 30);
      track("Saved TCO draft", $("#tco-sheet-title")?.value || "TCO", "TCO");
    });
    $("#tco-print")?.addEventListener("click", () => track("Downloaded TCO PDF", $("#tco-sheet-title")?.value || "TCO", "TCO"));
    $("#tco-download-html")?.addEventListener("click", () => track("Downloaded TCO HTML", $("#tco-sheet-title")?.value || "TCO", "TCO"));
    $("#tco-download-csv")?.addEventListener("click", () => track("Downloaded TCO CSV", $("#tco-sheet-title")?.value || "TCO", "TCO"));

    addStepFooter(cards[0], -1, 1, workflow, "Next: enter options");
    addStepFooter(cards[1], 0, 2, workflow, "Review current output");
    addStepFooter(cards[2], 1, 3, workflow, "Open saved drafts");
    addStepFooter(cards[3], 2, -1, workflow);
    renderTcoDrafts();
    validateTco();
  }

  function textValue(id) {
    return ($("#" + id)?.value || "").trim();
  }

  function copyScore() {
    const scoreCard = $("#ym-seo-score-card");
    if (!scoreCard) return;
    const keyword = textValue("ym-copy-keyword").toLowerCase();
    const seoTitle = textValue("webcopy-field-seoTitle");
    const meta = textValue("webcopy-field-meta");
    const headline = textValue("webcopy-field-headline");
    const intro = textValue("webcopy-field-intro");
    const benefits = textValue("webcopy-field-benefits");
    const cta = textValue("webcopy-field-cta");
    const full = (seoTitle + " " + meta + " " + headline + " " + intro).toLowerCase();
    let score = 0;
    const tips = [];

    if (seoTitle.length >= 40 && seoTitle.length <= 65) score += 15;
    else tips.push("Keep the SEO title between roughly 40 and 65 characters.");
    if (meta.length >= 120 && meta.length <= 160) score += 15;
    else tips.push("Use a useful meta description of roughly 120 to 160 characters.");
    if (headline.length >= 20 && headline.length <= 85) score += 15;
    else tips.push("Use one clear H1 of about 20 to 85 characters.");
    if (keyword && full.includes(keyword)) score += 15;
    else if (keyword) tips.push("Use the focus keyword naturally in the title, H1 or introduction.");
    else {
      score += 7;
      tips.push("Add a focus keyword for a more specific search-intent check.");
    }
    if (intro.length >= 90 && intro.length <= 420) score += 10;
    else tips.push("Make the introduction specific, useful and concise.");
    if (/service|uptime|fuel|durab|support|flow|head|power|reliab|cost/i.test(benefits)) score += 10;
    else tips.push("Add concrete benefits or proof themes instead of generic claims.");
    if (cta.length >= 8 && cta.length <= 45) score += 10;
    else tips.push("Use one concise action-oriented CTA.");
    const sentences = intro.split(/[.!?]+/).filter(Boolean);
    const average = sentences.length ? intro.split(/\s+/).length / sentences.length : 99;
    if (average <= 24) score += 10;
    else tips.push("Shorten long sentences to improve scanability.");

    score = Math.max(0, Math.min(100, score));
    const ring = $(".ym-score-ring", scoreCard);
    const value = $(".ym-score-value", scoreCard);
    const status = $(".ym-score-copy p", scoreCard);
    const tipList = $(".ym-seo-tips", scoreCard);
    ring?.style.setProperty("--score", String(score));
    if (value) value.textContent = score + "%";
    if (status) {
      status.textContent = score >= 80 ? "Strong draft. Verify claims and local intent before publishing."
        : score >= 60 ? "Good base. Apply the priority tips for a stronger search result."
        : "Needs improvement before publication.";
    }
    if (tipList) {
      const shown = tips.length ? tips.slice(0, 5) : ["Good to go after technical, legal and local-language review."];
      tipList.innerHTML = shown.map((tip) => "<li>" + esc(tip) + "</li>").join("");
    }
  }

  function improveCopyDraft() {
    if (!$("#webcopy-field-headline")) {
      $("#webcopy-generate")?.click();
      setTimeout(improveCopyDraft, 80);
      return;
    }
    const product = $("#webcopy-product")?.value || "ydg";
    const segment = $("#webcopy-segment")?.selectedOptions?.[0]?.textContent || $("#webcopy-segment")?.value || "professional applications";
    const distributor = $("#webcopy-distributor")?.value.trim() || "your Yanmar distributor";
    const keywordField = $("#ym-copy-keyword");
    const defaultKeyword = product === "ydp" ? "Yanmar diesel water pump" : "Yanmar diesel generator";
    const keyword = keywordField?.value.trim() || defaultKeyword;
    if (keywordField && !keywordField.value.trim()) keywordField.value = keyword;

    const headline = $("#webcopy-field-headline");
    const intro = $("#webcopy-field-intro");
    const seoTitle = $("#webcopy-field-seoTitle");
    const meta = $("#webcopy-field-meta");
    const cta = $("#webcopy-field-cta");
    if (headline) headline.value = product === "ydp"
      ? "Reliable Yanmar pumping support for " + segment.toLowerCase()
      : "Reliable Yanmar power for " + segment.toLowerCase();
    if (intro) intro.value = product === "ydp"
      ? "Keep water moving with Yanmar YDP diesel pumps for demanding professional applications. " + distributor + " helps select the right flow, head and pump type using verified local specifications."
      : "Keep professional work moving with Yanmar YDG diesel generators built around dependable diesel engineering. " + distributor + " helps match output, voltage and operating needs using verified local specifications.";
    if (seoTitle) seoTitle.value = (keyword + " for " + segment + " | Yanmar").slice(0, 65);
    if (meta) meta.value = (product === "ydp"
      ? "Explore Yanmar YDP diesel pumps for professional dewatering, drainage and irrigation. Get verified model selection and local support from " + distributor + "."
      : "Explore Yanmar YDG diesel generators for reliable professional power. Get verified model selection, service guidance and local support from " + distributor + ".").slice(0, 160);
    if (cta) cta.value = product === "ydp" ? "Request pump selection advice" : "Request generator selection advice";
    copyScore();
    track("Improved website copy", keyword, "Website Copy");
  }

  function setupCopyStudio() {
    const page = $("#website-copy");
    if (!page || $("#ym-copy-helper")) return;
    $("#webcopy-preview")?.setAttribute("aria-hidden", "true");
    const controls = $(".website-copy-controls", page);
    if (!controls) return;

    const keywordField = document.createElement("div");
    keywordField.className = "field span-all";
    keywordField.innerHTML =
      '<label for="ym-copy-keyword">Focus keyword or customer need (optional)</label>' +
      '<input id="ym-copy-keyword" placeholder="Example: diesel generator for construction sites" autocomplete="off" />';
    controls.appendChild(keywordField);

    const buttonRow = $("#webcopy-generate")?.parentElement;
    if (buttonRow && !$("#ym-copy-improve")) {
      const improve = document.createElement("button");
      improve.type = "button";
      improve.id = "ym-copy-improve";
      improve.className = "header-action secondary";
      improve.textContent = "Improve copy & score";
      buttonRow.appendChild(improve);
      improve.addEventListener("click", improveCopyDraft);
    }

    const helper = document.createElement("div");
    helper.className = "ym-copy-helper";
    helper.id = "ym-copy-helper";
    helper.innerHTML =
      '<div class="ym-smart-panel">' +
        '<div class="ym-smart-head"><strong>SEO / SEA writing assistant</strong><span class="ym-smart-badge">Live guidance</span></div>' +
        '<ul class="ym-smart-list"><li>Generate a complete draft from product, region, segment and goal.</li><li>Use one clear H1, useful supporting copy and a specific CTA.</li><li>Keep technical claims verifiable and write for the customer task first.</li></ul>' +
        '<div class="ym-source-links"><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide" target="_blank" rel="noreferrer">Google SEO Starter Guide</a><a href="https://developers.google.com/search/docs/fundamentals/creating-helpful-content" target="_blank" rel="noreferrer">Helpful content guidance</a></div>' +
      "</div>" +
      '<div class="ym-seo-score-card" id="ym-seo-score-card">' +
        '<div class="ym-score-ring"><span class="ym-score-value">0%</span></div>' +
        '<div class="ym-score-copy"><h3>Search-readiness score</h3><p>Generate or edit a draft to calculate the score.</p><ul class="ym-seo-tips"><li>Add a focus keyword or generate a draft.</li></ul></div>' +
      "</div>";
    controls.parentElement?.appendChild(helper);

    $("#webcopy-generate")?.addEventListener("click", () => setTimeout(() => {
      copyScore();
      track("Generated website copy", $("#webcopy-product")?.value || "Product", "Website Copy");
    }, 60));
    $("#webcopy-output")?.addEventListener("input", copyScore);
    $("#ym-copy-keyword")?.addEventListener("input", copyScore);
    $("#webcopy-download")?.addEventListener("click", () => track("Downloaded website copy", $("#webcopy-product")?.value || "Product", "Website Copy"));
    copyScore();
  }

  function connectAdminAndDistributor() {
    const adminPage = $("#admin");
    if (!adminPage || $("#ym-admin-connection-status")) return;
    const firstHeader = $(".page-header, .section-hero", adminPage);
    const strip = document.createElement("div");
    strip.className = "ym-smart-panel good";
    strip.id = "ym-admin-connection-status";
    strip.innerHTML =
      '<div class="ym-smart-head"><strong>Connected distributor workflow</strong><span class="ym-smart-badge">Live in this demo</span></div>' +
      '<ul class="ym-smart-list"><li>Distributor downloads, tool use, feedback, content contributions and reported campaign results feed the admin workflows.</li><li>Admin approvals, campaigns and released content return to the relevant distributor context.</li><li>Regional admins can review and share approved learning without mixing ownership or market scope.</li></ul>';
    if (firstHeader) firstHeader.after(strip);
    else adminPage.prepend(strip);
  }

  function syncRoleShell() {
    const adminMode = document.body.classList.contains("admin-mode");
    if (!adminMode) document.body.classList.remove("admin-shared-tool-mode");
    const sharedAdminTool = adminMode && document.body.classList.contains("admin-shared-tool-mode");
    const distributorSidebar = $(".layout > .sidebar:not(.admin-sidebar)");
    const adminSidebar = $("main > .admin-sidebar");
    const adminPage = $("#admin");

    if (distributorSidebar) {
      distributorSidebar.setAttribute("aria-hidden", String(adminMode));
      distributorSidebar.inert = adminMode;
    }
    if (adminSidebar) {
      adminSidebar.setAttribute("aria-hidden", String(!adminMode));
      adminSidebar.inert = !adminMode;
    }
    if (adminPage) adminPage.setAttribute("aria-hidden", String(!adminMode || sharedAdminTool));

    const toggle = $("#admin-toggle");
    if (toggle) {
      toggle.setAttribute("aria-pressed", String(adminMode));
      toggle.setAttribute("aria-label", adminMode ? "Return to distributor portal" : "Open Yanmar admin portal");
      toggle.setAttribute("title", toggle.getAttribute("aria-label"));
    }
    updateSearchIndex();
  }

  function setupRoleSeparation() {
    syncRoleShell();
    if (document.body.dataset.ymRoleObserver === "true") return;
    document.body.dataset.ymRoleObserver = "true";
    let lastAdminMode = document.body.classList.contains("admin-mode");
    const observer = new MutationObserver((mutations) => {
      if (!mutations.some((mutation) => mutation.attributeName === "class")) return;
      const currentAdminMode = document.body.classList.contains("admin-mode");
      if (currentAdminMode === lastAdminMode) return;
      lastAdminMode = currentAdminMode;
      requestAnimationFrame(syncRoleShell);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
  }

  function setupInteractionPolish() {
    if (document.body.dataset.ymInteractionReady === "true") return;
    document.body.dataset.ymInteractionReady = "true";

    const main = $(".layout > main");
    if (main && !main.id) main.id = "amplify-main";
    if (main && !$(".ym-skip-link")) {
      const skipLink = document.createElement("a");
      skipLink.className = "ym-skip-link";
      skipLink.href = "#" + main.id;
      skipLink.textContent = "Skip to portal content";
      document.body.prepend(skipLink);
    }

    const toast = $("#portal-toast");
    if (toast) {
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-atomic", "true");
    }

    const searchInput = $("#ym-global-search-input");
    const searchResults = $("#ym-global-search-results");
    if (searchInput && searchResults) {
      searchInput.setAttribute("aria-controls", searchResults.id);
      searchInput.setAttribute("aria-expanded", String(searchResults.classList.contains("show")));
      const searchObserver = new MutationObserver(() => {
        searchInput.setAttribute("aria-expanded", String(searchResults.classList.contains("show")));
      });
      searchObserver.observe(searchResults, { attributes: true, attributeFilter: ["class"] });
    }

    const syncCurrentNavigation = () => {
      $$(".nav-button").forEach((button) => {
        if (button.classList.contains("active")) button.setAttribute("aria-current", "page");
        else button.removeAttribute("aria-current");
      });
    };
    syncCurrentNavigation();

    document.addEventListener("click", (event) => {
      if (event.target.closest(".nav-button, [data-ym-home-target], .ym-search-result, #admin-toggle, #admin-back-button")) {
        requestAnimationFrame(() => {
          syncCurrentNavigation();
          const activePage = document.body.classList.contains("admin-mode") ? $("#admin") : $("main > .page.active");
          activePage?.classList.add("ym-page-entered");
          window.setTimeout(() => activePage?.classList.remove("ym-page-entered"), 240);
        });
      }
    });

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement && (
        target.matches("input, textarea, select") || target.isContentEditable
      );
      const key = event.key.toLowerCase();
      const searchShortcut = (event.ctrlKey || event.metaKey) && key === "k";
      const slashShortcut = event.key === "/" && !isEditing && !event.ctrlKey && !event.metaKey && !event.altKey;

      if ((searchShortcut || slashShortcut) && searchInput) {
        event.preventDefault();
        searchInput.focus();
        searchInput.select();
        renderSearchResults(searchInput.value);
        return;
      }

      if (event.key === "Escape") {
        searchResults?.classList.remove("show");
        const dock = $("#assistant-dock");
        if (dock && !dock.classList.contains("is-collapsed")) $("#assistant-dock-toggle")?.click();
      }
    });

    $$("img").forEach((image) => {
      image.decoding = "async";
      image.draggable = false;
    });

    document.documentElement.classList.add("ym-interactions-ready");
  }

  function improveAssistantHover() {
    $$(".assistant-dock-toggle, #theme-toggle, #admin-toggle").forEach((button) => {
      button.addEventListener("mouseenter", () => button.classList.add("ym-hover"));
      button.addEventListener("mouseleave", () => button.classList.remove("ym-hover"));
    });
  }

  function run() {
    cleanLegacyLayers();
    applyIcons();
    decorateHeader();
    setupSearch();
    setupResponsiveNavigation();
    improveHome();
    setupCopyStudio();
    connectAdminAndDistributor();
    setupRoleSeparation();
    setupInteractionPolish();
    improveAssistantHover();
    document.body.classList.remove("ym-clean-v9", "ym-clean-v10", "ym-clean-v11", "ym-board-ready-v5", "ym-board-ready-v6", "ym-simple-icons-v7");
    document.body.classList.add("ym-clean-v12");
  }

  window.YanmarAmplifyLegacy = Object.assign(window.YanmarAmplifyLegacy || {}, {
    setupPortalKnowledge,
    applyIcons,
    decorateHeader,
    syncRoleShell,
    updateSearchIndex,
  });

  ready(() => {
    requestAnimationFrame(() => {
      run();
      setTimeout(() => {
        applyIcons();
        decorateHeader();
        syncRoleShell();
        updateSearchIndex();
      }, 240);
    });
  });
})();

;

/* ===== Source: ym-board-ready-v15.js ===== */
(function () {
  "use strict";

  var q = function (selector, root) { return (root || document).querySelector(selector); };
  var qa = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  var textKey = function (value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9\u00c0-\u024f\u0600-\u06ff\u3040-\u30ff\u4e00-\u9fff]+/g, " ").trim();
  };
  var escapeHtml = function (value) {
    return String(value == null ? "" : value).replace(/[&<>\"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[character];
    });
  };

  function currentUiLanguage() {
    var selector = q("#language-select, select[name='language'], .language-select select");
    var value = selector ? String(selector.value || "en").toLowerCase() : "en";
    if (value.indexOf("nl") === 0) { return "nl"; }
    if (value.indexOf("de") === 0) { return "de"; }
    if (value.indexOf("fr") === 0) { return "fr"; }
    if (value.indexOf("es") === 0) { return "es"; }
    if (value.indexOf("it") === 0) { return "it"; }
    if (value.indexOf("pl") === 0) { return "pl"; }
    if (value.indexOf("pt") === 0) { return "pt"; }
    if (value.indexOf("ar") === 0) { return "ar"; }
    if (value.indexOf("tr") === 0) { return "tr"; }
    if (value.indexOf("ja") === 0) { return "ja"; }
    if (value.indexOf("ko") === 0) { return "ko"; }
    if (value.indexOf("th") === 0) { return "th"; }
    if (value.indexOf("id") === 0) { return "id"; }
    if (value.indexOf("ms") === 0) { return "ms"; }
    if (value.indexOf("vi") === 0) { return "vi"; }
    if (value.indexOf("zh") === 0) { return "zh-CN"; }
    if (value.indexOf("hi") === 0) { return "hi"; }
    if (value.indexOf("el") === 0) { return "el"; }
    if (value.indexOf("bg") === 0) { return "bg"; }
    if (value.indexOf("ro") === 0) { return "ro"; }
    if (value.indexOf("cs") === 0) { return "cs"; }
    if (value.indexOf("sk") === 0) { return "sk"; }
    if (value.indexOf("hu") === 0) { return "hu"; }
    if (value.indexOf("hr") === 0) { return "hr"; }
    if (value.indexOf("mk") === 0) { return "mk"; }
    if (value.indexOf("mn") === 0) { return "mn"; }
    if (value.indexOf("am") === 0) { return "am"; }
    if (value.indexOf("af") === 0) { return "af"; }
    if (value.indexOf("sw") === 0) { return "sw"; }
    if (value.indexOf("sv") === 0) { return "sv"; }
    if (value.indexOf("no") === 0) { return "no"; }
    if (value.indexOf("lv") === 0) { return "lv"; }
    if (value.indexOf("et") === 0) { return "et"; }
    if (value.indexOf("lt") === 0) { return "lt"; }
    if (value.indexOf("tl") === 0) { return "tl"; }
    if (value.indexOf("si") === 0) { return "si"; }
    return "en";
  }

  var uiMessages = {
    en: {
      generated: "A new website-copy variation was generated.",
      improved: "Copy improved. The search-readiness checks have been recalculated.",
      maximum: "Guided improvement maximum reached. Review product claims and local requirements before publishing.",
      alternative: "The current alternative is saved. Add the next product, or continue to fact review.",
      unrealistic: "One or more values look unusual. Check the highlighted inputs before continuing.",
      sheetNeeded: "Generate the sheet before downloading an image.",
      imageReady: "The sheet image has been downloaded.",
      imageFailed: "The image could not be created. Try PNG again or use PDF/print."
    },
    nl: {
      generated: "Er is een nieuwe webtekstvariant gegenereerd.",
      improved: "De tekst is verbeterd en de zoekgereedheid is opnieuw berekend.",
      maximum: "De maximale begeleide verbetering is bereikt. Controleer productclaims en lokale eisen voor publicatie.",
      alternative: "Het huidige alternatief is opgeslagen. Voeg het volgende product toe of ga door naar feitencontrole.",
      unrealistic: "Een of meer waarden lijken onrealistisch. Controleer de gemarkeerde invoervelden."
    },
    de: { generated: "Eine neue Webtext-Variante wurde erstellt.", improved: "Der Text und die Suchbereitschaft wurden verbessert.", maximum: "Die maximale gefuehrte Verbesserung ist erreicht. Produktangaben vor Veroeffentlichung pruefen.", alternative: "Die Alternative wurde gespeichert. Naechstes Produkt hinzufuegen oder Fakten pruefen.", unrealistic: "Mindestens ein Wert wirkt ungewoehnlich. Bitte markierte Felder pruefen." },
    fr: { generated: "Une nouvelle variante de texte web a ete generee.", improved: "Le texte et le score de preparation ont ete ameliores.", maximum: "Le niveau maximal d'amelioration guidee est atteint. Verifiez les preuves avant publication.", alternative: "L'alternative est enregistree. Ajoutez un produit ou passez a la verification.", unrealistic: "Une ou plusieurs valeurs semblent inhabituelles. Verifiez les champs signales." },
    es: { generated: "Se ha generado una nueva variante de texto web.", improved: "El texto y la preparacion para busqueda se han mejorado.", maximum: "Se alcanzo el maximo de mejora guiada. Revise las afirmaciones antes de publicar.", alternative: "La alternativa esta guardada. Anada otro producto o revise los datos.", unrealistic: "Uno o varios valores parecen poco realistas. Revise los campos marcados." },
    it: { generated: "E stata generata una nuova variante di testo.", improved: "Testo e controlli di ricerca sono stati migliorati.", maximum: "Miglioramento guidato massimo raggiunto. Verificare le affermazioni prima della pubblicazione.", alternative: "Alternativa salvata. Aggiungere un prodotto o verificare i dati.", unrealistic: "Uno o piu valori sembrano insoliti. Controllare i campi evidenziati." },
    pl: { generated: "Wygenerowano nowy wariant tekstu.", improved: "Tekst i gotowosc wyszukiwania zostaly poprawione.", maximum: "Osiagnieto maksymalny poziom poprawy. Sprawdz twierdzenia przed publikacja.", alternative: "Alternatywa zostala zapisana. Dodaj produkt lub sprawdz dane.", unrealistic: "Co najmniej jedna wartosc wyglada nietypowo. Sprawdz oznaczone pola." },
    pt: { generated: "Foi gerada uma nova variante de texto.", improved: "O texto e a preparacao para pesquisa foram melhorados.", maximum: "Nivel maximo de melhoria guiada atingido. Verifique as alegacoes antes de publicar.", alternative: "Alternativa guardada. Adicione um produto ou verifique os dados.", unrealistic: "Um ou mais valores parecem invulgares. Verifique os campos assinalados." },
    ar: { generated: "تم إنشاء نسخة جديدة من النص.", improved: "تم تحسين النص وفحوص الجاهزية للبحث.", maximum: "تم الوصول إلى الحد الأقصى للتحسين الموجه. تحقق من الادعاءات قبل النشر.", alternative: "تم حفظ البديل. أضف منتجاً أو انتقل إلى مراجعة البيانات.", unrealistic: "تبدو قيمة واحدة أو أكثر غير معتادة. تحقق من الحقول المحددة." },
    tr: { generated: "Yeni bir web metni varyasyonu olusturuldu.", improved: "Metin ve arama hazirligi iyilestirildi.", maximum: "Yonlendirmeli iyilestirme sinirina ulasildi. Yayinlamadan once iddialari kontrol edin.", alternative: "Alternatif kaydedildi. Urun ekleyin veya verileri dogrulayin.", unrealistic: "Bir veya daha fazla deger olagandisi gorunuyor. Isaretli alanlari kontrol edin." },
    ja: { generated: "新しいウェブコピー案を生成しました。", improved: "コピーと検索準備チェックを改善しました。", maximum: "ガイド付き改善の上限に達しました。公開前に製品情報を確認してください。", alternative: "代替製品を保存しました。次の製品を追加するか、事実確認に進んでください。", unrealistic: "通常範囲外の値があります。強調表示された項目を確認してください。" },
    ko: { generated: "새 웹 카피 변형을 생성했습니다.", improved: "카피와 검색 준비 검사를 개선했습니다.", maximum: "안내형 개선의 최대 단계에 도달했습니다. 게시 전 제품 주장을 확인하십시오.", alternative: "대안을 저장했습니다. 다음 제품을 추가하거나 사실 검토로 이동하십시오.", unrealistic: "비정상적으로 보이는 값이 있습니다. 표시된 필드를 확인하십시오." }
  };

  function interfaceText(english, dutch) {
    return english;
  }

  function notifyUi(messageKey) {
    var message = uiMessages.en[messageKey] || messageKey;
    var toast = document.createElement("div");
    toast.className = "ym15-toast ym-dynamic-language";
    toast.setAttribute("translate", "yes");
    toast.textContent = message;
    toast.style.cssText = "position:fixed;right:20px;bottom:20px;z-index:10000;max-width:360px;padding:12px 16px;border-radius:7px;background:#151820;color:#fff;font:700 14px/1.4 Arial,sans-serif;box-shadow:0 14px 36px rgba(0,0,0,.24)";
    document.body.appendChild(toast);
    requestDynamicTranslation(toast);
    window.setTimeout(function () { toast.remove(); }, 3200);
  }

  function replaceSourceLanguageLeaks() {
    var language = currentUiLanguage();
    var translated = document.documentElement.classList.contains("translated-ltr") || document.documentElement.classList.contains("translated-rtl");
    if (translated && language !== "en") { return; }
    var replacements = [
      [/Omnichannel\s+gezamenlijke\s+marketing\s+guide/gi, "Omnichannel marketing guide"],
      [/Plan\s+gezamenlijke\s+marketing\s+activity/gi, "Plan marketing activity"],
      [/Copy\s+advies\s+bijgewerkt\.?/gi, "Copy recommendations updated."],
      [/gezamenlijke\s+marketingactie/gi, "joint marketing activity"],
      [/gezamenlijke\s+actie/gi, "joint activity"],
      [/Welkom\s+terug/gi, "Welcome back"],
      [/Actieve\s+campagnes/gi, "Active campaigns"],
      [/Snelle\s+toegang/gi, "Quick access"],
      [/Productcategorie[eë]n/gi, "Product categories"],
      [/Mijn\s+voortgang/gi, "My progress"],
      [/Naar\s+training/gi, "Open training"],
      [/Bekijk\s+campagne/gi, "View campaign"],
      [/Portalkennis/gi, "Portal Knowledge"],
      [/Waterpompen/gi, "Water pumps"],
      [/Generatoren/gi, "Generators"],
      [/Motoren/gi, "Engines"],
      [/Documenten/gi, "Documents"]
    ];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue || !node.parentElement || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(node.parentElement.tagName)) { continue; }
      var nextValue = node.nodeValue;
      replacements.forEach(function (entry) { nextValue = nextValue.replace(entry[0], entry[1]); });
      if (nextValue !== node.nodeValue) { node.nodeValue = nextValue; }
    }
  }

  var translationRefreshTimer = 0;

  function requestDynamicTranslation(root) {
    if (root) {
      root.setAttribute("translate", "yes");
      root.classList.remove("notranslate");
      qa("[translate='no'].ym-dynamic-language, .notranslate.ym-dynamic-language", root).forEach(function (element) {
        element.setAttribute("translate", "yes");
        element.classList.remove("notranslate");
      });
    }
    var language = currentUiLanguage();
    document.documentElement.lang = language === "zh-CN" ? "zh" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    if (language === "en") {
      replaceSourceLanguageLeaks();
      return;
    }
    window.clearTimeout(translationRefreshTimer);
    translationRefreshTimer = window.setTimeout(function () {
      var combo = q(".goog-te-combo");
      if (!combo) { return; }
      combo.value = language;
      combo.dispatchEvent(new Event("change", { bubbles: true }));
    }, 180);
  }

  function applyLanguageMetadata() {
    var language = currentUiLanguage();
    document.documentElement.lang = language === "zh-CN" ? "zh" : language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    qa(".ym-knowledge-shell, .ym-copy-onboarding, .ym-seo-score-card, .ym-comparison-helper, .ym-recommended-points, .ym-copy-status, .ym-tco-guidance").forEach(function (element) {
      element.setAttribute("translate", "yes");
      element.classList.remove("notranslate");
    });
    if (language === "en") { replaceSourceLanguageLeaks(); }
  }

  function iconSvg(type) {
    var common = "data-ym-control-icon='true' fill='none' stroke='currentColor' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round' aria-hidden='true' focusable='false'";
    if (type === "theme-light") {
      return "<svg viewBox='0 0 24 24' " + common + "><circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42'/></svg>";
    }
    if (type === "theme" || type === "theme-dark") {
      return "<svg viewBox='0 0 24 24' " + common + "><path d='M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z'/></svg>";
    }
    return "<svg viewBox='0 0 24 24' " + common + "><circle cx='12' cy='8' r='3.5'/><path d='M5 20c.7-4 3.1-6 7-6s6.3 2 7 6'/></svg>";
  }

  function polishHeader() {
    var language = q("#language-select, select[name='language'], .language-select select");
    var admin = q("#admin-toggle");
    var theme = q("#theme-toggle");
    var searchInput = q(".global-search input, .search-shell input, .header-search input, input[type='search']");
    var header = (admin && admin.closest("header, .topbar, .portal-header")) || q("header, .topbar, .portal-header");
    if (header) {
      var inner = header.firstElementChild || header;
      inner.classList.add("topbar-inner");
    }
    if (searchInput && searchInput.parentElement) {
      var searchWrapper = searchInput.closest("#ym-global-search, .ym-global-search") || searchInput.parentElement;
      searchWrapper.classList.add("global-search");
      if (searchInput.parentElement !== searchWrapper) { searchInput.parentElement.classList.remove("global-search"); }
    }
    if (language) {
      var tools = language.closest(".header-tools, .topbar-tools, .header-actions");
      if (!tools && admin) {
        tools = admin.parentElement;
        if (tools) { tools.classList.add("header-tools"); }
      }
    }
    if (theme) {
      var dark = document.body.classList.contains("dark-mode");
      theme.innerHTML = iconSvg(dark ? "theme-light" : "theme-dark");
      theme.classList.add("ym-icon-control");
      theme.setAttribute("aria-pressed", dark ? "true" : "false");
      theme.setAttribute("aria-label", dark ? interfaceText("Switch to light mode", "Schakel naar lichte modus") : interfaceText("Switch to dark mode", "Schakel naar donkere modus"));
      theme.setAttribute("title", dark ? interfaceText("Light mode", "Lichte modus") : interfaceText("Dark mode", "Donkere modus"));
      if (theme.dataset.ym15Polish !== "true") {
        theme.dataset.ym15Polish = "true";
        theme.addEventListener("click", function () { window.setTimeout(polishHeader, 40); });
      }
    }
    if (admin) {
      admin.innerHTML = iconSvg("admin");
      var adminMode = document.body.classList.contains("admin-mode");
      admin.classList.add("ym-icon-control");
      admin.setAttribute("aria-pressed", adminMode ? "true" : "false");
      admin.setAttribute("aria-label", adminMode ? interfaceText("Return to distributor view", "Terug naar distributeursweergave") : interfaceText("Open Yanmar admin view", "Open Yanmar-adminweergave"));
      admin.setAttribute("title", adminMode ? interfaceText("Distributor view", "Distributeursweergave") : interfaceText("Yanmar admin view", "Yanmar-adminweergave"));
      if (admin.dataset.ym15Polish !== "true") {
        admin.dataset.ym15Polish = "true";
        admin.addEventListener("click", function () { window.setTimeout(polishHeader, 40); window.setTimeout(polishHeader, 220); });
      }
    }
  }

  var semanticThemeSyncing = false;

  function syncSemanticTheme() {
    if (!document.body || semanticThemeSyncing) { return; }
    semanticThemeSyncing = true;
    var dark = document.body.classList.contains("dark-mode");
    document.documentElement.classList.toggle("dark", dark);
    /* Tailwind's class strategy belongs on the root element. Remove the stale
       body.dark alias so older one-off rules cannot compete with the semantic
       theme. */
    document.body.classList.remove("dark");
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.body.dataset.theme = dark ? "dark" : "light";
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    semanticThemeSyncing = false;
    polishHeader();
  }

  function installThemeCompatibility() {
    syncSemanticTheme();
    if (document.body.dataset.ymThemeObserver !== "true") {
      document.body.dataset.ymThemeObserver = "true";
      var bodyObserver = new MutationObserver(function (mutations) {
        if (mutations.some(function (mutation) { return mutation.attributeName === "class"; })) {
          window.setTimeout(syncSemanticTheme, 0);
        }
      });
      bodyObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    }
    [q("#theme-toggle"), q("#admin-toggle")].filter(Boolean).forEach(function (control) {
      if (control.dataset.ymIconObserver === "true") { return; }
      control.dataset.ymIconObserver = "true";
      var iconObserver = new MutationObserver(function () {
        if (!control.querySelector("svg[data-ym-control-icon='true']")) {
          window.setTimeout(polishHeader, 0);
        }
      });
      iconObserver.observe(control, { childList: true, characterData: true, subtree: true });
    });
    window.addEventListener("storage", function (event) {
      if (/theme/i.test(String(event.key || ""))) { window.setTimeout(syncSemanticTheme, 0); }
    });
  }

  function removeAbbreviationTiles() {
    qa(".icon-box").forEach(function (element) {
      if (element.querySelector("svg, img")) { return; }
      var value = String(element.textContent || "").trim();
      if (/^[A-Z0-9]{1,4}$/.test(value)) {
        element.classList.add("ym-abbreviation");
        element.setAttribute("aria-hidden", "true");
      }
    });
  }

  var studioState = { variation: 0, improvement: 0, installed: false };
  var studioLanguages = [
    ["en", "English"], ["nl", "Dutch"], ["de", "German"], ["fr", "French"],
    ["es", "Spanish"], ["it", "Italian"], ["pl", "Polish"], ["pt", "Portuguese"],
    ["ar", "Arabic"], ["tr", "Turkish"], ["ja", "Japanese"], ["ko", "Korean"]
  ];

  var productTerms = {
    en: { ydg: ["Yanmar YDG diesel generators", "diesel generator"], ydp: ["Yanmar YDP diesel water pumps", "diesel water pump"], lseries: ["Yanmar L-Series diesel engines", "industrial diesel engine"] },
    nl: { ydg: ["Yanmar YDG dieselgeneratoren", "dieselgenerator"], ydp: ["Yanmar YDP dieselwaterpompen", "dieselwaterpomp"], lseries: ["Yanmar L-Series dieselmotoren", "industriele dieselmotor"] },
    de: { ydg: ["Yanmar YDG Dieselgeneratoren", "Dieselgenerator"], ydp: ["Yanmar YDP Dieselwasserpumpen", "Dieselwasserpumpe"], lseries: ["Yanmar L-Series Dieselmotoren", "Industrie-Dieselmotor"] },
    fr: { ydg: ["groupes electrogenes diesel Yanmar YDG", "groupe electrogene diesel"], ydp: ["pompes a eau diesel Yanmar YDP", "pompe a eau diesel"], lseries: ["moteurs diesel Yanmar L-Series", "moteur diesel industriel"] },
    es: { ydg: ["generadores diesel Yanmar YDG", "generador diesel"], ydp: ["bombas de agua diesel Yanmar YDP", "bomba de agua diesel"], lseries: ["motores diesel Yanmar L-Series", "motor diesel industrial"] },
    it: { ydg: ["generatori diesel Yanmar YDG", "generatore diesel"], ydp: ["pompe acqua diesel Yanmar YDP", "pompa acqua diesel"], lseries: ["motori diesel Yanmar L-Series", "motore diesel industriale"] },
    pl: { ydg: ["generatory diesla Yanmar YDG", "generator diesla"], ydp: ["pompy wody diesel Yanmar YDP", "pompa wody diesel"], lseries: ["silniki diesla Yanmar L-Series", "przemyslowy silnik diesla"] },
    pt: { ydg: ["geradores diesel Yanmar YDG", "gerador diesel"], ydp: ["bombas de agua diesel Yanmar YDP", "bomba de agua diesel"], lseries: ["motores diesel Yanmar L-Series", "motor diesel industrial"] },
    ar: { ydg: ["مولدات الديزل Yanmar YDG", "مولد ديزل"], ydp: ["مضخات المياه بالديزل Yanmar YDP", "مضخة مياه ديزل"], lseries: ["محركات الديزل Yanmar L-Series", "محرك ديزل صناعي"] },
    tr: { ydg: ["Yanmar YDG dizel jeneratorler", "dizel jenerator"], ydp: ["Yanmar YDP dizel su pompalari", "dizel su pompasi"], lseries: ["Yanmar L-Series dizel motorlar", "endustriyel dizel motor"] },
    ja: { ydg: ["Yanmar YDG ディーゼル発電機", "ディーゼル発電機"], ydp: ["Yanmar YDP ディーゼルウォーターポンプ", "ディーゼルウォーターポンプ"], lseries: ["Yanmar L-Series ディーゼルエンジン", "産業用ディーゼルエンジン"] },
    ko: { ydg: ["Yanmar YDG 디젤 발전기", "디젤 발전기"], ydp: ["Yanmar YDP 디젤 워터 펌프", "디젤 워터 펌프"], lseries: ["Yanmar L-Series 디젤 엔진", "산업용 디젤 엔진"] }
  };

  function selectedText(selector) {
    if (!selector) { return ""; }
    return selector.options && selector.selectedIndex >= 0 ? selector.options[selector.selectedIndex].textContent.trim() : String(selector.value || "").trim();
  }

  function normaliseProduct(value) {
    var key = textKey(value);
    if (/ydp|pump|pomp|bomba|pompe/.test(key)) { return "ydp"; }
    if (/engine|motor|series|l100|l70|l48/.test(key)) { return "lseries"; }
    return "ydg";
  }

  function normalisePageType(value) {
    var key = textKey(value);
    if (/campaign|landing|sea|paid/.test(key)) { return "campaign"; }
    if (/category|overview|range/.test(key)) { return "category"; }
    if (/news|article|dealer/.test(key)) { return "news"; }
    return "product";
  }

  function studioRoot() {
    var product = q("#webcopy-product");
    return q("#website-copy-studio") || q("#website-copy") || (product && (product.closest(".page, .content-page") || product.closest("section"))) || document;
  }

  var studioFieldIds = {
    eyebrow: ["webcopy-eyebrow"], headline: ["webcopy-headline", "webcopy-h1"], intro: ["webcopy-intro"],
    benefits: ["webcopy-benefits"], regional: ["webcopy-regional", "webcopy-value"], application: ["webcopy-application"],
    ctaTitle: ["webcopy-cta-title", "webcopy-cta-heading"], ctaBody: ["webcopy-cta-body", "webcopy-cta-support"],
    cta: ["webcopy-cta", "webcopy-cta-button"], seoTitle: ["webcopy-seo-title"],
    meta: ["webcopy-meta", "webcopy-meta-description"], faq: ["webcopy-faq"]
  };

  var studioFieldLabels = {
    eyebrow: /eyebrow/i, headline: /h1|headline/i, intro: /intro/i, benefits: /benefit|proof-led/i,
    regional: /regional value|value proposition/i, application: /application section/i,
    ctaTitle: /cta heading/i, ctaBody: /cta supporting|supporting text/i, cta: /cta button/i,
    seoTitle: /seo title/i, meta: /meta description/i, faq: /faq/i
  };

  function studioField(name) {
    var ids = studioFieldIds[name] || [];
    var root = studioRoot();
    var found = null;
    ids.some(function (id) { found = document.getElementById(id); return Boolean(found); });
    if (found) { return found; }
    qa("label", root).some(function (label) {
      if (!(studioFieldLabels[name] || /$^/).test(label.textContent || "")) { return false; }
      var linked = label.getAttribute("for") && document.getElementById(label.getAttribute("for"));
      found = linked || label.querySelector("input, textarea, [contenteditable='true']") || (label.parentElement && label.parentElement.querySelector("input, textarea, [contenteditable='true']"));
      return Boolean(found);
    });
    return found;
  }

  function setStudioField(name, value) {
    var field = studioField(name);
    if (!field) { return; }
    field.setAttribute("translate", "no");
    field.classList.add("notranslate");
    if (field.matches("input, textarea")) { field.value = value; } else { field.textContent = value; }
    field.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function getStudioField(name) {
    var field = studioField(name);
    return field ? String(field.value != null ? field.value : field.textContent || "").trim() : "";
  }

  function localSegment(language, source) {
    if (language === "en") { return source || "professional applications"; }
    var values = {
      nl: "professionele toepassingen", de: "professionelle Anwendungen", fr: "applications professionnelles",
      es: "aplicaciones profesionales", it: "applicazioni professionali", pl: "zastosowania profesjonalne",
      pt: "aplicacoes profissionais", ar: "التطبيقات المهنية", tr: "profesyonel uygulamalar",
      ja: "プロフェッショナル用途", ko: "전문 작업 환경"
    };
    return values[language] || source || "professional applications";
  }

  function createCopy(language, productKey, pageType, context, variation, level) {
    var terms = (productTerms[language] || productTerms.en)[productKey] || productTerms.en.ydg;
    var product = terms[0];
    var keyword = context.keyword || terms[1];
    var segment = localSegment(language, context.segment);
    var distributor = context.distributor || "Yanmar distributor";
    var pageLead = pageType === "campaign" ? "campaign" : pageType === "category" ? "category" : pageType === "news" ? "news" : "product";
    var pageOffset = pageLead === "campaign" ? 1 : pageLead === "category" ? 2 : pageLead === "news" ? 1 : 0;
    var v = (variation + pageOffset) % 3;
    var copy;

    if (language === "nl") {
      copy = {
        eyebrow: pageLead === "campaign" ? "Lokale campagne voor professionele inzet" : "Professionele Yanmar-oplossingen",
        headline: [product + " voor werk dat door moet gaan", "Kies betrouwbare prestaties met " + product, "Praktische dieselkracht voor " + segment][v],
        intro: distributor + " helpt klanten de juiste " + keyword + " te selecteren voor inzetduur, capaciteit en lokale omstandigheden. De focus ligt op duidelijke productspecificaties, praktische toepasbaarheid en lokale ondersteuning.",
        benefits: "• Betrouwbare Yanmar-dieseltechniek voor professioneel gebruik\n• Duidelijke modelkeuze op basis van toepassing en inzetduur\n• Lokale ondersteuning voor beschikbaarheid, service en onderdelen",
        regional: "Een sterke lokale propositie combineert inzetzekerheid, beheersbare gebruikskosten en ondersteuning die past bij de markt.",
        application: "Gebruik " + product + " voor " + segment + ". Controleer capaciteit, bedrijfsuren, omgeving en servicebehoefte altijd aan de hand van het actuele lokale datablad.",
        ctaTitle: "Vind het juiste model voor uw toepassing",
        ctaBody: "Deel de gewenste capaciteit, inzetduur en locatie. " + distributor + " controleert het passende model en de lokale beschikbaarheid.",
        cta: "Vraag productadvies aan",
        faq: "Vraag: Welk model past bij mijn toepassing?\nAntwoord: Laat capaciteit, inzetduur en lokale omstandigheden beoordelen op basis van het actuele datablad."
      };
    } else if (language === "de") {
      copy = {
        eyebrow: "Professionelle Yanmar-Loesungen", headline: [product + " fuer verlaessliche Arbeit", "Verlaessliche Leistung mit " + product, "Praktische Dieselleistung fuer " + segment][v],
        intro: distributor + " unterstuetzt Kunden bei der Auswahl der passenden " + keyword + " anhand von Leistung, Betriebsdauer und lokalen Bedingungen. Aktuelle Produktspezifikationen und die praktische Anwendung stehen im Mittelpunkt.",
        benefits: "• Bewaehrte Yanmar-Dieseltechnik fuer professionelle Anwendungen\n• Klare Modellauswahl nach Einsatz und Betriebsdauer\n• Lokale Unterstuetzung fuer Verfuegbarkeit, Service und Teile",
        regional: "Das lokale Nutzenversprechen verbindet Betriebssicherheit, nachvollziehbare Kosten und marktspezifische Unterstuetzung.",
        application: product + " eignet sich fuer " + segment + ". Leistung, Betriebsstunden und Servicebedarf sind mit dem aktuellen lokalen Datenblatt abzugleichen.",
        ctaTitle: "Passendes Modell fuer Ihre Anwendung finden", ctaBody: "Teilen Sie Leistung, Betriebsdauer und Einsatzort. " + distributor + " prueft Modell und lokale Verfuegbarkeit.", cta: "Produktberatung anfragen", faq: "Frage: Welches Modell passt?\nAntwort: Leistung, Betriebsdauer und lokale Bedingungen anhand des aktuellen Datenblatts pruefen."
      };
    } else if (language === "fr") {
      copy = {
        eyebrow: "Solutions Yanmar professionnelles", headline: [product + " pour les travaux exigeants", "Des performances fiables avec " + product, "Une solution diesel pratique pour les applications professionnelles"][v],
        intro: distributor + " aide a selectionner la bonne solution selon la capacite, la duree d'utilisation et les conditions locales. Les specifications actuelles et l'usage reel guident la recommandation.",
        benefits: "• Technologie diesel Yanmar pour les usages professionnels\n• Selection claire selon l'application et la duree d'utilisation\n• Assistance locale pour la disponibilite, le service et les pieces",
        regional: "La proposition locale associe continuite d'activite, couts d'utilisation maitrises et assistance adaptee au marche.",
        application: "Utilisez " + product + " pour des applications professionnelles. Verifiez capacite, heures de fonctionnement et entretien dans la fiche technique locale actuelle.",
        ctaTitle: "Trouvez le modele adapte", ctaBody: "Indiquez la capacite, la duree et le lieu d'utilisation. " + distributor + " verifiera le modele et la disponibilite locale.", cta: "Demander un conseil produit", faq: "Question : Quel modele choisir ?\nReponse : Comparez capacite, duree et conditions locales avec la fiche technique actuelle."
      };
    } else if (language === "es") {
      copy = {
        eyebrow: "Soluciones profesionales Yanmar", headline: [product + " para trabajos exigentes", "Rendimiento fiable con " + product, "Potencia diesel practica para aplicaciones profesionales"][v],
        intro: distributor + " ayuda a elegir la solucion adecuada segun capacidad, horas de uso y condiciones locales. La recomendacion se basa en especificaciones actuales y en la aplicacion real.",
        benefits: "• Tecnologia diesel Yanmar para uso profesional\n• Seleccion clara segun aplicacion y horas de trabajo\n• Soporte local para disponibilidad, servicio y repuestos",
        regional: "La propuesta local combina continuidad operativa, costes de uso claros y soporte adaptado al mercado.",
        application: "Utilice " + product + " en aplicaciones profesionales. Verifique capacidad, horas y mantenimiento con la ficha tecnica local vigente.",
        ctaTitle: "Encuentre el modelo adecuado", ctaBody: "Indique capacidad, horas y lugar de uso. " + distributor + " comprobara el modelo y la disponibilidad local.", cta: "Solicitar asesoramiento", faq: "Pregunta: ¿Que modelo necesito?\nRespuesta: Compare capacidad, horas de uso y condiciones locales con la ficha tecnica vigente."
      };
    } else if (language === "it") {
      copy = {
        eyebrow: "Soluzioni professionali Yanmar", headline: [product + " per lavori impegnativi", "Prestazioni affidabili con " + product, "Potenza diesel pratica per applicazioni professionali"][v],
        intro: distributor + " aiuta a scegliere la soluzione corretta in base a capacita, ore di utilizzo e condizioni locali. La raccomandazione utilizza specifiche aggiornate e requisiti applicativi reali.",
        benefits: "• Tecnologia diesel Yanmar per uso professionale\n• Selezione chiara per applicazione e durata\n• Supporto locale per disponibilita, assistenza e ricambi",
        regional: "La proposta locale combina continuita operativa, costi d'uso trasparenti e supporto adatto al mercato.",
        application: "Utilizzare " + product + " per applicazioni professionali. Verificare capacita, ore e manutenzione nella scheda tecnica locale aggiornata.",
        ctaTitle: "Trova il modello adatto", ctaBody: "Condividi capacita, durata e luogo di utilizzo. " + distributor + " verifichera modello e disponibilita.", cta: "Richiedi consulenza", faq: "Domanda: Quale modello scegliere?\nRisposta: Confrontare capacita, durata e condizioni locali con la scheda tecnica aggiornata."
      };
    } else if (language === "pl") {
      copy = {
        eyebrow: "Profesjonalne rozwiazania Yanmar", headline: [product + " do wymagajacej pracy", "Niezawodna wydajnosc z " + product, "Praktyczna moc diesla do profesjonalnych zastosowan"][v],
        intro: distributor + " pomaga wybrac odpowiednie rozwiazanie na podstawie wydajnosci, czasu pracy i warunkow lokalnych. Rekomendacja opiera sie na aktualnych danych technicznych i rzeczywistym zastosowaniu.",
        benefits: "• Technologia diesla Yanmar do profesjonalnej pracy\n• Jasny wybor modelu wedlug zastosowania i czasu pracy\n• Lokalne wsparcie, serwis i dostepnosc czesci",
        regional: "Lokalna propozycja laczy ciaglosc pracy, przejrzyste koszty i wsparcie dopasowane do rynku.",
        application: "Stosuj " + product + " w profesjonalnych zastosowaniach. Sprawdz wydajnosc, czas pracy i serwis w aktualnej lokalnej karcie danych.",
        ctaTitle: "Znajdz odpowiedni model", ctaBody: "Podaj wymagana wydajnosc, czas i miejsce pracy. " + distributor + " potwierdzi model i dostepnosc.", cta: "Popros o dobor produktu", faq: "Pytanie: Ktory model wybrac?\nOdpowiedz: Porownaj wydajnosc, czas pracy i warunki lokalne z aktualna karta danych."
      };
    } else if (language === "pt") {
      copy = {
        eyebrow: "Solucoes profissionais Yanmar", headline: [product + " para trabalho exigente", "Desempenho fiavel com " + product, "Potencia diesel pratica para aplicacoes profissionais"][v],
        intro: distributor + " ajuda a selecionar a solucao correta com base na capacidade, horas de operacao e condicoes locais. A recomendacao usa especificacoes atuais e necessidades reais.",
        benefits: "• Tecnologia diesel Yanmar para uso profissional\n• Selecao clara por aplicacao e horas de trabalho\n• Suporte local para disponibilidade, servico e pecas",
        regional: "A proposta local combina continuidade operacional, custos claros e suporte adequado ao mercado.",
        application: "Use " + product + " em aplicacoes profissionais. Confirme capacidade, horas e manutencao na ficha tecnica local atual.",
        ctaTitle: "Encontre o modelo certo", ctaBody: "Informe capacidade, duracao e local. " + distributor + " confirmara o modelo e a disponibilidade.", cta: "Pedir recomendacao", faq: "Pergunta: Qual modelo escolher?\nResposta: Compare capacidade, duracao e condicoes locais com a ficha tecnica atual."
      };
    } else if (language === "ar") {
      copy = {
        eyebrow: "حلول Yanmar للمحترفين", headline: [product + " للعمل في الظروف الصعبة", "أداء موثوق مع " + product, "قوة ديزل عملية للتطبيقات المهنية"][v],
        intro: "يساعد " + distributor + " العملاء على اختيار الحل المناسب حسب السعة وساعات التشغيل والظروف المحلية، مع الاعتماد على المواصفات الحالية ومتطلبات الاستخدام الفعلية.",
        benefits: "• تقنية ديزل من Yanmar للاستخدام المهني\n• اختيار واضح للطراز حسب التطبيق وساعات التشغيل\n• دعم محلي للتوفر والصيانة وقطع الغيار",
        regional: "تجمع القيمة المحلية بين استمرارية التشغيل ووضوح التكلفة والدعم المناسب للسوق.",
        application: "استخدم " + product + " في التطبيقات المهنية، وتحقق من السعة وساعات التشغيل والصيانة في ورقة البيانات المحلية الحالية.",
        ctaTitle: "اعثر على الطراز المناسب", ctaBody: "شارك السعة المطلوبة وساعات التشغيل والموقع ليؤكد الموزع الطراز والتوفر المحلي.", cta: "اطلب استشارة المنتج", faq: "سؤال: ما الطراز المناسب؟\nالجواب: قارن السعة وساعات التشغيل والظروف المحلية مع ورقة البيانات الحالية."
      };
    } else if (language === "tr") {
      copy = {
        eyebrow: "Profesyonel Yanmar cozumleri", headline: [product + " zorlu isler icin", product + " ile guvenilir performans", "Profesyonel uygulamalar icin pratik dizel gucu"][v],
        intro: distributor + ", kapasite, calisma suresi ve yerel kosullara gore dogru cozumu secmenize yardimci olur. Oneri guncel teknik veriler ve gercek uygulama ihtiyaclarina dayanir.",
        benefits: "• Profesyonel kullanim icin Yanmar dizel teknolojisi\n• Uygulama ve calisma suresine gore net model secimi\n• Stok, servis ve parca icin yerel destek",
        regional: "Yerel deger onerisi sureklilik, anlasilir kullanim maliyeti ve pazara uygun destegi birlestirir.",
        application: product + " profesyonel uygulamalarda kullanilir. Kapasite, saat ve bakim ihtiyacini guncel yerel veri sayfasiyla dogrulayin.",
        ctaTitle: "Dogru modeli bulun", ctaBody: "Kapasiteyi, calisma suresini ve konumu paylasin. " + distributor + " model ve stogu kontrol eder.", cta: "Urun tavsiyesi isteyin", faq: "Soru: Hangi model uygun?\nCevap: Kapasite, calisma suresi ve yerel kosullari guncel veri sayfasiyla karsilastirin."
      };
    } else if (language === "ja") {
      copy = {
        eyebrow: "プロフェッショナル向けYanmarソリューション", headline: [product + "で現場を止めない", product + "による信頼性の高い性能", "プロ用途に適した実用的なディーゼル性能"][v],
        intro: distributor + "は、必要能力、運転時間、地域条件に基づく製品選定を支援します。最新仕様と実際の用途を確認して提案します。",
        benefits: "• プロ用途向けのYanmarディーゼル技術\n• 用途と運転時間に応じた明確なモデル選定\n• 在庫、サービス、部品に関する地域サポート",
        regional: "地域の価値提案では、稼働継続、明確な運用コスト、市場に合ったサポートを重視します。",
        application: product + "をプロ用途で使用する際は、能力、運転時間、整備条件を最新の地域仕様書で確認してください。",
        ctaTitle: "用途に合うモデルを選ぶ", ctaBody: "必要能力、運転時間、使用場所を共有してください。販売店がモデルと在庫を確認します。", cta: "製品選定を相談する", faq: "質問：どのモデルが適していますか？\n回答：能力、運転時間、地域条件を最新仕様書と照合してください。"
      };
    } else if (language === "ko") {
      copy = {
        eyebrow: "전문가를 위한 Yanmar 솔루션", headline: [product + "로 작업 연속성 확보", product + "의 신뢰할 수 있는 성능", "전문 작업을 위한 실용적인 디젤 성능"][v],
        intro: distributor + "는 필요한 용량, 운전 시간, 현지 조건을 기준으로 적합한 제품 선택을 지원합니다. 최신 사양과 실제 용도를 확인해 제안합니다.",
        benefits: "• 전문 작업을 위한 Yanmar 디젤 기술\n• 용도와 운전 시간에 따른 명확한 모델 선택\n• 재고, 서비스, 부품에 대한 현지 지원",
        regional: "현지 가치 제안은 가동 연속성, 명확한 운영 비용, 시장에 맞는 지원을 결합합니다.",
        application: product + " 사용 전 용량, 운전 시간, 정비 조건을 최신 현지 데이터시트로 확인하십시오.",
        ctaTitle: "용도에 맞는 모델 찾기", ctaBody: "필요 용량, 운전 시간, 사용 위치를 알려주시면 판매점이 모델과 재고를 확인합니다.", cta: "제품 선택 상담 요청", faq: "질문: 어떤 모델이 적합합니까?\n답변: 용량, 운전 시간, 현지 조건을 최신 데이터시트와 비교하십시오."
      };
    } else {
      copy = {
        eyebrow: pageLead === "campaign" ? "Professional equipment for planned work" : "Professional Yanmar equipment",
        headline: [product + " for work that needs to keep moving", "Choose dependable performance with " + product, "Practical diesel performance for " + segment][v],
        intro: distributor + " helps customers select the right " + keyword + " for capacity, operating hours and local conditions. Recommendations connect current product specifications with the real application instead of relying on generic claims.",
        benefits: "• Dependable Yanmar diesel engineering for professional applications\n• Clear model selection based on duty, capacity and operating hours\n• Local support for availability, service and parts",
        regional: "A strong local value proposition combines uptime, transparent operating cost and support that fits the market.",
        application: "Use " + product + " for " + segment + ". Confirm capacity, operating hours, environment and service requirements against the current local datasheet.",
        ctaTitle: "Find the right model for your duty cycle",
        ctaBody: "Share the required capacity, operating hours and location. " + distributor + " will confirm the suitable model and local availability.",
        cta: "Request product selection advice",
        faq: "Question: Which model fits my application?\nAnswer: Compare required capacity, operating hours and local conditions against the current model datasheet."
      };
    }

    if (level >= 1) {
      copy.intro += language === "nl" ? " Vergelijk modellen altijd op dezelfde meetstandaard." : language === "en" ? " Compare models using the same measurement standard." : "";
    }
    if (level >= 2) {
      copy.regional += language === "nl" ? " Benoem alleen technische voordelen die met een actuele bron zijn onderbouwd." : language === "en" ? " Publish technical advantages only when they are supported by a current source." : "";
    }
    if (level >= 3) {
      copy.faq += language === "nl" ? "\n\nVraag: Waar controleer ik technische claims?\nAntwoord: Gebruik het actuele lokale datablad en laat claims goedkeuren voor publicatie." : language === "en" ? "\n\nQuestion: How should technical claims be checked?\nAnswer: Use the current local datasheet and complete claim approval before publishing." : "";
    }

    if (language === "en" && pageLead === "campaign") {
      copy.eyebrow = "Campaign landing page";
      copy.ctaTitle = "Plan the next job with the right Yanmar model";
      copy.cta = "Check model availability";
    } else if (language === "en" && pageLead === "category") {
      copy.eyebrow = "Yanmar product range";
      copy.intro = "Compare " + product + " by application, duty, capacity and local support. " + copy.intro;
      copy.cta = "Compare available models";
    } else if (language === "en" && pageLead === "news") {
      copy.eyebrow = "Distributor product update";
      copy.cta = "Discuss the application";
    } else if (language === "nl" && pageLead === "campaign") {
      copy.eyebrow = "Campagnelandingspagina";
      copy.ctaTitle = "Plan de volgende inzet met het juiste Yanmar-model";
      copy.cta = "Controleer modelbeschikbaarheid";
    } else if (language === "nl" && pageLead === "category") {
      copy.eyebrow = "Yanmar-productoverzicht";
      copy.intro = "Vergelijk " + product + " op toepassing, inzet, capaciteit en lokale ondersteuning. " + copy.intro;
      copy.cta = "Vergelijk beschikbare modellen";
    }

    var titleSuffix = language === "nl" ? " | Yanmar" : " | Yanmar";
    copy.seoTitle = (copy.headline.length > 54 ? copy.headline.slice(0, 54).replace(/\s+\S*$/, "") : copy.headline) + titleSuffix;
    copy.meta = copy.intro.replace(/\s+/g, " ");
    if (copy.meta.length > 155) { copy.meta = copy.meta.slice(0, 152).replace(/\s+\S*$/, "") + "..."; }
    return copy;
  }

  function scoreCopy() {
    var language = (q("#webcopy-language") || {}).value || "en";
    var product = normaliseProduct((q("#webcopy-product") || {}).value);
    var keywordInput = q("#ym-copy-keyword, #webcopy-keyword");
    var keyword = String(keywordInput ? keywordInput.value : (productTerms[language] || productTerms.en)[product][1]).trim().toLowerCase();
    var values = {
      title: getStudioField("seoTitle"), meta: getStudioField("meta"), h1: getStudioField("headline"),
      intro: getStudioField("intro"), benefits: getStudioField("benefits"), cta: getStudioField("cta"), faq: getStudioField("faq")
    };
    var checks = [];
    checks.push({ label: interfaceText("Descriptive SEO title", "Beschrijvende SEO-titel"), pass: values.title.length >= 30 && values.title.length <= 65, points: 14 });
    checks.push({ label: interfaceText("Unique meta description", "Unieke metaomschrijving"), pass: values.meta.length >= 80 && values.meta.length <= 165, points: 14 });
    checks.push({ label: interfaceText("Helpful H1", "Duidelijke H1"), pass: values.h1.length >= 22 && values.h1.length <= 90, points: 12 });
    checks.push({ label: interfaceText("Natural search intent", "Natuurlijke zoekintentie"), pass: keyword && (values.title + " " + values.h1 + " " + values.intro).toLowerCase().indexOf(keyword) >= 0, points: 14 });
    checks.push({ label: interfaceText("Useful introduction", "Nuttige introductie"), pass: values.intro.length >= 120, points: 12 });
    checks.push({ label: interfaceText("Scannable benefits", "Scanbare voordelen"), pass: (values.benefits.match(/[•\n-]/g) || []).length >= 3, points: 10 });
    checks.push({ label: interfaceText("Clear next action", "Duidelijke vervolgstap"), pass: values.cta.length >= 10, points: 10 });
    checks.push({ label: interfaceText("Question coverage", "Vraagdekking"), pass: values.faq.length >= 70, points: 8 });
    var combined = Object.keys(values).map(function (key) { return values[key]; }).join(" ").toLowerCase();
    var noLeak = language !== "en" || !/\b(gezamenlijke|advies|bijgewerkt|waterpomp|dieselmotoren)\b/.test(combined);
    checks.push({ label: interfaceText("Language consistency", "Taalconsistentie"), pass: noLeak, points: 6 });
    var raw = checks.reduce(function (sum, item) { return sum + (item.pass ? item.points : 0); }, 0);
    var cap = [76, 84, 91, 96, 100][Math.min(studioState.improvement, 4)];
    var score = Math.min(raw, cap);
    renderCopyScore(score, checks, keyword);
    return score;
  }

  function renderCopyScore(score, checks, keyword) {
    var root = studioRoot();
    var card = q(".ym-seo-score-card", root) || q(".ym-seo-score-card");
    if (!card) {
      card = document.createElement("div");
      card.className = "ym-seo-score-card ym-dynamic-language";
      card.setAttribute("translate", "yes");
      root.appendChild(card);
    }
    var failed = checks.filter(function (item) { return !item.pass; });
    var tip = failed.length ? "Next: " + failed.slice(0, 2).map(function (item) { return item.label.toLowerCase(); }).join(" and ") + "." : "All guided checks pass. Complete evidence and local approval before publishing.";
    if (!keyword) { tip = interfaceText("Add a specific customer-intent keyword before final review.", "Voeg voor de eindcontrole een specifiek zoekwoord met klantintentie toe."); }
    card.innerHTML = "<div class='ym-score-number'><span class='ym-score-value'>" + score + "</span><small>/100</small></div>" +
      "<div><strong>" + escapeHtml(interfaceText("Search-readiness score", "Score voor zoekgereedheid")) + "</strong><div class='ym-score-track'><span style='width:" + score + "%'></span></div>" +
      "<p class='ym-copy-status'>" + escapeHtml(tip) + " " + escapeHtml(interfaceText("Based on Google Search guidance; no tool can guarantee ranking.", "Gebaseerd op Google Search-richtlijnen; geen tool kan een positie garanderen.")) + "</p>" +
      "<div class='ym-score-metrics'>" + checks.map(function (item) { return "<span class='ym-score-metric" + (item.pass ? " is-good" : "") + "'>" + escapeHtml(item.label) + "</span>"; }).join("") + "</div></div>";
    requestDynamicTranslation(card);
  }

  function renderWebsiteCopy(options) {
    options = options || {};
    var languageSelect = q("#webcopy-language");
    var productSelect = q("#webcopy-product");
    var pageSelect = q("#webcopy-page-type, #webcopy-pagetype");
    var segmentSelect = q("#webcopy-segment");
    var distributorInput = q("#webcopy-distributor");
    var keywordInput = q("#ym-copy-keyword, #webcopy-keyword");
    var language = languageSelect ? languageSelect.value : currentUiLanguage();
    var product = normaliseProduct(productSelect ? selectedText(productSelect) + " " + productSelect.value : "ydg");
    var pageType = normalisePageType(pageSelect ? selectedText(pageSelect) + " " + pageSelect.value : "product");
    var defaultKeyword = (productTerms[language] || productTerms.en)[product][1];
    if (keywordInput && (options.forceKeyword || !keywordInput.value.trim())) { keywordInput.value = defaultKeyword; }
    var context = {
      keyword: keywordInput ? keywordInput.value.trim() : defaultKeyword,
      segment: segmentSelect ? selectedText(segmentSelect) : "professional applications",
      distributor: distributorInput ? distributorInput.value.trim() : "Yanmar distributor"
    };
    var copy = createCopy(language, product, pageType, context, studioState.variation, studioState.improvement);
    Object.keys(copy).forEach(function (key) { setStudioField(key, copy[key]); });
    var output = q("#webcopy-output, .webcopy-output", studioRoot());
    if (output) { output.setAttribute("dir", language === "ar" ? "rtl" : "ltr"); }
    var score = scoreCopy();
    var improveButton = q("#ym-copy-improve");
    if (improveButton) {
      improveButton.textContent = studioState.improvement >= 4 ? interfaceText("Guided maximum reached", "Begeleid maximum bereikt") + " (" + score + "/100)" : interfaceText("Improve copy & score · step ", "Verbeter tekst en score · stap ") + (studioState.improvement + 1) + "/4";
      improveButton.disabled = false;
      improveButton.classList.add("ym-dynamic-language");
      improveButton.setAttribute("translate", "yes");
      requestDynamicTranslation(improveButton);
    }
    try {
      localStorage.setItem("yanmarWebCopyDraft", JSON.stringify({ language: language, product: product, pageType: pageType, keyword: context.keyword, copy: copy, score: score }));
    } catch (error) { /* local file privacy modes may block storage */ }
    return score;
  }

  function findButton(root, pattern) {
    return qa("button, .button, .btn", root).find(function (button) { return pattern.test(String(button.textContent || "").trim()); });
  }

  function replaceButtonHandler(button, handler) {
    if (!button || button.dataset.ym15Handler === "true") { return button; }
    var clone = button.cloneNode(true);
    clone.removeAttribute("onclick");
    clone.dataset.ym15Handler = "true";
    button.parentNode.replaceChild(clone, button);
    clone.addEventListener("click", handler);
    return clone;
  }

  function detachLegacyControlListeners(control) {
    if (!control || control.dataset.ym15Control === "true") { return control; }
    var value = control.value;
    var clone = control.cloneNode(true);
    clone.dataset.ym15Control = "true";
    control.parentNode.replaceChild(clone, control);
    clone.value = value;
    return clone;
  }

  function installCopyStudio() {
    /* The final portal uses the compact Website Growth Guide. The legacy copy
       generator remains in the source for historical compatibility but must
       not inject onboarding or score widgets into the active interface. */
    if (q("#website-growth-guide-root")) { return; }
    var productSelect = q("#webcopy-product");
    if (!productSelect) { return; }
    var root = studioRoot();
    if (!root || root === document) { return; }
    qa(".ym-copy-onboarding").forEach(function (element) {
      if (!root.contains(element)) { element.remove(); }
    });
    if (root.dataset.ym15CopyInstalled === "true") { return; }
    root.dataset.ym15CopyInstalled = "true";

    qa("#webcopy-product, #webcopy-language, #webcopy-page-type, #webcopy-pagetype, #webcopy-segment, #webcopy-region", root).forEach(detachLegacyControlListeners);
    productSelect = q("#webcopy-product", root) || q("#webcopy-product");

    if (!qa("option", productSelect).some(function (option) { return normaliseProduct(option.value + " " + option.textContent) === "lseries"; })) {
      var engineOption = document.createElement("option");
      engineOption.value = "lseries";
      engineOption.textContent = "L-Series diesel engines";
      productSelect.appendChild(engineOption);
    }

    var languageSelect = q("#webcopy-language");
    if (languageSelect) {
      var selectedLanguage = languageSelect.value === "en" ? "en" : currentUiLanguage();
      languageSelect.innerHTML = "";
      studioLanguages.forEach(function (entry) {
        var option = document.createElement("option");
        option.value = entry[0];
        option.textContent = entry[1];
        languageSelect.appendChild(option);
      });
      languageSelect.value = studioLanguages.some(function (entry) { return entry[0] === selectedLanguage; }) ? selectedLanguage : "en";
    }

    var onboarding = document.createElement("div");
    onboarding.className = "ym-copy-onboarding ym-dynamic-language";
    onboarding.setAttribute("translate", "yes");
    onboarding.innerHTML = "<div class='ym-copy-step'><span>1</span><div><strong>" + escapeHtml(interfaceText("Choose the product and page", "Kies product en paginatype")) + "</strong><small>" + escapeHtml(interfaceText("The keyword and writing structure adapt automatically.", "Zoekwoord en tekststructuur passen automatisch mee aan.")) + "</small></div></div>" +
      "<div class='ym-copy-step'><span>2</span><div><strong>" + escapeHtml(interfaceText("Generate a complete draft", "Genereer een volledige concepttekst")) + "</strong><small>" + escapeHtml(interfaceText("Each click creates a different, editable variation.", "Elke klik maakt een andere bewerkbare variant.")) + "</small></div></div>" +
      "<div class='ym-copy-step'><span>3</span><div><strong>" + escapeHtml(interfaceText("Improve and validate", "Verbeter en controleer")) + "</strong><small>" + escapeHtml(interfaceText("Use the score and tips, then verify every product claim.", "Gebruik score en tips en controleer daarna iedere productclaim.")) + "</small></div></div>";
    var pageHeader = q(":scope > .page-header", root);
    if (pageHeader) { pageHeader.insertAdjacentElement("afterend", onboarding); }
    else { root.insertBefore(onboarding, root.firstChild); }
    requestDynamicTranslation(onboarding);

    var generate = q("#webcopy-generate, #generate-webcopy", root) || findButton(root, /generate website copy/i);
    generate = replaceButtonHandler(generate, function (event) {
      event.preventDefault();
      studioState.variation += 1;
      studioState.improvement = 0;
      renderWebsiteCopy({ forceKeyword: false });
      notifyUi("generated");
    });

    var improve = q("#ym-copy-improve", root) || findButton(root, /improve copy|improve.*score/i);
    improve = replaceButtonHandler(improve, function (event) {
      event.preventDefault();
      if (!getStudioField("headline")) { renderWebsiteCopy({ forceKeyword: true }); }
      if (studioState.improvement >= 4) {
        scoreCopy();
        notifyUi("maximum");
        return;
      }
      studioState.improvement += 1;
      renderWebsiteCopy({ forceKeyword: false });
      notifyUi(studioState.improvement >= 4 ? "maximum" : "improved");
    });
    if (improve) { improve.id = "ym-copy-improve"; }

    productSelect.addEventListener("change", function () {
      studioState.improvement = 0;
      studioState.variation += 1;
      renderWebsiteCopy({ forceKeyword: true });
    });
    var pageSelect = q("#webcopy-page-type, #webcopy-pagetype");
    if (pageSelect) {
      pageSelect.addEventListener("change", function () {
        studioState.improvement = 0;
        studioState.variation += 1;
        renderWebsiteCopy({ forceKeyword: false });
      });
    }
    if (languageSelect) {
      languageSelect.addEventListener("change", function () {
        studioState.improvement = 0;
        studioState.variation += 1;
        renderWebsiteCopy({ forceKeyword: true });
      });
    }
    qa("input, textarea", root).forEach(function (field) {
      if (field.closest("#webcopy-output, .webcopy-output")) {
        field.addEventListener("input", function () { window.clearTimeout(field._ymScoreTimer); field._ymScoreTimer = window.setTimeout(scoreCopy, 180); });
      }
    });
    renderWebsiteCopy({ forceKeyword: true });
  }

  var currencyCatalog = {
    EUR: "EUR — € Euro", GBP: "GBP — £ British pound", CHF: "CHF — Swiss franc", PLN: "PLN — zł Polish zloty", SEK: "SEK — kr Swedish krona", NOK: "NOK — kr Norwegian krone", DKK: "DKK — kr Danish krone", CZK: "CZK — Kč Czech koruna", HUF: "HUF — Ft Hungarian forint", RON: "RON — lei Romanian leu", BGN: "BGN — лв Bulgarian lev", TRY: "TRY — ₺ Turkish lira",
    USD: "USD — $ US dollar", CAD: "CAD — C$ Canadian dollar", MXN: "MXN — Mex$ Mexican peso", BRL: "BRL — R$ Brazilian real", ARS: "ARS — AR$ Argentine peso", CLP: "CLP — CL$ Chilean peso", COP: "COP — CO$ Colombian peso", PEN: "PEN — S/ Peruvian sol", UYU: "UYU — $U Uruguayan peso",
    SAR: "SAR — ﷼ Saudi riyal", AED: "AED — د.إ UAE dirham", QAR: "QAR — ﷼ Qatari riyal", KWD: "KWD — د.ك Kuwaiti dinar", BHD: "BHD — د.ب Bahraini dinar", OMR: "OMR — ﷼ Omani rial", JOD: "JOD — د.ا Jordanian dinar", EGP: "EGP — E£ Egyptian pound", ILS: "ILS — ₪ Israeli new shekel",
    ZAR: "ZAR — R South African rand", MAD: "MAD — د.م Moroccan dirham", DZD: "DZD — دج Algerian dinar", TND: "TND — د.ت Tunisian dinar", NGN: "NGN — ₦ Nigerian naira", KES: "KES — KSh Kenyan shilling", GHS: "GHS — GH₵ Ghanaian cedi", XOF: "XOF — CFA West African franc", XAF: "XAF — FCFA Central African franc", UGX: "UGX — USh Ugandan shilling", TZS: "TZS — TSh Tanzanian shilling",
    JPY: "JPY — ¥ Japanese yen", KRW: "KRW — ₩ South Korean won", CNY: "CNY — ¥ Chinese yuan", THB: "THB — ฿ Thai baht", SGD: "SGD — S$ Singapore dollar", MYR: "MYR — RM Malaysian ringgit", IDR: "IDR — Rp Indonesian rupiah", INR: "INR — ₹ Indian rupee", PHP: "PHP — ₱ Philippine peso", VND: "VND — ₫ Vietnamese dong", AUD: "AUD — A$ Australian dollar", NZD: "NZD — NZ$ New Zealand dollar"
  };

  var regionCurrencies = {
    europe: ["EUR", "GBP", "CHF", "PLN", "SEK", "NOK", "DKK", "CZK", "HUF", "RON", "BGN", "TRY"],
    middleeast: ["SAR", "AED", "QAR", "KWD", "BHD", "OMR", "JOD", "EGP", "USD"],
    africa: ["ZAR", "MAD", "DZD", "TND", "EGP", "NGN", "KES", "GHS", "XOF", "XAF", "UGX", "TZS", "USD"],
    asia: ["JPY", "KRW", "CNY", "THB", "SGD", "MYR", "IDR", "INR", "PHP", "VND", "AUD", "NZD", "USD"],
    americas: ["USD", "CAD", "MXN", "BRL", "ARS", "CLP", "COP", "PEN", "UYU"],
    global: ["EUR", "USD", "GBP", "CAD", "SAR", "AED", "ZAR", "JPY", "AUD"]
  };

  function inferRegion(source) {
    var value = textKey(source);
    if (/saudi|uae|emirat|qatar|kuwait|bahrain|oman|jordan|middle east|gcc/.test(value)) { return "middleeast"; }
    if (/africa|morocco|algeria|tunisia|egypt|nigeria|kenya|ghana|uganda|tanzania|south africa/.test(value)) { return "africa"; }
    if (/japan|korea|china|thailand|singapore|malaysia|indonesia|india|philipp|vietnam|australia|new zealand|asia|oceania/.test(value)) { return "asia"; }
    if (/america|canada|mexico|brazil|argentina|chile|colombia|peru|caribbean|usa|united states/.test(value)) { return "americas"; }
    if (/europe|france|germany|netherlands|belgium|poland|spain|italy|sweden|norway|denmark|switzerland|austria|romania|bulgaria/.test(value)) { return "europe"; }
    return "global";
  }

  function distributorContextText() {
    var controls = qa("#distributor-select, #distributor-input, [name='distributor'], .distributor-control input, .distributor-control select, #ci-region");
    return controls.map(function (control) { return selectedText(control) || control.value || ""; }).join(" ");
  }

  function currencyCodesForContext(source) {
    var value = textKey(source);
    var countryRules = [
      [/france|germany|netherlands|belgium|spain|italy|austria|portugal|ireland|finland|greece|slovakia|slovenia|croatia|estonia|latvia|lithuania/, ["EUR"]],
      [/united kingdom|great britain|\buk\b/, ["GBP"]], [/switzerland/, ["CHF", "EUR"]], [/poland/, ["PLN", "EUR"]],
      [/sweden/, ["SEK", "EUR"]], [/norway/, ["NOK", "EUR"]], [/denmark/, ["DKK", "EUR"]], [/czech/, ["CZK", "EUR"]],
      [/hungary/, ["HUF", "EUR"]], [/romania/, ["RON", "EUR"]], [/bulgaria/, ["BGN", "EUR"]], [/turkey|turkiye/, ["TRY", "EUR", "USD"]],
      [/saudi/, ["SAR", "USD"]], [/uae|united arab emirates/, ["AED", "USD"]], [/qatar/, ["QAR", "USD"]], [/kuwait/, ["KWD", "USD"]],
      [/bahrain/, ["BHD", "USD"]], [/oman/, ["OMR", "USD"]], [/jordan/, ["JOD", "USD"]],
      [/south africa/, ["ZAR", "USD"]], [/morocco/, ["MAD", "EUR"]], [/nigeria/, ["NGN", "USD"]], [/kenya/, ["KES", "USD"]],
      [/united states|\busa\b/, ["USD"]], [/canada/, ["CAD", "USD"]], [/mexico/, ["MXN", "USD"]], [/brazil/, ["BRL", "USD"]],
      [/japan/, ["JPY"]], [/south korea|korea republic/, ["KRW"]], [/thailand/, ["THB", "USD"]], [/australia/, ["AUD"]], [/new zealand/, ["NZD"]]
    ];
    var match = countryRules.find(function (rule) { return rule[0].test(value); });
    return match ? match[1] : (regionCurrencies[inferRegion(source)] || regionCurrencies.global);
  }

  function populateCurrency(select, regionOrCodes) {
    if (!select) { return; }
    var previous = select.value;
    var codes = Array.isArray(regionOrCodes) ? regionOrCodes : (regionCurrencies[regionOrCodes] || regionCurrencies.global);
    select.innerHTML = "";
    codes.forEach(function (code) {
      var option = document.createElement("option");
      option.value = code;
      option.textContent = currencyCatalog[code] || code;
      select.appendChild(option);
    });
    select.value = codes.indexOf(previous) >= 0 ? previous : codes[0];
    select.dataset.currencyRegion = Array.isArray(regionOrCodes) ? "country" : regionOrCodes;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function updateRegionalCurrencies() {
    var context = distributorContextText();
    populateCurrency(q("#tco-currency"), currencyCodesForContext(context));
    var comparisonRegion = q("#ci-region");
    var comparisonContext = comparisonRegion ? selectedText(comparisonRegion) : context;
    populateCurrency(q("#ci-currency"), currencyCodesForContext(comparisonContext));
  }

  var comparisonPresets = {
    generator: {
      title: "YDG5500V European reference",
      source: "Official Yanmar YDG documentation",
      url: "https://www.yanmar.com/eu/industrial/wp-content/uploads/sites/11/2021/06/YANMAR-Operation-Manual-YDG-Series.pdf",
      points: [
        ["ratedOutput", "Rated output", "4.5 kVA at 50 Hz"], ["voltage", "Rated voltage", "230 V"],
        ["frequency", "Frequency", "50 Hz"], ["phase", "Phase", "Single phase"],
        ["engine", "Engine", "Yanmar L100V air-cooled diesel"], ["startOptions", "Starting system", "Recoil / electric by variant"],
        ["dimensions", "Dimensions", "720 × 480 × 578 mm"], ["dryMass", "Dry mass", "96 kg / 106 kg by variant"],
        ["emissions", "Emissions", "EU Stage V; confirm market variant"]
      ]
    },
    pump: {
      title: "YDP20V European reference",
      source: "Official Yanmar YDP Series page",
      url: "https://www.yanmar.com/global/powerproducts/products/diesel-pumps/ydpseries/",
      points: [
        ["pumpType", "Pump type", "Self-priming fresh-water pump"], ["inletOutlet", "Suction / discharge", "50 mm"],
        ["maxHead", "Maximum total head", "32 m"], ["suctionLift", "Suction lift", "7 m"],
        ["maxCapacity", "Maximum capacity", "550 L/min"], ["engine", "Engine", "Yanmar L70V air-cooled diesel"],
        ["startOptions", "Starting system", "Recoil"], ["fuelTank", "Fuel tank", "13 L"],
        ["dimensions", "Dimensions", "560 × 484 × 702 mm"], ["dryMass", "Dry mass", "52 kg"]
      ]
    },
    engine: {
      title: "L100V European reference",
      source: "Official Yanmar Europe L100V page",
      url: "https://www.yanmar.com/eu/industrial/product/engines/l100v/",
      points: [
        ["maxOutput", "Maximum output", "6.8 kW at 3600 rpm"], ["standbyOutput", "Standby output", "5.7 kVA at 3000 rpm"],
        ["fuelType", "Fuel type", "Diesel"], ["displacement", "Displacement", "0.435 L"],
        ["cylinders", "Cylinders", "1"], ["combustion", "Combustion", "Direct injection"],
        ["aspiration", "Aspiration", "Natural"], ["emissions", "Emissions", "EU Stage V"],
        ["warranty", "Warranty", "2 years"]
      ]
    }
  };

  function comparisonCategory() {
    var select = q("#ci-category");
    var value = select ? selectedText(select) + " " + select.value : "generator";
    if (/pump|pomp/i.test(value)) { return "pump"; }
    if (/engine|motor|series/i.test(value)) { return "engine"; }
    return "generator";
  }

  function extendComparisonData() {
    try {
      if (typeof recommendedFields !== "undefined") {
        recommendedFields.generator = comparisonPresets.generator.points.map(function (point) { return point[0]; });
        recommendedFields.pump = comparisonPresets.pump.points.map(function (point) { return point[0]; });
        recommendedFields.engine = comparisonPresets.engine.points.map(function (point) { return point[0]; });
      }
      if (typeof fieldDefinitions !== "undefined") {
        ["ratedOutput", "voltage", "frequency", "phase", "engine", "startOptions", "dimensions", "dryMass", "emissions", "pumpType", "inletOutlet", "maxHead", "suctionLift", "maxCapacity", "fuelTank", "maxOutput", "standbyOutput", "fuelType", "displacement", "cylinders", "combustion", "aspiration", "warranty"].forEach(function (key) {
          if (!fieldDefinitions[key]) { fieldDefinitions[key] = { label: key.replace(/([A-Z])/g, " $1").replace(/^./, function (character) { return character.toUpperCase(); }), group: "Recommended" }; }
        });
      }
      if (typeof variantData !== "undefined") {
        variantData.lseries = variantData.lseries || {};
        variantData.lseries.L100V = variantData.lseries.L100V || {
          label: "L100V Stage V", title: "Yanmar L100V", name: "Yanmar L100V",
          image: "assets/L-series-white-background.png",
          specs: { maxOutput: "6.8 kW at 3600 rpm", standbyOutput: "5.7 kVA at 3000 rpm", fuelType: "Diesel", displacement: "0.435 L", cylinders: "1", combustion: "Direct injection", aspiration: "Natural", emissions: "EU Stage V", warranty: "2 years" }
        };
        var generatorSpecs = { ratedOutput: "4.5 kVA at 50 Hz", voltage: "230 V", frequency: "50 Hz", phase: "Single phase", engine: "Yanmar L100V air-cooled diesel", startOptions: "Recoil / electric by variant", dimensions: "720 × 480 × 578 mm", dryMass: "96 kg / 106 kg by variant", emissions: "EU Stage V; confirm market variant" };
        var pumpSpecs = { pumpType: "Self-priming fresh-water pump", inletOutlet: "50 mm", maxHead: "32 m", suctionLift: "7 m", maxCapacity: "550 L/min", engine: "Yanmar L70V air-cooled diesel", startOptions: "Recoil", fuelTank: "13 L", dimensions: "560 × 484 × 702 mm", dryMass: "52 kg" };
        Object.keys(variantData.ydg || {}).forEach(function (key) {
          if (/5500/i.test(key + " " + ((variantData.ydg[key] || {}).label || ""))) {
            variantData.ydg[key].specs = Object.assign({}, generatorSpecs, variantData.ydg[key].specs || {});
          }
        });
        Object.keys(variantData.ydp || {}).forEach(function (key) {
          if (/20|fresh/i.test(key + " " + ((variantData.ydp[key] || {}).label || ""))) {
            variantData.ydp[key].specs = Object.assign({}, pumpSpecs, variantData.ydp[key].specs || {});
          }
        });
      }
    } catch (error) { /* original comparison data remains available */ }
  }

  function syncModelOptions() {
    var categorySelect = q("#ci-category");
    var modelSelect = q("#ci-yanmar-model, #ci-model, #comparison-model");
    if (!categorySelect || !modelSelect) { return; }
    if (!qa("option", categorySelect).some(function (option) { return /engine/i.test(option.value + option.textContent); })) {
      var engineCategory = document.createElement("option");
      engineCategory.value = "engine";
      engineCategory.textContent = "Diesel engine";
      categorySelect.appendChild(engineCategory);
    }
    var requiredModels = [
      ["ydg:YDG5500V", "YDG5500V Stage V", "generator"],
      ["ydp:YDP20V", "YDP20V", "pump"],
      ["lseries:L100V", "L100V Stage V", "engine"]
    ];
    requiredModels.forEach(function (entry) {
      if (!qa("option", modelSelect).some(function (option) { return option.value === entry[0] || textKey(option.textContent).indexOf(textKey(entry[1])) >= 0; })) {
        var option = document.createElement("option");
        option.value = entry[0];
        option.textContent = entry[1];
        option.dataset.category = entry[2];
        modelSelect.appendChild(option);
      }
    });
    var category = comparisonCategory();
    qa("option", modelSelect).forEach(function (option) {
      var inferred = /ydp|pump/i.test(option.value + option.textContent) ? "pump" : /l100|l70|l48|engine|series/i.test(option.value + option.textContent) ? "engine" : "generator";
      option.hidden = inferred !== category;
      option.disabled = inferred !== category;
    });
    var first = qa("option", modelSelect).find(function (option) { return !option.disabled; });
    if (first && modelSelect.selectedOptions[0] && modelSelect.selectedOptions[0].disabled) { modelSelect.value = first.value; }
  }

  function selectMatchingComparisonFields() {
    var selected = qa(".ym-point-option input:checked").map(function (input) { return textKey(input.value + " " + input.dataset.label); });
    qa("#ci-fields input[type='checkbox'], .comparison-fields input[type='checkbox'], [data-comparison-fields] input[type='checkbox']").forEach(function (checkbox) {
      var row = checkbox.closest("label, li, tr, .field-row") || checkbox.parentElement;
      var rowText = textKey((row && row.textContent) || checkbox.value);
      var shouldSelect = selected.some(function (key) { return rowText.indexOf(key) >= 0 || key.indexOf(rowText) >= 0; });
      if (shouldSelect && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
  }

  function renderComparisonPreset() {
    var container = q("#ym-recommended-points");
    if (!container) { return; }
    container.classList.add("ym-dynamic-language");
    container.setAttribute("translate", "yes");
    var preset = comparisonPresets[comparisonCategory()];
    container.innerHTML = "<strong>Recommended comparison points</strong><p>Select only the facts needed for this sheet. Yanmar reference values are prefilled from official product information; verify the exact local model before publishing.</p>" +
      "<div class='ym-point-grid'>" + preset.points.map(function (point, index) {
        return "<label class='ym-point-option'><input type='checkbox' value='" + escapeHtml(point[0]) + "' data-label='" + escapeHtml(point[1]) + "'" + (index < 6 ? " checked" : "") + "><span><strong>" + escapeHtml(point[1]) + "</strong><small>" + escapeHtml(point[2]) + "</small></span></label>";
      }).join("") + "</div><div class='ym-official-baseline'><div><small>Reference</small><strong>" + escapeHtml(preset.title) + "</strong></div><div><small>Source</small><strong><a href='" + escapeHtml(preset.url) + "' target='_blank' rel='noopener noreferrer'>" + escapeHtml(preset.source) + "</a></strong></div><div><small>Selected points</small><strong id='ym-point-count'>0</strong></div><div><small>Evidence rule</small><strong>Local model check required</strong></div></div>";
    function updateCount() {
      var count = qa("input:checked", container).length;
      var output = q("#ym-point-count", container);
      if (output) { output.textContent = count; }
      selectMatchingComparisonFields();
    }
    qa("input[type='checkbox']", container).forEach(function (input) { input.addEventListener("change", updateCount); });
    updateCount();
    requestDynamicTranslation(container);
  }

  function clearAlternativeForm() {
    ["#ci-source-input", "#ci-url", "#ci-product-url", "#ci-product-name", "#ci-spec-text", "#ci-specification-text", "#ci-image-url"].forEach(function (selector) {
      var field = q(selector);
      if (field) { field.value = ""; field.dispatchEvent(new Event("input", { bubbles: true })); }
    });
    var focus = q("#ci-source-input, #ci-url, #ci-product-url, #ci-product-name");
    if (focus) { focus.focus(); }
  }

  function updateAlternativeCount(increment) {
    var helper = q("#ym-comparison-helper");
    if (!helper) { return; }
    var current = Number(helper.dataset.count || 0) + (increment || 0);
    var visibleTabs = qa("#ci-source-tabs > *, .ci-source-tab, [data-source-tab]").filter(function (element) { return element.offsetParent !== null; }).length;
    current = Math.max(current, visibleTabs);
    helper.dataset.count = String(current);
    var output = q("#ym-alternative-count", helper);
    if (output) {
      output.textContent = current + (current === 1 ? " alternative added" : " alternatives added");
      requestDynamicTranslation(output);
    }
  }

  function installComparisonGuide() {
    var category = q("#ci-category");
    if (!category) { return; }
    var root = category.closest("section, .page, .content-page") || document;
    if (root.dataset.ym15ComparisonInstalled === "true") { return; }
    root.dataset.ym15ComparisonInstalled = "true";
    extendComparisonData();
    syncModelOptions();

    qa("button, a", root).forEach(function (button) {
      if (/clear for next alternative|add another alternative/i.test(String(button.textContent || "")) && button.id !== "ym-add-alternative") {
        button.hidden = true;
        button.setAttribute("aria-hidden", "true");
      }
    });

    var anchor = q("#ci-workflow-tabs, .comparison-workflow-tabs, .workflow-tabs", root) || category.closest(".panel, .tool-panel");
    var helper = document.createElement("div");
    helper.id = "ym-comparison-helper";
    helper.className = "ym-comparison-helper ym-dynamic-language";
    helper.setAttribute("translate", "yes");
    helper.dataset.count = "0";
    helper.innerHTML = "<div><strong id='ym-alternative-count'>" + escapeHtml(interfaceText("0 alternatives added", "0 alternatieven toegevoegd")) + "</strong><small>" + escapeHtml(interfaceText("Add one competitor at a time. You can add as many alternatives as needed before fact review.", "Voeg concurrenten een voor een toe. Voor de feitencontrole kun je onbeperkt alternatieven toevoegen.")) + "</small></div><div class='ym-comparison-actions'><button type='button' class='button secondary' id='ym-add-alternative'>" + escapeHtml(interfaceText("Add another alternative", "Voeg nog een alternatief toe")) + "</button><button type='button' class='button primary' id='ym-continue-review'>" + escapeHtml(interfaceText("Continue to fact review", "Ga door naar feitencontrole")) + "</button></div>";
    if (anchor && anchor.parentNode) { anchor.parentNode.insertBefore(helper, anchor.nextSibling); } else { root.insertBefore(helper, root.firstChild); }
    requestDynamicTranslation(helper);

    var recommended = document.createElement("div");
    recommended.id = "ym-recommended-points";
    recommended.className = "ym-recommended-points";
    var fieldsAnchor = q("#ci-fields, .comparison-fields, [data-comparison-fields]", root) || category.closest(".panel, .tool-panel");
    if (fieldsAnchor && fieldsAnchor.parentNode) { fieldsAnchor.parentNode.insertBefore(recommended, fieldsAnchor); } else { helper.parentNode.insertBefore(recommended, helper.nextSibling); }
    renderComparisonPreset();

    q("#ym-add-alternative").addEventListener("click", function () {
      clearAlternativeForm();
      var sourceStep = q("[data-step='0'], [data-workflow-step='0'], .workflow-step:first-child", root);
      if (sourceStep) { sourceStep.click(); }
    });
    q("#ym-continue-review").addEventListener("click", function () {
      selectMatchingComparisonFields();
      var reviewStep = q("[data-step='1'], [data-workflow-step='1'], .workflow-step:nth-child(2)", root);
      if (reviewStep) { reviewStep.click(); }
    });
    category.addEventListener("change", function () {
      syncModelOptions();
      renderComparisonPreset();
      var region = q("#ci-region");
      populateCurrency(q("#ci-currency"), currencyCodesForContext(region ? selectedText(region) : distributorContextText()));
    });
    var analyze = q("#ci-analyze, #ci-add-source", root) || findButton(root, /analy[sz]e|add.*evidence|extract.*spec/i);
    if (analyze) {
      analyze.addEventListener("click", function () {
        window.setTimeout(function () {
          updateAlternativeCount(1);
          selectMatchingComparisonFields();
          var sourceStep = q("[data-step='0'], [data-workflow-step='0'], .workflow-step:first-child", root);
          if (sourceStep) { sourceStep.click(); }
          notifyUi("alternative");
        }, 450);
      });
    }
    var observer = new MutationObserver(function () { updateAlternativeCount(0); selectMatchingComparisonFields(); });
    var tabs = q("#ci-source-tabs, #ci-fields", root);
    if (tabs) { observer.observe(tabs, { childList: true, subtree: true }); }
  }

  function installTcoValidation() {
    var currency = q("#tco-currency");
    if (!currency) { return; }
    var root = currency.closest("section, .page, .content-page") || document;
    if (root.dataset.ym15TcoInstalled === "true") { return; }
    root.dataset.ym15TcoInstalled = "true";
    /* The main TCO workflow already owns a live Smart realism check with
       product, currency and cross-field validation. Do not add a second banner
       or a competing validation UI when that panel is present. */
    if (q("#ym-tco-smart-panel", root)) {
      root.classList.add("ym-tco-single-validator");
      return;
    }
    var banner = document.createElement("div");
    banner.className = "ym-copy-status ym-tco-guidance ym-dynamic-language";
    banner.setAttribute("translate", "yes");
    banner.innerHTML = "<strong>" + escapeHtml(interfaceText("Smart input check:", "Slimme invoercontrole:")) + "</strong> " + escapeHtml(interfaceText("values are checked for impossible hours, unusually high fuel use, negative costs and residual value above purchase price. Warnings support review; local quotations remain the source of truth.", "waarden worden gecontroleerd op onmogelijke uren, uitzonderlijk hoog brandstofverbruik, negatieve kosten en restwaarde boven de aanschafprijs. Waarschuwingen helpen bij controle; lokale offertes blijven leidend."));
    var anchor = currency.closest(".panel, .tool-panel, .field-grid");
    if (anchor && anchor.parentNode) { anchor.parentNode.insertBefore(banner, anchor); }
    requestDynamicTranslation(banner);

    function inputLabel(input) {
      var label = input.closest("label, tr, .field, .form-field") || input.parentElement;
      return textKey((label && label.textContent) || input.name || input.id);
    }
    function validate(input) {
      if (!input.matches("input[type='number'], input[inputmode='decimal'], input[inputmode='numeric']")) { return false; }
      var value = Number(String(input.value).replace(",", "."));
      if (!Number.isFinite(value)) { return false; }
      var label = inputLabel(input);
      var warning = "";
      if (value < 0) { warning = "Negative values are not valid here."; }
      else if (/hours.*year|annual.*hours|uren.*jaar/.test(label) && value > 8760) { warning = "A year contains at most 8,760 hours."; }
      else if (/years|jaren/.test(label) && value > 25) { warning = "More than 25 years is unusual for this comparison."; }
      else if (/fuel.*hour|consumption|verbruik/.test(label) && value > 25) { warning = "Fuel use above 25 per hour is unusual for compact YDG, YDP or L-Series equipment."; }
      else if (/fuel.*price|brandstofprijs/.test(label) && value > 12) { warning = "This fuel price is unusually high. Confirm the unit and currency."; }
      else if (/downtime.*hours|stilstand/.test(label) && value > 2000) { warning = "More than 2,000 downtime hours per year needs verification."; }
      else if (/purchase|aanschaf/.test(label) && value > 250000) { warning = "This purchase price is far above the usual compact-equipment range. Confirm the currency and unit."; }
      input.classList.toggle("ym-input-warning", Boolean(warning));
      input.setAttribute("aria-invalid", warning ? "true" : "false");
      var message = input.parentElement && q(".ym-value-warning", input.parentElement);
      if (!message && warning && input.parentElement) {
        message = document.createElement("small");
        message.className = "ym-value-warning ym-dynamic-language";
        message.setAttribute("translate", "yes");
        message.style.cssText = "display:block;margin-top:4px;color:#d13716;font-weight:700;line-height:1.35";
        input.parentElement.appendChild(message);
      }
      if (message) {
        message.textContent = warning;
        message.hidden = !warning;
        if (warning) { requestDynamicTranslation(message); }
      }
      return Boolean(warning);
    }
    qa("input", root).forEach(function (input) {
      input.addEventListener("input", function () { validate(input); });
      input.addEventListener("blur", function () { validate(input); });
    });
    root.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button || !/calculate|recalculate|generate.*tco/i.test(button.textContent || "")) { return; }
      var warnings = qa("input", root).filter(validate);
      if (warnings.length) {
        notifyUi("unrealistic");
        warnings[0].scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, true);
  }

  function printCurrentSheet(kind) {
    var selector = kind === "tco" ? ".tco-sheet, #tco-output" : ".comparison-sheet, #ci-output";
    var sheet = q(selector);
    if (!sheet || !String(sheet.textContent || "").trim()) { return false; }
    var popup = window.open("", "_blank");
    if (!popup) { return false; }
    try { popup.opener = null; } catch (error) { /* browser-managed */ }
    var title = kind === "tco" ? "Yanmar Total Cost of Ownership" : "Yanmar Product Comparison";
    var styles = "@page{size:A4 landscape;margin:8mm}*{box-sizing:border-box}body{margin:0;color:#151820;background:#fff;font:10px/1.35 Arial,sans-serif}main{width:100%}h1{font-size:24px;line-height:1.05;margin:0 0 8px}h2,h3{font-size:15px;margin:6px 0}img{display:block;max-width:100%;max-height:90px;object-fit:contain;margin:auto}.comparison-products,.product-grid{display:grid!important;grid-auto-flow:column!important;grid-auto-columns:minmax(0,1fr)!important;gap:6px!important}.comparison-product-card,.product-card{min-width:0!important;padding:6px!important;break-inside:avoid}table{width:100%!important;min-width:0!important;border-collapse:collapse!important;table-layout:fixed!important;font-size:8.5px!important}th,td{padding:4px!important;border:1px solid #aeb5bf!important;background:#fff!important;color:#151820!important;vertical-align:top!important;overflow-wrap:anywhere!important}tr{break-inside:avoid}button,.no-print{display:none!important}";
    popup.document.open();
    popup.document.write("<!doctype html><html><head><meta charset='utf-8'><base href='" + escapeHtml(document.baseURI) + "'><title>" + escapeHtml(title) + "</title><style>" + styles + "</style></head><body><main>" + sheet.outerHTML + "</main></body></html>");
    popup.document.close();
    window.setTimeout(function () { popup.focus(); popup.print(); }, 650);
    return true;
  }

  function currentGeneratedSheet(kind) {
    var specific = kind === "tco" ? q(".tco-sheet") : q(".comparison-sheet");
    var fallback = kind === "tco" ? q("#tco-output") : q("#ci-output");
    var sheet = specific || fallback;
    if (!sheet || sheet.hidden || !String(sheet.textContent || "").trim()) { return null; }
    var style = window.getComputedStyle(sheet);
    if (style.display === "none" || style.visibility === "hidden") { return null; }
    var hasResult = Boolean(q("table, .comparison-products, .product-grid, .tco-summary, .tco-results, [data-generated-sheet], .result-card", sheet));
    return hasResult ? sheet : null;
  }

  function waitForExportFrame() {
    return new Promise(function (resolve) {
      window.requestAnimationFrame(function () { window.requestAnimationFrame(resolve); });
    });
  }

  var html2CanvasPromise = null;

  function loadHtml2Canvas() {
    if (typeof window.html2canvas === "function") { return Promise.resolve(window.html2canvas); }
    if (html2CanvasPromise) { return html2CanvasPromise; }
    html2CanvasPromise = new Promise(function (resolve, reject) {
      var existing = q("script[data-ym-html2canvas]");
      var script = existing || document.createElement("script");
      var timeout = window.setTimeout(function () { reject(new Error("Image renderer timed out")); }, 6500);
      function ready() {
        window.clearTimeout(timeout);
        if (typeof window.html2canvas === "function") { resolve(window.html2canvas); }
        else { reject(new Error("Image renderer unavailable")); }
      }
      script.addEventListener("load", ready, { once: true });
      script.addEventListener("error", function () {
        window.clearTimeout(timeout);
        reject(new Error("Image renderer could not load"));
      }, { once: true });
      if (!existing) {
        script.dataset.ymHtml2canvas = "true";
        script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
        script.async = true;
        document.head.appendChild(script);
      } else if (typeof window.html2canvas === "function") {
        ready();
      }
    }).catch(function () { return null; });
    return html2CanvasPromise;
  }

  function copyComputedStyles(source, clone) {
    var sourceNodes = [source].concat(qa("*", source));
    var cloneNodes = [clone].concat(qa("*", clone));
    sourceNodes.forEach(function (sourceNode, index) {
      var cloneNode = cloneNodes[index];
      if (!cloneNode || !sourceNode.ownerDocument) { return; }
      var style = window.getComputedStyle(sourceNode);
      for (var propertyIndex = 0; propertyIndex < style.length; propertyIndex += 1) {
        var property = style[propertyIndex];
        cloneNode.style.setProperty(property, style.getPropertyValue(property), style.getPropertyPriority(property));
      }
      cloneNode.style.animation = "none";
      cloneNode.style.transition = "none";
      if (sourceNode.matches && sourceNode.matches("input, textarea, select")) {
        cloneNode.setAttribute("value", sourceNode.value || "");
        if (sourceNode.tagName === "TEXTAREA") { cloneNode.textContent = sourceNode.value || ""; }
      }
    });
  }

  function inlineExportImages(source, clone) {
    var originals = qa("img", source);
    var copies = qa("img", clone);
    return Promise.all(originals.map(function (image, index) {
      return new Promise(function (resolve) {
        var copy = copies[index];
        if (!copy || !image.complete || !image.naturalWidth) { resolve(); return; }
        try {
          var canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          var context = canvas.getContext("2d");
          context.fillStyle = "#ffffff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0);
          copy.src = canvas.toDataURL("image/png");
        } catch (error) {
          copy.src = image.currentSrc || image.src;
        }
        resolve();
      });
    }));
  }

  async function nativeSheetCanvas(sheet) {
    var bounds = sheet.getBoundingClientRect();
    var width = Math.ceil(Math.max(sheet.scrollWidth, bounds.width, 900));
    var height = Math.ceil(Math.max(sheet.scrollHeight, bounds.height, 500));
    var pixelLimit = 42000000;
    var scale = Math.min(2, 12000 / width, 12000 / height, Math.sqrt(pixelLimit / Math.max(1, width * height)));
    scale = Math.max(0.7, scale);
    var clone = sheet.cloneNode(true);
    copyComputedStyles(sheet, clone);
    await inlineExportImages(sheet, clone);
    clone.classList.add("ym-export-surface");
    clone.style.width = width + "px";
    clone.style.maxWidth = "none";
    clone.style.height = "auto";
    clone.style.margin = "0";
    clone.style.overflow = "visible";
    clone.style.background = "#ffffff";
    clone.style.color = "#151820";
    var wrapper = document.createElement("div");
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrapper.style.width = width + "px";
    wrapper.style.minHeight = height + "px";
    wrapper.style.background = "#ffffff";
    wrapper.appendChild(clone);
    var markup = new XMLSerializer().serializeToString(wrapper);
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "'><foreignObject width='100%' height='100%'>" + markup + "</foreignObject></svg>";
    var url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    try {
      var raster = await new Promise(function (resolve, reject) {
        var image = new Image();
        image.onload = function () { resolve(image); };
        image.onerror = function () { reject(new Error("Native renderer failed")); };
        image.src = url;
      });
      var output = document.createElement("canvas");
      output.width = Math.max(1, Math.round(width * scale));
      output.height = Math.max(1, Math.round(height * scale));
      var outputContext = output.getContext("2d");
      outputContext.fillStyle = "#ffffff";
      outputContext.fillRect(0, 0, output.width, output.height);
      outputContext.drawImage(raster, 0, 0, output.width, output.height);
      return output;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function renderSheetCanvas(sheet) {
    document.body.classList.add("ym-exporting-sheet");
    sheet.classList.add("ym-export-surface");
    await waitForExportFrame();
    try {
      var renderer = await loadHtml2Canvas();
      if (renderer) {
        var width = Math.ceil(Math.max(sheet.scrollWidth, sheet.getBoundingClientRect().width));
        var height = Math.ceil(Math.max(sheet.scrollHeight, sheet.getBoundingClientRect().height));
        var scale = Math.min(2, 12000 / Math.max(width, 1), 12000 / Math.max(height, 1), Math.sqrt(42000000 / Math.max(1, width * height)));
        return await renderer(sheet, {
          backgroundColor: "#ffffff",
          scale: Math.max(0.7, scale),
          useCORS: true,
          allowTaint: false,
          imageTimeout: 12000,
          logging: false,
          width: width,
          height: height,
          windowWidth: Math.max(document.documentElement.clientWidth, width + 40),
          windowHeight: Math.max(document.documentElement.clientHeight, height + 40),
          scrollX: 0,
          scrollY: -window.scrollY
        });
      }
      return await nativeSheetCanvas(sheet);
    } finally {
      sheet.classList.remove("ym-export-surface");
      document.body.classList.remove("ym-exporting-sheet");
    }
  }

  function sheetFileName(kind, format) {
    var date = new Date().toISOString().slice(0, 10);
    return "Yanmar-" + (kind === "tco" ? "TCO-sheet" : "comparison-sheet") + "-" + date + "." + (format === "jpeg" ? "jpg" : "png");
  }

  function downloadCanvas(canvas, kind, format) {
    var mime = format === "jpeg" ? "image/jpeg" : "image/png";
    var quality = format === "jpeg" ? 0.94 : undefined;
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (!blob) { reject(new Error("Image encoder failed")); return; }
        var url = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = url;
        link.download = sheetFileName(kind, format);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
        resolve();
      }, mime, quality);
    });
  }

  async function exportSheetImage(kind, format, button) {
    var sheet = currentGeneratedSheet(kind);
    if (!sheet) { notifyUi("sheetNeeded"); return false; }
    var original = button ? button.textContent : "";
    if (button) {
      button.disabled = true;
      button.classList.add("is-loading");
      button.textContent = "Preparing image...";
      requestDynamicTranslation(button);
    }
    try {
      var canvas = await renderSheetCanvas(sheet);
      await downloadCanvas(canvas, kind, format);
      notifyUi("imageReady");
      return true;
    } catch (error) {
      console.warn("Yanmar sheet image export failed", error);
      notifyUi("imageFailed");
      return false;
    } finally {
      if (button) {
        button.disabled = false;
        button.classList.remove("is-loading");
        button.textContent = original;
        requestDynamicTranslation(button);
      }
    }
  }

  function installSheetImageExports() {
    ["comparison", "tco"].forEach(function (kind) {
      var control = kind === "tco" ? q("#tco-currency") : q("#ci-category");
      if (!control) { return; }
      var root = control.closest("section, .page, .content-page") || document;
      var id = "ym-" + kind + "-image-export";
      if (q("#" + id)) { return; }
      var output = kind === "tco" ? q("#tco-output", root) : q("#ci-output", root);
      var bar = document.createElement("div");
      bar.id = id;
      bar.className = "ym-sheet-export-bar ym-dynamic-language";
      bar.setAttribute("translate", "yes");
      bar.innerHTML = "<div class='ym-sheet-export-copy'><span class='ym-sheet-export-icon' aria-hidden='true'><svg viewBox='0 0 24 24'><path d='M12 3v12m0 0 4-4m-4 4-4-4M5 19h14'/></svg></span><div><strong>Download finished sheet</strong><small>PNG is recommended for sharp text and posting. JPEG creates a smaller image file. PDF/print remains available.</small><span class='ym-sheet-export-state' aria-live='polite'></span></div></div><div class='ym-sheet-export-actions'><button type='button' class='button primary' data-sheet-format='png'>Download PNG <span>Recommended</span></button><button type='button' class='button secondary' data-sheet-format='jpeg'>Download JPEG</button></div>";
      if (output && output.parentNode) { output.parentNode.insertBefore(bar, output); }
      else { root.appendChild(bar); }
      qa("[data-sheet-format]", bar).forEach(function (button) {
        button.addEventListener("click", function () { exportSheetImage(kind, button.dataset.sheetFormat, button); });
      });
      function syncExportAvailability() {
        var ready = Boolean(currentGeneratedSheet(kind));
        if (bar.dataset.ready === String(ready)) { return; }
        bar.dataset.ready = String(ready);
        bar.classList.toggle("is-ready", ready);
        qa("[data-sheet-format]", bar).forEach(function (button) {
          button.disabled = !ready || button.classList.contains("is-loading");
        });
        var state = q(".ym-sheet-export-state", bar);
        if (state) {
          state.textContent = ready ? "Sheet ready for image download." : "Generate the sheet to unlock image download.";
          requestDynamicTranslation(state);
        }
      }
      var exportObserver = new MutationObserver(syncExportAvailability);
      exportObserver.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden"] });
      syncExportAvailability();
      requestDynamicTranslation(bar);
    });
  }

  function installPrintInterceptors() {
    document.addEventListener("click", function (event) {
      var button = event.target.closest("button, a");
      if (!button) { return; }
      var text = textKey(button.textContent + " " + button.id + " " + button.getAttribute("data-action"));
      if (!/pdf|print/.test(text)) { return; }
      var inTco = Boolean(button.closest("#tco, [data-page='tco'], .tco-page")) || /tco/.test(text);
      var inComparison = Boolean(button.closest("#comparison, [data-page='comparison'], .comparison-page")) || /comparison|sheet/.test(text);
      if ((inTco || inComparison) && printCurrentSheet(inTco ? "tco" : "comparison")) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  function activePageToken() {
    var active = q(".page.active, .content-page.active, section.active, [data-page].active");
    return active ? (active.id || active.getAttribute("data-page") || active.className) : "";
  }

  function routeCandidates(label) {
    var value = textKey(label);
    if (/generator|ydg toolkit/.test(value)) { return ["ydg", "ydg-toolkit", "generators", "generator-toolkit"]; }
    if (/water pump|waterpump|ydp toolkit/.test(value)) { return ["ydp", "ydp-toolkit", "water-pumps", "pump-toolkit"]; }
    if (/engine|l series/.test(value)) { return ["lseries", "l-series", "engines", "engine-toolkit"]; }
    if (/document|brochure/.test(value)) { return ["brochure-library", "documents", "content-library"]; }
    if (/comparison/.test(value)) { return ["comparison", "comparison-builder", "competitive-intelligence"]; }
    if (/tco|ownership|cost calculator/.test(value)) { return ["tco", "tco-calculator", "ownership-calculator"]; }
    if (/website copy|copy studio/.test(value)) { return ["website-copy", "website-copy-studio", "copy-studio"]; }
    if (/portal knowledge|portalkennis|training/.test(value)) { return ["training", "portal-knowledge", "portalkennis"]; }
    if (/campaign visual|gallery|asset/.test(value)) { return ["visual-assets", "gallery", "assets"]; }
    if (/content library/.test(value)) { return ["content-library", "library"]; }
    return [];
  }

  function fallbackRoute(trigger) {
    var explicit = trigger.getAttribute("data-target") || trigger.getAttribute("data-page-target") || trigger.getAttribute("data-page") || "";
    var candidates = explicit ? [explicit.replace(/^#/, "")] : routeCandidates(trigger.textContent || trigger.getAttribute("aria-label") || "");
    if (!candidates.length) { return false; }
    var functionNames = ["navigateToPage", "showPage", "openPage", "activatePage", "setActivePage"];
    for (var index = 0; index < functionNames.length; index += 1) {
      var handler = window[functionNames[index]];
      if (typeof handler === "function") {
        try { handler(candidates[0]); return true; } catch (error) { /* try DOM fallback */ }
      }
    }
    var target = null;
    candidates.some(function (candidate) {
      target = document.getElementById(candidate) || q("[data-page='" + candidate + "']");
      return Boolean(target);
    });
    if (!target) {
      var matchingNav = qa(".nav-item, [data-target], [data-page-target]").find(function (item) {
        if (item === trigger || item.dataset.ymFallbackClick === "true") { return false; }
        var itemTarget = textKey(item.getAttribute("data-target") || item.getAttribute("data-page-target") || item.textContent);
        return candidates.some(function (candidate) { return itemTarget.indexOf(textKey(candidate)) >= 0; });
      });
      if (matchingNav) {
        matchingNav.dataset.ymFallbackClick = "true";
        matchingNav.click();
        window.setTimeout(function () { delete matchingNav.dataset.ymFallbackClick; }, 100);
        return true;
      }
      return false;
    }
    var pageClass = target.classList.contains("content-page") ? ".content-page" : ".page";
    qa(pageClass).forEach(function (page) {
      page.classList.remove("active");
      if (page !== target) { page.setAttribute("aria-hidden", "true"); }
    });
    target.classList.add("active");
    target.removeAttribute("hidden");
    target.removeAttribute("aria-hidden");
    target.style.removeProperty("display");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }

  function installNavigationFallback() {
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest(".nav-item, .product-category-card, [data-category-target], [data-page-target]");
      if (!trigger || trigger.dataset.ymFallbackClick === "true") { return; }
      var before = activePageToken();
      window.setTimeout(function () {
        if (activePageToken() === before) { fallbackRoute(trigger); }
      }, 90);
    });
  }

  function uncropVisibleText() {
    qa("h1, h2, h3, h4, p, label, button, a, .nav-item, .card-title, .status-badge").forEach(function (element) {
      if (!element.offsetParent || element.closest("svg, .icon, .table-scroll, .table-wrap") || element.matches("input, select, textarea")) { return; }
      var style = window.getComputedStyle(element);
      var clipped = element.scrollWidth > element.clientWidth + 3 || element.scrollHeight > element.clientHeight + 3;
      if (clipped && (style.overflow === "hidden" || style.textOverflow === "ellipsis" || style.whiteSpace === "nowrap")) {
        element.classList.add("ym-auto-uncrop");
      }
    });
  }

  function exposePortalQa() {
    window.YanmarAmplifyQA = {
      run: function () {
        uncropVisibleText();
        return {
          header: Boolean(q("header, .topbar, .portal-header")),
          copyStudio: Boolean(q("#webcopy-product") && q("#ym-copy-improve")),
          comparison: Boolean(q("#ci-category") && q("#ym-add-alternative")),
          tco: Boolean(q("#tco-currency")),
          imageExports: Boolean(q("#ym-comparison-image-export") && q("#ym-tco-image-export")),
          darkMode: Boolean(q("#theme-toggle")),
          adminSwitch: Boolean(q("#admin-toggle")),
          roleKnowledge: Boolean(q("#ym-role-knowledge[translate='yes']")),
          navigationFallback: true,
          noCropAudit: true,
          source: "handover-static-release"
        };
      }
    };
    document.documentElement.dataset.yanmarAmplifyReady = "true";
    window.setTimeout(uncropVisibleText, 500);
    window.setTimeout(function () {
      var result = window.YanmarAmplifyQA.run();
      var passed = Object.keys(result).filter(function (key) { return typeof result[key] === "boolean"; }).every(function (key) { return result[key]; });
      document.documentElement.dataset.yanmarAmplifyQa = passed ? "passed" : "review";
    }, 1100);
    window.addEventListener("resize", function () { window.clearTimeout(window._ymUncropTimer); window._ymUncropTimer = window.setTimeout(uncropVisibleText, 120); });
  }

  var distributorKnowledge = [
    {
      title: "Home dashboard and recommended actions",
      purpose: "Start with the work that matters now instead of searching through every tool.",
      steps: ["Review the active campaign and the next scheduled deadline.", "Use Quick Access for the most common task.", "Open the recommended asset or document.", "Complete the task and report the result."],
      why: "The dashboard connects planning, content use and measurable follow-up.",
      result: "You know what to do next and Yanmar can see whether support is being adopted.",
      target: "Home"
    },
    {
      title: "Distributor and market context",
      purpose: "Make recommendations, currency, calls to action and campaign priorities match your market.",
      steps: ["Open the profile control in the header.", "Search for and select the correct distributor.", "Confirm the country, region, language and market strategy shown by the portal.", "Only accept the switch when the displayed context is correct."],
      why: "The selected distributor controls regional copy, TCO currency and campaign recommendations.",
      result: "Every relevant tool uses the same confirmed market context.",
      target: "Home"
    },
    {
      title: "Global portal search",
      purpose: "Open a product, brochure, campaign, saved draft or distributor tool without scrolling.",
      steps: ["Select the search field in the header.", "Enter a product name, document type or task such as Arabic brochure, TCO or comparison.", "Review the grouped results.", "Select a result to open its actual portal destination."],
      why: "Search reduces navigation time and never sends a distributor to admin-only tools.",
      result: "The requested portal area opens directly.",
      target: "Search"
    },
    {
      title: "YDG generator toolkit",
      purpose: "Work only with generator models, sales stories, objections, campaigns and materials.",
      steps: ["Open YDG Toolkit or Generators.", "Choose the required generator with the model selector.", "Review the application story and verified product information.", "Open a generator-specific asset, comparison, calculator or request."],
      why: "Category filtering prevents pump or engine information from entering generator work.",
      result: "Your workspace contains generator-relevant information only.",
      target: "YDG Toolkit"
    },
    {
      title: "YDP water-pump toolkit",
      purpose: "Prepare water-management communication with pump-specific products and proof points.",
      steps: ["Open YDP Toolkit or Water Pumps.", "Select the pump type and intended application.", "Use capacity, head, inlet size and application fit as the comparison basis.", "Choose only pump assets and current local specifications."],
      why: "Pump buyers need different evidence and objections than generator buyers.",
      result: "The selected content and tools stay relevant to dewatering, irrigation or emergency use.",
      target: "YDP Toolkit"
    },
    {
      title: "L-Series engine toolkit",
      purpose: "Support engine and OEM discussions with L-Series-specific technical context.",
      steps: ["Open L-Series Engines.", "Select the required engine model.", "Review output, displacement, emissions and application fit.", "Use engine-specific materials or open the shared comparison and ownership tools."],
      why: "Engine selection depends on integration and duty requirements, not generator or pump fields.",
      result: "The workspace shows only relevant engine information and support.",
      target: "L-Series Engines"
    },
    {
      title: "Campaign visuals, brochures and gallery",
      purpose: "Find approved images, brochures, datasheets and campaign media for local activation.",
      steps: ["Choose the active product category first.", "Open Campaign Visuals, Brochure Library or Gallery / Assets.", "Filter by product, market, language and status.", "Check the usage status and recommended workflow before downloading."],
      why: "Using the approved current file protects brand consistency and product accuracy.",
      result: "You download the correct source asset without mixing categories.",
      target: "Content Library"
    },
    {
      title: "Campaigns and campaign calendar",
      purpose: "See what is active, what is due and which localization task comes next.",
      steps: ["Open Active Campaigns or Campaign Calendar.", "Switch between month and list view.", "Filter by product category, channel, language or status.", "Open an item, complete localization and mark the action when finished."],
      why: "A shared calendar turns content into planned market activity.",
      result: "Deadlines, campaign assets and completed actions stay connected.",
      target: "Campaign Calendar"
    },
    {
      title: "Product Comparison Builder",
      purpose: "Create an evidence-led Yanmar comparison with as many alternatives as needed.",
      steps: ["Choose Generators, Water Pumps or Engines and confirm the Yanmar reference model.", "Add one competitor URL, product name or pasted specification and run the evidence step.", "Select Add another alternative for every additional product.", "Review the extracted facts and source status.", "Select the recommended comparison points that use the same measurement basis.", "Build the sheet, save the draft and use Print / PDF for the compact A4 version."],
      why: "A controlled evidence workflow avoids unsupported or mismatched competitive claims.",
      result: "A professional comparison sheet with visible sources, selected facts and all alternatives.",
      target: "Comparison Builder"
    },
    {
      title: "Total Cost of Ownership Calculator",
      purpose: "Compare lifecycle cost instead of judging equipment on purchase price alone.",
      steps: ["Choose YDG, YDP or L-Series and confirm the regional currency.", "Enter years, annual operating hours, fuel price, fuel use, service, parts, downtime and residual value.", "Add each alternative in the same unit and currency.", "Resolve every unrealistic-value warning before calculating.", "Review total cost and cost per operating hour, then save or print the A4 sheet."],
      why: "TCO makes fuel, service, downtime and residual value visible in one consistent model.",
      result: "A reusable calculation with assumptions, warnings and a comparable lifecycle result.",
      target: "TCO Calculator"
    },
    {
      title: "Website Growth Guide",
      purpose: "Generate and improve useful SEO/SEA-ready product copy without needing specialist knowledge.",
      steps: ["Choose product line, regional context, customer segment, page type and draft language.", "Use the suggested focus keyword or replace it with a specific customer need.", "Use the Website Growth Guide checklist to improve SEO, SEA, page structure and local website content.", "Apply the mini templates manually in the distributor website or preferred CMS.", "Resolve the remaining score tips and verify every technical claim before publication.", "Copy or download the final text."],
      why: "The workflow applies people-first writing, title, meta-description, search-intent and readability checks consistently.",
      result: "An editable localized draft with a transparent search-readiness score and approval reminder.",
      target: "Website Growth Guide"
    },
    {
      title: "Saved drafts and Content Library",
      purpose: "Return to comparison and TCO work without starting again.",
      steps: ["Save the draft from the Comparison Builder or TCO Calculator.", "Open Content Library or Saved Workspace.", "Filter by content type, product and status.", "Open the draft, edit it and save a new version or export it."],
      why: "Central drafts preserve assumptions, evidence and version history.",
      result: "Your previous work can be reopened and updated.",
      target: "Content Library"
    },
    {
      title: "Report campaign results",
      purpose: "Share real market outcomes with the responsible Yanmar admin.",
      steps: ["Open Report Results or Campaign Results.", "Select the campaign, product, market, channel and activity date.", "Enter the available reach, engagement, leads, downloads or sales follow-up.", "Attach a screenshot, link or local example as evidence.", "Submit the report and follow any admin feedback."],
      why: "Result reporting links distributed content to measurable activation and future support decisions.",
      result: "The admin dashboard receives a traceable distributor result.",
      target: "Campaign Results"
    },
    {
      title: "Requests, feedback and local examples",
      purpose: "Ask for help, request localization or contribute useful market content.",
      steps: ["Open the relevant product workspace before creating the request.", "Describe the market need, channel, language, deadline and desired output.", "Attach the available source or local example.", "Submit to the responsible admin and monitor the request status."],
      why: "Structured requests give admins enough context to respond quickly and reuse strong local work.",
      result: "A traceable support request or contribution connected to product and market context.",
      target: "Feedback"
    },
    {
      title: "Language, dark mode and safe publishing",
      purpose: "Use the portal comfortably while keeping output language and approval status clear.",
      steps: ["Choose the interface language from the globe/language control.", "Choose the draft language separately inside Website Growth Guide when needed.", "Use the moon/profile controls for dark mode and account role.", "Before publishing, confirm source status, local model, image rights and approval status."],
      why: "Interface language, output language and approval are separate controls with different purposes.",
      result: "The portal remains readable and only reviewed content leaves the workspace.",
      target: "Home"
    },
    {
      title: "Troubleshooting checklist",
      purpose: "Recover quickly when a result, draft or page does not look as expected.",
      steps: ["Confirm the active distributor and product category.", "Clear the global search and category filters.", "Check that required fields and evidence are complete.", "Resolve highlighted TCO or copy warnings.", "Reopen the saved draft from Content Library.", "Reload the page only after saving current work, then report the issue if it continues."],
      why: "Most portal issues come from an incorrect context, filter or incomplete required field.",
      result: "The common problem is resolved without losing saved work.",
      target: "Feedback"
    }
  ];

  var adminKnowledge = [
    {
      title: "Enter and leave admin view",
      purpose: "Keep distributor work and governance work visibly separated.",
      steps: ["Use the profile icon in the header.", "Confirm that the admin navigation and admin dashboard are visible.", "Complete administrative work without changing distributor-only drafts unless required.", "Use the same profile control to return to distributor view."],
      why: "A clear role boundary prevents accidental use of governance tools in a distributor session.",
      result: "Only the navigation and data relevant to the active role are visible.",
      target: "Admin Dashboard"
    },
    {
      title: "Admin dashboard and pending work",
      purpose: "Prioritize approvals, distributor follow-up, campaign deadlines and content requests.",
      steps: ["Review pending approvals and notifications.", "Check open distributor follow-up and new result reports.", "Open the most urgent item from Quick Access.", "Complete or assign the action and confirm its updated status."],
      why: "The dashboard provides one operational queue instead of separate disconnected lists.",
      result: "Urgent governance and support work receives a clear owner and status.",
      target: "Admin Dashboard"
    },
    {
      title: "Distributor, country and regional scope",
      purpose: "Compare adoption and support needs at the correct geographic level.",
      steps: ["Open Regional Scope or Distributor Management.", "Select one or more regions, countries or distributors.", "Compare active users, actions, downloads, follow-up and shared content.", "Reset the scope before starting an unrelated analysis."],
      why: "Consistent scope prevents regional totals from being compared with individual distributor results.",
      result: "A readable market view with clearly selected comparison scopes.",
      target: "Regional Scope"
    },
    {
      title: "Market profiles and personalization",
      purpose: "Control which CTA, value proposition, currency and priority each distributor receives.",
      steps: ["Open the distributor or market profile.", "Review the country, regional and distributor-level strategy.", "Add an override only when evidence supports a local exception.", "Preview the resulting copy and campaign priorities.", "Save, document the reason and reset overrides that are no longer needed."],
      why: "The strategy hierarchy keeps personalization consistent and auditable.",
      result: "Distributor tools use the correct local priorities with visible exceptions.",
      target: "Distributors"
    },
    {
      title: "Create, plan and activate campaigns",
      purpose: "Turn a marketing plan into distributor-visible campaign tasks and assets.",
      steps: ["Create the campaign with objective, product category, market, channel, owner and dates.", "Attach approved assets, copy, localization tasks and proof requirements.", "Set Draft, Planned or Active status.", "Assign the campaign to the relevant distributors.", "Confirm that it appears in Active Campaigns and the distributor calendar."],
      why: "One connected campaign record prevents planning and distributor activation from drifting apart.",
      result: "Selected distributors receive the campaign, deadlines and approved materials.",
      target: "Campaigns"
    },
    {
      title: "Campaign Calendar governance",
      purpose: "Coordinate product campaigns, localization deadlines, events and channel activity.",
      steps: ["Open the full Campaign Calendar.", "Use product, channel, language and status filters.", "Create or update the planning item.", "Set localization deadlines before publication dates.", "Check distributor visibility and notification text."],
      why: "Calendar governance makes dependencies and market timing visible.",
      result: "Admin and distributor views show the correct translated planning items.",
      target: "Campaign Calendar"
    },
    {
      title: "Add and govern content",
      purpose: "Publish current, searchable and rights-cleared source material.",
      steps: ["Open Add Content and select product category and content type.", "Add title, language, market, version, source and owner.", "Upload or link the asset and complete image-rights and claim checks.", "Set the review status and publish only after all required approvals.", "Confirm the item appears in the correct distributor library."],
      why: "Structured metadata and approval prevent outdated or cross-category files from being distributed.",
      result: "A traceable approved asset available to the intended markets only.",
      target: "Add Content"
    },
    {
      title: "Asset approval and release control",
      purpose: "Check brand, product claims, channel fit, legal sensitivity, image rights and local validation.",
      steps: ["Open the pending item in Asset Approval.", "Review the source file and every approval criterion.", "Record corrections or reject the item when evidence is incomplete.", "Complete all checks before setting Released for distributor use.", "Verify the released item in distributor view."],
      why: "Release status must represent completed evidence, not only visual approval.",
      result: "Only fully checked content is available for distributor use.",
      target: "Asset Approval"
    },
    {
      title: "Admin-to-admin sharing and Contribution Review",
      purpose: "Reuse strong regional work while preserving ownership and review status.",
      steps: ["Open Share Content or Contribution Review.", "Choose the receiving admin, region or review group.", "Add the reason, intended use and required review date.", "The receiving admin reviews sources, rights and local fit.", "Approve, request changes or archive the contribution."],
      why: "A structured handoff is safer than copying untracked files between regions.",
      result: "Shared content keeps its source, owner, status and feedback history.",
      target: "Contribution Review"
    },
    {
      title: "Usage tracking and activity log",
      purpose: "Understand distributor adoption and every meaningful portal action.",
      steps: ["Filter Usage Tracking by region, country, distributor, role, product and date.", "Review searches, opens, downloads, generated copy, comparison sheets, TCO calculations, shares and result submissions.", "Open the underlying event when follow-up is needed.", "Use Activity Log for governance actions by admins."],
      why: "Distributor activity and admin governance are different signals and must remain distinguishable.",
      result: "A traceable adoption view without mixing admin work into distributor usage totals.",
      target: "Activity Log"
    },
    {
      title: "Campaign analytics and reported results",
      purpose: "Connect campaign delivery with distributor evidence and measurable outcomes.",
      steps: ["Open Campaign Analytics for aggregate activity.", "Open Campaign Results for distributor-submitted outcomes.", "Filter by campaign, product, market, distributor and channel.", "Review attached evidence and follow up on missing definitions.", "Record the validated result and use it in campaign evaluation."],
      why: "Downloads alone do not prove activation; reported results add market evidence.",
      result: "A campaign view that distinguishes reach, adoption, follow-up and validated outcomes.",
      target: "Campaign Results"
    },
    {
      title: "Shared Comparison Builder",
      purpose: "Prepare or review evidence-led comparisons on behalf of distributors.",
      steps: ["Open Comparison Builder from Decision Tools or a product workspace.", "Select the category and Yanmar reference model.", "Add all competitor alternatives and verify each extracted fact.", "Use recommended category fields and consistent measurement standards.", "Build, save, review and export the compact A4 sheet."],
      why: "The same shared component preserves category logic and review standards for both roles.",
      result: "A versioned comparison ready for evidence or Yanmar approval.",
      target: "Comparison Builder"
    },
    {
      title: "Shared TCO Calculator",
      purpose: "Build or validate lifecycle-cost scenarios for distributor sales support.",
      steps: ["Select product category, market currency and time horizon.", "Use consistent assumptions for operating hours, fuel, service, downtime and residual value.", "Resolve unrealistic-value warnings and document assumptions.", "Compare all alternatives and review cost per operating hour.", "Save or export the A4 result for controlled use."],
      why: "Admin access supports quality control without creating a second calculator.",
      result: "One reviewed calculation model shared across admin and distributor workflows.",
      target: "TCO Calculator"
    },
    {
      title: "Website-copy governance",
      purpose: "Support localized copy while protecting search quality and technical accuracy.",
      steps: ["Review product, market, page type, language and focus keyword.", "Use the generated fields and search-readiness tips as editorial guidance.", "Check that titles and descriptions match the actual page language.", "Verify technical claims, model applicability and local legal requirements.", "Approve, request changes or return the draft to the distributor."],
      why: "A high readiness score is not approval and cannot guarantee search ranking.",
      result: "Useful people-first copy with documented claim review.",
      target: "Website Growth Guide"
    },
    {
      title: "Evidence Center and validation",
      purpose: "Connect diagnosis, survey insight, theory, design choice, portal function and KPI.",
      steps: ["Open the relevant evidence or validation record.", "Link the identified problem and source evidence.", "Document the theory and alternative solutions considered.", "Connect the implemented feature and intended KPI.", "Add stakeholder feedback, usability findings, decision and reflection notes."],
      why: "Traceability demonstrates why the portal exists and how design choices were validated.",
      result: "A printable evidence chain for governance and assessment.",
      target: "Evidence"
    },
    {
      title: "Export, roadmap and final release check",
      purpose: "Close the governance loop before a board review or pilot release.",
      steps: ["Review Platform Roadmap, open risks and unresolved validation items.", "Confirm distributor/admin navigation, permissions and language behavior.", "Test campaign, library, copy, comparison, TCO, save, reopen, share and result-reporting flows.", "Check light/dark mode, mobile overflow and PDF output.", "Export the required evidence and record the release decision in Activity Log."],
      why: "A repeatable release check turns a prototype demonstration into a controlled pilot.",
      result: "A documented release state with known risks and verified core workflows.",
      target: "Platform Roadmap"
    }
  ];

  function isAdminView() {
    /* `admin-mode` is the single source of truth. Admin navigation exists in the
       DOM for both roles, so visibility and translated button text must never be
       used as role signals. */
    return Boolean(document.body && document.body.classList.contains("admin-mode"));
  }

  function lockKnowledgeNavigationLabel() {
    qa(".nav-item, nav a, nav button, [data-target], [data-page-target]").forEach(function (item) {
      if (!/portal knowledge|portalkennis/i.test(item.textContent || "")) { return; }
      item.setAttribute("translate", "yes");
      item.classList.remove("notranslate");
      var walker = document.createTreeWalker(item, NodeFilter.SHOW_TEXT);
      var node;
      while ((node = walker.nextNode())) {
        if (/portal knowledge|portalkennis/i.test(node.nodeValue || "")) {
          node.nodeValue = node.nodeValue.replace(/portal knowledge|portalkennis/gi, "Portal Knowledge");
        }
      }
    });
  }

  function knowledgePageRoot() {
    var direct = q("#demo, #portal-knowledge, #portal-knowledge-page, #training, #training-page, [data-page='portal-knowledge'], [data-page='training']");
    if (direct) { return direct; }
    var navItem = qa(".nav-item, nav a, nav button, [data-target]").find(function (item) { return /portal knowledge|portalkennis/i.test(item.textContent || ""); });
    if (navItem) {
      var target = String(navItem.getAttribute("data-target") || navItem.getAttribute("data-page-target") || navItem.getAttribute("href") || "").replace(/^#/, "");
      if (target) {
        var byTarget = document.getElementById(target) || q("[data-page='" + target + "']");
        if (byTarget) { return byTarget; }
      }
    }
    return qa(".page, .content-page, section").find(function (page) {
      var heading = q("h1, h2", page);
      return heading && /portal knowledge|portalkennis|portal training/i.test(heading.textContent || "");
    }) || null;
  }

  function knowledgePreparation(item, role) {
    var key = textKey(item.target + " " + item.title);
    if (/comparison/.test(key)) {
      return ["Choose the correct product category and Yanmar reference model.", "Have an official product page, brochure or specification text for every alternative.", "Decide which customer application and market the comparison must support."];
    }
    if (/tco|ownership|cost/.test(key)) {
      return ["Confirm the product line, model, country and currency.", "Collect purchase, fuel, service, parts, downtime and residual-value assumptions in the same units.", "Agree on the ownership period and annual operating hours before comparing options."];
    }
    if (/copy|website|seo/.test(key)) {
      return ["Select the product, page type, language, market and customer segment.", "Define one clear customer need or focus keyword.", "Keep an approved datasheet available before using technical claims."];
    }
    if (/campaign|calendar/.test(key)) {
      return ["Confirm the active product category and local market.", "Check the required channel, language and publication deadline.", "Use only content with the correct approval or review status."];
    }
    if (/asset|brochure|gallery|library|content/.test(key)) {
      return ["Select the required product category first.", "Know the intended channel, language and customer use case.", "Check whether the asset is approved, editable or still awaiting review."];
    }
    if (/search/.test(key)) {
      return ["Use a specific product, document or task name.", "Check that the active role is correct; distributor search excludes admin-only destinations.", "Keep the active product category in mind when opening category-specific results."];
    }
    if (role === "admin") {
      return ["Open the admin view with the profile button in the header.", "Confirm the selected region, country, distributor and product scope.", "Review the evidence, approval status and latest activity before changing a record."];
    }
    return ["Confirm the distributor shown in the header.", "Choose the relevant product category and local market context.", "Have the required approved content or verified product information ready."];
  }

  function knowledgeChecks(item, role) {
    var key = textKey(item.target + " " + item.title);
    if (/comparison/.test(key)) {
      return ["Every selected fact has a visible source or is clearly marked for verification.", "All products use comparable units and test conditions.", "The saved or exported sheet includes every intended alternative and fits the selected output format."];
    }
    if (/tco|ownership|cost/.test(key)) {
      return ["All options use the same currency, ownership years and operating assumptions.", "No critical realism warning remains unresolved.", "Residual value is not higher than purchase price and downtime does not exceed annual operating hours."];
    }
    if (/copy|website|seo/.test(key)) {
      return ["The focus keyword matches the selected product and page type.", "SEO title, meta description, H1, CTA and body copy are complete.", "Technical claims are approved and the score explanation has been reviewed before publishing."];
    }
    if (/campaign|calendar/.test(key)) {
      return ["Product, channel, language, owner and due date are correct.", "The linked asset and localized copy are the approved versions.", "Completion or results have been reported so progress updates correctly."];
    }
    if (/asset|brochure|gallery|library|content/.test(key)) {
      return ["The file belongs to the active product category and market.", "Language, version and approval status are current.", "The recommended workflow and usage rights have been followed."];
    }
    if (role === "admin") {
      return ["The action is recorded under the correct distributor and scope.", "Approval, evidence and follow-up status are explicit.", "The distributor-facing result is visible only when it is ready for use."];
    }
    return ["The selected product, distributor and market context still match the task.", "Only approved content and verified product information are used.", "The result has been saved, downloaded or reported where the workflow requires it."];
  }

  function knowledgeListMarkup(items) {
    return "<ul>" + items.map(function (value) { return "<li>" + escapeHtml(value) + "</li>"; }).join("") + "</ul>";
  }

  function knowledgeItemMarkup(item, index, role) {
    var preparation = item.before || knowledgePreparation(item, role);
    var checks = item.checks || knowledgeChecks(item, role);
    var roleClass = role === "admin" ? "ym-admin-only" : "ym-distributor-only";
    var searchable = [item.title, item.purpose, item.why, item.result].concat(preparation, item.steps, checks).join(" ");
    return "<details class='ym-knowledge-item " + roleClass + "' data-knowledge-text='" + escapeHtml(textKey(searchable)) + "'>" +
      "<summary><span class='ym-knowledge-number'>" + (index + 1) + "</span><span class='ym-knowledge-summary'><strong>" + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.purpose) + "</small></span><svg viewBox='0 0 24 24' aria-hidden='true'><path d='m8 10 4 4 4-4'/></svg></summary>" +
      "<div class='ym-knowledge-body'>" +
        "<section class='ym-knowledge-preparation'><h4>Before you start</h4>" + knowledgeListMarkup(preparation) + "</section>" +
        "<section class='ym-knowledge-steps'><h4>How to use it</h4><ol>" + item.steps.map(function (step) { return "<li>" + escapeHtml(step) + "</li>"; }).join("") + "</ol></section>" +
        "<section class='ym-knowledge-checks'><h4>Check before finishing</h4>" + knowledgeListMarkup(checks) + "</section>" +
        "<aside class='ym-knowledge-outcome'><h4>Why this is useful</h4><p>" + escapeHtml(item.why) + "</p><h4>Expected result</h4><p>" + escapeHtml(item.result) + "</p><button type='button' class='button secondary ym-guide-open' data-guide-target='" + escapeHtml(item.target) + "'>Open related area</button></aside>" +
      "</div></details>";
  }

  function openGuideDestination(label) {
    var wanted = textKey(label);
    if (wanted === "search") {
      var search = q(".global-search input, .search-shell input, .header-search input, input[type='search']");
      if (search) { search.focus(); search.select(); }
      return;
    }
    var navItem = qa(".nav-item, nav a, nav button, [data-target], [data-page-target]").find(function (item) {
      var candidate = textKey(item.textContent || item.getAttribute("aria-label") || "");
      return Boolean(candidate) && (candidate.indexOf(wanted) >= 0 || wanted.indexOf(candidate) >= 0);
    });
    if (navItem) { navItem.click(); return; }
    var proxy = document.createElement("button");
    proxy.textContent = label;
    fallbackRoute(proxy);
  }

  function renderRoleKnowledge(force) {
    var root = knowledgePageRoot();
    if (!root) { return; }
    var admin = isAdminView();
    var role = admin ? "admin" : "distributor";
    var shell = q("#ym-role-knowledge", root);
    qa(":scope > *", root).forEach(function (child) {
      if (child.id === "ym-role-knowledge") { return; }
      child.hidden = true;
      child.classList.add("ym-legacy-knowledge");
      child.setAttribute("aria-hidden", "true");
      child.style.setProperty("display", "none", "important");
    });
    if (!shell) {
      shell = document.createElement("div");
      shell.id = "ym-role-knowledge";
      shell.className = "ym-knowledge-shell ym-dynamic-language";
      shell.setAttribute("translate", "yes");
      root.appendChild(shell);
    }
    if (!force && shell.dataset.role === role) { return; }
    shell.dataset.role = role;
    shell.classList.toggle("ym-admin-guide", admin);
    shell.classList.toggle("ym-distributor-guide", !admin);
    shell.setAttribute("aria-label", admin ? "Admin Portal Knowledge" : "Distributor Portal Knowledge");
    var items = admin ? adminKnowledge : distributorKnowledge;
    var title = admin ? "Admin Portal Knowledge" : "Distributor Portal Knowledge";
    var intro = admin
      ? "A complete operating guide for governance, distributor support, content approval, measurement and shared decision tools. Distributor instructions are intentionally not shown in this view."
      : "A complete operating guide for activating products, using approved content, building comparisons, calculating ownership cost and reporting results. Admin-only procedures are intentionally not shown in this view.";
    var quickSteps = admin
      ? ["Review admin queue", "Set the correct scope", "Complete governance action", "Verify distributor outcome"]
      : ["Confirm distributor", "Choose product category", "Complete the activity", "Report the result"];
    shell.innerHTML = "<header class='ym-knowledge-header'><div><span class='ym-knowledge-role'>" + escapeHtml(admin ? "ADMIN GUIDE" : "DISTRIBUTOR GUIDE") + "</span><h1>" + escapeHtml(title) + "</h1><p>" + escapeHtml(intro) + "</p></div><div class='ym-knowledge-search'><label for='ym-knowledge-search'>Search this guide</label><div><svg viewBox='0 0 24 24' aria-hidden='true'><circle cx='11' cy='11' r='7'/><path d='m20 20-4-4'/></svg><input id='ym-knowledge-search' type='search' autocomplete='off' placeholder='Search a tool or task...'></div><small id='ym-knowledge-count'>" + items.length + " topics available</small></div></header>" +
      "<section class='ym-knowledge-quick'><div><span>1</span><strong>" + escapeHtml(quickSteps[0]) + "</strong></div><div><span>2</span><strong>" + escapeHtml(quickSteps[1]) + "</strong></div><div><span>3</span><strong>" + escapeHtml(quickSteps[2]) + "</strong></div><div><span>4</span><strong>" + escapeHtml(quickSteps[3]) + "</strong></div></section>" +
      "<div class='ym-knowledge-list'>" + items.map(function (item, index) { return knowledgeItemMarkup(item, index, role); }).join("") + "</div><p class='ym-knowledge-empty' hidden>No matching guide topic. Try a product, tool or task name.</p>";
    var search = q("#ym-knowledge-search", shell);
    var count = q("#ym-knowledge-count", shell);
    var empty = q(".ym-knowledge-empty", shell);
    search.addEventListener("input", function () {
      var term = textKey(search.value);
      var visible = 0;
      qa(".ym-knowledge-item", shell).forEach(function (item) {
        var match = !term || textKey((item.textContent || "") + " " + (item.dataset.knowledgeText || "")).indexOf(term) >= 0;
        item.hidden = !match;
        if (match) { visible += 1; }
      });
      count.textContent = visible + (visible === 1 ? " topic available" : " topics available");
      empty.hidden = visible !== 0;
      requestDynamicTranslation(count);
    });
    qa(".ym-guide-open", shell).forEach(function (button) {
      button.addEventListener("click", function () { openGuideDestination(button.dataset.guideTarget); });
    });
    requestDynamicTranslation(shell);
    window.setTimeout(uncropVisibleText, 40);
  }

  function installRoleKnowledge() {
    lockKnowledgeNavigationLabel();
    renderRoleKnowledge(true);
    var toggle = q("#admin-toggle");
    if (toggle && toggle.dataset.ymKnowledgeListener !== "true") {
      toggle.dataset.ymKnowledgeListener = "true";
      toggle.addEventListener("click", function () {
        window.setTimeout(function () { lockKnowledgeNavigationLabel(); renderRoleKnowledge(true); }, 120);
        window.setTimeout(function () { renderRoleKnowledge(true); }, 360);
      });
    }
    if (document.body && document.body.dataset.ymKnowledgeObserver !== "true") {
      document.body.dataset.ymKnowledgeObserver = "true";
      var observer = new MutationObserver(function (mutations) {
        if (mutations.some(function (mutation) { return mutation.attributeName === "class" || mutation.attributeName === "data-role" || mutation.attributeName === "data-mode"; })) {
          renderRoleKnowledge(false);
        }
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ["class", "data-role", "data-mode"] });
    }
    window.setTimeout(function () { lockKnowledgeNavigationLabel(); renderRoleKnowledge(true); }, 900);
  }

  function installLanguageSync() {
    var globalLanguage = q("#language-select, select[name='language'], .language-select select");
    if (!globalLanguage) { return; }
    globalLanguage.addEventListener("change", function () {
      var studioLanguage = q("#webcopy-language");
      var language = currentUiLanguage();
      if (studioLanguage && qa("option", studioLanguage).some(function (option) { return option.value === language; })) {
        studioLanguage.value = language;
        studioLanguage.dispatchEvent(new Event("change", { bubbles: true }));
      }
      window.setTimeout(replaceSourceLanguageLeaks, 300);
      window.setTimeout(polishHeader, 320);
      window.setTimeout(function () {
        applyLanguageMetadata();
        lockKnowledgeNavigationLabel();
        renderRoleKnowledge(true);
        qa(".ym-dynamic-language, .ym-copy-onboarding, .ym-seo-score-card, .ym-comparison-helper, .ym-recommended-points, .ym-copy-status, .ym-tco-guidance").forEach(requestDynamicTranslation);
        uncropVisibleText();
      }, 520);
      window.setTimeout(function () {
        applyLanguageMetadata();
        uncropVisibleText();
      }, 1400);
    });
  }

  function installLanguageConsistencySweep() {
    applyLanguageMetadata();
    var legacyToast = q("#portal-toast");
    if (legacyToast && legacyToast.dataset.ymLanguageBridge !== "true") {
      legacyToast.dataset.ymLanguageBridge = "true";
      legacyToast.classList.add("ym-dynamic-language");
      legacyToast.setAttribute("translate", "yes");
      if (typeof window.notify === "function") {
        var legacyNotify = window.notify;
        window.notify = function (message) {
          legacyNotify(message);
          window.setTimeout(function () { requestDynamicTranslation(legacyToast); }, 20);
        };
      }
    }
    window.setTimeout(applyLanguageMetadata, 420);
    window.setTimeout(function () {
      applyLanguageMetadata();
      qa(".ym-dynamic-language, .ym-copy-onboarding, .ym-seo-score-card, .ym-comparison-helper, .ym-recommended-points, .ym-copy-status, .ym-tco-guidance").forEach(requestDynamicTranslation);
    }, 1050);
  }

  function installAll() {
    polishHeader();
    installThemeCompatibility();
    removeAbbreviationTiles();
    replaceSourceLanguageLeaks();
    installLanguageSync();
    installLanguageConsistencySweep();
    installCopyStudio();
    updateRegionalCurrencies();
    installComparisonGuide();
    installTcoValidation();
    installPrintInterceptors();
    installSheetImageExports();
    installNavigationFallback();
    exposePortalQa();
    installRoleKnowledge();
    qa("#ci-region, #distributor-select, #distributor-input, [name='distributor']").forEach(function (control) {
      control.addEventListener("change", updateRegionalCurrencies);
    });
    window.setTimeout(function () {
      polishHeader();
      syncSemanticTheme();
      removeAbbreviationTiles();
      replaceSourceLanguageLeaks();
      installCopyStudio();
      installComparisonGuide();
      installTcoValidation();
      installSheetImageExports();
    }, 900);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installAll, { once: true });
  } else {
    installAll();
  }
})();

;

/* ===== Source: ym-release-v17.js ===== */
(function () {
  "use strict";

  const api = (window.YanmarAmplifyV17 = window.YanmarAmplifyV17 || {});
  const byId = (id) => document.getElementById(id);
  const qs = (selector, root) => (root || document).querySelector(selector);
  const qsa = (selector, root) => Array.from((root || document).querySelectorAll(selector));
  const escapeHTML = (value) =>
    String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  const uid = (prefix) =>
    `${prefix || "ym"}-${
      window.crypto && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`
    }`;

  function parseJSON(value, fallback) {
    try {
      if (value == null || value === "") return fallback;
      const parsed = JSON.parse(value);
      return parsed == null ? fallback : parsed;
    } catch (_error) {
      return fallback;
    }
  }

  function readStore(key, fallback) {
    try {
      const parsed = parseJSON(localStorage.getItem(key), fallback);
      return parsed == null ? fallback : parsed;
    } catch (_error) {
      return fallback;
    }
  }

  function writeStore(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      notify("This browser could not save the latest change.", "danger");
      return false;
    }
  }

  function download(filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function slug(value) {
    return String(value || "yanmar-amplify")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(String(value));
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = String(value);
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

  function notify(message, type) {
    let live = byId("ym17-live-region");
    if (!live) {
      live = document.createElement("div");
      live.id = "ym17-live-region";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      Object.assign(live.style, {
        position: "fixed",
        right: "18px",
        bottom: "18px",
        zIndex: "1200",
        maxWidth: "360px",
        padding: "12px 14px",
        borderRadius: "7px",
        background: "var(--color-text-strong)",
        color: "var(--color-surface)",
        boxShadow: "var(--shadow-lg)",
        fontWeight: "750",
        lineHeight: "1.4",
      });
      document.body.appendChild(live);
    }
    live.dataset.type = type || "info";
    live.textContent = message;
    live.hidden = false;
    clearTimeout(live._ym17Timer);
    live._ym17Timer = setTimeout(() => {
      live.hidden = true;
    }, 3200);
  }

  function icon(name) {
    const paths = {
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 10h18"></path><path d="M8 14h2M14 14h2M8 18h2"></path>',
      image: '<rect x="3" y="4" width="18" height="16" rx="2"></rect><circle cx="9" cy="10" r="2"></circle><path d="m4 18 5-5 3 3 2-2 6 5"></path>',
      download: '<path d="M12 3v12"></path><path d="m7 10 5 5 5-5"></path><path d="M4 21h16"></path>',
      share: '<circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"></path>',
      compare: '<rect x="3" y="5" width="7" height="14" rx="1"></rect><rect x="14" y="5" width="7" height="14" rx="1"></rect><path d="M6 9h1M6 13h1M17 9h1M17 13h1"></path>',
      calculator: '<rect x="5" y="2" width="14" height="20" rx="2"></rect><path d="M8 6h8v3H8zM8 13h1M12 13h1M16 13h1M8 17h1M12 17h1M16 17h1"></path>',
      user: '<circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c.7-4 3.1-6 7-6s6.3 2 7 6"></path>',
      close: '<path d="m6 6 12 12M18 6 6 18"></path>',
      plus: '<path d="M12 5v14M5 12h14"></path>',
      copy: '<rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"></path>',
      print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect>',
      file: '<path d="M6 2h8l4 4v16H6z"></path><path d="M14 2v5h5M9 12h6M9 16h6"></path>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path>',
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.file}</svg>`;
  }

  function currentDistributor() {
    return (byId("distributor-select") && byId("distributor-select").value) || "Yanmar Europe Distributor";
  }

  function currentLanguage() {
    return (byId("language-select") && byId("language-select").value) || "en";
  }

  function isAdmin() {
    return document.body.classList.contains("admin-mode");
  }

  function track(action, detail, category) {
    const key = "yanmarAmplifyUsageV17";
    const events = readStore(key, []);
    events.unshift({
      id: uid("event"),
      action,
      detail: detail || "",
      category: category || "Portal",
      distributor: currentDistributor(),
      role: isAdmin() ? "admin" : "distributor",
      createdAt: new Date().toISOString(),
    });
    writeStore(key, events.slice(0, 500));
    document.dispatchEvent(new CustomEvent("ym17:usage", { detail: events[0] }));
  }

  let previousDistributorPage = "home";

  function applyRole(adminMode, sharedTool) {
    document.body.classList.toggle("admin-mode", Boolean(adminMode));
    document.body.classList.toggle("admin-shared-tool-mode", Boolean(adminMode && sharedTool));
    document.body.classList.remove("ym-nav-open");
    try {
      localStorage.setItem("yanmarAmplifyRoleFinal01", adminMode ? "admin" : "distributor");
    } catch (_error) {
      // The current session remains usable when storage is unavailable.
    }
    const roleButton = byId("admin-toggle");
    if (roleButton) roleButton.setAttribute("aria-pressed", String(Boolean(adminMode)));
    ensureAdminIcon();
  }

  function activatePage(pageId) {
    const target = byId(pageId);
    if (!target || !target.classList.contains("page")) return false;
    qsa("main > .page").forEach((page) => {
      const active = page === target;
      page.classList.toggle("active", active);
      page.setAttribute("aria-hidden", String(!active));
    });
    target.removeAttribute("aria-hidden");
    return true;
  }

  function updateNavigation(pageId, adminMode, sharedTool) {
    qsa(".sidebar:not(.admin-sidebar) .nav-button[data-page]").forEach((button) => {
      const active = !adminMode && button.dataset.page === pageId;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    qsa(".admin-sidebar .nav-button[data-admin-target]").forEach((button) => {
      const active = adminMode && !sharedTool && button.dataset.adminTarget === pageId;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    qsa(".admin-sidebar .nav-button[data-admin-tool-target]").forEach((button) => {
      const active = adminMode && sharedTool && button.dataset.adminToolTarget === pageId;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    const activeLabel = byId("active-label");
    const distributorButton = qs(`.sidebar:not(.admin-sidebar) [data-page="${pageId}"]`);
    if (activeLabel && distributorButton) activeLabel.textContent = qs(".nav-text", distributorButton)?.textContent.trim() || "Home";
  }

  function scrollOnce(target) {
    if (!target) return;
    const headerHeight = qs(".topbar")?.getBoundingClientRect().height || 72;
    const top = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - headerHeight - 12));
    try {
      window.scrollTo({ top, behavior: "auto" });
    } catch (_error) {
      window.scrollTo(0, top);
    }
  }

  function openPortalRoute(pageId, adminMode, sharedTool) {
    const target = byId(pageId);
    if (!target) return false;
    const targetPage = target.classList.contains("page") ? target : target.closest(".page");
    if (!targetPage) return false;
    if (!adminMode) previousDistributorPage = pageId;
    applyRole(adminMode, sharedTool);
    if (adminMode && !sharedTool) {
      if (!activatePage("admin")) return false;
      updateNavigation(pageId, true, false);
      scrollOnce(target);
    } else {
      if (!activatePage(targetPage.id)) return false;
      updateNavigation(pageId, adminMode, Boolean(sharedTool));
      scrollOnce(target);
    }
    track("Opened portal feature", pageId, sharedTool ? "Admin shared tool" : adminMode ? "Admin" : "Distributor");
    return true;
  }

  function setActivePage(pageId) {
    return openPortalRoute(pageId, false, false);
  }

  function ensureAdminIcon() {
    const button = byId("admin-toggle");
    if (!button) return;
    const expected = '<svg class="ym17-profile-icon" data-ym-control-icon="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="3.5"></circle><path d="M5 20c.7-4 3.1-6 7-6s6.3 2 7 6"></path></svg>';
    if (!button.querySelector(".ym17-profile-icon") || button.textContent.trim()) {
      button.innerHTML = expected;
    }
    button.setAttribute("aria-label", translatePhrase(isAdmin() ? "Return to distributor workspace" : "Open Yanmar admin workspace"));
    button.setAttribute("title", button.getAttribute("aria-label"));
  }

  function installAdminIconGuard() {
    ensureAdminIcon();
    const button = byId("admin-toggle");
    if (!button) return;
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        ensureAdminIcon();
      });
    });
    observer.observe(button, { childList: true, characterData: true, subtree: true });
    document.addEventListener("click", (event) => {
      if (event.target.closest("#admin-toggle")) requestAnimationFrame(ensureAdminIcon);
    });
  }

  const THEME_KEY = "yanmarDistributorPortalTheme";
  const LANGUAGE_KEY = "yanmarDistributorPortalLanguage";
  const BUILD_ID = "FINAL-YANMAR-AMPLIFY-20260723-02";
  const CORE_LANGUAGES = new Set(["en", "nl", "ar"]);
  const sourceText = new WeakMap();
  let translating = false;
  let translationObserver = null;
  let optionalTranslationPromise = null;

  function storedValue(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (_error) {
      return fallback;
    }
  }

  function applyTheme(theme, persist = true) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.body.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark", dark);
    const button = byId("theme-toggle");
    if (button) {
      const label = translatePhrase(dark ? "Switch to light mode" : "Switch to dark mode");
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", String(dark));
    }
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
      } catch (_error) {
        // Theme remains active for the current session.
      }
    }
  }

  function installThemeSync() {
    applyTheme(storedValue(THEME_KEY, document.documentElement.dataset.theme || "light"), false);
    document.addEventListener(
      "click",
      (event) => {
        if (!event.target.closest("#theme-toggle")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
      },
      true,
    );
  }

  const CORE_TRANSLATIONS = {
    nl: {
      "Language": "Taal",
      "Distributor": "Distributeur",
      "Home": "Home",
      "Portal knowledge": "Portaalkennis",
      "YDG Toolkit": "YDG-toolkit",
      "YDP Toolkit": "YDP-toolkit",
      "L-Series Engines": "L-Series-motoren",
      "Campaign Visuals": "Campagnebeelden",
      "Content Library": "Contentbibliotheek",
      "Brochure Library": "Brochurebibliotheek",
      "Gallery / assets": "Galerij / assets",
      "Comparison Builder": "Vergelijkingsbuilder",
      "Comparison Sheet Builder": "Vergelijkingssheetbuilder",
      "TCO Calculator": "TCO-calculator",
      "Website Growth Guide": "Website Growth Guide",
      "Starter Playbook": "Startershandboek",
      "Channel Playbook": "Kanaalhandboek",
      "Campaign Calendar": "Campagnekalender",
      "Local Distributor Examples": "Lokale distributeursvoorbeelden",
      "Measurement / KPIs": "Meting / KPI's",
      "Support Request": "Supportaanvraag",
      "Feedback": "Feedback",
      "Share Content": "Content delen",
      "Notifications": "Meldingen",
      "Distributor Manager": "Distributeurbeheer",
      "Status / KPIs": "Status / KPI's",
      "Usage Tracking": "Gebruiksregistratie",
      "Scope Performance": "Scopeprestaties",
      "Asset Approval": "Assetgoedkeuring",
      "Campaign Analytics": "Campagneanalyse",
      "Campaign Results": "Campagneresultaten",
      "Export": "Exporteren",
      "Platform Roadmap": "Platformroadmap",
      "Activity Log": "Activiteitenlog",
      "Contribution Review": "Bijdragebeoordeling",
      "Add Content": "Content toevoegen",
      "Quick access": "Snelle toegang",
      "Start the next distributor action": "Start de volgende distributeursactie",
      "Connected workspace": "Verbonden werkruimte",
      "Check pending tasks": "Controleer openstaande taken",
      "Review planned campaign work and deadlines.": "Bekijk gepland campagnewerk en deadlines.",
      "Use a campaign visual": "Gebruik een campagnebeeld",
      "Open the approved visual library for your category.": "Open de goedgekeurde beeldbibliotheek voor jouw categorie.",
      "Download sales-ready material": "Download verkoopklaar materiaal",
      "Collect brochures, specifications and sales files.": "Verzamel brochures, specificaties en verkoopbestanden.",
      "Submit a local example": "Dien een lokaal voorbeeld in",
      "Share local activation proof for Yanmar review.": "Deel lokaal activatiebewijs voor beoordeling door Yanmar.",
      "Build a comparison": "Maak een vergelijking",
      "Create an evidence-led product comparison.": "Maak een productvergelijking op basis van bewijs.",
      "Calculate ownership cost": "Bereken eigendomskosten",
      "Compare lifecycle costs with guided inputs.": "Vergelijk levenscycluskosten met begeleide invoer.",
      "Open Yanmar admin workspace": "Open de Yanmar-adminwerkruimte",
      "Return to distributor workspace": "Terug naar de distributeurswerkruimte",
      "Switch to dark mode": "Schakel naar donkere modus",
      "Switch to light mode": "Schakel naar lichte modus",
      "Product category": "Productcategorie",
      "Yanmar product": "Yanmar-product",
      "Competitors": "Concurrenten",
      "Review and export": "Controleren en exporteren",
      "Add competitor": "Concurrent toevoegen",
      "Duplicate": "Dupliceren",
      "Remove": "Verwijderen",
      "Move left": "Naar links",
      "Move right": "Naar rechts",
      "Show additional specifications": "Toon extra specificaties",
      "Hide additional specifications": "Verberg extra specificaties",
      "Generate comparison sheet": "Genereer vergelijkingssheet",
      "Edit comparison": "Vergelijking bewerken",
      "Start new comparison": "Nieuwe vergelijking starten",
      "Download CSV": "CSV downloaden",
      "Download PNG": "PNG downloaden",
      "Download JPG": "JPG downloaden",
      "Print / Save as PDF": "Afdrukken / Opslaan als PDF",
      "Not available": "Niet beschikbaar",
      "Products": "Producten",
      "Assumptions": "Aannames",
      "Results": "Resultaten",
      "Quick mode": "Snelle modus",
      "Advanced assumptions": "Geavanceerde aannames",
      "Purchase price": "Aankoopprijs",
      "Ownership period": "Eigendomsperiode",
      "Annual operating hours": "Jaarlijkse draaiuren",
      "Fuel price": "Brandstofprijs",
      "Fuel consumption": "Brandstofverbruik",
      "Annual maintenance cost": "Jaarlijkse onderhoudskosten",
      "Calculate": "Berekenen",
      "Reset": "Resetten",
      "Save assumptions": "Aannames opslaan",
      "Load assumptions": "Aannames laden",
      "Total cost of ownership": "Totale eigendomskosten",
      "Cost per year": "Kosten per jaar",
      "Cost per operating hour": "Kosten per draaiuur",
      "New request": "Nieuwe aanvraag",
      "Describe the required deliverable": "Beschrijf het gewenste resultaat",
      "Request title": "Titel van de aanvraag",
      "Country / market": "Land / markt",
      "Product scope": "Productscope",
      "Request type": "Type aanvraag",
      "Primary channel": "Primair kanaal",
      "Communication objective": "Communicatiedoel",
      "Target audience": "Doelgroep",
      "Master language": "Brontaal",
      "Target language": "Doeltaal",
      "Required timing": "Gewenste timing",
      "Preferred delivery date": "Gewenste opleverdatum",
      "Requested material / format": "Gewenst materiaal / formaat",
      "Communication channel": "Communicatiekanaal",
      "Desired language": "Gewenste taal",
      "Deadline": "Deadline",
      "Briefing details": "Briefingdetails",
      "Must include": "Moet bevatten",
      "Reference links / existing assets": "Referentielinks / bestaande assets",
      "Short brief": "Korte briefing",
      "Additional notes": "Aanvullende notities",
      "Contact person": "Contactpersoon",
      "Contact email": "Contact-e-mail",
      "Create support request": "Supportaanvraag aanmaken",
      "Your requests": "Jouw aanvragen",
      "Saved support requests": "Opgeslagen supportaanvragen",
      "Close": "Sluiten",
      "Copy briefing": "Briefing kopiëren",
      "Status": "Status",
      "Region": "Regio",
      "All": "Alles",
      "New": "Nieuw",
      "Reviewed": "Beoordeeld",
      "In progress": "In behandeling",
      "Waiting for distributor": "Wacht op distributeur",
      "Completed": "Afgerond",
      "Rejected": "Afgewezen",
      "No saved items yet.": "Nog geen opgeslagen items.",
      "Search...": "Zoeken..."
    },
    ar: {
      "Language": "اللغة",
      "Distributor": "الموزع",
      "Home": "الرئيسية",
      "Portal knowledge": "دليل المنصة",
      "YDG Toolkit": "أدوات YDG",
      "YDP Toolkit": "أدوات YDP",
      "L-Series Engines": "محركات L-Series",
      "Campaign Visuals": "مواد الحملة المرئية",
      "Content Library": "مكتبة المحتوى",
      "Brochure Library": "مكتبة الكتيبات",
      "Gallery / assets": "المعرض / الأصول",
      "Comparison Builder": "أداة المقارنة",
      "Comparison Sheet Builder": "منشئ ورقة المقارنة",
      "TCO Calculator": "حاسبة التكلفة الكلية",
      "Website Growth Guide": "استوديو نصوص الموقع",
      "Campaign Calendar": "تقويم الحملات",
      "Support Request": "طلب دعم",
      "Feedback": "الملاحظات",
      "Share Content": "مشاركة المحتوى",
      "Notifications": "الإشعارات",
      "Distributor Manager": "إدارة الموزعين",
      "Usage Tracking": "تتبع الاستخدام",
      "Asset Approval": "اعتماد الأصول",
      "Campaign Analytics": "تحليلات الحملات",
      "Campaign Results": "نتائج الحملات",
      "Export": "تصدير",
      "Activity Log": "سجل النشاط",
      "Contribution Review": "مراجعة المساهمات",
      "Add Content": "إضافة محتوى",
      "Quick access": "وصول سريع",
      "Start the next distributor action": "ابدأ إجراء الموزع التالي",
      "Connected workspace": "مساحة عمل مترابطة",
      "Check pending tasks": "راجع المهام المعلقة",
      "Use a campaign visual": "استخدم مادة حملة مرئية",
      "Download sales-ready material": "نزّل مواد جاهزة للمبيعات",
      "Submit a local example": "أرسل مثالاً محلياً",
      "Build a comparison": "أنشئ مقارنة",
      "Calculate ownership cost": "احسب تكلفة الملكية",
      "Open Yanmar admin workspace": "افتح مساحة إدارة Yanmar",
      "Return to distributor workspace": "العودة إلى مساحة الموزع",
      "Switch to dark mode": "التبديل إلى الوضع الداكن",
      "Switch to light mode": "التبديل إلى الوضع الفاتح",
      "Product category": "فئة المنتج",
      "Yanmar product": "منتج Yanmar",
      "Competitors": "المنافسون",
      "Review and export": "المراجعة والتصدير",
      "Add competitor": "إضافة منافس",
      "Duplicate": "تكرار",
      "Remove": "إزالة",
      "Move left": "تحريك لليسار",
      "Move right": "تحريك لليمين",
      "Show additional specifications": "عرض مواصفات إضافية",
      "Hide additional specifications": "إخفاء المواصفات الإضافية",
      "Generate comparison sheet": "إنشاء ورقة المقارنة",
      "Edit comparison": "تعديل المقارنة",
      "Start new comparison": "بدء مقارنة جديدة",
      "Download CSV": "تنزيل CSV",
      "Download PNG": "تنزيل PNG",
      "Download JPG": "تنزيل JPG",
      "Print / Save as PDF": "طباعة / حفظ بصيغة PDF",
      "Not available": "غير متاح",
      "Products": "المنتجات",
      "Assumptions": "الافتراضات",
      "Results": "النتائج",
      "Quick mode": "الوضع السريع",
      "Advanced assumptions": "افتراضات متقدمة",
      "Purchase price": "سعر الشراء",
      "Ownership period": "مدة الملكية",
      "Annual operating hours": "ساعات التشغيل السنوية",
      "Fuel price": "سعر الوقود",
      "Fuel consumption": "استهلاك الوقود",
      "Annual maintenance cost": "تكلفة الصيانة السنوية",
      "Calculate": "احسب",
      "Reset": "إعادة ضبط",
      "Save assumptions": "حفظ الافتراضات",
      "Load assumptions": "تحميل الافتراضات",
      "Total cost of ownership": "إجمالي تكلفة الملكية",
      "Cost per year": "التكلفة السنوية",
      "Cost per operating hour": "التكلفة لكل ساعة تشغيل",
      "New request": "طلب جديد",
      "Describe the required deliverable": "صِف المطلوب",
      "Request title": "عنوان الطلب",
      "Country / market": "الدولة / السوق",
      "Product scope": "نطاق المنتج",
      "Request type": "نوع الطلب",
      "Primary channel": "القناة الأساسية",
      "Communication objective": "هدف التواصل",
      "Target audience": "الجمهور المستهدف",
      "Master language": "اللغة الأساسية",
      "Target language": "اللغة المستهدفة",
      "Required timing": "الوقت المطلوب",
      "Preferred delivery date": "تاريخ التسليم المفضل",
      "Requested material / format": "المادة / التنسيق المطلوب",
      "Communication channel": "قناة التواصل",
      "Desired language": "اللغة المطلوبة",
      "Deadline": "الموعد النهائي",
      "Briefing details": "تفاصيل الموجز",
      "Must include": "يجب أن يتضمن",
      "Reference links / existing assets": "روابط مرجعية / أصول موجودة",
      "Short brief": "موجز قصير",
      "Additional notes": "ملاحظات إضافية",
      "Contact person": "جهة الاتصال",
      "Contact email": "البريد الإلكتروني",
      "Create support request": "إنشاء طلب دعم",
      "Your requests": "طلباتك",
      "Saved support requests": "طلبات الدعم المحفوظة",
      "Close": "إغلاق",
      "Copy briefing": "نسخ الموجز",
      "Status": "الحالة",
      "Region": "المنطقة",
      "All": "الكل",
      "New": "جديد",
      "Reviewed": "تمت المراجعة",
      "In progress": "قيد التنفيذ",
      "Waiting for distributor": "بانتظار الموزع",
      "Completed": "مكتمل",
      "Rejected": "مرفوض",
      "No saved items yet.": "لا توجد عناصر محفوظة بعد.",
      "Search...": "بحث..."
    }
  };

  function translatePhrase(source, language = currentLanguage()) {
    const dictionary = CORE_TRANSLATIONS[language];
    return dictionary?.[source] || source;
  }

  function translatableTextNode(node) {
    const parent = node.parentElement;
    if (!parent || !node.nodeValue.trim()) return false;
    return !parent.closest("script,style,noscript,[translate='no'],.notranslate,[data-ym-technical]");
  }

  function translateTextNode(node, language) {
    if (!translatableTextNode(node)) return;
    const source = sourceText.get(node) || node.nodeValue;
    if (!sourceText.has(node)) sourceText.set(node, source);
    const match = source.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const translated = translatePhrase(match[2], language);
    const next = `${match[1]}${translated}${match[3]}`;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  function translateAttributes(root, language) {
    const elements = root.nodeType === 1 ? [root, ...qsa("*", root)] : qsa("*", document);
    elements.forEach((element) => {
      if (element.closest("[translate='no'],.notranslate,[data-ym-technical]")) return;
      ["placeholder", "title", "aria-label"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const dataName = `ymSource${attribute.replace(/(^|-)([a-z])/g, (_all, _dash, char) => char.toUpperCase())}`;
        const source = element.dataset[dataName] || element.getAttribute(attribute);
        if (!element.dataset[dataName]) element.dataset[dataName] = source;
        element.setAttribute(attribute, translatePhrase(source, language));
      });
    });
  }

  function translateTree(root, language) {
    if (!root || translating) return;
    translating = true;
    try {
      if (root.nodeType === Node.TEXT_NODE) {
        translateTextNode(root, language);
        return;
      }
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach((textNode) => translateTextNode(textNode, language));
      translateAttributes(root, language);
    } finally {
      translating = false;
    }
  }

  function clearTranslateCookies() {
    const domains = ["", location.hostname, location.hostname ? `.${location.hostname}` : ""].filter((value, index, values) => values.indexOf(value) === index);
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    domains.filter(Boolean).forEach((domain) => {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`;
    });
  }

  function useOptionalGoogleTranslation(language) {
    if (CORE_LANGUAGES.has(language)) return Promise.resolve();
    const applySelection = () => {
      const combo = qs(".goog-te-combo");
      if (!combo) return false;
      combo.value = language;
      combo.dispatchEvent(new Event("change"));
      return true;
    };
    if (window.google?.translate) {
      if (!qs(".goog-te-combo")) {
        new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
      }
      requestAnimationFrame(applySelection);
      return Promise.resolve();
    }
    if (optionalTranslationPromise) {
      return optionalTranslationPromise
        .then(() => requestAnimationFrame(applySelection))
        .catch(() => notify("The optional translation service is unavailable. Core English, Dutch and Arabic remain available.", "warning"));
    }
    optionalTranslationPromise = new Promise((resolve, reject) => {
      window.googleTranslateElementInit = () => {
        try {
          new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "google_translate_element");
          const observer = new MutationObserver(() => {
            if (applySelection()) observer.disconnect();
          });
          observer.observe(byId("google_translate_element") || document.body, { childList: true, subtree: true });
          window.setTimeout(() => observer.disconnect(), 5000);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => reject(new Error("Optional translation service unavailable."));
      document.body.appendChild(script);
    });
    return optionalTranslationPromise.catch(() => notify("The optional translation service is unavailable. Core English, Dutch and Arabic remain available.", "warning"));
  }

  function applyCoreLanguage(language, persist = true) {
    const selected = language || "en";
    if (persist) {
      try {
        localStorage.setItem(LANGUAGE_KEY, selected);
      } catch (_error) {
        // Language remains active for the current session.
      }
    }
    document.documentElement.lang = selected === "zh-CN" ? "zh" : selected;
    document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("ym17-rtl", selected === "ar");
    const selector = byId("language-select");
    if (selector && Array.from(selector.options).some((option) => option.value === selected)) selector.value = selected;
    if (CORE_LANGUAGES.has(selected)) {
      const combo = qs(".goog-te-combo");
      if (combo) {
        combo.value = "en";
        combo.dispatchEvent(new Event("change"));
      }
      clearTranslateCookies();
      translateTree(document.body, selected);
    } else {
      translateTree(document.body, "en");
      useOptionalGoogleTranslation(selected);
    }
    ensureAdminIcon();
    applyTheme(document.documentElement.dataset.theme || "light", false);
    document.dispatchEvent(new CustomEvent("ym17:languagechange", { detail: { language: selected } }));
  }

  function installLanguageSystem() {
    const selector = byId("language-select");
    const saved = storedValue(LANGUAGE_KEY, selector?.value || "en");
    applyCoreLanguage(saved, false);
    document.addEventListener(
      "change",
      (event) => {
        if (event.target !== selector) return;
        event.stopImmediatePropagation();
        applyCoreLanguage(selector.value);
      },
      true,
    );
    translationObserver = new MutationObserver((records) => {
      if (translating) return;
      const language = currentLanguage();
      if (!CORE_LANGUAGES.has(language)) return;
      records.forEach((record) => record.addedNodes.forEach((node) => translateTree(node, language)));
    });
    translationObserver.observe(document.body, { childList: true, subtree: true });
  }

  function installBuildMarker() {
    if (byId("ym17-build-marker")) return;
    const marker = document.createElement("footer");
    marker.id = "ym17-build-marker";
    marker.className = "ym17-build-marker";
    marker.textContent = `Build ${BUILD_ID}`;
    marker.setAttribute("aria-label", `Yanmar Amplify build ${BUILD_ID}`);
    document.body.appendChild(marker);
  }

  function optimizeImages() {
    qsa("img").forEach((image) => {
      image.decoding = "async";
      if (!image.closest(".topbar,.hero,.hero-main") && !image.hasAttribute("loading")) image.loading = "lazy";
      image.addEventListener(
        "error",
        () => {
          image.hidden = true;
          image.closest(".product-card,.visual-card,.ym17-product-card")?.classList.add("ym17-image-unavailable");
        },
        { once: true },
      );
    });
  }

  function sanitizeCurrencies() {
    const additions = [
      ["EUR", "EUR (€)"],
      ["USD", "USD ($)"],
      ["AED", "AED (د.إ)"],
      ["SAR", "SAR (﷼)"],
      ["MXN", "MXN ($)"],
    ];
    qsa('select[id*="currency" i], select[name*="currency" i], select[class*="currency" i]').forEach((select) => {
      qsa("option", select).forEach((option) => {
        if (/^(BGN|TRY)$/i.test(option.value.trim()) || /bulgarian lev|turkish lira|\blira\b/i.test(option.textContent)) {
          option.remove();
        }
      });
      additions.forEach(([value, label]) => {
        if (!qsa("option", select).some((option) => option.value === value || option.textContent.includes(value))) {
          select.add(new Option(label, value));
        }
      });
    });
  }

  function cleanHome() {
    const home = byId("home");
    if (!home) return;
    home.classList.add("ym17-home-clean");
    qsa(".today-panel", home).forEach((panel) => {
      if (/activation flow/i.test(panel.textContent)) panel.remove();
    });
    qsa(".distributor-route", home).forEach((node) => node.remove());
    let host = qs(".today-panel", home);
    if (!host) {
      host = document.createElement("article");
      host.className = "today-panel";
      const firstGrid = qs(".product-grid", home);
      (firstGrid && firstGrid.parentElement ? firstGrid.parentElement : home).insertBefore(host, firstGrid || null);
    }
    host.innerHTML = `
      <div class="ym17-panel-head">
        <div>
          <p class="ym17-kicker">Quick access</p>
          <h2>Start the next distributor action</h2>
        </div>
        <span class="ym17-badge is-brand">Connected workspace</span>
      </div>
      <div class="ym17-home-actions">
        ${homeAction("calendar", "calendar", "Check pending tasks", "Review planned campaign work and deadlines.")}
        ${homeAction("visuals", "image", "Use a campaign visual", "Open the approved visual library for your category.")}
        ${homeAction("brochure-library", "download", "Download sales-ready material", "Collect brochures, specifications and sales files.")}
        ${homeAction("contribute", "share", "Submit a local example", "Share local activation proof for Yanmar review.")}
        ${homeAction("competitive-intelligence", "compare", "Build a comparison", "Create an evidence-led product comparison.")}
        ${homeAction("tco-calculator", "calculator", "Calculate ownership cost", "Compare lifecycle costs with guided inputs.")}
      </div>
    `;
  }

  function homeAction(page, iconName, title, text) {
    return `<button class="ym17-home-action" type="button" data-page="${page}">
      ${icon(iconName)}
      <span><strong>${escapeHTML(title)}</strong><small>${escapeHTML(text)}</small></span>
      <span aria-hidden="true">›</span>
    </button>`;
  }

  function installNavigationFallback() {
    document.addEventListener(
      "click",
      (event) => {
        const roleToggle = event.target.closest("#admin-toggle");
        const adminBack = event.target.closest("#admin-back-button");
        const adminTool = event.target.closest("[data-admin-tool-target]");
        const adminTarget = event.target.closest("[data-admin-target]");
        const distributorTarget = event.target.closest("[data-page]");
        if (!roleToggle && !adminBack && !adminTool && !adminTarget && !distributorTarget) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        if (roleToggle) {
          if (isAdmin()) openPortalRoute(previousDistributorPage || "home", false, false);
          else openPortalRoute("admin", true, false);
          return;
        }
        if (adminBack) {
          openPortalRoute(previousDistributorPage || "home", false, false);
          return;
        }
        if (adminTool) {
          openPortalRoute(adminTool.dataset.adminToolTarget, true, true);
          return;
        }
        if (adminTarget) {
          openPortalRoute(adminTarget.dataset.adminTarget, true, false);
          return;
        }
        if (distributorTarget?.dataset.page && byId(distributorTarget.dataset.page)) {
          openPortalRoute(distributorTarget.dataset.page, false, false);
        }
      },
      true,
    );
  }

  Object.assign(api, {
    byId,
    qs,
    qsa,
    escapeHTML,
    uid,
    readStore,
    writeStore,
    download,
    slug,
    copyText,
    notify,
    icon,
    currentDistributor,
    currentLanguage,
    isAdmin,
    track,
    setActivePage,
    openPortalRoute,
    activatePage,
    applyRole,
    ensureAdminIcon,
    applyTheme,
    applyCoreLanguage,
    translatePhrase,
  });

  function init() {
    installThemeSync();
    installAdminIconGuard();
    installNavigationFallback();
    sanitizeCurrencies();
    cleanHome();
    installLanguageSystem();
    installBuildMarker();
    optimizeImages();
    byId("distributor-select")?.addEventListener("change", () => {
      cleanHome();
      applyCoreLanguage(currentLanguage(), false);
      document.dispatchEvent(new CustomEvent("ym17:contextchange"));
    });
    document.dispatchEvent(new CustomEvent("ym17:core-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

;

/* ===== Source: ym-comparison-v17.js ===== */
(function () {
  "use strict";

  const api = window.YanmarAmplifyV17;
  if (!api) return;

  const AUTOSAVE_KEY = "yanmarAmplifyComparisonAutosaveV17";
  const DRAFTS_KEY = "yanmarAmplifyComparisonDraftsV17";
  const SOURCE_LABELS = {
    generators: "Supplied YDG specification sheet",
    pumps: "Supplied YDP specification sheet",
    engines: "Existing Yanmar L-Series product record",
  };
  const SOURCE_ASSETS = {
    generators: "assets/YDG spec sheet black background.png",
    pumps: "assets/YDP Specs.png",
    engines: "",
  };

  const CRITERIA = {
    generators: [
      ["model", "Model", true],
      ["ratedOutput", "Rated output", true],
      ["maximumOutput", "Maximum output", false],
      ["runtime75", "Runtime at 75% load", true],
      ["fuelConsumption", "Fuel consumption", true],
      ["fuelTank", "Fuel tank", true],
      ["noiseLevel", "Noise level", false],
      ["startingSystem", "Starting system", true],
      ["dryWeight", "Dry weight", false],
      ["stageV", "Stage V", true],
      ["warranty", "Warranty", false],
      ["serviceSupport", "Service support", true],
      ["price", "Price", false],
      ["application", "Typical application", true],
      ["notes", "Notes", false],
    ],
    pumps: [
      ["model", "Model", true],
      ["pumpType", "Pump type", true],
      ["portSize", "Inlet / outlet size", true],
      ["maxCapacity", "Maximum capacity", true],
      ["maxHead", "Maximum total head", true],
      ["suctionLift", "Maximum suction head", true],
      ["solidsHandling", "Solids handling", false],
      ["engineModel", "Engine model", true],
      ["startingSystem", "Starting system", true],
      ["dryWeight", "Dry weight", false],
      ["stageV", "Stage V", false],
      ["warranty", "Warranty", false],
      ["price", "Price", false],
      ["application", "Typical application", true],
      ["notes", "Notes", false],
    ],
    engines: [
      ["model", "Model", true],
      ["cylinderCount", "Cylinder count", true],
      ["displacement", "Displacement", true],
      ["ratedOutput", "Rated output", true],
      ["ratedSpeed", "Rated speed", true],
      ["cooling", "Cooling system", true],
      ["startingSystem", "Starting system", true],
      ["emissions", "Emissions", true],
      ["dryWeight", "Dry weight", false],
      ["warranty", "Warranty", false],
      ["price", "Price", false],
      ["application", "Typical application", true],
      ["notes", "Notes", false],
    ],
  };

  function missing() {
    return "Not available";
  }

  function officialSource(category) {
    return {
      documentName: SOURCE_LABELS[category],
      sourceType: "Official Yanmar product documentation",
      asset: SOURCE_ASSETS[category] || "",
    };
  }

  function productRecord({ id, category, productLine, name, image, facts }) {
    return {
      id,
      brand: "Yanmar",
      model: id,
      productLine,
      category,
      name,
      image,
      specifications: facts,
      facts,
      recommendedCriteria: recommended(category),
      source: officialSource(category),
      sourceAsset: SOURCE_ASSETS[category] || "",
    };
  }

  function sourceName(item) {
    return item?.source?.documentName || "Official Yanmar product documentation";
  }

  function generator(id, power, frequency, market, image, application, startingSystem = missing(), dimensions = missing()) {
    return productRecord({
      id,
      category: "generators",
      productLine: "YDG",
      name: `${id} diesel generator`,
      image,
      facts: {
        model: id,
        ratedOutput: power,
        maximumOutput: missing(),
        runtime75: missing(),
        fuelConsumption: missing(),
        fuelTank: missing(),
        noiseLevel: missing(),
        engineType: "Air-cooled L-Series diesel engine",
        marketNote: market,
        startingSystem,
        dryWeight: missing(),
        stageV: /stage v/i.test(market) ? "Applicable model verified as EU Stage V" : "Not available",
        warranty: missing(),
        serviceSupport: "Local Yanmar distributor service support",
        price: missing(),
        application,
        notes: dimensions !== missing() ? `Dimensions: ${dimensions}` : missing(),
      },
    });
  }

  function pump(id, type, port, head, capacity, engine, start, market) {
    return productRecord({
      id,
      category: "pumps",
      productLine: "YDP",
      name: `${id} diesel water pump`,
      image: "assets/YDP-white-background.png",
      facts: {
        model: id,
        pumpType: type,
        portSize: port,
        maxHead: head,
        maxCapacity: `${capacity} L/min`,
        engineModel: engine,
        startingSystem: start,
        suctionLift: "Up to 7 m (series-level specification)",
        solidsHandling: /trash/i.test(type) ? "Verify model-specific solids passage in the current datasheet" : "Not applicable / not available",
        dryWeight: missing(),
        stageV: /emission-regulated/i.test(market || "") ? "Emission-regulated model; verify market specification" : missing(),
        warranty: missing(),
        price: missing(),
        application:
          type === "Trash pump"
            ? "Dewatering with debris and demanding site water"
            : type === "Semi-trash pump"
              ? "Construction, drainage and semi-trash dewatering"
            : "Fresh water transfer, irrigation and general dewatering",
        notes: market || "Global / standard market record",
      },
    });
  }

  function engine(id, output, displacement, emissions, fuelSystem) {
    return productRecord({
      id,
      category: "engines",
      productLine: "L-Series",
      name: `${id} air-cooled diesel engine`,
      image: "assets/L-series-white-background.png",
      facts: {
        model: id,
        cylinderCount: missing(),
        ratedOutput: output || missing(),
        displacement: displacement || "0.435 L",
        ratedSpeed: missing(),
        cooling: "Air-cooled",
        emissions,
        startingSystem: missing(),
        dryWeight: missing(),
        warranty: missing(),
        price: missing(),
        application: "Compact industrial equipment, generators and pump applications",
        notes: fuelSystem ? `Fuel system: ${fuelSystem}` : missing(),
      },
    });
  }

  const PRODUCTS = [
    generator("YDG3700N", "3.2 kVA", "50 / 60 Hz", "Global model", "assets/YDG3700-white-background.png", "Compact portable power for construction, rental, agriculture and site support", "Electric and recoil options shown in supplied series visual; verify exact model", "720 × 578 × 480 mm (supplied series visual; verify exact model)"),
    generator("YDG3700V", "3.3 kVA", "50 Hz", "EU Stage V model", "assets/YDG3700-white-background.png", "Stage V portable power for European professional use", "Electric and recoil options shown in supplied series visual; verify exact model", "720 × 578 × 480 mm (supplied series visual; verify exact model)"),
    generator("YDG5500N", "5.1 kVA", "50 / 60 Hz", "Global model", "assets/YDG5500-white-background.png", "Professional portable power for demanding job sites and backup use"),
    generator("YDG5500V", "5.1 kVA", "50 Hz", "EU Stage V model", "assets/YDG5500-white-background.png", "Higher-output Stage V portable power for European use"),
    pump("YDP20N", "Fresh water pump", "2 in / 50 mm", "32 m", "550", "L48N6-PY", "Recoil"),
    pump("YDP20N-E", "Fresh water pump", "2 in / 50 mm", "32 m", "550", "L48N6-PEY", "Electric"),
    pump("YDP30N", "Fresh water pump", "3 in / 80 mm", "28 m", "900", "L48N6-PY", "Recoil"),
    pump("YDP30N-E", "Fresh water pump", "3 in / 80 mm", "28 m", "900", "L48N6-PEY", "Electric"),
    pump("YDP40N", "Fresh water pump", "4 in / 100 mm", "26.5 m", "1300", "L70N6-PY", "Recoil"),
    pump("YDP40N-E", "Fresh water pump", "4 in / 100 mm", "26.5 m", "1300", "L70N6-PEY", "Electric"),
    pump("YDP20STN", "Semi-trash pump", "2 in / 50 mm", "22.5 m", "550", "L48N6-PYST", "Recoil"),
    pump("YDP20STN-E", "Semi-trash pump", "2 in / 50 mm", "22.5 m", "550", "L48N6-PEYST", "Electric"),
    pump("YDP30STN", "Semi-trash pump", "3 in / 80 mm", "23 m", "850", "L48N6-PYST", "Recoil"),
    pump("YDP30STN-E", "Semi-trash pump", "3 in / 80 mm", "23 m", "850", "L48N6-PEYST", "Electric"),
    pump("YDP40STN", "Semi-trash pump", "4 in / 100 mm", "25 m", "1300", "L70N6-PY", "Recoil"),
    pump("YDP40STN-E", "Semi-trash pump", "4 in / 100 mm", "25 m", "1300", "L70N6-PEY", "Electric"),
    pump("YDP20TN", "Trash pump", "2 in / 50 mm", "24 m", "550", "L48N6-PY", "Recoil"),
    pump("YDP20TN-E", "Trash pump", "2 in / 50 mm", "24 m", "550", "L48N6-PEY", "Electric"),
    pump("YDP30TN", "Trash pump", "3 in / 80 mm", "27 m", "1150", "L70N6-PY", "Recoil"),
    pump("YDP30TN-E", "Trash pump", "3 in / 80 mm", "27 m", "1150", "L70N6-PEY", "Electric"),
    pump("YDP40TN", "Trash pump", "4 in / 100 mm", "25 m", "1750", "L100N6-PYT", "Recoil"),
    pump("YDP40TN-E", "Trash pump", "4 in / 100 mm", "25 m", "1750", "L100N6-PEYT", "Electric"),
    pump("YDP20V", "Fresh water pump", "2 in / 50 mm", "32 m", "550", "L70V6-PY", "Recoil", "Emission-regulated market"),
    pump("YDP30V", "Fresh water pump", "3 in / 80 mm", "28 m", "920", "L70V6-PY", "Recoil", "Emission-regulated market"),
    pump("YDP40V", "Fresh water pump", "4 in / 100 mm", "26.5 m", "1300", "L70V6-PYT", "Recoil", "Emission-regulated market"),
    pump("YDP30TV", "Trash pump", "3 in / 80 mm", "27 m", "1150", "L70V6-PYT", "Recoil", "Emission-regulated market"),
    pump("YDP40TV", "Trash pump", "4 in / 100 mm", "24 m", "1700", "L100V6-PYT", "Recoil", "Emission-regulated market"),
    pump("YDP40TV-E", "Trash pump", "4 in / 100 mm", "24 m", "1700", "L100V6-PEYT", "Electric", "Emission-regulated market"),
    engine("L100V", "6.8 kW", "0.435 L", "EU Stage V", missing()),
    engine("L100N", missing(), "0.435 L", "Global / lower-regulated markets", "Direct injection"),
  ];

  function createCompetitor(index) {
    return {
      id: api.uid("competitor"),
      brand: "",
      model: "",
      name: "",
      sourceUrl: "",
      sourceNote: "",
      sourceMarket: "Global / unknown",
      imageUrl: "",
      values: {},
    };
  }

  function recommended(category) {
    return CRITERIA[category].filter((item) => item[2]).map((item) => item[0]);
  }

  function newState() {
    return {
      version: 17,
      category: "generators",
      productId: "YDG5500V",
      title: "Professional portable equipment comparison",
      market: "Europe",
      useCase: "Construction and professional use",
      language: "English",
      currency: "EUR",
      customerName: "",
      distributorName: api.currentDistributor(),
      selectedCriteria: recommended("generators"),
      yanmarOverrides: {},
      customCriteria: [],
      competitors: [createCompetitor(0)],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  function normalizeState(raw) {
    const base = newState();
    if (!raw || raw.version !== 17) return base;
    const category = CRITERIA[raw.category] ? raw.category : base.category;
    const products = PRODUCTS.filter((product) => product.category === category);
    return {
      ...base,
      ...raw,
      category,
      productId: products.some((product) => product.id === raw.productId) ? raw.productId : products[0].id,
      selectedCriteria: Array.isArray(raw.selectedCriteria)
        ? raw.selectedCriteria.filter((key) => CRITERIA[category].some((item) => item[0] === key) || (raw.customCriteria || []).some((item) => item.id === key))
        : recommended(category),
      yanmarOverrides:
        raw.yanmarOverrides && typeof raw.yanmarOverrides === "object"
          ? Object.fromEntries(
              Object.entries(raw.yanmarOverrides)
                .slice(0, 40)
                .filter(([key]) => CRITERIA[category].some((item) => item[0] === key))
                .map(([key, value]) => [key, String(value || "")]),
            )
          : {},
      customCriteria: Array.isArray(raw.customCriteria)
        ? raw.customCriteria.slice(0, 20).map((item) => ({ id: item.id || api.uid("criterion"), label: item.label || "Custom specification", unit: item.unit || "", yanmarValue: item.yanmarValue || "" }))
        : [],
      competitors:
        Array.isArray(raw.competitors) && raw.competitors.length
          ? raw.competitors.slice(0, 4).map((competitor, index) => ({
              ...createCompetitor(index),
              ...competitor,
              id: competitor.id || api.uid("competitor"),
              brand: competitor.brand || "",
              model: competitor.model || competitor.name || "",
              values: competitor.values || {},
            }))
          : [createCompetitor(0)],
    };
  }

  let state = normalizeState(api.readStore(AUTOSAVE_KEY, null));
  let root = null;
  let saveTimer = 0;
  let activeStep = 1;
  let exportBusy = false;

  function product() {
    return PRODUCTS.find((item) => item.id === state.productId) || PRODUCTS.find((item) => item.category === state.category);
  }

  function criteria() {
    return [
      ...CRITERIA[state.category],
      ...state.customCriteria.map((item) => [item.id, item.label, false, item.unit, true]),
    ];
  }

  function exportCriteria() {
    const competitors = activeCompetitors();
    return criteria().filter(([key, label, _recommended, _unit, isCustom]) => {
      if (!state.selectedCriteria.includes(key) || !String(label || "").trim()) return false;
      if (!isCustom) return true;
      const custom = state.customCriteria.find((item) => item.id === key);
      return Boolean(custom?.yanmarValue || competitors.some((competitor) => String(competitor.values[key] || "").trim()));
    });
  }

  function competitorLabel(competitor, fallback = "Competitor") {
    return [competitor.brand, competitor.model].filter(Boolean).join(" ").trim() || competitor.name || fallback;
  }

  function officialValue(key) {
    const custom = state.customCriteria.find((item) => item.id === key);
    if (custom) return custom.yanmarValue || missing();
    if (state.yanmarOverrides && Object.prototype.hasOwnProperty.call(state.yanmarOverrides, key)) {
      const override = String(state.yanmarOverrides[key] || "").trim();
      if (override) return override;
    }
    return product().facts[key] || missing();
  }

  function officialPresetValue(key) {
    const custom = state.customCriteria.find((item) => item.id === key);
    if (custom) return custom.yanmarValue || missing();
    return product().facts[key] || missing();
  }

  function isLocalOverride(key) {
    return Boolean(
      state.yanmarOverrides &&
        Object.prototype.hasOwnProperty.call(state.yanmarOverrides, key) &&
        String(state.yanmarOverrides[key] || "").trim(),
    );
  }

  function hasEnteredCompetitorData(competitor) {
    return Boolean(competitor.brand || competitor.model || competitor.sourceUrl || competitor.sourceNote || competitor.imageUrl || Object.values(competitor.values || {}).some(Boolean));
  }

  function hasEnteredData() {
    return (
      state.customerName ||
      Object.values(state.yanmarOverrides || {}).some((value) => String(value || "").trim()) ||
      state.competitors.some(hasEnteredCompetitorData)
    );
  }

  function activeCompetitors() {
    return state.competitors.filter(hasEnteredCompetitorData);
  }

  function categoryLabel(category) {
    return { generators: "Generators", pumps: "Water pumps", engines: "Engines" }[category] || category;
  }

  function comparisonTitle() {
    return { generators: "Generator Product Comparison", pumps: "Water Pump Product Comparison", engines: "Engine Product Comparison" }[state.category] || "Product Comparison Builder";
  }

  function autosave() {
    state.updatedAt = new Date().toISOString();
    clearTimeout(saveTimer);
    api.writeStore(AUTOSAVE_KEY, state);
  }

  function validate() {
    const errors = [];
    const warnings = [];
    const active = activeCompetitors();
    if (!state.selectedCriteria.length) errors.push("Select at least one comparison point.");
    if (!active.length) errors.push("Add the brand and model of at least one competitor.");
    active.forEach((competitor, index) => {
      if (!competitor.brand.trim()) errors.push(`Enter a brand for competitor ${index + 1}.`);
      if (!competitor.model.trim()) errors.push(`Enter a model for competitor ${index + 1}.`);
      const missingValues = state.selectedCriteria.filter((key) => !String(competitor.values[key] || "").trim());
      if (missingValues.length) warnings.push(`${competitorLabel(competitor, `Competitor ${index + 1}`)}: ${missingValues.length} selected value(s) still need evidence.`);
    });
    return { errors, warnings };
  }

  function layout() {
    return `
      <div class="ym17-shell ym17-comparison-shell" data-ym17-comparison data-ym17-comparison-app data-cmp-current-step="${activeStep}">
        <header class="ym17-header">
          <div>
            <p class="ym17-kicker">Buyer enablement</p>
            <h1>Comparison Sheet Builder</h1>
            <p class="ym17-subtitle">Choose a Yanmar product, add up to four alternatives and enter only the evidence you want to compare. Official Yanmar presets autofill first and can be locally overridden for this sheet only.</p>
          </div>
          <div class="ym17-progress" aria-label="Comparison workflow">
            <button class="ym17-step ${activeStep === 1 ? "is-active" : ""}" type="button" data-cmp-action="go-step" data-step="1"><span class="ym17-step-number">1</span><span>Category</span></button>
            <button class="ym17-step ${activeStep === 2 ? "is-active" : ""}" type="button" data-cmp-action="go-step" data-step="2"><span class="ym17-step-number">2</span><span>Yanmar product</span></button>
            <button class="ym17-step ${activeStep === 3 ? "is-active" : ""}" type="button" data-cmp-action="go-step" data-step="3"><span class="ym17-step-number">3</span><span>Alternatives</span></button>
            <button class="ym17-step ${activeStep === 4 ? "is-active" : ""}" type="button" data-cmp-action="go-step" data-step="4"><span class="ym17-step-number">4</span><span>Review & export</span></button>
          </div>
        </header>

        <section class="ym17-panel ym17-cmp-panel" data-cmp-panel="1" aria-labelledby="ym17-category-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">Step 1</p><h2 id="ym17-category-title">Choose a product category</h2></div>
            <div class="ym17-inline-actions"><span class="ym17-badge is-brand">Changes saved automatically</span><button class="ym17-button is-secondary" type="button" data-cmp-action="reset">Start new comparison</button></div>
          </div>
          <div class="ym17-field">
            <label for="ym17-cmp-category">Product category</label>
            <select id="ym17-cmp-category" data-cmp-bind="category">${categoryOptions()}</select>
          </div>
          <div class="ym17-wizard-actions"><span class="ym17-help">The next step loads verified Yanmar product data automatically.</span><button class="ym17-button" type="button" data-cmp-action="next">Choose Yanmar product</button></div>
        </section>

        <section class="ym17-panel ym17-cmp-panel" data-cmp-panel="2" aria-labelledby="ym17-product-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">Step 2</p><h2 id="ym17-product-title">${comparisonTitle()}</h2></div>
            <div class="ym17-inline-actions"><span class="ym17-badge is-brand">Verified Yanmar presets</span><button class="ym17-button is-secondary" type="button" data-cmp-action="reset-yanmar-product">Reset Yanmar values</button></div>
          </div>
          <div class="ym17-grid">
            <div class="ym17-field ym17-col-4"><label for="ym17-cmp-product">Yanmar product</label><select id="ym17-cmp-product" data-cmp-bind="productId">${productOptions()}</select></div>
            <div class="ym17-col-8">${productCard()}</div>
          </div>
          <details class="ym17-advanced" style="margin-top:14px">
            <summary>Sheet details and market context</summary>
            <div class="ym17-grid" style="margin-top:14px">
              <div class="ym17-field ym17-col-12"><label for="ym17-cmp-title">Sheet title</label><input id="ym17-cmp-title" data-cmp-bind="title" value="${api.escapeHTML(state.title)}"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-customer">Customer / project (optional)</label><input id="ym17-cmp-customer" data-cmp-bind="customerName" value="${api.escapeHTML(state.customerName)}" placeholder="Customer, dealer or project name"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-distributor">Distributor</label><input id="ym17-cmp-distributor" value="${api.escapeHTML(state.distributorName || api.currentDistributor())}" readonly></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-market">Market</label><select id="ym17-cmp-market" data-cmp-bind="market">${options(["Europe","Middle East","Africa","North America","Central America / Caribbean","South America","Asia Pacific","Oceania"],state.market)}</select></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-usecase">Primary use case</label><input id="ym17-cmp-usecase" data-cmp-bind="useCase" value="${api.escapeHTML(state.useCase)}"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-language">Output language</label><select id="ym17-cmp-language" data-cmp-bind="language">${options(["English","Dutch","German","French","Spanish","Polish","Italian","Portuguese","Arabic","Japanese","Korean","Thai"],state.language)}</select></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-cmp-currency">Currency</label><select id="ym17-cmp-currency" data-cmp-bind="currency">${options(["EUR","USD","AED","SAR","MXN"],state.currency)}</select></div>
            </div>
          </details>
          <div class="ym17-wizard-actions"><button class="ym17-button is-secondary" type="button" data-cmp-action="back">Back</button><button class="ym17-button" type="button" data-cmp-action="next">Add alternatives</button></div>
        </section>

        <section class="ym17-panel ym17-cmp-panel" data-cmp-panel="3" aria-labelledby="ym17-competitors-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">Step 3</p><h2 id="ym17-competitors-title">Add competitor products</h2></div>
            <button class="ym17-button is-secondary" type="button" data-cmp-action="add" ${state.competitors.length >= 4 ? "disabled" : ""}>${api.icon("plus")} Add competitor</button>
          </div>
          <p class="ym17-help">Brand and model are the only required identity fields. Each competitor is saved independently; optional sources and images stay inside that competitor card.</p>
          <div class="ym17-competitor-list">${state.competitors.map(competitorCard).join("")}</div>
          <div class="ym17-panel-head" style="margin-top:18px">
            <div><p class="ym17-kicker">Comparison points</p><h3>Select the facts to include</h3></div>
            <div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-cmp-action="recommended">Recommended</button><button class="ym17-button is-secondary" type="button" data-cmp-action="all">Select all</button></div>
          </div>
          <div class="ym17-alert">Yanmar preset values come from the supplied product records. You may edit them for this local sheet only; changed values are marked as “Local override” and can be reset.</div>
          <div class="ym17-criteria" style="margin-top:14px">${criteriaChecks()}</div>
          ${advancedCriteriaMarkup()}
          <details open class="ym17-advanced" style="margin-top:14px">
            <summary>Enter competitor values</summary>
            <div class="ym17-table-scroll" style="margin-top:12px">${evidenceTable()}</div>
          </details>
          <div class="ym17-wizard-actions"><button class="ym17-button is-secondary" type="button" data-cmp-action="back">Back</button><button class="ym17-button" type="button" data-cmp-action="next">Review comparison</button></div>
        </section>

        <section class="ym17-panel ym17-cmp-panel" data-cmp-panel="4" aria-labelledby="ym17-preview-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">Step 4</p><h2 id="ym17-preview-title">Review and export</h2></div>
            <div class="ym17-inline-actions">
              <button class="ym17-button" type="button" data-cmp-action="print">${api.icon("print")} Print / Save as PDF</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="html">Download self-contained HTML</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="csv">Download CSV</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="edit">Edit comparison</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="reset">Start new comparison</button>
            </div>
          </div>
          <p class="ym17-help">The preview updates automatically. HTML and print exports include available product images; CSV contains image references rather than image binary data.</p>
          <details class="ym17-advanced" style="margin:12px 0 16px">
            <summary>More save and sharing options</summary>
            <div class="ym17-inline-actions" style="margin-top:12px">
              <button class="ym17-button is-secondary" type="button" data-cmp-action="save">Save draft</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="png">Download PNG</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="jpg">Download JPG</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="share">${api.icon("share")} Share / copy</button>
              <button class="ym17-button is-secondary" type="button" data-cmp-action="email">${api.icon("mail")} Share by email</button>
            </div>
          </details>
          <div id="ym17-cmp-validation" aria-live="polite"></div>
          <div class="ym17-preview-wrap" id="ym17-cmp-preview"></div>
          <div class="ym17-wizard-actions"><button class="ym17-button is-secondary" type="button" data-cmp-action="back">Back to alternatives</button></div>
        </section>

        <section class="ym17-panel ym17-cmp-panel" data-cmp-panel="4" aria-labelledby="ym17-drafts-title">
          <div class="ym17-panel-head"><div><p class="ym17-kicker">Saved work</p><h2 id="ym17-drafts-title">Comparison drafts</h2></div><span class="ym17-badge">${drafts().length} saved</span></div>
          <div class="ym17-drafts" id="ym17-cmp-drafts">${draftsMarkup()}</div>
        </section>
      </div>
    `;
  }

  function options(values, current) {
    return values.map((value) => `<option value="${api.escapeHTML(value)}" ${value === current ? "selected" : ""}>${api.escapeHTML(value)}</option>`).join("");
  }

  function categoryOptions() {
    return Object.keys(CRITERIA).map((value) => `<option value="${value}" ${value === state.category ? "selected" : ""}>${categoryLabel(value)}</option>`).join("");
  }

  function productOptions() {
    return PRODUCTS.filter((item) => item.category === state.category)
      .map((item) => `<option value="${item.id}" ${item.id === state.productId ? "selected" : ""}>${api.escapeHTML(item.id)}</option>`)
      .join("");
  }

  function productCard() {
    const item = product();
    return `<article class="ym17-product-card">
                <img src="${api.escapeHTML(item.image)}" alt="${api.escapeHTML(item.name)}" loading="lazy" decoding="async">
      <div><span class="ym17-badge is-brand">Official Yanmar product data</span><h3>${api.escapeHTML(item.name)}</h3><p class="ym17-help">Source: ${api.escapeHTML(sourceName(item))}</p>${item.sourceAsset ? `<a href="${api.escapeHTML(item.sourceAsset)}" target="_blank" rel="noreferrer">Open supplied specification source</a>` : ""}</div>
    </article>`;
  }

  function competitorCard(competitor, index) {
    return `<article class="ym17-competitor" data-competitor="${competitor.id}">
      <div class="ym17-competitor-fields">
        <div class="ym17-field"><label for="ym17-brand-${competitor.id}">Competitor ${index + 1} brand</label><input id="ym17-brand-${competitor.id}" data-competitor-field="brand" data-id="${competitor.id}" value="${api.escapeHTML(competitor.brand)}" placeholder="Brand"></div>
        <div class="ym17-field"><label for="ym17-model-${competitor.id}">Competitor ${index + 1} model</label><input id="ym17-model-${competitor.id}" data-competitor-field="model" data-id="${competitor.id}" value="${api.escapeHTML(competitor.model)}" placeholder="Model"></div>
        <details class="ym17-advanced ym17-competitor-more">
          <summary>Show additional specifications</summary>
          <div class="ym17-grid" style="margin-top:12px">
            <div class="ym17-field ym17-col-6"><label for="ym17-market-${competitor.id}">Source market</label><select id="ym17-market-${competitor.id}" data-competitor-field="sourceMarket" data-id="${competitor.id}">${options(["Global / unknown","Europe","Middle East","Africa","North America","Central America / Caribbean","South America","Asia Pacific","Oceania"],competitor.sourceMarket)}</select></div>
            <div class="ym17-field ym17-col-6"><label for="ym17-source-${competitor.id}">Official source URL (optional)</label><input id="ym17-source-${competitor.id}" data-competitor-field="sourceUrl" data-id="${competitor.id}" value="${api.escapeHTML(competitor.sourceUrl)}" placeholder="https://manufacturer.com/model"></div>
            <div class="ym17-field ym17-col-12"><label for="ym17-source-note-${competitor.id}">Source or verification note (optional)</label><textarea id="ym17-source-note-${competitor.id}" data-competitor-field="sourceNote" data-id="${competitor.id}" rows="2" placeholder="Datasheet name, measurement condition or a fact that still needs verification">${api.escapeHTML(competitor.sourceNote || "")}</textarea></div>
            <div class="ym17-field ym17-col-6"><label for="ym17-image-${competitor.id}">Product image URL (optional)</label><input id="ym17-image-${competitor.id}" data-competitor-field="imageUrl" data-id="${competitor.id}" value="${api.escapeHTML(competitor.imageUrl)}" placeholder="Optional image URL"></div>
            <div class="ym17-field ym17-col-6"><label for="ym17-image-file-${competitor.id}">Or upload product image</label><input id="ym17-image-file-${competitor.id}" type="file" accept="image/png,image/jpeg,image/webp" data-competitor-image data-id="${competitor.id}"><span class="ym17-help">Stored only in this browser draft.</span></div>
          </div>
        </details>
      </div>
      <div class="ym17-inline-actions">
        <button class="ym17-icon-button is-secondary" type="button" data-cmp-action="competitor-up" data-id="${competitor.id}" aria-label="Move competitor ${index + 1} left" title="Move left" ${index === 0 ? "disabled" : ""}>←</button>
        <button class="ym17-icon-button is-secondary" type="button" data-cmp-action="competitor-down" data-id="${competitor.id}" aria-label="Move competitor ${index + 1} right" title="Move right" ${index === state.competitors.length - 1 ? "disabled" : ""}>→</button>
        <button class="ym17-icon-button is-secondary" type="button" data-cmp-action="duplicate" data-id="${competitor.id}" aria-label="Duplicate ${api.escapeHTML(competitorLabel(competitor, `competitor ${index + 1}`))}" title="Duplicate competitor">${api.icon("copy")}</button>
        <button class="ym17-icon-button is-danger" type="button" data-cmp-action="remove" data-id="${competitor.id}" aria-label="Remove ${api.escapeHTML(competitorLabel(competitor, `competitor ${index + 1}`))}" title="Remove competitor" ${state.competitors.length === 1 ? "disabled" : ""}>${api.icon("close")}</button>
      </div>
    </article>`;
  }

  function criteriaChecks() {
    return criteria().map(([key, label, isRecommended, unit, isCustom]) => `<label class="ym17-check">
      <input type="checkbox" data-criterion="${key}" ${state.selectedCriteria.includes(key) ? "checked" : ""}>
      <span>${api.escapeHTML(label)}${unit ? ` <small>(${api.escapeHTML(unit)})</small>` : ""}${isRecommended ? ' <small class="ym17-badge is-brand">Recommended</small>' : ""}${isCustom ? ' <small class="ym17-badge">Manually added</small>' : ""}</span>
    </label>`).join("");
  }

  function advancedCriteriaMarkup() {
    return `<details class="ym17-advanced" style="margin-top:14px">
      <summary>Advanced comparison options</summary>
      <div class="ym17-alert" style="margin-top:12px">Add a criterion only when you have a verified value. A custom Yanmar value is marked as manually added and never changes the official product record.</div>
      <div class="ym17-inline-actions" style="margin-top:12px"><button class="ym17-button is-secondary" type="button" data-cmp-action="custom-add">${api.icon("plus")} Add specification</button><button class="ym17-button is-secondary" type="button" data-cmp-action="recommended">Restore recommended criteria</button></div>
      <div class="ym17-custom-criteria" style="margin-top:12px">${state.customCriteria.length ? state.customCriteria.map((item, index) => `<article class="ym17-card" data-custom-criterion="${item.id}" style="padding:12px">
        <div class="ym17-grid">
          <div class="ym17-field ym17-col-4"><label for="ym17-custom-label-${item.id}">Specification name</label><input id="ym17-custom-label-${item.id}" data-custom-field="label" data-id="${item.id}" value="${api.escapeHTML(item.label)}"></div>
          <div class="ym17-field ym17-col-3"><label for="ym17-custom-unit-${item.id}">Unit (optional)</label><input id="ym17-custom-unit-${item.id}" data-custom-field="unit" data-id="${item.id}" value="${api.escapeHTML(item.unit)}"></div>
          <div class="ym17-field ym17-col-5"><label for="ym17-custom-yanmar-${item.id}">Yanmar value (optional)</label><input id="ym17-custom-yanmar-${item.id}" data-custom-field="yanmarValue" data-id="${item.id}" value="${api.escapeHTML(item.yanmarValue)}" placeholder="Manually added, verified value"></div>
        </div>
        <div class="ym17-inline-actions" style="margin-top:10px"><button class="ym17-button is-secondary" type="button" data-cmp-action="custom-up" data-id="${item.id}" ${index === 0 ? "disabled" : ""}>Move up</button><button class="ym17-button is-secondary" type="button" data-cmp-action="custom-down" data-id="${item.id}" ${index === state.customCriteria.length - 1 ? "disabled" : ""}>Move down</button><button class="ym17-button is-danger" type="button" data-cmp-action="custom-remove" data-id="${item.id}">Remove field</button></div>
      </article>`).join("") : '<p class="ym17-help">No custom specifications added.</p>'}</div>
    </details>`;
  }

  function evidenceTable() {
    const item = product();
    const selected = criteria().filter(([key]) => state.selectedCriteria.includes(key));
    if (!selected.length) return '<div class="ym17-empty" style="padding:18px">Select at least one comparison point.</div>';
    return `<table class="ym17-evidence-table">
      <thead><tr><th scope="col">Comparison point</th><th scope="col">${api.escapeHTML(item.id)} <span class="ym17-badge is-brand">Yanmar</span></th>${state.competitors.map((competitor, index) => `<th scope="col">${api.escapeHTML(competitorLabel(competitor, `Competitor ${index + 1}`))}</th>`).join("")}</tr></thead>
      <tbody>${selected.map(([key, label, _recommended, unit, isCustom]) => `<tr>
        <th scope="row">${api.escapeHTML(label)}</th>
        <td class="ym17-yanmar-local-cell">
          <input aria-label="${api.escapeHTML(label)} for Yanmar ${api.escapeHTML(item.id)}" data-yanmar-value-key="${key}" value="${api.escapeHTML(isLocalOverride(key) ? state.yanmarOverrides[key] : officialPresetValue(key))}" placeholder="${api.escapeHTML(officialPresetValue(key))}">
          <div class="ym17-help">Preset: ${api.escapeHTML(officialPresetValue(key))}${unit && officialPresetValue(key) !== missing() ? ` ${api.escapeHTML(unit)}` : ""}${isLocalOverride(key) ? ' <span class="ym17-badge is-warning">Local override</span>' : ""}${isCustom ? ' <span class="ym17-badge">Manually added</span>' : ""}</div>
          <button class="ym17-mini-reset" type="button" data-cmp-action="reset-yanmar-field" data-key="${key}" ${isLocalOverride(key) ? "" : "disabled"}>Reset field</button>
        </td>
        ${state.competitors.map((competitor) => `<td><input aria-label="${api.escapeHTML(label)} for ${api.escapeHTML(competitorLabel(competitor, "competitor"))}" data-value-key="${key}" data-id="${competitor.id}" value="${api.escapeHTML(competitor.values[key] || "")}" placeholder="Value${unit ? ` (${api.escapeHTML(unit)})` : ""}; or Not available"></td>`).join("")}
      </tr>`).join("")}</tbody>
    </table>`;
  }

  function previewMarkup(imageOverrides = null) {
    const item = product();
    const selected = exportCriteria();
    const competitors = activeCompetitors();
    const productColumns = 1 + competitors.length;
    const imageFor = (key, fallback) =>
      imageOverrides && Object.prototype.hasOwnProperty.call(imageOverrides, key)
        ? imageOverrides[key]
        : fallback;
    const sourceNotes = competitors
      .filter((competitor) => String(competitor.sourceNote || "").trim())
      .map((competitor) => `${competitorLabel(competitor, "Competitor")}: ${competitor.sourceNote}`);
    return `<article class="ym17-export-sheet" style="--ym17-columns:${productColumns}" data-ym17-export-sheet>
      <header class="ym17-export-head">
        <div><p class="ym17-kicker">Yanmar Amplify comparison</p><h2>${api.escapeHTML(state.title)}</h2><p>${api.escapeHTML(categoryLabel(state.category))} · ${api.escapeHTML(state.useCase)} · ${api.escapeHTML(state.market)} · ${new Date().toLocaleDateString()}${state.customerName ? ` · ${api.escapeHTML(state.customerName)}` : ""}</p></div>
        <div class="ym17-export-logo">YANMAR</div>
      </header>
      <div class="ym17-export-products">
        ${exportProduct(item.name, imageFor("yanmar", item.image), "Yanmar reference", true)}
        ${competitors.map((competitor) => exportProduct(competitorLabel(competitor, "Unnamed competitor"), imageFor(competitor.id, competitor.imageUrl), competitor.sourceMarket, false)).join("")}
      </div>
      <table class="ym17-export-table">
        <thead><tr><th>Comparison point</th><th>${api.escapeHTML(item.id)}</th>${competitors.map((competitor, index) => `<th>${api.escapeHTML(competitorLabel(competitor, `Competitor ${index + 1}`))}</th>`).join("")}</tr></thead>
        <tbody>${selected.map(([key, label, _recommended, unit, isCustom]) => `<tr><th>${api.escapeHTML(label)}${unit ? ` (${api.escapeHTML(unit)})` : ""}</th><td class="is-yanmar">${api.escapeHTML(officialValue(key))}${isLocalOverride(key) ? '<br><small>Local override</small>' : ""}${isCustom ? '<br><small>Manually added</small>' : ""}</td>${competitors.map((competitor) => `<td>${api.escapeHTML(competitor.values[key] || "Not available")}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
      <footer class="ym17-export-foot">
        <div><strong>Sources</strong><p>Yanmar: ${api.escapeHTML(sourceName(item))}. ${competitors.map((competitor) => api.escapeHTML(competitor.sourceUrl || `${competitorLabel(competitor, "Competitor")}: source not recorded`)).join(" · ")}</p></div>
        ${sourceNotes.length ? `<div><strong>Source notes</strong><p>${api.escapeHTML(sourceNotes.join(" · "))}</p></div>` : ""}
        <div><strong>Evidence note</strong><p>Verify measurement standards, market configuration and current datasheets before external publication. Missing competitor facts are not treated as disadvantages.</p></div>
      </footer>
    </article>`;
  }

  function exportProduct(name, imageUrl, note, yanmar) {
    return `<section class="ym17-export-product ${yanmar ? "is-yanmar" : ""}">
      ${imageUrl ? `<img src="${api.escapeHTML(imageUrl)}" alt="${api.escapeHTML(name)}" crossorigin="anonymous" loading="lazy" decoding="async">` : '<div class="ym17-export-placeholder">Image not available</div>'}
      <h3>${api.escapeHTML(name)}</h3><p>${api.escapeHTML(note)}</p>
    </section>`;
  }

  function renderPreview() {
    if (!root) return;
    const validation = validate();
    const validationHost = api.byId("ym17-cmp-validation");
    if (validationHost) {
      validationHost.innerHTML = [
        ...validation.errors.map((text) => `<div class="ym17-alert is-danger">${api.escapeHTML(text)}</div>`),
        ...validation.warnings.map((text) => `<div class="ym17-alert is-warning">${api.escapeHTML(text)}</div>`),
      ].join("");
    }
    const preview = api.byId("ym17-cmp-preview");
    if (preview) preview.innerHTML = previewMarkup();
  }

  function drafts() {
    return api.readStore(DRAFTS_KEY, []);
  }

  function draftsMarkup() {
    const items = drafts();
    if (!items.length) return '<div class="ym17-empty" style="padding:16px">No saved drafts yet. Your current work is still autosaved.</div>';
    return items.map((draft) => `<article class="ym17-draft">
      <div><strong>${api.escapeHTML(draft.title || "Comparison draft")}</strong><span class="ym17-help">${api.escapeHTML(draft.productId)} · ${draft.competitors.length} competitor(s) · ${new Date(draft.savedAt).toLocaleString()}</span></div>
      <div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-cmp-action="open-draft" data-id="${draft.id}">Open</button><button class="ym17-icon-button is-danger" type="button" data-cmp-action="delete-draft" data-id="${draft.id}" aria-label="Delete draft">${api.icon("close")}</button></div>
    </article>`).join("");
  }

  function rerender() {
    root.innerHTML = layout();
    renderPreview();
  }

  function updateStateFromField(target) {
    const binding = target.dataset.cmpBind;
    if (binding) {
      if (binding === "category") {
        if (hasEnteredData() && !window.confirm("Changing the product category resets competitor specification values. Continue?")) {
          target.value = state.category;
          return true;
        }
        state.category = target.value;
        state.productId = PRODUCTS.find((item) => item.category === state.category).id;
        state.selectedCriteria = recommended(state.category);
        state.yanmarOverrides = {};
        state.customCriteria = [];
        state.competitors.forEach((competitor) => {
          competitor.values = {};
        });
        rerender();
      } else if (binding === "productId") {
        if (hasEnteredData() && !window.confirm("Changing the Yanmar product loads a different official specification record. Competitor values will be kept. Continue?")) {
          target.value = state.productId;
          return true;
        }
        state.productId = target.value;
        state.yanmarOverrides = {};
        rerender();
      } else {
        state[binding] = target.value;
        renderPreview();
      }
      autosave();
      return true;
    }
    if (target.dataset.customField) {
      const criterion = state.customCriteria.find((item) => item.id === target.dataset.id);
      if (criterion) criterion[target.dataset.customField] = target.value;
      autosave();
      renderPreview();
      return true;
    }
    if (target.dataset.competitorField) {
      const competitor = state.competitors.find((item) => item.id === target.dataset.id);
      if (competitor) competitor[target.dataset.competitorField] = target.value;
      autosave();
      renderPreview();
      return true;
    }
    if (target.dataset.valueKey) {
      const competitor = state.competitors.find((item) => item.id === target.dataset.id);
      if (competitor) competitor.values[target.dataset.valueKey] = target.value;
      autosave();
      renderPreview();
      return true;
    }
    if (target.dataset.yanmarValueKey) {
      const key = target.dataset.yanmarValueKey;
      const value = String(target.value || "").trim();
      const preset = officialPresetValue(key);
      state.yanmarOverrides = state.yanmarOverrides || {};
      if (!value || value === preset) delete state.yanmarOverrides[key];
      else state.yanmarOverrides[key] = value;
      autosave();
      renderPreview();
      return true;
    }
    if (target.dataset.criterion) {
      const key = target.dataset.criterion;
      state.selectedCriteria = target.checked
        ? Array.from(new Set([...state.selectedCriteria, key]))
        : state.selectedCriteria.filter((item) => item !== key);
      autosave();
      rerender();
      return true;
    }
    return false;
  }

  function readCompetitorImage(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp)$/i.test(file.type) || file.size > 8 * 1024 * 1024) {
      input.value = "";
      return api.notify("Use a PNG, JPG or WebP image smaller than 8 MB. Large images are resized in this browser before export.", "danger");
    }
    const reader = new FileReader();
    reader.onload = async () => {
      const competitor = state.competitors.find((item) => item.id === input.dataset.id);
      if (!competitor) return;
      competitor.imageUrl = await resizeImageDataUrl(String(reader.result || ""), file.type);
      autosave();
      rerender();
      api.notify("Competitor image added to this browser draft.");
    };
    reader.onerror = () => api.notify("The image could not be read.", "danger");
    reader.readAsDataURL(file);
  }

  async function resizeImageDataUrl(dataUrl, mimeType) {
    if (!dataUrl) return "";
    const image = await loadImage(dataUrl);
    if (!image) return dataUrl;
    const maxDimension = 1100;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
    if (scale >= 1) return dataUrl;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
    canvas.height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
    const context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL(/^image\/webp$/i.test(mimeType) ? "image/webp" : "image/jpeg", 0.88);
  }

  function addCompetitor() {
    if (state.competitors.length >= 4) return api.notify("A comparison supports up to four competitors.", "warning");
    state.competitors.push(createCompetitor(state.competitors.length));
    autosave();
    rerender();
  }

  function duplicateCompetitor(id) {
    if (state.competitors.length >= 4) return api.notify("A comparison supports up to four competitors.", "warning");
    const source = state.competitors.find((item) => item.id === id);
    if (!source) return;
    state.competitors.push({
      ...source,
      id: api.uid("competitor"),
      model: `${source.model || source.name || "Alternative"} copy`,
      name: "",
      values: { ...source.values },
    });
    autosave();
    rerender();
  }

  function removeCompetitor(id) {
    if (state.competitors.length === 1) return;
    const competitor = state.competitors.find((item) => item.id === id);
    if (competitor && hasEnteredCompetitorData(competitor) && !window.confirm("Remove this competitor from the comparison?")) return;
    state.competitors = state.competitors.filter((item) => item.id !== id);
    autosave();
    rerender();
  }

  function moveCompetitor(id, offset) {
    const index = state.competitors.findIndex((item) => item.id === id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= state.competitors.length) return;
    const [item] = state.competitors.splice(index, 1);
    state.competitors.splice(target, 0, item);
    autosave();
    rerender();
  }

  function addCustomCriterion() {
    const item = { id: api.uid("criterion"), label: "Custom specification", unit: "", yanmarValue: "" };
    state.customCriteria.push(item);
    state.selectedCriteria.push(item.id);
    autosave();
    rerender();
  }

  function removeCustomCriterion(id) {
    state.customCriteria = state.customCriteria.filter((item) => item.id !== id);
    state.selectedCriteria = state.selectedCriteria.filter((key) => key !== id);
    state.competitors.forEach((competitor) => delete competitor.values[id]);
    autosave();
    rerender();
  }

  function moveCustomCriterion(id, offset) {
    const index = state.customCriteria.findIndex((item) => item.id === id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= state.customCriteria.length) return;
    const [item] = state.customCriteria.splice(index, 1);
    state.customCriteria.splice(target, 0, item);
    autosave();
    rerender();
  }

  function resetComparison() {
    if (hasEnteredData() && !window.confirm("Start a new comparison and clear the current autosaved inputs?")) return;
    state = newState();
    activeStep = 1;
    api.writeStore(AUTOSAVE_KEY, state);
    rerender();
    api.notify("New comparison started.");
  }

  function openForCategory(category) {
    if (typeof api.openComparisonV21 === "function") return api.openComparisonV21(category);
    if (!CRITERIA[category]) return false;
    mount();
    if (state.category !== category) {
      if (hasEnteredData() && !window.confirm("Open the comparison for another category and reset competitor specification values?")) return false;
      state.category = category;
      state.productId = PRODUCTS.find((item) => item.category === category).id;
      state.selectedCriteria = recommended(category);
      state.yanmarOverrides = {};
      state.customCriteria = [];
      state.competitors.forEach((competitor) => {
        competitor.values = {};
      });
      autosave();
    }
    activeStep = 2;
    rerender();
    api.setActivePage("competitive-intelligence");
    return true;
  }

  function setStep(step) {
    const nextStep = Math.max(1, Math.min(4, Number(step) || 1));
    if (nextStep === 4) {
      const validation = validate();
      if (validation.errors.length) {
        activeStep = 3;
        rerender();
        api.notify(validation.errors[0], "danger");
        return;
      }
    }
    activeStep = nextStep;
    rerender();
    root?.scrollIntoView({ behavior: "auto", block: "start" });
  }

  function installCategoryEntrypoints() {
    [
      ["ydg", "generators", "Open Generator Product Comparison"],
      ["ydp", "pumps", "Open Water Pump Product Comparison"],
      ["lseries", "engines", "Open Engine Product Comparison"],
    ].forEach(([pageId, category, label]) => {
      const header = api.qs(".page-header", api.byId(pageId));
      if (!header || header.querySelector("[data-open-comparison-category]")) return;
      const button = document.createElement("button");
      button.className = "header-action secondary";
      button.type = "button";
      button.dataset.openComparisonCategory = category;
      button.textContent = label;
      header.appendChild(button);
    });
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-comparison-category]");
      if (trigger) openForCategory(trigger.dataset.openComparisonCategory);
    });
  }

  function saveDraft() {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    const items = drafts();
    const draft = JSON.parse(JSON.stringify({ ...state, id: api.uid("comparison"), savedAt: new Date().toISOString() }));
    items.unshift(draft);
    if (!api.writeStore(DRAFTS_KEY, items.slice(0, 30))) return;
    api.track("Saved comparison draft", state.title, state.category);
    rerender();
    api.notify("Comparison draft saved.");
  }

  function openDraft(id) {
    const draft = drafts().find((item) => item.id === id);
    if (!draft) return api.notify("This draft could not be found.", "danger");
    state = normalizeState(draft);
    autosave();
    rerender();
    api.notify("Draft opened.");
  }

  function deleteDraft(id) {
    api.writeStore(DRAFTS_KEY, drafts().filter((item) => item.id !== id));
    rerender();
  }

  function comparisonFileBase() {
    return `yanmar-${state.category}-comparison-${new Date().toISOString().slice(0, 10)}`;
  }

  async function imageToDataUrl(url) {
    const source = String(url || "").trim();
    if (!source) return "";
    if (/^data:image\//i.test(source)) return source;
    const image = await loadImage(source);
    if (!image) return "";
    try {
      const maxDimension = 1400;
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth || image.width, image.naturalHeight || image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round((image.naturalWidth || image.width) * scale));
      canvas.height = Math.max(1, Math.round((image.naturalHeight || image.height) * scale));
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/png");
    } catch (error) {
      console.warn("Comparison image could not be embedded", error);
      return "";
    }
  }

  function standaloneComparisonHtml(imageOverrides) {
    const documentTitle = api.escapeHTML(state.title || "Yanmar comparison");
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="generator" content="Yanmar Amplify">
  <meta name="yanmar-amplify-build" content="FINAL-YANMAR-AMPLIFY-20260723-02">
  <title>${documentTitle}</title>
  <style>
    :root{color-scheme:light;font-family:Arial,Helvetica,sans-serif;color:#17191f;background:#eef1f5}
    *{box-sizing:border-box}
    body{margin:0;padding:24px;background:#eef1f5;color:#17191f}
    .sheet-frame{max-width:1440px;margin:0 auto;overflow-x:auto}
    .ym17-export-sheet{--ym17-columns:2;min-width:760px;background:#fff;border:1px solid #d9dee7;border-top:7px solid #e60012;box-shadow:0 18px 48px rgba(17,25,39,.12)}
    .ym17-export-head{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;padding:28px;border-bottom:1px solid #d9dee7}
    .ym17-kicker{margin:0 0 8px;color:#e60012;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:1.5px}
    h2{margin:0;font-size:clamp(26px,4vw,46px);line-height:1.08;overflow-wrap:break-word}
    .ym17-export-head p:not(.ym17-kicker),.ym17-export-product p,.ym17-export-foot p{margin:8px 0 0;color:#5d6778;line-height:1.5;overflow-wrap:break-word}
    .ym17-export-logo{color:#e60012;font-size:28px;font-style:italic;font-weight:900;white-space:nowrap}
    .ym17-export-products{display:grid;grid-template-columns:repeat(var(--ym17-columns),minmax(0,1fr));gap:12px;padding:20px 28px}
    .ym17-export-product{min-width:0;padding:14px;border:1px solid #d9dee7;background:#f8f9fb}
    .ym17-export-product.is-yanmar{border-color:#e60012;background:#fff3f4}
    .ym17-export-product img,.ym17-export-placeholder{display:block;width:100%;height:170px;object-fit:contain;background:#fff}
    .ym17-export-placeholder{display:grid;place-items:center;color:#667085}
    .ym17-export-product h3{margin:12px 0 0;font-size:18px;line-height:1.25;overflow-wrap:break-word}
    .ym17-export-table{width:calc(100% - 56px);margin:0 28px 24px;border-collapse:collapse;table-layout:fixed}
    .ym17-export-table th,.ym17-export-table td{padding:11px 12px;border:1px solid #cfd5de;text-align:left;vertical-align:top;line-height:1.4;white-space:normal;word-break:normal;overflow-wrap:break-word}
    .ym17-export-table thead th{background:#eef1f5}
    .ym17-export-table tbody th{width:20%;background:#f8f9fb}
    .ym17-export-table .is-yanmar{background:#fff3f4;color:#d60018;font-weight:700}
    .ym17-export-foot{display:grid;gap:14px;padding:22px 28px;border-top:1px solid #d9dee7}
    .ym17-export-foot strong{font-size:13px;text-transform:uppercase;letter-spacing:.7px}
    @page{size:A4 landscape;margin:10mm}
    @media(max-width:800px){body{padding:10px}.ym17-export-head{padding:20px}.ym17-export-products{padding:16px}.ym17-export-table{width:calc(100% - 32px);margin:0 16px 18px}.ym17-export-foot{padding:18px}}
    @media print{body{padding:0;background:#fff}.sheet-frame{max-width:none;overflow:visible}.ym17-export-sheet{min-width:0;border:0;box-shadow:none}.ym17-export-head{padding:10mm 8mm 5mm}.ym17-export-products{padding:4mm 8mm}.ym17-export-product img,.ym17-export-placeholder{height:31mm}.ym17-export-table{width:calc(100% - 16mm);margin:0 8mm 5mm;font-size:9pt}.ym17-export-table th,.ym17-export-table td{padding:2.2mm}.ym17-export-foot{padding:4mm 8mm;font-size:8.5pt}.ym17-export-product,.ym17-export-table tr{break-inside:avoid;page-break-inside:avoid}}
  </style>
</head>
<body>
  <main class="sheet-frame">${previewMarkup(imageOverrides)}</main>
</body>
</html>`;
  }

  async function htmlExport() {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    if (exportBusy) return api.notify("An export is already being prepared.", "warning");
    exportBusy = true;
    try {
      const item = product();
      const competitors = activeCompetitors();
      const imageRecords = [
        { key: "yanmar", label: item.name, url: item.image },
        ...competitors.map((competitor) => ({
          key: competitor.id,
          label: competitorLabel(competitor, "Competitor"),
          url: competitor.imageUrl,
        })),
      ];
      const imageOverrides = {};
      const failed = [];
      for (const record of imageRecords) {
        if (!record.url) {
          imageOverrides[record.key] = "";
          continue;
        }
        const embedded = await imageToDataUrl(record.url);
        imageOverrides[record.key] = embedded;
        if (!embedded) failed.push(record.label);
      }
      if (
        failed.length &&
        !window.confirm(
          `The browser could not embed ${failed.length} image(s): ${failed.join(", ")}. They will be replaced by a controlled placeholder in the downloaded HTML. Continue?`,
        )
      ) {
        return;
      }
      api.download(
        `${comparisonFileBase()}.html`,
        standaloneComparisonHtml(imageOverrides),
        "text/html;charset=utf-8",
      );
      api.track("Downloaded self-contained comparison HTML", state.title, state.category);
      api.notify("Self-contained comparison HTML downloaded.");
    } catch (error) {
      console.error("Comparison HTML export failed", error);
      api.notify("The self-contained HTML could not be generated.", "danger");
    } finally {
      exportBusy = false;
    }
  }

  function csvExport() {
    const item = product();
    const selected = exportCriteria();
    const competitors = activeCompetitors();
    const rows = [
      ["Comparison point", item.id, ...competitors.map((competitor) => competitorLabel(competitor, "Competitor"))],
      ["Image source reference", item.image || "No image", ...competitors.map((competitor) => competitor.imageUrl || "No image")],
      ["Product source", sourceName(item), ...competitors.map((competitor) => competitor.sourceUrl || "Source not recorded")],
      ["Source / verification note", "Official Yanmar product data", ...competitors.map((competitor) => competitor.sourceNote || "")],
      ...selected.map(([key, label, _recommended, unit]) => [`${label}${unit ? ` (${unit})` : ""}`, officialValue(key), ...competitors.map((competitor) => competitor.values[key] || "")]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    api.download(`${comparisonFileBase()}.csv`, csv, "text/csv;charset=utf-8");
    api.track("Downloaded comparison CSV", state.title, state.category);
  }

  function wrapCanvasText(context, text, maxWidth) {
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (context.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    });
    if (current) lines.push(current);
    return lines;
  }

  function loadImage(url) {
    return new Promise((resolve) => {
      if (!url) return resolve(null);
      const image = new Image();
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timeout);
        resolve(value);
      };
      const timeout = setTimeout(() => finish(null), 5000);
      if (/^https?:/i.test(url)) image.crossOrigin = "anonymous";
      image.onload = () => finish(image);
      image.onerror = () => finish(null);
      image.src = url;
    });
  }

  async function renderCanvas() {
    const item = product();
    const selected = exportCriteria();
    const competitors = activeCompetitors();
    const columns = 1 + competitors.length;
    const width = 1600;
    const rowHeight = 72;
    const height = 180 + 230 + selected.length * rowHeight + 180;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = Math.max(980, height);
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#e60012";
    context.fillRect(0, 0, canvas.width, 12);
    context.fillStyle = "#111827";
    context.font = "700 18px Arial";
    context.fillText("YANMAR AMPLIFY COMPARISON", 60, 58);
    context.font = "800 40px Arial";
    wrapCanvasText(context, state.title, 1100).slice(0, 2).forEach((line, index) => context.fillText(line, 60, 110 + index * 44));
    context.fillStyle = "#e60012";
    context.font = "italic 900 34px Arial";
    context.fillText("YANMAR", 1360, 72);
    context.fillStyle = "#475569";
    context.font = "18px Arial";
    context.fillText(`${state.useCase} · ${state.market}`, 60, 165);

    const productWidth = (width - 120 - (columns - 1) * 14) / columns;
    const images = await Promise.all([loadImage(item.image), ...competitors.map((competitor) => loadImage(competitor.imageUrl))]);
    const names = [item.name, ...competitors.map((competitor) => competitorLabel(competitor, "Unnamed competitor"))];
    const notes = ["Yanmar reference", ...competitors.map((competitor) => competitor.sourceMarket)];
    for (let index = 0; index < columns; index += 1) {
      const x = 60 + index * (productWidth + 14);
      context.fillStyle = index === 0 ? "#fff3f5" : "#f8fafc";
      context.fillRect(x, 195, productWidth, 190);
      context.strokeStyle = index === 0 ? "#e60012" : "#cbd5e1";
      context.strokeRect(x, 195, productWidth, 190);
      const image = images[index];
      if (image) {
        const scale = Math.min((productWidth - 24) / image.width, 112 / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        context.drawImage(image, x + (productWidth - drawWidth) / 2, 207 + (112 - drawHeight) / 2, drawWidth, drawHeight);
      } else {
        context.fillStyle = "#64748b";
        context.font = "16px Arial";
        context.fillText("Image not provided", x + 18, 266);
      }
      context.fillStyle = "#111827";
      context.font = "700 18px Arial";
      wrapCanvasText(context, names[index], productWidth - 24).slice(0, 2).forEach((line, lineIndex) => context.fillText(line, x + 12, 337 + lineIndex * 20));
      context.fillStyle = "#64748b";
      context.font = "14px Arial";
      context.fillText(notes[index] || "", x + 12, 374);
    }

    const tableX = 60;
    const tableY = 410;
    const labelWidth = 255;
    const valueWidth = (width - 120 - labelWidth) / columns;
    context.font = "700 15px Arial";
    selected.forEach(([key, label], rowIndex) => {
      const y = tableY + rowIndex * rowHeight;
      context.fillStyle = rowIndex % 2 ? "#ffffff" : "#f8fafc";
      context.fillRect(tableX, y, width - 120, rowHeight);
      context.strokeStyle = "#cbd5e1";
      context.strokeRect(tableX, y, width - 120, rowHeight);
      context.fillStyle = "#111827";
      wrapCanvasText(context, label, labelWidth - 22).slice(0, 2).forEach((line, lineIndex) => context.fillText(line, tableX + 12, y + 27 + lineIndex * 18));
      const values = [officialValue(key), ...competitors.map((competitor) => competitor.values[key] || "Not available")];
      values.forEach((value, columnIndex) => {
        const cellX = tableX + labelWidth + columnIndex * valueWidth;
        context.strokeRect(cellX, y, valueWidth, rowHeight);
        context.fillStyle = columnIndex === 0 ? "#d60018" : "#111827";
        context.font = columnIndex === 0 ? "700 14px Arial" : "14px Arial";
        wrapCanvasText(context, value, valueWidth - 20).slice(0, 3).forEach((line, lineIndex) => context.fillText(line, cellX + 10, y + 23 + lineIndex * 17));
      });
    });
    const footerY = tableY + selected.length * rowHeight + 32;
    context.fillStyle = "#475569";
    context.font = "14px Arial";
    wrapCanvasText(context, `Sources: ${sourceName(item)}. Competitor facts must be verified against the recorded official URLs.`, width - 120).slice(0, 3).forEach((line, index) => context.fillText(line, 60, footerY + index * 18));
    context.font = "12px Arial";
    wrapCanvasText(context, "Verify measurement standards, market configuration and current datasheets before external publication. Missing facts are not treated as disadvantages.", width - 120).slice(0, 3).forEach((line, index) => context.fillText(line, 60, footerY + 70 + index * 16));
    return canvas;
  }

  async function imageExport(format) {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    if (exportBusy) return api.notify("An export is already being prepared.", "warning");
    exportBusy = true;
    try {
      const canvas = await renderCanvas();
      const type = format === "png" ? "image/png" : "image/jpeg";
      const extension = format === "png" ? "png" : "jpg";
      const anchor = document.createElement("a");
      anchor.download = `${api.slug(state.title)}.${extension}`;
      anchor.href = canvas.toDataURL(type, 0.94);
      anchor.click();
      api.track(`Downloaded comparison ${extension.toUpperCase()}`, state.title, state.category);
      api.notify(`Comparison ${extension.toUpperCase()} downloaded.`);
    } catch (error) {
      console.error("Comparison image export failed", error);
      api.notify("The comparison image could not be generated. Check remote product images and try again.", "danger");
    } finally {
      exportBusy = false;
    }
  }

  async function pdfExport() {
    printExport();
  }

  function printExport() {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    const sheet = api.qs("[data-ym17-export-sheet]", root);
    if (!sheet) return;
    const host = document.createElement("div");
    host.className = "ym17-print-host";
    host.innerHTML = sheet.outerHTML;
    document.body.appendChild(host);
    document.body.classList.add("ym17-printing");
    const cleanup = () => {
      document.body.classList.remove("ym17-printing");
      host.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    setTimeout(cleanup, 1500);
    api.track("Printed comparison sheet", state.title, state.category);
  }

  function emailShare() {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    const item = product();
    const subject = encodeURIComponent(`${state.title} - ${item.id}`);
    const body = encodeURIComponent(`Yanmar comparison draft\n\nYanmar product: ${item.id}\nCompetitors: ${activeCompetitors().map((competitor) => competitorLabel(competitor, "Unnamed")).join(", ")}\nMarket: ${state.market}\n\nPlease review the attached/exported comparison and verify all source evidence before use.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    api.track("Shared comparison by email", state.title, state.category);
  }

  async function shareComparison() {
    const validation = validate();
    if (validation.errors.length) return api.notify(validation.errors[0], "danger");
    const item = product();
    const text = `${state.title}\nYanmar: ${item.id}\nAlternatives: ${activeCompetitors().map((competitor) => competitorLabel(competitor, "Unnamed")).join(", ")}\nMarket: ${state.market}\nVerify every product fact against the recorded official source before publication.`;
    try {
      if (navigator.share) {
        const canvas = await renderCanvas();
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        const file = blob ? new File([blob], `${api.slug(state.title)}.png`, { type: "image/png" }) : null;
        if (file && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ title: state.title, text, files: [file] });
        } else {
          await navigator.share({ title: state.title, text });
        }
        api.track("Shared comparison", state.title, state.category);
        return;
      }
      await api.copyText(text);
      api.notify("Comparison summary copied for sharing.");
    } catch (error) {
      if (error && error.name === "AbortError") return;
      console.error("Comparison share failed", error);
      try {
        await api.copyText(text);
        api.notify("Sharing was unavailable, so the comparison summary was copied.", "warning");
      } catch (_copyError) {
        api.notify("The comparison could not be shared or copied.", "danger");
      }
    }
  }

  function handleAction(button) {
    const action = button.dataset.cmpAction;
    if (action === "go-step") setStep(button.dataset.step);
    if (action === "next") setStep(activeStep + 1);
    if (action === "back") setStep(activeStep - 1);
    if (action === "add") addCompetitor();
    if (action === "reset") resetComparison();
    if (action === "reset-yanmar-field") {
      state.yanmarOverrides = state.yanmarOverrides || {};
      delete state.yanmarOverrides[button.dataset.key];
      autosave();
      rerender();
    }
    if (action === "reset-yanmar-product") {
      state.yanmarOverrides = {};
      autosave();
      rerender();
      api.notify("Yanmar values reset to official presets.");
    }
    if (action === "duplicate") duplicateCompetitor(button.dataset.id);
    if (action === "remove") removeCompetitor(button.dataset.id);
    if (action === "competitor-up") moveCompetitor(button.dataset.id, -1);
    if (action === "competitor-down") moveCompetitor(button.dataset.id, 1);
    if (action === "custom-add") addCustomCriterion();
    if (action === "custom-remove") removeCustomCriterion(button.dataset.id);
    if (action === "custom-up") moveCustomCriterion(button.dataset.id, -1);
    if (action === "custom-down") moveCustomCriterion(button.dataset.id, 1);
    if (action === "recommended") {
      state.selectedCriteria = recommended(state.category);
      autosave();
      rerender();
    }
    if (action === "all") {
      state.selectedCriteria = criteria().map((item) => item[0]);
      autosave();
      rerender();
    }
    if (action === "save") saveDraft();
    if (action === "generate") {
      const validation = validate();
      activeStep = 4;
      renderPreview();
      if (validation.errors.length) return api.notify(validation.errors[0], "danger");
      api.byId("ym17-cmp-preview")?.scrollIntoView({ behavior: "smooth", block: "start" });
      api.notify("Comparison preview generated from the current verified inputs.");
    }
    if (action === "open-draft") openDraft(button.dataset.id);
    if (action === "delete-draft") deleteDraft(button.dataset.id);
    if (action === "html") htmlExport();
    if (action === "csv") csvExport();
    if (action === "png") imageExport("png");
    if (action === "jpg") imageExport("jpg");
    if (action === "pdf") printExport();
    if (action === "print") printExport();
    if (action === "share") shareComparison();
    if (action === "email") emailShare();
    if (action === "edit") setStep(3);
  }

  function initializeComparisonBuilder() {
    root = api.byId("competitive-intelligence");
    if (!root) return false;
    try {
      root.classList.add("page", "stack");
      if (root.dataset.ym17ComparisonBound === "true") {
        if (!root.querySelector("[data-ym17-comparison-app]")) {
          root.innerHTML = layout();
        }
        renderPreview();
        return true;
      }
      root.dataset.ym17ComparisonBound = "true";
      root.innerHTML = layout();
      root.addEventListener("input", (event) => updateStateFromField(event.target));
      root.addEventListener("change", (event) => {
        updateStateFromField(event.target);
        if (event.target.matches("[data-custom-field]")) rerender();
      });
      root.addEventListener("change", (event) => {
        if (event.target.matches("[data-competitor-image]")) readCompetitorImage(event.target);
      });
      root.addEventListener("click", (event) => {
        const button = event.target.closest("[data-cmp-action]");
        if (!button) return;
        event.preventDefault();
        handleAction(button);
      });
      renderPreview();
      return true;
    } catch (error) {
      root.dataset.ym17ComparisonBound = "false";
      const reason = error && error.message ? error.message : "Unknown render error";
      root.innerHTML = `<section class="ym17-shell ym17-comparison-shell"><div class="ym17-panel ym17-cmp-panel ym17-error-panel"><p class="ym17-kicker">Comparison Builder</p><h1>The Comparison Sheet Builder could not be loaded.</h1><p class="ym17-help">Retry the builder or reset saved comparison data.</p><div class="ym17-inline-actions"><button class="ym17-button" type="button" data-cmp-retry>Retry</button><button class="ym17-button is-secondary" type="button" data-cmp-reset-storage>Reset comparison data</button></div><pre class="ym17-admin-reason">${api.escapeHTML(reason)}</pre></div></section>`;
      root.addEventListener(
        "click",
        (event) => {
          if (event.target.closest("[data-cmp-reset-storage]")) {
            event.preventDefault();
            api.writeStore(AUTOSAVE_KEY, newState());
            state = newState();
            root.dataset.ym17ComparisonBound = "false";
            initializeComparisonBuilder();
          }
          if (event.target.closest("[data-cmp-retry]")) {
            event.preventDefault();
            root.dataset.ym17ComparisonBound = "false";
            initializeComparisonBuilder();
          }
        },
        { once: true },
      );
      return false;
    }
  }

  function mount() {
    return initializeComparisonBuilder();
  }

  function exposeApi() {
    api.PRODUCTS = PRODUCTS;
    api.yanmarProductDatabase = {
      generators: PRODUCTS.filter((item) => item.category === "generators"),
      pumps: PRODUCTS.filter((item) => item.category === "pumps"),
      engines: PRODUCTS.filter((item) => item.category === "engines"),
    };
    api.getYanmarProductsByCategory = (category) => PRODUCTS.filter((item) => item.category === category);
    api.getYanmarProductById = (productId) => PRODUCTS.find((item) => item.id === productId) || null;
    api.getRecommendedCriteria = (category) => recommended(category);
    api.getOfficialProductValue = (productId, criterionId) => PRODUCTS.find((item) => item.id === productId)?.facts?.[criterionId] || missing();
    api.openComparison = openForCategory;
    window.openComparison = openForCategory;
    api.initializeComparisonBuilder = initializeComparisonBuilder;
    window.initializeComparisonBuilder = initializeComparisonBuilder;
    api.getComparisonState = () => JSON.parse(JSON.stringify(state));
    api.mountComparison = mount;
  }

  exposeApi();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installCategoryEntrypoints, { once: true });
  } else {
    installCategoryEntrypoints();
  }
})();

;

/* ===== Source: ym-support-v17.js ===== */
(function () {
  "use strict";

  const api = window.YanmarAmplifyV17;
  if (!api) return;

  const REQUESTS_KEY = "yanmarAmplifySupportRequestsV17";
  const ADMIN_META_KEY = "yanmarAmplifySupportAdminV17";
  const STATUS_OPTIONS = ["New", "Reviewed", "In progress", "Waiting for distributor", "Completed", "Rejected"];
  const DEPARTMENTS = ["Unassigned", "Yanmar Europe Marketing", "Regional Marketing", "Product Management", "Technical Support", "Legal / Brand Review", "Sales Enablement"];
  const REGIONS = ["West Europe", "Central Europe", "South Europe", "Nordics", "Africa", "Middle East", "North America", "Central America / Caribbean", "South America", "Asia Pacific", "Oceania"];
  const PRODUCTS = ["YDG Diesel Generators", "YDP Diesel Pumps", "L-Series Diesel Engines", "Multiple products", "Other"];
  const REQUEST_TYPES = ["Localized LinkedIn post", "Instagram post", "Website banner", "Brochure / datasheet support", "Store infographic", "Sales follow-up material", "Application video", "YouTube explainer script", "SEO / SEA product page copy", "Campaign activation brief", "Customer testimonial request", "Product news / update", "Other"];
  const CHANNELS = ["All channels", "LinkedIn", "Instagram", "YouTube", "TikTok", "Distributor website", "Email campaign", "Showroom / store", "Sales presentation", "Other"];
  const LANGUAGES = ["English", "Dutch", "German", "French", "Spanish", "Polish", "Italian", "Portuguese", "Arabic", "Japanese", "Korean", "Thai", "Chinese", "Indonesian", "Malay", "Vietnamese", "Other"];

  let supportRoot = null;
  let adminSection = null;
  let modal = null;
  let activeRequestId = null;
  let returnFocus = null;
  let adminFilters = { status: "All", region: "All", type: "All", read: "All" };

  function requests() {
    const stored = api.readStore(REQUESTS_KEY, []);
    return Array.isArray(stored) ? stored.filter((item) => item && typeof item === "object" && item.id) : [];
  }

  function adminMeta() {
    const stored = api.readStore(ADMIN_META_KEY, {});
    return stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
  }

  function saveRequests(items) {
    if (!api.writeStore(REQUESTS_KEY, items)) return false;
    renderDistributorRequests();
    renderAdminRequests();
    updateBadge();
    return true;
  }

  function saveAdminMeta(value) {
    if (!api.writeStore(ADMIN_META_KEY, value)) return false;
    renderAdminRequests();
    updateBadge();
    return true;
  }

  function requestMeta(id) {
    const all = adminMeta();
    const value = {
      status: "New",
      read: false,
      department: "Unassigned",
      clarification: "",
      notes: [],
      ...(all[id] || {}),
    };
    value.notes = Array.isArray(value.notes) ? value.notes.filter((note) => note && typeof note === "object") : [];
    return value;
  }

  function setRequestMeta(id, patch) {
    const all = adminMeta();
    all[id] = { ...requestMeta(id), ...patch, updatedAt: new Date().toISOString() };
    if (!saveAdminMeta(all)) return false;
    const status = all[id].status;
    const nextRequests = requests().map((item) => (item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item));
    if (!api.writeStore(REQUESTS_KEY, nextRequests)) return false;
    renderDistributorRequests();
    return true;
  }

  function options(values, current) {
    return values.map((value) => `<option value="${api.escapeHTML(value)}" ${value === current ? "selected" : ""}>${api.escapeHTML(value)}</option>`).join("");
  }

  function activeDistributor() {
    return api.currentDistributor();
  }

  function inferRegion(distributor) {
    const value = String(distributor || "").toLowerCase();
    if (/abdullah|saudi|gcc|uae/.test(value)) return "Middle East";
    if (/techbud|poland/.test(value)) return "Central Europe";
    if (/africa|south africa|kenya|nigeria/.test(value)) return "Africa";
    if (/canada|usa|america/.test(value)) return "North America";
    if (/thai|korea|japan|asia/.test(value)) return "Asia Pacific";
    return "West Europe";
  }

  function reference() {
    const year = new Date().getFullYear();
    const existing = requests();
    const used = new Set(existing.map((item) => item.reference).filter(Boolean));
    let sequence = existing.filter((item) => String(item.createdAt || "").startsWith(String(year))).length + 1;
    let candidate = "";
    do {
      candidate = `YA-SR-${year}-${String(sequence).padStart(3, "0")}`;
      sequence += 1;
    } while (used.has(candidate));
    return candidate;
  }

  function deliverableFor(item) {
    const type = item.requestType;
    if (/linkedin/i.test(type)) return "Localized LinkedIn copy, recommended CTA, visual brief and approval checklist";
    if (/instagram/i.test(type)) return "Instagram caption, short CTA, hashtag guidance and visual format brief";
    if (/website|seo|sea/i.test(type)) return "Search-ready page copy, title tag, meta description, H1/H2 structure and CTA";
    if (/brochure|datasheet/i.test(type)) return "Localized sales document brief with required product facts and contact details";
    if (/video|youtube/i.test(type)) return "Structured video script, shot list, CTA and channel-ready description";
    if (/sales follow-up/i.test(type)) return "Sales follow-up message, supporting proof points and downloadable material brief";
    if (/campaign/i.test(type)) return "Campaign briefing with audience, objective, deliverables, channels, timing and proof of use";
    return `${type} briefing with local market, product, channel and approval requirements`;
  }

  function localizationFor(item) {
    if (item.sourceLanguage === item.targetLanguage) return `Create and review the deliverable in ${item.targetLanguage}; verify local claims and contact details.`;
    return `Create the master in ${item.sourceLanguage}, localize to ${item.targetLanguage}, and validate terminology, CTA, model availability and legal claims locally.`;
  }

  function supportMarkup() {
    const distributor = activeDistributor();
    return `
      <div class="ym17-shell" data-ym17-support>
        <header class="ym17-header">
          <div><p class="ym17-kicker">Connected distributor support</p><h1>Support Request</h1><p class="ym17-subtitle">Turn a local content need into a complete Yanmar briefing. Submitted requests appear immediately in the Admin workspace and remain available after refresh.</p></div>
          <span class="ym17-badge is-brand">Distributor → Yanmar workflow</span>
        </header>
        <section class="ym17-panel">
          <div class="ym17-panel-head"><div><p class="ym17-kicker">New request</p><h2>Describe the required deliverable</h2></div><span class="ym17-badge">${api.escapeHTML(distributor)}</span></div>
          <form class="ym17-support-form" id="ym17-support-form" novalidate>
            <div class="ym17-grid">
              <div class="ym17-field ym17-col-12"><label for="ym17-request-title">Request title</label><input id="ym17-request-title" name="title" placeholder="Example: YDP flood-response launch support" required maxlength="120"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-distributor">Distributor</label><input id="ym17-request-distributor" name="distributor" value="${api.escapeHTML(distributor)}" required></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-region">Region</label><select id="ym17-request-region" name="region">${options(REGIONS,inferRegion(distributor))}</select></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-country">Country / market</label><input id="ym17-request-country" name="country" placeholder="Example: Saudi Arabia"></div>
              <div class="ym17-field ym17-col-4"><label for="ym17-request-product">Product category</label><select id="ym17-request-product" name="product">${options(PRODUCTS,"Multiple products")}</select></div>
              <div class="ym17-field ym17-col-4"><label for="ym17-request-type">Request type</label><select id="ym17-request-type" name="requestType">${options(REQUEST_TYPES,"Sales follow-up material")}</select></div>
              <div class="ym17-field ym17-col-4"><label for="ym17-request-channel">Communication channel</label><select id="ym17-request-channel" name="channel">${options(CHANNELS,"All channels")}</select></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-objective">Communication objective</label><input id="ym17-request-objective" name="objective" placeholder="Example: Generate qualified rental enquiries" required></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-audience">Target audience</label><input id="ym17-request-audience" name="audience" placeholder="Example: Construction rental fleet managers" required></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-source-language">Master language</label><select id="ym17-request-source-language" name="sourceLanguage">${options(LANGUAGES,"English")}</select></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-target-language">Desired language</label><select id="ym17-request-target-language" name="targetLanguage">${options(LANGUAGES,"English")}</select></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-timing">Required timing</label><select id="ym17-request-timing" name="timing">${options(["This week","Within 2 weeks","This month","Future campaign planning"],"Within 2 weeks")}</select></div>
              <div class="ym17-field ym17-col-3"><label for="ym17-request-date">Deadline</label><input id="ym17-request-date" name="preferredDate" type="date"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-material">Requested material / format</label><input id="ym17-request-material" name="requestedMaterial" placeholder="Example: editable copy document plus 1200 × 1200 social visual"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-must-include">Must include</label><textarea id="ym17-request-must-include" name="mustInclude" placeholder="Models, proof points, distributor contact, CTA, legal wording or campaign details"></textarea></div>
              <div class="ym17-field ym17-col-12"><label for="ym17-request-links">Reference links / existing assets</label><textarea id="ym17-request-links" name="referenceLinks" placeholder="One URL or asset reference per line"></textarea></div>
              <div class="ym17-field ym17-col-12"><label for="ym17-request-brief">Briefing details</label><textarea id="ym17-request-brief" name="brief" placeholder="Explain the local problem, intended message, audience context and desired action." required maxlength="2000"></textarea><span class="ym17-counter" id="ym17-request-counter">0 / 2000</span></div>
              <div class="ym17-field ym17-col-12"><label for="ym17-request-notes">Additional notes</label><textarea id="ym17-request-notes" name="additionalNotes" placeholder="Add local context, dependencies, approval needs or any other useful detail." maxlength="1200"></textarea></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-contact">Contact person</label><input id="ym17-request-contact" name="contactName" placeholder="Name"></div>
              <div class="ym17-field ym17-col-6"><label for="ym17-request-email">Contact email</label><input id="ym17-request-email" name="contactEmail" type="email" placeholder="name@distributor.com"></div>
            </div>
            <div id="ym17-support-errors" aria-live="polite"></div>
            <div class="ym17-inline-actions"><button class="ym17-button" type="submit">Create support request</button><p class="ym17-help">Submission is simulated in this prototype: the request is saved in this browser and appears in the Admin workspace. No email or backend submission is performed. Technical claims and local availability remain subject to Yanmar approval.</p></div>
          </form>
        </section>
        <section class="ym17-panel">
          <div class="ym17-panel-head"><div><p class="ym17-kicker">Your requests</p><h2>Saved support requests</h2></div><span class="ym17-badge" id="ym17-distributor-request-count">0 saved</span></div>
          <div class="ym17-request-list" id="ym17-distributor-request-list"></div>
        </section>
      </div>
    `;
  }

  function validateRequest(item) {
    const errors = [];
    if (!item.title || item.title.length < 5) errors.push("Add a clear request title of at least 5 characters.");
    if (!item.distributor) errors.push("Enter the distributor name.");
    if (!item.objective) errors.push("Describe the communication objective.");
    if (!item.audience) errors.push("Describe the target audience.");
    if (!item.brief || item.brief.length < 20) errors.push("Add a short brief of at least 20 characters.");
    if (item.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.contactEmail)) errors.push("Enter a valid contact email or leave it blank.");
    return errors;
  }

  function formObject(form) {
    const values = Object.fromEntries(new FormData(form).entries());
    return Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value).trim()]));
  }

  function createSupportRequest(values) {
    const normalized = Object.fromEntries(Object.entries({
      title: "",
      distributor: activeDistributor(),
      region: inferRegion(activeDistributor()),
      country: "",
      product: "Multiple products",
      requestType: "Sales follow-up material",
      channel: "All channels",
      objective: "",
      audience: "",
      sourceLanguage: "English",
      targetLanguage: "English",
      timing: "Within 2 weeks",
      preferredDate: "",
      requestedMaterial: "",
      mustInclude: "",
      referenceLinks: "",
      brief: "",
      additionalNotes: "",
      contactName: "",
      contactEmail: "",
      ...(values || {}),
    }).map(([key, value]) => [key, String(value == null ? "" : value).trim()]));
    const errors = validateRequest(normalized);
    if (errors.length) return { ok: false, errors, item: null };
    const item = {
      id: api.uid("request"),
      reference: reference(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "New",
      ...normalized,
      deliverable: deliverableFor(normalized),
      localization: localizationFor(normalized),
    };
    const next = [item, ...requests()].slice(0, 200);
    const meta = adminMeta();
    meta[item.id] = { status: "New", read: false, department: "Unassigned", clarification: "", notes: [], updatedAt: new Date().toISOString() };
    if (!api.writeStore(ADMIN_META_KEY, meta)) {
      return { ok: false, errors: ["The support request could not be saved in this browser."], item: null };
    }
    if (!saveRequests(next)) {
      delete meta[item.id];
      api.writeStore(ADMIN_META_KEY, meta);
      return { ok: false, errors: ["The support request could not be saved in this browser."], item: null };
    }
    return { ok: true, errors: [], item };
  }

  function submitRequest(event) {
    event.preventDefault();
    const values = formObject(event.currentTarget);
    const result = createSupportRequest(values);
    const errors = result.errors;
    const host = api.byId("ym17-support-errors");
    host.innerHTML = errors.map((error) => `<div class="ym17-alert is-danger">${api.escapeHTML(error)}</div>`).join("");
    if (errors.length) {
      host.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const item = result.item;
    api.track("Submitted support request", item.requestType, item.product);
    event.currentTarget.reset();
    api.byId("ym17-request-distributor").value = activeDistributor();
    api.byId("ym17-request-region").value = inferRegion(activeDistributor());
    api.byId("ym17-request-source-language").value = "English";
    api.byId("ym17-request-target-language").value = "English";
    api.byId("ym17-request-counter").textContent = "0 / 2000";
    api.notify(`Support request ${item.reference} saved in this prototype and added to the Admin workspace.`);
  }

  function renderDistributorRequests() {
    const list = api.byId("ym17-distributor-request-list");
    if (!list) return;
    const distributor = activeDistributor();
    const items = requests().filter((item) => item.distributor === distributor);
    const count = api.byId("ym17-distributor-request-count");
    if (count) count.textContent = `${items.length} saved`;
    list.innerHTML = items.length
      ? items.map((item) => `<article class="ym17-request-card" data-distributor-request="${item.id}">
          <div><p class="ym17-kicker">${api.escapeHTML(item.reference)}</p><h3>${api.escapeHTML(item.title || item.requestType)}</h3><p>${api.escapeHTML(item.requestType)} · ${api.escapeHTML(item.product)} · ${api.escapeHTML(item.region)} · ${new Date(item.createdAt).toLocaleString()}</p><span class="ym17-badge is-brand">${api.escapeHTML(item.status || "New")}</span></div>
          <button class="ym17-button is-secondary" type="button" data-support-copy="${item.id}">${api.icon("copy")} Copy summary</button>
        </article>`).join("")
      : '<div class="ym17-empty" style="padding:16px">No support requests have been submitted for this distributor.</div>';
  }

  function adminMarkup(legacyNode) {
    return `
      <div class="ym17-panel-head"><div><p class="ym17-kicker">Support requests</p><h2>Admin briefing inbox</h2></div><span class="ym17-badge is-brand" id="ym17-admin-request-count">0 requests</span></div>
      <div class="ym17-alert">Open a request for the full briefing, status workflow, assignment, clarification and private admin notes. Distributor users never see internal notes.</div>
      <div class="ym17-request-filters" style="margin-top:14px">
        <div class="ym17-field"><label for="ym17-filter-status">Status</label><select id="ym17-filter-status" data-support-filter="status">${options(["All",...STATUS_OPTIONS],adminFilters.status)}</select></div>
        <div class="ym17-field"><label for="ym17-filter-region">Region</label><select id="ym17-filter-region" data-support-filter="region">${options(["All",...REGIONS],adminFilters.region)}</select></div>
        <div class="ym17-field"><label for="ym17-filter-type">Request type</label><select id="ym17-filter-type" data-support-filter="type">${options(["All",...REQUEST_TYPES],adminFilters.type)}</select></div>
        <div class="ym17-field"><label for="ym17-filter-read">Read state</label><select id="ym17-filter-read" data-support-filter="read">${options(["All","Unread","Read"],adminFilters.read)}</select></div>
      </div>
      <div class="ym17-request-list" id="ym17-admin-request-list" style="margin-top:14px"></div>
      <details style="margin-top:16px" id="ym17-other-admin-signals"><summary>Other admin signals</summary><div id="ym17-legacy-notification-host" style="margin-top:12px"></div></details>
    `;
  }

  function mountAdmin() {
    adminSection = api.byId("admin-notification-center");
    if (!adminSection) return;
    const legacy = api.byId("admin-notification-list");
    if (legacy) legacy.id = "admin-notification-legacy-list";
    adminSection.innerHTML = adminMarkup(legacy);
    if (legacy) api.byId("ym17-legacy-notification-host").appendChild(legacy);
    adminSection.addEventListener("change", (event) => {
      const key = event.target.dataset.supportFilter;
      if (key) {
        adminFilters[key] = event.target.value;
        renderAdminRequests();
      }
      if (event.target.dataset.supportAdminField) {
        const field = event.target.dataset.supportAdminField;
        setRequestMeta(activeRequestId, { [field]: event.target.value });
        renderModal(activeRequestId);
      }
    });
    adminSection.addEventListener("click", handleAdminClick);
    renderAdminRequests();
  }

  function filteredRequests() {
    return requests().filter((item) => {
      const meta = requestMeta(item.id);
      if (adminFilters.status !== "All" && meta.status !== adminFilters.status) return false;
      if (adminFilters.region !== "All" && item.region !== adminFilters.region) return false;
      if (adminFilters.type !== "All" && item.requestType !== adminFilters.type) return false;
      if (adminFilters.read === "Unread" && meta.read) return false;
      if (adminFilters.read === "Read" && !meta.read) return false;
      return true;
    });
  }

  function renderAdminRequests() {
    const list = api.byId("ym17-admin-request-list");
    if (!list) return;
    const items = filteredRequests();
    const count = api.byId("ym17-admin-request-count");
    if (count) count.textContent = `${items.length} request${items.length === 1 ? "" : "s"}`;
    list.innerHTML = items.length
      ? items.map((item) => {
          const meta = requestMeta(item.id);
          return `<article class="ym17-request-card ${meta.read ? "" : "is-unread"}" data-admin-support-request="${item.id}">
            <div><p class="ym17-kicker">Support request · ${api.escapeHTML(item.reference)}</p><h3>${api.escapeHTML(item.distributor)}</h3><p>${api.escapeHTML(meta.status)}: ${api.escapeHTML(item.product)} · ${api.escapeHTML(item.requestType)}</p><p class="ym17-help">${new Date(item.createdAt).toLocaleString()} · ${api.escapeHTML(item.timing)} · ${api.escapeHTML(item.channel)}</p><span class="ym17-badge">${api.escapeHTML(item.region)}</span> <span class="ym17-badge is-brand">${api.escapeHTML(meta.department)}</span></div>
            <div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-support-open="${item.id}">Open</button><button class="ym17-button is-secondary" type="button" data-support-read="${item.id}">${meta.read ? "Mark unread" : "Mark read"}</button></div>
          </article>`;
        }).join("")
      : '<div class="ym17-empty" style="padding:16px">No support requests match these filters.</div>';
  }

  function updateBadge() {
    const unread = requests().filter((item) => !requestMeta(item.id).read).length;
    const badge = api.byId("admin-nav-notification-count");
    if (badge) {
      badge.hidden = unread === 0;
      badge.textContent = String(unread);
    }
  }

  function requestById(id) {
    return requests().find((item) => item.id === id);
  }

  function requestSummary(item, includeAdmin, includeNotes = includeAdmin) {
    if (!item) return "";
    const meta = requestMeta(item.id);
    const lines = [
      `Support request ${item.reference}`,
      `Title: ${item.title || item.requestType}`,
      `Distributor: ${item.distributor}`,
      `Region / country: ${item.region} / ${item.country || "Not provided"}`,
      `Product: ${item.product}`,
      `Request type: ${item.requestType}`,
      `Channel: ${item.channel}`,
      `Objective: ${item.objective}`,
      `Audience: ${item.audience}`,
      `Language: ${item.sourceLanguage} → ${item.targetLanguage}`,
      `Timing: ${item.timing}${item.preferredDate ? ` (preferred ${item.preferredDate})` : ""}`,
      `Deliverable: ${item.deliverable}`,
      `Requested material: ${item.requestedMaterial || "Not provided"}`,
      `Localization: ${item.localization}`,
      `Must include: ${item.mustInclude || "Not provided"}`,
      `Reference links: ${item.referenceLinks || "Not provided"}`,
      `Brief: ${item.brief}`,
      `Additional notes: ${item.additionalNotes || "Not provided"}`,
      `Contact: ${[item.contactName,item.contactEmail].filter(Boolean).join(" · ") || "Not provided"}`,
    ];
    if (includeAdmin) {
      lines.push(`Status: ${meta.status}`, `Assigned department: ${meta.department}`, `Clarification: ${meta.clarification || "None"}`);
      if (includeNotes && meta.notes.length) lines.push("Internal notes:", ...meta.notes.map((note) => `- ${note.text} (${new Date(note.createdAt).toLocaleString()})`));
    }
    return lines.join("\n");
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "ym17-modal";
    modal.id = "ym17-support-modal";
    modal.hidden = true;
    modal.innerHTML =
      '<div class="ym17-modal-card" role="dialog" aria-modal="true" aria-labelledby="ym17-support-modal-title"><header class="ym17-modal-head"><div><p class="ym17-kicker">Support request briefing</p><h2 id="ym17-support-modal-title">Request</h2></div><button class="ym17-icon-button is-secondary" type="button" data-support-close aria-label="Close request">' +
      api.icon("close") +
      '</button></header><div class="ym17-modal-body" id="ym17-support-modal-body"></div><footer class="ym17-modal-actions" id="ym17-support-modal-actions"></footer></div>';
    document.body.appendChild(modal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-support-close]")) closeModal();
      const action = event.target.closest("[data-support-modal-action]");
      if (action) handleModalAction(action.dataset.supportModalAction);
      const addNote = event.target.closest("[data-support-add-note]");
      if (addNote) addInternalNote();
    });
    modal.addEventListener("change", (event) => {
      const field = event.target.dataset.supportAdminField;
      if (field) {
        setRequestMeta(activeRequestId, { [field]: event.target.value });
        renderModal(activeRequestId);
      }
    });
    document.addEventListener("keydown", modalKeydown);
    return modal;
  }

  function renderModal(id) {
    const item = requestById(id);
    if (!item) return closeModal();
    const meta = requestMeta(id);
    activeRequestId = id;
    api.byId("ym17-support-modal-title").textContent = `${item.reference} · ${item.title || item.requestType}`;
    api.byId("ym17-support-modal-body").innerHTML = `
      <div class="ym17-brief-grid">
        <section class="ym17-brief-block"><h3>Request overview</h3><dl>
          <dt>Status</dt><dd><select data-support-admin-field="status">${options(STATUS_OPTIONS,meta.status)}</select></dd>
          <dt>Assigned to</dt><dd><select data-support-admin-field="department">${options(DEPARTMENTS,meta.department)}</select></dd>
          <dt>Title</dt><dd>${api.escapeHTML(item.title || item.requestType)}</dd>
          <dt>Distributor</dt><dd>${api.escapeHTML(item.distributor)}</dd>
          <dt>Region / market</dt><dd>${api.escapeHTML(item.region)} · ${api.escapeHTML(item.country || "Country not provided")}</dd>
          <dt>Created</dt><dd>${new Date(item.createdAt).toLocaleString()}</dd>
          <dt>Timing</dt><dd>${api.escapeHTML(item.timing)}${item.preferredDate ? ` · ${api.escapeHTML(item.preferredDate)}` : ""}</dd>
        </dl></section>
        <section class="ym17-brief-block"><h3>Deliverable</h3><p><strong>${api.escapeHTML(item.requestType)}</strong></p><p>${api.escapeHTML(item.deliverable)}</p><p>${api.escapeHTML(item.product)} · ${api.escapeHTML(item.channel)}</p><p><strong>Requested material:</strong> ${api.escapeHTML(item.requestedMaterial || "Not provided")}</p></section>
        <section class="ym17-brief-block"><h3>Audience and objective</h3><p><strong>Audience:</strong> ${api.escapeHTML(item.audience)}</p><p><strong>Objective:</strong> ${api.escapeHTML(item.objective)}</p></section>
        <section class="ym17-brief-block"><h3>Localization</h3><p>${api.escapeHTML(item.sourceLanguage)} → ${api.escapeHTML(item.targetLanguage)}</p><p>${api.escapeHTML(item.localization)}</p></section>
        <section class="ym17-brief-block is-wide"><h3>Full briefing</h3><p>${api.escapeHTML(item.brief)}</p><p><strong>Must include:</strong> ${api.escapeHTML(item.mustInclude || "Not provided")}</p><p><strong>References:</strong> ${api.escapeHTML(item.referenceLinks || "Not provided")}</p><p><strong>Additional notes:</strong> ${api.escapeHTML(item.additionalNotes || "Not provided")}</p></section>
        <section class="ym17-brief-block"><h3>Clarification for distributor</h3><div class="ym17-field"><textarea id="ym17-support-clarification" placeholder="What additional information is required?">${api.escapeHTML(meta.clarification)}</textarea></div><div class="ym17-inline-actions" style="margin-top:10px"><button class="ym17-button" type="button" data-support-modal-action="save-clarification">Save clarification request</button><button class="ym17-button is-secondary" type="button" data-support-modal-action="copy-clarification">Copy message</button><button class="ym17-button is-secondary" type="button" data-support-modal-action="email-clarification">Open email draft</button></div></section>
        <section class="ym17-brief-block"><h3>Private admin notes</h3><div class="ym17-field"><textarea id="ym17-support-note" placeholder="Visible to admin users only"></textarea></div><button class="ym17-button is-secondary" style="margin-top:10px" type="button" data-support-add-note>Save admin note</button><div style="margin-top:10px">${meta.notes.length ? meta.notes.map((note) => `<div class="ym17-alert"><strong>${new Date(note.createdAt).toLocaleString()}</strong><br>${api.escapeHTML(note.text)}</div>`).join("") : '<p class="ym17-help">No internal notes yet.</p>'}</div></section>
      </div>
    `;
    api.byId("ym17-support-modal-actions").innerHTML = `
      <div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-support-modal-action="copy-briefing">${api.icon("copy")} Copy briefing</button><label class="ym17-check"><input id="ym17-support-include-notes" type="checkbox"><span>Include internal admin notes in print</span></label><button class="ym17-button" type="button" data-support-modal-action="pdf">${api.icon("print")} Print / Save as PDF</button></div>
      <button class="ym17-button is-secondary" type="button" data-support-close>Close</button>
    `;
  }

  function openModal(id, trigger) {
    const item = requestById(id);
    if (!item) return;
    ensureModal();
    returnFocus = trigger || document.activeElement;
    setRequestMeta(id, { read: true });
    renderModal(id);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => api.qs("button,select,textarea,input", modal)?.focus());
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    const pendingNote = api.byId("ym17-support-note")?.value.trim();
    if (pendingNote && !window.confirm("You have an unsaved admin note. Close without saving?")) return;
    const closedId = activeRequestId;
    modal.hidden = true;
    document.body.style.overflow = "";
    activeRequestId = null;
    const focusTarget = returnFocus?.isConnected ? returnFocus : api.qs(`[data-support-open="${closedId}"]`);
    if (focusTarget?.focus) focusTarget.focus();
  }

  function modalKeydown(event) {
    if (!modal || modal.hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = api.qsa('button:not([disabled]),select:not([disabled]),textarea:not([disabled]),input:not([disabled]),a[href]', modal).filter((node) => node.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function addInternalNote() {
    const input = api.byId("ym17-support-note");
    const text = input && input.value.trim();
    if (!text) return api.notify("Write an internal note first.", "warning");
    const meta = requestMeta(activeRequestId);
    meta.notes = [...meta.notes, { id: api.uid("note"), text, createdAt: new Date().toISOString() }];
    if (!setRequestMeta(activeRequestId, meta)) return;
    renderModal(activeRequestId);
    api.track("Added admin support note", activeRequestId, "Support");
  }

  function printBriefing(item, includeNotes) {
    const host = document.createElement("article");
    host.className = "ym17-print-host ym17-support-print";
    const summary = requestSummary(item, true, includeNotes)
      .split("\n")
      .map((line) => `<p>${api.escapeHTML(line) || "&nbsp;"}</p>`)
      .join("");
    host.innerHTML = `
      <div class="ym17-support-print-brand">YANMAR AMPLIFY · SUPPORT REQUEST</div>
      <h1>${api.escapeHTML(item.title || item.requestType)}</h1>
      <p class="ym17-support-print-reference">${api.escapeHTML(item.reference)} · ${new Date(item.createdAt).toLocaleDateString()}</p>
      <div class="ym17-support-print-body">${summary}</div>
      <p class="ym17-support-print-note">Prototype briefing. Verify technical claims, local availability, approvals and source material before external use.</p>
    `;
    document.body.appendChild(host);
    document.body.classList.add("ym17-printing");
    const cleanup = () => {
      document.body.classList.remove("ym17-printing");
      host.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    window.setTimeout(cleanup, 1500);
    api.track("Printed support briefing", item.reference, "Support");
  }

  function handleModalAction(action) {
    const item = requestById(activeRequestId);
    if (!item) return;
    const meta = requestMeta(item.id);
    if (action === "copy-briefing") {
      api.copyText(requestSummary(item, true)).then(() => api.notify("Complete briefing copied."));
    }
    if (action === "pdf") printBriefing(item, Boolean(api.byId("ym17-support-include-notes")?.checked));
    if (action === "save-clarification") {
      const clarification = api.byId("ym17-support-clarification")?.value.trim() || "";
      if (!clarification) return api.notify("Write the required clarification first.", "warning");
      setRequestMeta(item.id, { clarification, status: "Waiting for distributor" });
      renderModal(item.id);
      api.notify("Clarification saved; status set to Waiting for distributor.");
    }
    if (action === "copy-clarification") {
      if (!meta.clarification) return api.notify("Write a clarification first.", "warning");
      api.copyText(meta.clarification).then(() => api.notify("Clarification copied."));
    }
    if (action === "email-clarification") {
      if (!meta.clarification) return api.notify("Write a clarification first.", "warning");
      const subject = encodeURIComponent(`${item.reference} · clarification requested`);
      const body = encodeURIComponent(`Hello ${item.contactName || item.distributor},\n\nThank you for your Yanmar Amplify support request.\n\n${meta.clarification}\n\nReference: ${item.reference}\n\nKind regards,\nYanmar Support`);
      window.location.href = `mailto:${encodeURIComponent(item.contactEmail || "")}?subject=${subject}&body=${body}`;
    }
  }

  function handleAdminClick(event) {
    const open = event.target.closest("[data-support-open]");
    if (open) {
      event.preventDefault();
      openModal(open.dataset.supportOpen, open);
      return;
    }
    const read = event.target.closest("[data-support-read]");
    if (read) {
      event.preventDefault();
      const meta = requestMeta(read.dataset.supportRead);
      setRequestMeta(read.dataset.supportRead, { read: !meta.read });
      return;
    }
  }

  function mountSupport() {
    supportRoot = api.byId("support");
    if (!supportRoot) return;
    supportRoot.classList.add("page", "stack");
    supportRoot.innerHTML = supportMarkup();
    api.byId("ym17-support-form").addEventListener("submit", submitRequest);
    api.byId("ym17-request-brief").addEventListener("input", (event) => {
      api.byId("ym17-request-counter").textContent = `${event.target.value.length} / 2000`;
    });
    supportRoot.addEventListener("click", (event) => {
      const copy = event.target.closest("[data-support-copy]");
      if (!copy) return;
      const item = requestById(copy.dataset.supportCopy);
      if (item) api.copyText(requestSummary(item, false)).then(() => api.notify("Request summary copied."));
    });
    renderDistributorRequests();
    document.addEventListener("ym17:contextchange", () => {
      const field = api.byId("ym17-request-distributor");
      if (field) field.value = activeDistributor();
      const region = api.byId("ym17-request-region");
      if (region) region.value = inferRegion(activeDistributor());
      renderDistributorRequests();
    });
  }

  function init() {
    mountSupport();
    mountAdmin();
    ensureModal();
    updateBadge();
    api.getSupportRequests = () => requests().map((item) => ({ ...item }));
    api.getSupportAdminMeta = (id) => ({ ...requestMeta(id), notes: requestMeta(id).notes.map((note) => ({ ...note })) });
    api.createSupportRequest = (values) => createSupportRequest(Object.fromEntries(Object.entries(values || {}).map(([key, value]) => [key, String(value ?? "").trim()])));
    api.updateSupportRequestMeta = (id, patch) => setRequestMeta(id, patch || {});
    api.openSupportRequest = openModal;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

;

/* ===== Source: ym-tco-v17.js ===== */
(function () {
  "use strict";

  const api = window.YanmarAmplifyV17;
  if (!api) return;

  const AUTOSAVE_KEY = "yanmarAmplifyTcoAutosaveFinal01";
  const SAVED_KEY = "yanmarAmplifyTcoSavedFinal01";
  const CURRENCIES = {
    EUR: { symbol: "€", fuel: [0.3, 5] },
    USD: { symbol: "$", fuel: [0.3, 7] },
    AED: { symbol: "د.إ", fuel: [1, 20] },
    SAR: { symbol: "﷼", fuel: [1, 20] },
    MXN: { symbol: "$", fuel: [5, 80] },
  };
  const FALLBACK_MODELS = {
    generators: ["YDG3700N", "YDG3700V", "YDG5500N", "YDG5500V"],
    pumps: ["YDP20N", "YDP30N", "YDP40N", "YDP30STN", "YDP30TN", "YDP40TN-E"],
    engines: ["L100V", "L100N"],
  };
  const CATEGORY_LABELS = {
    generators: "YDG Generators",
    pumps: "YDP Pumps",
    engines: "L-Series Engines",
  };
  const IMAGE_FALLBACKS = {
    generators: "./assets/YDG5500-white-background.png",
    pumps: "./assets/YDP-white-background.png",
    engines: "./assets/L-series-white-background.png",
  };

  let root = null;
  let state = normalizeState(api.readStore(AUTOSAVE_KEY, null));
  let calculations = [];
  let warningApprovalRequired = false;

  function optionRecord(index, reference) {
    return {
      id: api.uid(reference ? "yanmar" : "alternative"),
      reference: Boolean(reference),
      label: reference ? "Yanmar reference" : `Alternative ${index}`,
      purchase: "",
      setup: "",
      fuelConsumption: "",
      annualMaintenance: "",
      annualParts: "",
      downtimeHours: "",
      financeInsurance: "",
      annualRepairs: "",
      residualValue: "",
    };
  }

  function newState() {
    return {
      version: 2,
      category: "generators",
      model: "YDG5500V",
      title: "Yanmar total cost of ownership",
      currency: "EUR",
      years: "5",
      hours: "750",
      fuelPrice: "",
      downtimeCost: "",
      options: [optionRecord(0, true), optionRecord(1, false)],
      updatedAt: new Date().toISOString(),
    };
  }

  function normalizeState(raw) {
    const base = newState();
    if (!raw || raw.version !== 2) return base;
    const category = FALLBACK_MODELS[raw.category] ? raw.category : base.category;
    const models = modelsFor(category);
    const rawOptions = Array.isArray(raw.options) && raw.options.length ? raw.options : base.options;
    const options = rawOptions.slice(0, 5).map((item, index) => ({
      ...optionRecord(index, index === 0),
      ...(item || {}),
      id: item?.id || api.uid(index === 0 ? "yanmar" : "alternative"),
      reference: index === 0,
      label: index === 0 ? "Yanmar reference" : String(item?.label || `Alternative ${index}`),
    }));
    if (options.length < 2) options.push(optionRecord(1, false));
    return {
      ...base,
      ...raw,
      category,
      model: models.includes(raw.model) ? raw.model : models[0],
      currency: CURRENCIES[raw.currency] ? raw.currency : "EUR",
      options,
    };
  }

  function modelsFor(category) {
    const fromComparison = api.getYanmarProductsByCategory?.(category);
    if (Array.isArray(fromComparison) && fromComparison.length) return fromComparison.map((item) => item.id);
    return FALLBACK_MODELS[category] || FALLBACK_MODELS.generators;
  }

  function selectedProduct() {
    return api.getYanmarProductById?.(state.model) || null;
  }

  function imageForProduct() {
    return selectedProduct()?.image || IMAGE_FALLBACKS[state.category];
  }

  function optionsMarkup(values, current) {
    return values
      .map((value) => `<option value="${api.escapeHTML(value)}" ${value === current ? "selected" : ""}>${api.escapeHTML(value)}</option>`)
      .join("");
  }

  function money(value) {
    const amount = Number.isFinite(value) ? value : 0;
    try {
      return new Intl.NumberFormat(document.documentElement.lang || "en", {
        style: "currency",
        currency: state.currency,
        maximumFractionDigits: 2,
      }).format(amount);
    } catch (_error) {
      return `${CURRENCIES[state.currency]?.symbol || state.currency} ${amount.toFixed(2)}`;
    }
  }

  function parseNumber(value) {
    const raw = String(value == null ? "" : value).trim().replace(/\s+/g, "");
    if (!raw) return { empty: true, value: 0, valid: true };
    let normalized = raw;
    if (raw.includes(",") && raw.includes(".")) {
      const decimal = raw.lastIndexOf(",") > raw.lastIndexOf(".") ? "," : ".";
      const thousands = decimal === "," ? /\./g : /,/g;
      normalized = raw.replace(thousands, "").replace(decimal, ".");
    } else {
      normalized = raw.replace(",", ".");
    }
    if (!/^-?\d+(?:\.\d+)?$/.test(normalized)) return { empty: false, value: 0, valid: false };
    const parsed = Number(normalized);
    return { empty: false, value: parsed, valid: Number.isFinite(parsed) };
  }

  function readOptionField(option, field) {
    return parseNumber(option[field]);
  }

  function validate() {
    const errors = [];
    const warnings = [];
    const invalid = new Set();
    const years = parseNumber(state.years);
    const hours = parseNumber(state.hours);
    const fuelPrice = parseNumber(state.fuelPrice);
    const downtimeCost = parseNumber(state.downtimeCost);

    if (!years.valid || years.empty || years.value < 1 || years.value > 10) {
      errors.push("Ownership period must be a whole number from 1 to 10 years.");
      invalid.add("years");
    } else if (!Number.isInteger(years.value)) {
      errors.push("Ownership period must use whole years.");
      invalid.add("years");
    }
    if (!hours.valid || hours.empty || hours.value <= 0 || hours.value > 8760) {
      errors.push("Annual operating hours must be between 1 and 8,760.");
      invalid.add("hours");
    }
    if (!fuelPrice.valid || fuelPrice.empty || fuelPrice.value <= 0) {
      errors.push("Enter a valid fuel price greater than zero.");
      invalid.add("fuelPrice");
    } else {
      const [minimum, maximum] = CURRENCIES[state.currency].fuel;
      if (fuelPrice.value < minimum || fuelPrice.value > maximum) {
        warnings.push(`Fuel price ${state.currency} ${fuelPrice.value} is outside the usual review range (${minimum}–${maximum}).`);
      }
    }
    if (!downtimeCost.valid || downtimeCost.value < 0) {
      errors.push("Downtime cost per hour cannot be negative.");
      invalid.add("downtimeCost");
    } else if (downtimeCost.value > 10000) {
      warnings.push("Downtime cost per hour is unusually high. Confirm the business impact.");
    }

    state.options.forEach((option, index) => {
      const name = option.label.trim() || (index === 0 ? "Yanmar reference" : `Alternative ${index}`);
      if (!option.label.trim()) {
        errors.push(`Enter a name for ${index === 0 ? "the Yanmar reference" : `alternative ${index}`}.`);
        invalid.add(`${option.id}:label`);
      }
      ["purchase", "fuelConsumption", "annualMaintenance"].forEach((field) => {
        const parsed = readOptionField(option, field);
        if (!parsed.valid || parsed.empty || parsed.value < 0) {
          errors.push(`${name}: ${fieldLabel(field)} must contain a valid non-negative number.`);
          invalid.add(`${option.id}:${field}`);
        }
      });
      ["setup", "annualParts", "downtimeHours", "financeInsurance", "annualRepairs", "residualValue"].forEach((field) => {
        const parsed = readOptionField(option, field);
        if (!parsed.valid || parsed.value < 0) {
          errors.push(`${name}: ${fieldLabel(field)} cannot be negative or invalid.`);
          invalid.add(`${option.id}:${field}`);
        }
      });

      const purchase = readOptionField(option, "purchase").value;
      const fuel = readOptionField(option, "fuelConsumption").value;
      const maintenance = readOptionField(option, "annualMaintenance").value;
      const parts = readOptionField(option, "annualParts").value;
      const downtime = readOptionField(option, "downtimeHours").value;
      const residual = readOptionField(option, "residualValue").value;
      const setup = readOptionField(option, "setup").value;
      if (purchase > 500000) warnings.push(`${name}: purchase price looks unusually high for this equipment scope.`);
      if (fuel > 50) warnings.push(`${name}: fuel consumption above 50 litres per hour looks unusual.`);
      if (maintenance + parts > 100000) warnings.push(`${name}: annual maintenance and parts costs look unusually high.`);
      if (purchase > 0 && maintenance > purchase * 0.5) warnings.push(`${name}: annual maintenance exceeds 50% of the purchase price.`);
      if (hours.valid && downtime > hours.value) warnings.push(`${name}: downtime hours exceed annual operating hours.`);
      if (purchase > 0 && residual > purchase + setup) warnings.push(`${name}: residual value is higher than acquisition cost.`);
    });
    return { errors: Array.from(new Set(errors)), warnings: Array.from(new Set(warnings)), invalid };
  }

  function fieldLabel(field) {
    return {
      purchase: "purchase price",
      setup: "transport / setup",
      fuelConsumption: "fuel consumption",
      annualMaintenance: "annual maintenance",
      annualParts: "annual parts",
      downtimeHours: "annual downtime hours",
      financeInsurance: "annual finance / insurance",
      annualRepairs: "annual repair cost",
      residualValue: "residual value",
    }[field] || field;
  }

  function categoryOptions() {
    return Object.entries(CATEGORY_LABELS)
      .map(([value, label]) => `<option value="${value}" ${value === state.category ? "selected" : ""}>${label}</option>`)
      .join("");
  }

  function productCard(option, index) {
    const reference = index === 0;
    return `
      <article class="ym17-tco-product ${reference ? "is-yanmar" : ""}" data-tco-option="${option.id}">
        <div class="ym17-tco-product-head">
          <div>
            <span class="ym17-badge ${reference ? "is-brand" : ""}">${reference ? "Yanmar reference" : `Alternative ${index}`}</span>
            <h3>${api.escapeHTML(reference ? state.model : option.label || `Alternative ${index}`)}</h3>
          </div>
          ${reference ? "" : `<button class="ym17-icon-button is-danger" type="button" data-tco-action="remove" data-id="${option.id}" aria-label="Remove ${api.escapeHTML(option.label)}">${api.icon("close")}</button>`}
        </div>
        <div class="ym17-grid">
          <div class="ym17-field ym17-col-12"><label for="tco-label-${option.id}">Option name</label><input id="tco-label-${option.id}" data-tco-option-field="label" data-id="${option.id}" value="${api.escapeHTML(reference ? `Yanmar ${state.model}` : option.label)}" ${reference ? "readonly" : ""}></div>
          <div class="ym17-field ym17-col-4"><label for="tco-purchase-${option.id}">Purchase price (${state.currency})</label><input id="tco-purchase-${option.id}" inputmode="decimal" data-tco-option-field="purchase" data-id="${option.id}" value="${api.escapeHTML(option.purchase)}" placeholder="Required"></div>
          <div class="ym17-field ym17-col-4"><label for="tco-fuel-${option.id}">Fuel use (L/hour)</label><input id="tco-fuel-${option.id}" inputmode="decimal" data-tco-option-field="fuelConsumption" data-id="${option.id}" value="${api.escapeHTML(option.fuelConsumption)}" placeholder="Required"></div>
          <div class="ym17-field ym17-col-4"><label for="tco-maintenance-${option.id}">Annual maintenance (${state.currency})</label><input id="tco-maintenance-${option.id}" inputmode="decimal" data-tco-option-field="annualMaintenance" data-id="${option.id}" value="${api.escapeHTML(option.annualMaintenance)}" placeholder="Required"></div>
        </div>
        <details class="ym17-advanced">
          <summary>Advanced assumptions</summary>
          <div class="ym17-grid" style="margin-top:12px">
            ${advancedField(option, "setup", "Transport / setup")}
            ${advancedField(option, "annualParts", "Annual parts")}
            ${advancedField(option, "downtimeHours", "Downtime hours / year")}
            ${advancedField(option, "financeInsurance", "Finance / insurance / year")}
            ${advancedField(option, "annualRepairs", "Repair cost / year")}
            ${advancedField(option, "residualValue", "Residual value")}
          </div>
        </details>
      </article>
    `;
  }

  function advancedField(option, field, label) {
    const currency = field === "downtimeHours" ? "hours" : state.currency;
    return `<div class="ym17-field ym17-col-4"><label for="tco-${field}-${option.id}">${label} (${currency})</label><input id="tco-${field}-${option.id}" inputmode="decimal" data-tco-option-field="${field}" data-id="${option.id}" value="${api.escapeHTML(option[field])}" placeholder="Optional"></div>`;
  }

  function layout() {
    return `
      <div class="ym17-shell ym17-tco-shell" data-ym17-tco>
        <header class="ym17-header">
          <div>
            <p class="ym17-kicker">Lifecycle decision support</p>
            <h1>TCO Calculator</h1>
            <p class="ym17-subtitle">Compare acquisition and operating assumptions in three guided sections. No price or cost claim is prefilled: use current local evidence.</p>
          </div>
          <span class="ym17-badge is-brand">Smart input review</span>
        </header>

        <section class="ym17-panel" aria-labelledby="tco-products-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">1 · Products</p><h2 id="tco-products-title">Choose the Yanmar product and alternatives</h2></div>
            <button class="ym17-button is-secondary" type="button" data-tco-action="reset">Reset calculator</button>
          </div>
          <div class="ym17-grid">
            <div class="ym17-field ym17-col-4"><label for="tco-final-category">Product category</label><select id="tco-final-category" data-tco-bind="category">${categoryOptions()}</select></div>
            <div class="ym17-field ym17-col-4"><label for="tco-final-model">Yanmar model</label><select id="tco-final-model" data-tco-bind="model">${optionsMarkup(modelsFor(state.category), state.model)}</select></div>
            <div class="ym17-field ym17-col-4"><label for="tco-final-currency">Currency</label><select id="tco-final-currency" data-tco-bind="currency">${optionsMarkup(Object.keys(CURRENCIES), state.currency)}</select></div>
          </div>
          <div class="ym17-tco-reference">
            <img src="${api.escapeHTML(imageForProduct())}" alt="${api.escapeHTML(state.model)}" loading="lazy" decoding="async">
            <div><span class="ym17-badge is-brand">Yanmar product</span><h3>${api.escapeHTML(state.model)}</h3><p>Technical product identity comes from the portal product record. Commercial cost assumptions remain editable and must be locally verified.</p></div>
          </div>
          <div class="ym17-tco-products">${state.options.map(productCard).join("")}</div>
          <div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-tco-action="add" ${state.options.length >= 5 ? "disabled" : ""}>${api.icon("plus")} Add alternative</button><span class="ym17-help">Up to four alternatives can be compared with the Yanmar reference.</span></div>
        </section>

        <section class="ym17-panel" aria-labelledby="tco-assumptions-title">
          <div class="ym17-panel-head"><div><p class="ym17-kicker">2 · Assumptions</p><h2 id="tco-assumptions-title">Set the shared duty cycle</h2></div><span class="ym17-badge">1–10 years</span></div>
          <div class="ym17-grid">
            <div class="ym17-field ym17-col-6"><label for="tco-final-title">Sheet title</label><input id="tco-final-title" data-tco-bind="title" value="${api.escapeHTML(state.title)}"></div>
            <div class="ym17-field ym17-col-2"><label for="tco-final-years">Ownership period</label><input id="tco-final-years" inputmode="numeric" data-tco-bind="years" value="${api.escapeHTML(state.years)}"><span class="ym17-help">1–10 years</span></div>
            <div class="ym17-field ym17-col-2"><label for="tco-final-hours">Hours / year</label><input id="tco-final-hours" inputmode="decimal" data-tco-bind="hours" value="${api.escapeHTML(state.hours)}"></div>
            <div class="ym17-field ym17-col-2"><label for="tco-final-fuel-price">Fuel price / litre</label><input id="tco-final-fuel-price" inputmode="decimal" data-tco-bind="fuelPrice" value="${api.escapeHTML(state.fuelPrice)}"></div>
          </div>
          <details class="ym17-advanced">
            <summary>Advanced shared assumption</summary>
            <div class="ym17-grid" style="margin-top:12px"><div class="ym17-field ym17-col-4"><label for="tco-final-downtime-cost">Downtime cost / hour (${state.currency})</label><input id="tco-final-downtime-cost" inputmode="decimal" data-tco-bind="downtimeCost" value="${api.escapeHTML(state.downtimeCost)}"></div></div>
          </details>
          <div id="ym17-tco-validation" aria-live="polite" style="margin-top:14px"></div>
          <label class="ym17-check" id="ym17-tco-warning-confirm" hidden><input type="checkbox" id="ym17-tco-warning-checkbox"><span>I reviewed the unusual values and want to calculate with these assumptions.</span></label>
          <div class="ym17-inline-actions" style="margin-top:14px">
            <button class="ym17-button" type="button" data-tco-action="calculate">Calculate</button>
            <button class="ym17-button is-secondary" type="button" data-tco-action="save">Save assumptions</button>
            <button class="ym17-button is-secondary" type="button" data-tco-action="load">Load assumptions</button>
          </div>
        </section>

        <section class="ym17-panel" aria-labelledby="tco-results-title">
          <div class="ym17-panel-head">
            <div><p class="ym17-kicker">3 · Results</p><h2 id="tco-results-title">Total ownership cost</h2></div>
            <div class="ym17-inline-actions">
              <button class="ym17-button is-secondary" type="button" data-tco-action="csv">Download CSV</button>
              <button class="ym17-button is-secondary" type="button" data-tco-action="png">PNG</button>
              <button class="ym17-button is-secondary" type="button" data-tco-action="jpg">JPG</button>
              <button class="ym17-button" type="button" data-tco-action="print">${api.icon("print")} Print / Save as PDF</button>
            </div>
          </div>
          <div id="ym17-tco-results" class="ym17-preview-wrap"><div class="ym17-empty" style="padding:18px">Complete the required assumptions and select Calculate.</div></div>
          <p class="ym17-help" style="margin-top:12px">Results are based on assumptions entered by the user and are intended as an indicative comparison.</p>
        </section>

        <section class="ym17-panel" aria-labelledby="tco-saved-title">
          <div class="ym17-panel-head"><div><p class="ym17-kicker">Saved work</p><h2 id="tco-saved-title">Saved assumptions</h2></div><span class="ym17-badge">${savedItems().length} saved</span></div>
          <div class="ym17-drafts" id="ym17-tco-saved-list">${savedMarkup()}</div>
        </section>
      </div>
    `;
  }

  function calculateRows() {
    const years = parseNumber(state.years).value;
    const hours = parseNumber(state.hours).value;
    const fuelPrice = parseNumber(state.fuelPrice).value;
    const downtimeCost = parseNumber(state.downtimeCost).value;
    return state.options.map((option, index) => {
      const acquisition = readOptionField(option, "purchase").value + readOptionField(option, "setup").value;
      const fuel = readOptionField(option, "fuelConsumption").value * fuelPrice * hours * years;
      const maintenance = readOptionField(option, "annualMaintenance").value * years;
      const parts = readOptionField(option, "annualParts").value * years;
      const downtime = readOptionField(option, "downtimeHours").value * downtimeCost * years;
      const finance = readOptionField(option, "financeInsurance").value * years;
      const repairs = readOptionField(option, "annualRepairs").value * years;
      const residual = readOptionField(option, "residualValue").value;
      const total = Math.max(0, acquisition + fuel + maintenance + parts + downtime + finance + repairs - residual);
      return {
        id: option.id,
        reference: index === 0,
        label: index === 0 ? `Yanmar ${state.model}` : option.label,
        acquisition,
        fuel,
        maintenance,
        parts,
        downtime,
        finance,
        repairs,
        residual,
        total,
        perYear: total / years,
        perHour: total / (hours * years),
      };
    });
  }

  function resultsMarkup() {
    if (!calculations.length) return '<div class="ym17-empty" style="padding:18px">Complete the required assumptions and select Calculate.</div>';
    const best = calculations.reduce((lowest, row) => (row.total < lowest.total ? row : lowest), calculations[0]);
    return `<article class="ym17-export-sheet ym17-tco-output" data-ym17-tco-sheet>
      <header class="ym17-export-head"><div><p class="ym17-kicker">Yanmar Amplify TCO</p><h2>${api.escapeHTML(state.title)}</h2><p>${api.escapeHTML(CATEGORY_LABELS[state.category])} · ${api.escapeHTML(state.model)} · ${api.escapeHTML(state.currency)} · ${new Date().toLocaleDateString()}</p></div><div class="ym17-export-logo">YANMAR</div></header>
      <div class="ym17-tco-summary">
        <div><span>Ownership period</span><strong>${api.escapeHTML(state.years)} years</strong></div>
        <div><span>Operating hours</span><strong>${api.escapeHTML(state.hours)} / year</strong></div>
        <div><span>Fuel price</span><strong>${api.escapeHTML(state.currency)} ${api.escapeHTML(state.fuelPrice)}</strong></div>
        <div><span>Lowest calculated TCO</span><strong>${api.escapeHTML(best.label)}</strong></div>
      </div>
      <div class="ym17-table-scroll"><table class="ym17-export-table">
        <thead><tr><th>Product</th><th>Acquisition</th><th>Fuel</th><th>Maintenance</th><th>Parts</th><th>Downtime</th><th>Finance / insurance</th><th>Repairs</th><th>Residual deduction</th><th>Total TCO</th><th>Per year</th><th>Per hour</th><th>Difference</th></tr></thead>
        <tbody>${calculations.map((row) => `<tr><th>${api.escapeHTML(row.label)}${row.reference ? ' <span class="ym17-badge is-brand">Yanmar</span>' : ""}</th><td>${money(row.acquisition)}</td><td>${money(row.fuel)}</td><td>${money(row.maintenance)}</td><td>${money(row.parts)}</td><td>${money(row.downtime)}</td><td>${money(row.finance)}</td><td>${money(row.repairs)}</td><td>−${money(row.residual)}</td><td class="${row.reference ? "is-yanmar" : ""}">${money(row.total)}</td><td>${money(row.perYear)}</td><td>${money(row.perHour)}</td><td>${row.id === best.id ? "Lowest calculated" : `+${money(row.total - best.total)}`}</td></tr>`).join("")}</tbody>
      </table></div>
      <footer class="ym17-export-foot"><div><strong>Calculation note</strong><p>Results are based on assumptions entered by the user and are intended as an indicative comparison.</p></div><div><strong>Verification</strong><p>Confirm product configuration, fuel use, prices, service, downtime, finance, taxes and residual value with current local evidence.</p></div></footer>
    </article>`;
  }

  function renderValidation(audit) {
    const host = api.byId("ym17-tco-validation");
    if (!host) return;
    host.innerHTML = [
      ...audit.errors.map((message) => `<div class="ym17-alert is-danger">${api.escapeHTML(message)}</div>`),
      ...audit.warnings.map((message) => `<div class="ym17-alert is-warning">${api.escapeHTML(message)}</div>`),
      ...(audit.errors.length || audit.warnings.length
        ? []
        : ['<div class="ym17-alert is-success">Inputs are within the calculator review ranges. Verify local evidence before publication.</div>']),
    ].join("");
    api.qsa("[data-tco-bind], [data-tco-option-field]", root).forEach((input) => {
      const key = input.dataset.tcoBind || `${input.dataset.id}:${input.dataset.tcoOptionField}`;
      const invalid = audit.invalid.has(key);
      input.classList.toggle("is-invalid", invalid);
      input.setAttribute("aria-invalid", String(invalid));
    });
    const warning = api.byId("ym17-tco-warning-confirm");
    if (warning) warning.hidden = !audit.warnings.length;
  }

  function calculate() {
    const audit = validate();
    renderValidation(audit);
    if (audit.errors.length) {
      calculations = [];
      renderResults();
      api.notify("Review the highlighted TCO inputs before calculating.", "danger");
      return false;
    }
    if (audit.warnings.length && !api.byId("ym17-tco-warning-checkbox")?.checked) {
      calculations = [];
      renderResults();
      warningApprovalRequired = true;
      api.notify("Review the unusual values and confirm them before calculating.", "warning");
      return false;
    }
    warningApprovalRequired = false;
    calculations = calculateRows();
    renderResults();
    api.track("Calculated TCO sheet", state.title, state.category);
    api.notify("TCO calculation updated.");
    return true;
  }

  function renderResults() {
    const host = api.byId("ym17-tco-results");
    if (host) host.innerHTML = resultsMarkup();
  }

  function autosave() {
    state.updatedAt = new Date().toISOString();
    api.writeStore(AUTOSAVE_KEY, state);
  }

  function savedItems() {
    const items = api.readStore(SAVED_KEY, []);
    return Array.isArray(items) ? items : [];
  }

  function savedMarkup() {
    const items = savedItems();
    if (!items.length) return '<div class="ym17-empty" style="padding:16px">No saved assumptions yet. The current calculator is autosaved.</div>';
    return items.map((item) => `<article class="ym17-draft"><div><strong>${api.escapeHTML(item.title || "TCO assumptions")}</strong><span class="ym17-help">${api.escapeHTML(item.model || "Yanmar model")} · ${new Date(item.savedAt || Date.now()).toLocaleString()}</span></div><div class="ym17-inline-actions"><button class="ym17-button is-secondary" type="button" data-tco-action="open-saved" data-id="${api.escapeHTML(item.id)}">Open</button><button class="ym17-icon-button is-danger" type="button" data-tco-action="delete-saved" data-id="${api.escapeHTML(item.id)}" aria-label="Delete saved assumptions">${api.icon("close")}</button></div></article>`).join("");
  }

  function saveAssumptions() {
    const audit = validate();
    renderValidation(audit);
    if (audit.errors.length) return api.notify("Correct invalid assumptions before saving.", "danger");
    const item = { ...JSON.parse(JSON.stringify(state)), id: api.uid("tco"), savedAt: new Date().toISOString() };
    api.writeStore(SAVED_KEY, [item, ...savedItems()].slice(0, 30));
    api.track("Saved TCO assumptions", state.title, state.category);
    rerender();
    api.notify("TCO assumptions saved.");
  }

  function loadLatest() {
    const item = savedItems()[0];
    if (!item) return api.notify("No saved TCO assumptions are available.", "warning");
    state = normalizeState(item);
    calculations = [];
    autosave();
    rerender();
    api.notify("Latest saved assumptions loaded.");
  }

  function openSaved(id) {
    const item = savedItems().find((entry) => String(entry.id) === String(id));
    if (!item) return api.notify("Saved assumptions could not be found.", "danger");
    state = normalizeState(item);
    calculations = [];
    autosave();
    rerender();
    api.notify("Saved assumptions opened.");
  }

  function deleteSaved(id) {
    api.writeStore(SAVED_KEY, savedItems().filter((entry) => String(entry.id) !== String(id)));
    rerender();
  }

  function csvExport() {
    if (!calculations.length && !calculate()) return;
    const rows = [
      ["Product", "Acquisition", "Fuel", "Maintenance", "Parts", "Downtime", "Finance / insurance", "Repairs", "Residual deduction", "Total TCO", "Per year", "Per hour"],
      ...calculations.map((row) => [row.label, row.acquisition, row.fuel, row.maintenance, row.parts, row.downtime, row.finance, row.repairs, row.residual, row.total, row.perYear, row.perHour]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    api.download(`${api.slug(state.title)}.csv`, csv, "text/csv;charset=utf-8");
    api.track("Downloaded TCO CSV", state.title, state.category);
  }

  function printExport() {
    if (!calculations.length && !calculate()) return;
    const sheet = api.qs("[data-ym17-tco-sheet]", root);
    if (!sheet) return;
    const host = document.createElement("div");
    host.className = "ym17-print-host";
    host.innerHTML = sheet.outerHTML;
    document.body.appendChild(host);
    document.body.classList.add("ym17-printing");
    const cleanup = () => {
      document.body.classList.remove("ym17-printing");
      host.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    window.print();
    window.setTimeout(cleanup, 1500);
    api.track("Printed TCO sheet", state.title, state.category);
  }

  function canvasExport(format) {
    if (!calculations.length && !calculate()) return;
    const canvas = document.createElement("canvas");
    const width = 1800;
    const rowHeight = 64;
    canvas.width = width;
    canvas.height = 300 + calculations.length * rowHeight + 160;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#e60012";
    context.fillRect(0, 0, width, 12);
    context.fillStyle = "#e60012";
    context.font = "700 18px Arial";
    context.fillText("YANMAR AMPLIFY · TCO SHEET", 60, 58);
    context.fillStyle = "#111827";
    context.font = "800 38px Arial";
    context.fillText(state.title.slice(0, 64), 60, 112);
    context.fillStyle = "#475569";
    context.font = "18px Arial";
    context.fillText(`${state.model} · ${state.currency} · ${state.years} years · ${state.hours} hours/year`, 60, 154);
    const headers = ["Product", "Acquisition", "Fuel", "Maintenance", "Downtime", "Residual", "Total TCO", "Per hour"];
    const values = calculations.map((row) => [row.label, money(row.acquisition), money(row.fuel), money(row.maintenance + row.parts + row.repairs), money(row.downtime), money(row.residual), money(row.total), money(row.perHour)]);
    const tableX = 60;
    const tableY = 205;
    const columnWidth = (width - 120) / headers.length;
    [headers, ...values].forEach((row, rowIndex) => {
      row.forEach((value, columnIndex) => {
        const x = tableX + columnIndex * columnWidth;
        const y = tableY + rowIndex * rowHeight;
        context.fillStyle = rowIndex === 0 ? "#111827" : rowIndex % 2 ? "#f8fafc" : "#ffffff";
        context.fillRect(x, y, columnWidth, rowHeight);
        context.strokeStyle = "#cbd5e1";
        context.strokeRect(x, y, columnWidth, rowHeight);
        context.fillStyle = rowIndex === 0 ? "#ffffff" : columnIndex === 6 ? "#d60018" : "#111827";
        context.font = rowIndex === 0 || columnIndex === 6 ? "700 14px Arial" : "14px Arial";
        const text = String(value);
        context.fillText(text.length > 25 ? `${text.slice(0, 24)}…` : text, x + 8, y + 38);
      });
    });
    context.fillStyle = "#475569";
    context.font = "14px Arial";
    context.fillText("Indicative comparison based on user-entered assumptions. Verify all local evidence.", 60, tableY + (values.length + 1) * rowHeight + 48);
    const png = format === "png";
    const anchor = document.createElement("a");
    anchor.download = `${api.slug(state.title)}.${png ? "png" : "jpg"}`;
    anchor.href = canvas.toDataURL(png ? "image/png" : "image/jpeg", 0.94);
    anchor.click();
    api.track(`Downloaded TCO ${png ? "PNG" : "JPG"}`, state.title, state.category);
  }

  function addAlternative() {
    if (state.options.length >= 5) return api.notify("The calculator supports up to four alternatives.", "warning");
    state.options.push(optionRecord(state.options.length, false));
    autosave();
    rerender();
  }

  function removeAlternative(id) {
    state.options = state.options.filter((item) => item.reference || item.id !== id);
    if (state.options.length < 2) state.options.push(optionRecord(1, false));
    calculations = [];
    autosave();
    rerender();
  }

  function reset() {
    state = newState();
    calculations = [];
    api.writeStore(AUTOSAVE_KEY, state);
    rerender();
    api.notify("TCO calculator reset.");
  }

  function updateState(target) {
    if (target.dataset.tcoBind) {
      const field = target.dataset.tcoBind;
      state[field] = target.value;
      if (field === "category") {
        state.model = modelsFor(state.category)[0];
        calculations = [];
        autosave();
        rerender();
        return;
      }
      if (field === "model" || field === "currency") {
        if (field === "model") state.options[0].label = `Yanmar ${state.model}`;
        calculations = [];
        autosave();
        rerender();
        return;
      }
    }
    if (target.dataset.tcoOptionField) {
      const option = state.options.find((item) => item.id === target.dataset.id);
      if (option) option[target.dataset.tcoOptionField] = target.value;
    }
    calculations = [];
    warningApprovalRequired = false;
    const checkbox = api.byId("ym17-tco-warning-checkbox");
    if (checkbox) checkbox.checked = false;
    autosave();
    renderValidation(validate());
    renderResults();
  }

  function handleAction(button) {
    const action = button.dataset.tcoAction;
    if (action === "add") addAlternative();
    if (action === "remove") removeAlternative(button.dataset.id);
    if (action === "reset") reset();
    if (action === "calculate") calculate();
    if (action === "save") saveAssumptions();
    if (action === "load") loadLatest();
    if (action === "open-saved") openSaved(button.dataset.id);
    if (action === "delete-saved") deleteSaved(button.dataset.id);
    if (action === "csv") csvExport();
    if (action === "print") printExport();
    if (action === "png") canvasExport("png");
    if (action === "jpg") canvasExport("jpg");
  }

  function rerender() {
    root.innerHTML = layout();
    renderValidation(validate());
    renderResults();
  }

  function mount() {
    root = api.byId("tco-calculator");
    if (!root) return;
    root.classList.add("page", "stack");
    if (root.dataset.ym17TcoBound === "true") {
      return;
    }
    root.dataset.ym17TcoBound = "true";
    rerender();
    root.addEventListener("input", (event) => updateState(event.target));
    root.addEventListener("change", (event) => updateState(event.target));
    root.addEventListener("click", (event) => {
      const button = event.target.closest("[data-tco-action]");
      if (!button) return;
      event.preventDefault();
      handleAction(button);
    });
  }

  api.getTcoState = () => JSON.parse(JSON.stringify(state));
  api.calculateTco = calculate;
  api.mountTco = mount;
})();

;

/* ===== Source: ym-handoff-v18.js ===== */
(function () {
  "use strict";

  const BUILD_ID = "FINAL-YANMAR-AMPLIFY-20260723-02";
  let lastDistributorPage = "home";
  const ROUTE_ALIAS = {
    "ydg-models": "ydg",
    "ydp-models": "ydp",
    "lseries-models": "lseries",
    "brochure-library": "assets",
    "visual-workspace": "assets",
    campaigns: "visuals"
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function api() {
    return window.YanmarAmplifyV17 || null;
  }

  const KNOWLEDGE_ITEMS = [
    {
      id: "product-ydg",
      category: "Product knowledge",
      title: "YDG Generators",
      summary: "Use the current market datasheet to confirm output, voltage, frequency, start system, fuel data, dimensions, weight and emissions status.",
      guidance: ["Choose the exact local model before publishing a specification.", "Separate global N models from market-specific V models.", "Use Not available when a current verified value is missing."],
      source: "Supplied YDG series brochure and the verified YDG records embedded in Comparison Sheet Builder.",
      sourceHref: "assets/YDG-Series_Arabic_Brochure_V6.pdf",
      target: "ydg",
    },
    {
      id: "product-ydp",
      category: "Product knowledge",
      title: "YDP Pumps",
      summary: "Match pump type, connection size, capacity, total head, suction head, engine and start system to the exact local YDP model.",
      guidance: ["Do not compare clean-water and trash-pump duties as if they were identical.", "Confirm the test standard and unit before comparing capacity or head.", "Verify solids handling only from a current model source."],
      source: "Supplied YDP specification visual and the verified YDP records embedded in Comparison Sheet Builder.",
      sourceHref: "assets/YDP Specs.png",
      target: "ydp",
    },
    {
      id: "product-lseries",
      category: "Product knowledge",
      title: "L-Series Engines",
      summary: "Use the exact engine variant and local emissions requirement when discussing displacement, output, speed, cooling and starting system.",
      guidance: ["Confirm whether the application needs a global or regulated-market variant.", "Treat machine fit and installation requirements as application checks.", "Do not promise OEM compatibility without technical validation."],
      source: "L-Series product records and supplied L-Series product imagery in this portal.",
      target: "lseries",
    },
    {
      id: "application-power",
      category: "Application knowledge",
      title: "Construction, rental and backup power",
      summary: "YDG content should begin with the required duty cycle, electrical load, operating environment and local service expectation.",
      guidance: ["Construction: lead with dependable site power and verified output.", "Rental: explain application fit, service access and repeatable operation.", "Backup: confirm load, connection and operating plan before selection."],
      source: "Portal YDG application content; technical claims require the current local datasheet.",
      target: "ydg",
    },
    {
      id: "application-water",
      category: "Application knowledge",
      title: "Dewatering, flooding and facilities",
      summary: "YDP selection starts with the water type, required flow, lift, discharge distance, debris risk and access conditions.",
      guidance: ["Dewatering: confirm clean water or solids handling.", "Flood response: prioritize safe deployment and practical access.", "Facilities: explain downtime reduction without making unverified performance promises."],
      source: "Portal YDP application guidance and supplied campaign visuals.",
      target: "ydp",
    },
    {
      id: "application-irrigation",
      category: "Application knowledge",
      title: "Agriculture and irrigation",
      summary: "Connect the pump duty to source water, required capacity, total head, operating hours and local maintenance support.",
      guidance: ["Use application language before product jargon.", "Confirm water quality and suction conditions.", "State that final selection depends on local duty data."],
      source: "Portal regional messaging profiles and YDP product context.",
      target: "ydp",
    },
    {
      id: "application-events",
      category: "Application knowledge",
      title: "Events and temporary operations",
      summary: "Start with the temporary power or water-management duty, site access, operating hours, noise context and the local response plan.",
      guidance: ["Confirm the real load or pump duty.", "Plan safe placement, refuelling and service access.", "Use only the verified model data relevant to the event.", "Include a clear local contact route."],
      source: "Portal application planning principles; final equipment selection requires current local product data.",
      target: "calendar",
    },
    {
      id: "application-engines",
      category: "Application knowledge",
      title: "Industrial equipment and replacement engines",
      summary: "L-Series communication should focus on technical fit, professional support and verified engine configuration.",
      guidance: ["Capture the current machine and engine information.", "Confirm mounting, output, speed and emissions needs.", "Route final compatibility through technical support."],
      source: "Portal L-Series workspace; final machine compatibility requires technical review.",
      target: "lseries",
    },
    {
      id: "marketing-positioning",
      category: "Marketing guidance",
      title: "Approved product positioning",
      summary: "Lead with the customer's application and use verified product facts as proof. Avoid unsupported superlatives or automatic superiority claims.",
      guidance: ["Problem or duty first.", "Verified fact second.", "Local support and a clear next action last."],
      source: "Yanmar Amplify governance guidance and current product evidence workflow.",
      target: "website-copy",
    },
    {
      id: "marketing-localization",
      category: "Marketing guidance",
      title: "Localization and channel fit",
      summary: "Keep the central product story consistent while adapting examples, CTA, language, currency and priority to the selected market.",
      guidance: ["Use a native-language review before publishing.", "Match content length and CTA to the channel.", "Preserve model names, numbers and units during translation."],
      source: "Portal market profiles, Copy Studio and campaign guidance.",
      target: "website-copy",
    },
    {
      id: "marketing-evidence",
      category: "Marketing guidance",
      title: "Claims, evidence and brand use",
      summary: "Every technical claim needs a current source, correct market context and appropriate approval before external publication.",
      guidance: ["Record the source.", "Check model and measurement standard.", "Use approved Yanmar logos and supplied assets without distortion.", "Do not treat missing competitor data as a disadvantage."],
      source: "Portal approval workflow and supplied Yanmar assets.",
      target: "assets",
    },
    {
      id: "marketing-cta",
      category: "Marketing guidance",
      title: "CTA guidance",
      summary: "Use one concrete next action that a distributor can fulfil, such as requesting selection advice, availability or an application review.",
      guidance: ["Make the action specific.", "Match the CTA to the page purpose.", "Include a local response route.", "Avoid vague calls such as Learn more when a better action exists."],
      source: "Portal Copy Studio and campaign playbooks.",
      target: "website-copy",
    },
    {
      id: "tool-comparison",
      category: "Tool guidance",
      title: "How to use Comparison Sheet Builder",
      summary: "Choose a category and Yanmar model, add competitors manually, select relevant rows, then generate and export the evidence-led sheet.",
      guidance: ["Enter brand and model first.", "Add only facts supported by a source.", "Use up to four independent competitors.", "Review Not available values before publication.", "Download HTML, CSV or use Print / Save as PDF."],
      source: "Comparison Sheet Builder workflow in this release.",
      target: "competitive-intelligence",
    },
    {
      id: "tool-tco",
      category: "Tool guidance",
      title: "How to use TCO Calculator",
      summary: "Enter comparable assumptions for every product and use the result as an indicative lifecycle comparison, not as a guaranteed cost.",
      guidance: ["Use one currency and duty cycle.", "Enter local prices and fuel data.", "Open advanced assumptions only when evidence is available.", "Review unusual-value warnings.", "Save or export the final assumptions."],
      source: "TCO Calculator methodology and disclaimer in this release.",
      target: "tco-calculator",
    },
    {
      id: "tool-copy",
      category: "Tool guidance",
      title: "How to use Website Growth Guide",
      summary: "Select product, application, market and language, generate a draft, then edit the text and verify technical claims.",
      guidance: ["Add a clear search intent.", "Keep one primary page purpose.", "Use the score as guidance, not a ranking guarantee.", "Complete native-language and product approval before publishing."],
      source: "Website Growth Guide and linked Google Search guidance.",
      target: "website-copy",
    },
    {
      id: "tool-calendar",
      category: "Tool guidance",
      title: "How to use Content Calendar",
      summary: "Plan category-specific campaigns, localization deadlines and follow-up, then record completion for Admin visibility.",
      guidance: ["Filter by product category.", "Open the relevant month or list.", "Assign timing and channel.", "Mark completed work and report results."],
      source: "Content Calendar workflow in this portal.",
      target: "calendar",
    },
    {
      id: "tool-support",
      category: "Tool guidance",
      title: "How to submit a Support Request",
      summary: "Create a complete briefing with objective, audience, channel, language, deadline, requested material and local context.",
      guidance: ["Use a specific request title.", "Explain the business need and desired action.", "Add source links and must-include details.", "Submit and track the request in the saved overview."],
      source: "Support Request workflow in this release.",
      target: "support",
    },
    {
      id: "faq-model",
      category: "Frequently asked questions",
      title: "Which YDG model information should I use?",
      summary: "Use the exact model and market version shown on the current local Yanmar datasheet. Do not copy a similar model's value.",
      guidance: ["Confirm model suffix.", "Confirm frequency and voltage.", "Confirm local emissions status.", "Record the source date."],
      source: "Supplied YDG brochure and current local Yanmar documentation.",
      target: "ydg",
    },
    {
      id: "faq-comparison",
      category: "Frequently asked questions",
      title: "How do I choose comparison specifications?",
      summary: "Select only the facts that affect the customer's real application and can be compared using compatible standards.",
      guidance: ["Start with recommended rows.", "Hide irrelevant rows.", "Check units and test conditions.", "Keep qualitative support separate from numerical facts."],
      source: "Comparison Sheet Builder evidence guidance.",
      target: "competitive-intelligence",
    },
    {
      id: "faq-not-available",
      category: "Frequently asked questions",
      title: "What does Not available mean?",
      summary: "The portal does not have a verified value for that exact product and market. It is not evidence that a feature is absent or inferior.",
      guidance: ["Check the current source.", "Ask the manufacturer or Admin.", "Leave the field as Not available until verified."],
      source: "Comparison evidence policy in this release.",
      target: "competitive-intelligence",
    },
    {
      id: "faq-value",
      category: "Frequently asked questions",
      title: "How should I explain Yanmar value against a cheaper product?",
      summary: "Use verified application fit, service support and transparent ownership assumptions rather than unsupported superiority language.",
      guidance: ["Compare the same duty.", "Use TCO when local assumptions are available.", "Explain support and evidence separately.", "Do not hide purchase price."],
      source: "TCO and comparison governance in this portal.",
      target: "tco-calculator",
    },
    {
      id: "faq-localize",
      category: "Frequently asked questions",
      title: "Can I localize the supplied copy?",
      summary: "Yes. Adapt language, examples and CTA while preserving approved facts, model names, units, brand rules and required approvals.",
      guidance: ["Use Copy Studio as a draft.", "Have a native speaker review it.", "Recheck technical claims after translation."],
      source: "Website Growth Guide localization guidance.",
      target: "website-copy",
    },
    {
      id: "faq-tco",
      category: "Frequently asked questions",
      title: "When should I use TCO?",
      summary: "Use TCO when purchase price alone does not explain the expected ownership cost and comparable local assumptions are available.",
      guidance: ["Use the same period, hours and currency for every product.", "Enter local fuel and service assumptions.", "Show the assumptions with the result.", "Describe the result as indicative, not guaranteed."],
      source: "TCO Calculator methodology in this release.",
      target: "tco-calculator",
    },
    {
      id: "faq-verify",
      category: "Frequently asked questions",
      title: "Which claims require local verification?",
      summary: "Technical specifications, prices, availability, emissions status, warranty, compliance and comparative claims require current local verification.",
      guidance: ["Record the source.", "Confirm the market.", "Use the approval workflow before external publication."],
      source: "Portal governance and approval workflow.",
      target: "assets",
    },
    {
      id: "faq-missing-asset",
      category: "Frequently asked questions",
      title: "How do I request an unavailable asset?",
      summary: "Open Support Request and provide the product, objective, channel, language, timing, format and local context.",
      guidance: ["Reference any existing material.", "State what must be included.", "Add a realistic deadline.", "Track the saved request."],
      source: "Support Request workflow in this release.",
      target: "support",
    },
    {
      id: "faq-storage",
      category: "Frequently asked questions",
      title: "What is stored in this static prototype?",
      summary: "Theme, language, selected distributor, drafts, assumptions, support requests and demo activity are stored in this browser using localStorage.",
      guidance: ["Data is device-specific.", "Clearing browser data removes saved work.", "Do not treat prototype storage as secure production storage."],
      source: "Release architecture and README.",
      target: "home",
    },
    {
      id: "faq-backend",
      category: "Frequently asked questions",
      title: "What requires a future backend?",
      summary: "Secure accounts, shared files, real permissions, email, CRM, multi-user workflows and live analytics require server-side production services.",
      guidance: ["The current portal simulates these workflows.", "Use exported evidence for the pilot.", "Define security and data ownership before production."],
      source: "Static prototype limitations documented in this release.",
      target: "home",
    },
    {
      id: "admin-knowledge",
      category: "Admin guidance",
      roles: ["admin"],
      title: "Maintain knowledge and source status",
      summary: "Admin reviews source quality, updates approved content and keeps Distributor guidance separate from internal notes.",
      guidance: ["Check the source and review date.", "Separate verified facts from editable guidance.", "Use content management for approved updates.", "Do not expose private Admin notes to Distributor users."],
      source: "Admin content-management and approval workflow.",
      target: "admin-content-manager",
    },
  ];

  let knowledgeMounted = false;
  let knowledgeQuery = "";
  let knowledgeCategory = "All";
  let knowledgeSelectedId = "";

  function knowledgeRole() {
    return document.body.classList.contains("admin-mode") ? "admin" : "distributor";
  }

  function knowledgeItemsForRole() {
    const role = knowledgeRole();
    return KNOWLEDGE_ITEMS.filter((item) => !item.roles || item.roles.includes(role));
  }

  function filteredKnowledgeItems() {
    const query = knowledgeQuery.trim().toLowerCase();
    return knowledgeItemsForRole().filter((item) => {
      if (knowledgeCategory !== "All" && item.category !== knowledgeCategory) return false;
      if (!query) return true;
      return [item.title, item.summary, item.category, item.source, ...(item.guidance || [])].join(" ").toLowerCase().includes(query);
    });
  }

  function knowledgeAction(item) {
    if (!item?.target || !byId(item.target)) return "";
    const attribute = knowledgeRole() === "admin" && item.target.startsWith("admin-") ? "data-admin-target" : knowledgeRole() === "admin" ? "data-admin-tool-target" : "data-page";
    return `<button class="ym17-button" type="button" ${attribute}="${item.target}">Open feature</button>`;
  }

  function renderKnowledge() {
    const shell = byId("ym-knowledge-shell");
    if (!shell) return;
    const categorySelect = byId("ym-knowledge-category");
    const categories = ["All", ...new Set(knowledgeItemsForRole().map((item) => item.category))];
    if (!categories.includes(knowledgeCategory)) knowledgeCategory = "All";
    if (categorySelect) {
      categorySelect.innerHTML = categories.map((category) => `<option>${category}</option>`).join("");
      categorySelect.value = knowledgeCategory;
    }
    const items = filteredKnowledgeItems();
    if (!items.some((item) => item.id === knowledgeSelectedId)) knowledgeSelectedId = items[0]?.id || "";
    const selected = items.find((item) => item.id === knowledgeSelectedId);
    const list = byId("ym-knowledge-results");
    const detail = byId("ym-knowledge-detail");
    const count = byId("ym-knowledge-count");
    if (count) count.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;
    if (list) {
      list.innerHTML = items.length
        ? items.map((item) => `<button class="ym-knowledge-result ${item.id === knowledgeSelectedId ? "is-active" : ""}" type="button" data-knowledge-id="${item.id}"><span>${item.category}</span><strong>${item.title}</strong><small>${item.summary}</small></button>`).join("")
        : '<div class="ym17-empty">No knowledge items match this search. Try another category or a shorter keyword.</div>';
    }
    if (detail) {
      detail.innerHTML = selected
        ? `<p class="ym17-kicker">${selected.category}</p><h2>${selected.title}</h2><p class="ym-guide-purpose">${selected.summary}</p><h3>How to use this guidance</h3><ol>${selected.guidance.map((step) => `<li>${step}</li>`).join("")}</ol><div class="ym-knowledge-source"><strong>Source and status</strong><p>${selected.source}</p>${selected.sourceHref ? `<a href="${selected.sourceHref}" target="_blank" rel="noreferrer">Open supplied source</a>` : ""}</div><div class="ym-step-footer">${knowledgeAction(selected)}</div>`
        : '<div class="ym17-empty">No matching knowledge item is available.</div>';
    }
  }

  function mountKnowledge() {
    const page = byId("demo");
    if (!page) return;
    if (!knowledgeMounted) {
      knowledgeMounted = true;
      page.innerHTML = `<div class="ym-knowledge-shell" id="ym-knowledge-shell">
        <header class="ym17-header">
          <div><p class="ym17-kicker">Searchable internal guidance</p><h1>Portal Knowledge</h1><p class="ym17-subtitle">Find product context, application guidance, marketing rules, tool instructions, frequently asked questions and supplied sources.</p></div>
        </header>
        <section class="ym17-panel">
          <div class="ym-knowledge-controls">
            <div class="ym17-field"><label for="ym-knowledge-search">Search knowledge</label><input id="ym-knowledge-search" type="search" placeholder="Search products, applications, tools or questions"></div>
            <div class="ym17-field"><label for="ym-knowledge-category">Category</label><select id="ym-knowledge-category"></select></div>
            <span class="ym17-badge" id="ym-knowledge-count">0 results</span>
          </div>
          <div class="ym-knowledge-grid">
            <nav class="ym-knowledge-results" id="ym-knowledge-results" aria-label="Knowledge results"></nav>
            <article class="ym-knowledge-detail" id="ym-knowledge-detail"></article>
          </div>
        </section>
      </div>`;
      byId("ym-knowledge-search")?.addEventListener("input", (event) => {
        knowledgeQuery = event.target.value;
        renderKnowledge();
      });
      byId("ym-knowledge-category")?.addEventListener("change", (event) => {
        knowledgeCategory = event.target.value;
        renderKnowledge();
      });
      byId("ym-knowledge-results")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-knowledge-id]");
        if (!button) return;
        knowledgeSelectedId = button.dataset.knowledgeId;
        renderKnowledge();
      });
    }
    renderKnowledge();
  }

  function ensureMounted(pageId) {
    const portal = api();
    if (!portal) return;
    if (pageId === "admin" || pageId.startsWith("admin-")) {
      window.__ymInitializeAdminViews?.();
    }
    if (pageId === "competitive-intelligence") portal.mountComparison?.();
    if (pageId === "tco-calculator") portal.mountTco?.();
    if (pageId === "demo") mountKnowledge();
  }

  function syncKnowledgeRole() {
    if (knowledgeMounted) renderKnowledge();
  }

  function openRoute(pageId, adminMode, sharedTool) {
    pageId = ROUTE_ALIAS[pageId] || pageId;
    const portal = api();
    if (!portal || !pageId || !byId(pageId)) return false;
    ensureMounted(pageId);
    if (!adminMode) lastDistributorPage = pageId;
    const opened = portal.openPortalRoute?.(pageId, Boolean(adminMode), Boolean(sharedTool));
    if (opened && pageId === "demo") syncKnowledgeRole();
    return Boolean(opened);
  }

  function installAdminKnowledgeLink() {
    const sidebar = document.querySelector("main > .admin-sidebar");
    if (!sidebar || sidebar.querySelector('[data-admin-tool-target="demo"]')) return;
    const button = document.createElement("button");
    button.className = "nav-button";
    button.type = "button";
    button.dataset.adminToolTarget = "demo";
    button.innerHTML = `<span class="nav-icon">${api()?.icon?.("book") || ""}</span><span class="nav-text">Portal Knowledge</span><span aria-hidden="true">›</span>`;
    const firstGroup = sidebar.querySelector(".nav-group");
    if (firstGroup) firstGroup.after(button);
    else sidebar.prepend(button);
  }

  function normalizeNavigationRows() {
    document
      .querySelectorAll(".sidebar .nav-button, .admin-sidebar .nav-button")
      .forEach((button) => {
        button.classList.add("portal-nav-item");
        if (!button.hasAttribute("type")) button.setAttribute("type", "button");

        const children = Array.from(button.children);
        const last = children[children.length - 1];
        if (
          last &&
          last.tagName === "SPAN" &&
          !last.classList.contains("nav-icon") &&
          !last.classList.contains("nav-text") &&
          !last.classList.contains("nav-badge")
        ) {
          last.classList.add("nav-arrow");
          last.setAttribute("aria-hidden", "true");
        }
      });
  }

  function installRouteGuard() {
    window.addEventListener(
      "click",
      (event) => {
        const roleToggle = event.target.closest?.("#admin-toggle");
        const adminBack = event.target.closest?.("#admin-back-button");
        const adminTool = event.target.closest?.("[data-admin-tool-target]");
        const adminTarget = event.target.closest?.("[data-admin-target]");
        const distributorTarget = event.target.closest?.("[data-page]");
        if (!roleToggle && !adminBack && !adminTool && !adminTarget && !distributorTarget) return;

        event.preventDefault();
        event.stopImmediatePropagation();

        if (roleToggle) {
          if (document.body.classList.contains("admin-mode")) openRoute(lastDistributorPage || "home", false, false);
          else openRoute("admin", true, false);
          return;
        }
        if (adminBack) {
          openRoute(lastDistributorPage || "home", false, false);
          return;
        }
        if (adminTool) {
          openRoute(adminTool.dataset.adminToolTarget, true, true);
          return;
        }
        if (adminTarget) {
          openRoute(adminTarget.dataset.adminTarget, true, false);
          return;
        }
        if (distributorTarget?.dataset.page) {
          openRoute(distributorTarget.dataset.page, false, false);
        }
      },
      true,
    );
  }

  let suppressNextHeaderClick = false;

  function applyThemeImmediately(nextTheme) {
    const dark = nextTheme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.body.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark", dark);
    const button = byId("theme-toggle");
    if (button) {
      const label = dark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", String(dark));
    }
    try {
      localStorage.setItem("yanmarDistributorPortalTheme", dark ? "dark" : "light");
    } catch (_error) {
      // The theme remains active for the current session.
    }
  }

  function toggleThemeImmediately() {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.body.classList.contains("dark-mode");
    applyThemeImmediately(isDark ? "light" : "dark");
  }

  function installInstantHeaderControls() {
    document.addEventListener(
      "pointerdown",
      (event) => {
        const themeToggle = event.target.closest?.("#theme-toggle");
        const roleToggle = event.target.closest?.("#admin-toggle");
        if (!themeToggle && !roleToggle) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressNextHeaderClick = true;
        if (themeToggle) {
          toggleThemeImmediately();
          return;
        }
        if (roleToggle) {
          if (document.body.classList.contains("admin-mode")) openRoute(lastDistributorPage || "home", false, false);
          else openRoute("admin", true, false);
          api()?.ensureAdminIcon?.();
        }
      },
      true,
    );

    document.addEventListener(
      "click",
      (event) => {
        if (!suppressNextHeaderClick) return;
        if (!event.target.closest?.("#theme-toggle, #admin-toggle")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        suppressNextHeaderClick = false;
      },
      true,
    );

    document.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        const themeToggle = event.target.closest?.("#theme-toggle");
        const roleToggle = event.target.closest?.("#admin-toggle");
        if (!themeToggle && !roleToggle) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (themeToggle) toggleThemeImmediately();
        if (roleToggle) {
          if (document.body.classList.contains("admin-mode")) openRoute(lastDistributorPage || "home", false, false);
          else openRoute("admin", true, false);
          api()?.ensureAdminIcon?.();
        }
      },
      true,
    );
  }

  function markBuild() {
    document.documentElement.dataset.ymBuild = BUILD_ID;
    let marker = document.querySelector('meta[name="yanmar-amplify-build"]');
    if (!marker) {
      marker = document.createElement("meta");
      marker.name = "yanmar-amplify-build";
      document.head.appendChild(marker);
    }
    marker.content = BUILD_ID;
  }

  function init() {
    markBuild();
    installAdminKnowledgeLink();
    normalizeNavigationRows();
    installRouteGuard();
    api()?.ensureAdminIcon?.();
    syncKnowledgeRole();
    window.YanmarAmplifyLegacy?.updateSearchIndex?.();
    document.addEventListener("ym17:core-ready", () => {
      installAdminKnowledgeLink();
      normalizeNavigationRows();
      api()?.ensureAdminIcon?.();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

;

/* ===== Source: ym-final-cleanup-v19.js ===== */
/* FINAL-YANMAR-AMPLIFY-20260723-02
   NAVIGATION-FIX-20260723-02
   SWITCHING-FIX-20260723-02
   COMPARISON-FIX-20260723-02
   CLEANUP-REPORT-20260723-02 */
(function () {
  "use strict";

  if (window.__ymFinalCleanupV19Installed) return;
  window.__ymFinalCleanupV19Installed = true;

  const BUILD = "FINAL-YANMAR-AMPLIFY-20260723-02";
  const MARKERS = [
    BUILD,
    "NAVIGATION-FIX-20260723-02",
    "SWITCHING-FIX-20260723-02",
    "COMPARISON-FIX-20260723-02",
    "CLEANUP-REPORT-20260723-02",
  ];
  const api = (window.YanmarAmplifyV17 = window.YanmarAmplifyV17 || {});
  const byId = (id) => document.getElementById(id);
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function markBuild() {
    let marker = qs('meta[name="yanmar-amplify-build"]');
    if (!marker) {
      marker = document.createElement("meta");
      marker.name = "yanmar-amplify-build";
      document.head.appendChild(marker);
    }
    marker.content = BUILD;
    document.documentElement.dataset.yanmarBuild = BUILD;
    document.documentElement.dataset.navigationFix = "NAVIGATION-FIX-20260723-02";
    document.documentElement.dataset.switchingFix = "SWITCHING-FIX-20260723-02";
    document.documentElement.dataset.comparisonFix = "COMPARISON-FIX-20260723-02";
  }

  function normalizeNavigationRows() {
    qsa(".sidebar .nav-button, .admin-sidebar .nav-button").forEach((button) => {
      button.classList.add("portal-nav-item", "ym19-nav-item");
      if (!button.hasAttribute("type")) button.type = "button";
      const spans = Array.from(button.children);
      const last = spans[spans.length - 1];
      if (
        last &&
        last.tagName === "SPAN" &&
        !last.classList.contains("nav-icon") &&
        !last.classList.contains("nav-text") &&
        !last.classList.contains("nav-badge")
      ) {
        last.classList.add("nav-arrow");
        last.setAttribute("aria-hidden", "true");
      }
    });
  }

  function syncRoleState() {
    const isAdmin =
      document.body.classList.contains("admin-mode") ||
      document.body.classList.contains("admin-view") ||
      (typeof api.isAdmin === "function" && api.isAdmin());
    const role = isAdmin ? "admin" : "distributor";
    document.documentElement.dataset.role = role;
    document.body.dataset.role = role;
    api.ensureAdminIcon?.();
    window.YanmarAmplifyLegacy?.updateSearchIndex?.();
    normalizeNavigationRows();
  }

  function applyThemeNow(theme, persist = true) {
    const dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.body.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark", dark);
    const button = byId("theme-toggle");
    if (button) {
      const label = dark ? "Switch to light mode" : "Switch to dark mode";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.setAttribute("aria-pressed", String(dark));
    }
    if (persist) {
      try {
        localStorage.setItem("yanmarDistributorPortalTheme", dark ? "dark" : "light");
      } catch (_error) {
        // Theme stays active for this session.
      }
    }
  }

  function installFastSwitchWrappers() {
    if (api.__ym19SwitchWrappersInstalled) return;
    api.__ym19SwitchWrappersInstalled = true;

    const originalApplyTheme = api.applyTheme;
    api.applyTheme = function ym19ApplyTheme(theme, persist = true) {
      applyThemeNow(theme, persist);
      if (typeof originalApplyTheme === "function") {
        try {
          originalApplyTheme.call(api, theme, persist);
        } catch (_error) {
          applyThemeNow(theme, persist);
        }
      }
    };

    const originalOpenPortalRoute = api.openPortalRoute;
    api.openPortalRoute = function ym19OpenPortalRoute(pageId, adminMode = false, sharedTool = false) {
      const result =
        typeof originalOpenPortalRoute === "function"
          ? originalOpenPortalRoute.call(api, pageId, adminMode, sharedTool)
          : false;
      syncRoleState();
      if (pageId === "competitive-intelligence") safeInitializeComparison();
      if (pageId === "tco-calculator") api.mountTco?.();
      return result;
    };
  }

  function safeInitializeComparison() {
    const root = byId("competitive-intelligence");
    if (!root) return false;
    try {
      const ok =
        api.initializeComparisonBuilder?.() ||
        api.mountComparison?.() ||
        false;
      if (!ok && /Loading guided comparison tool/i.test(root.textContent || "")) {
        root.innerHTML =
          '<section class="ym17-shell ym17-comparison-shell"><div class="ym17-panel ym17-cmp-panel"><p class="ym17-kicker">Comparison Builder</p><h1>The Comparison Sheet Builder could not be loaded.</h1><p class="ym17-help">Retry from the navigation. If this continues, reset saved comparison data.</p></div></section>';
      }
      return Boolean(ok);
    } catch (error) {
      root.innerHTML = `<section class="ym17-shell ym17-comparison-shell"><div class="ym17-panel ym17-cmp-panel"><p class="ym17-kicker">Comparison Builder</p><h1>The Comparison Sheet Builder could not be loaded.</h1><p class="ym17-help">Retry the builder or reset saved comparison data.</p><pre class="ym17-admin-reason">${String(error && error.message ? error.message : error)}</pre></div></section>`;
      return false;
    }
  }

  function installRouteGuards() {
    document.addEventListener(
      "click",
      (event) => {
        const comparisonTrigger = event.target.closest?.(
          '[data-page="competitive-intelligence"],[data-admin-tool-target="competitive-intelligence"],[data-admin-target="admin-comparison-tool"]',
        );
        if (comparisonTrigger) {
          safeInitializeComparison();
          syncRoleState();
        }
      },
      true,
    );
  }

  function installThemePointerFallback() {
    document.addEventListener(
      "pointerdown",
      (event) => {
        const themeToggle = event.target.closest?.("#theme-toggle");
        if (!themeToggle) return;
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyThemeNow(nextTheme);
      },
      true,
    );
  }

  function installBuildLabel() {
    const admin = byId("admin");
    if (!admin || admin.querySelector("[data-ym19-build-label]")) return;
    const label = document.createElement("p");
    label.dataset.ym19BuildLabel = "true";
    label.className = "ym17-help";
    label.style.marginTop = "18px";
    label.textContent = `Technical build: ${MARKERS.join(" · ")}`;
    admin.appendChild(label);
  }

  function init() {
    markBuild();
    installFastSwitchWrappers();
    installRouteGuards();
    normalizeNavigationRows();
    syncRoleState();
    installBuildLabel();
    if (byId("competitive-intelligence")?.classList.contains("active")) {
      safeInitializeComparison();
    }
    document.addEventListener("ym17:core-ready", () => {
      installFastSwitchWrappers();
      normalizeNavigationRows();
      syncRoleState();
      installBuildLabel();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

;

/* ===== Source: ym-visible-final-fix-v21.js ===== */
/*
  Visible final fix for the active GitHub handoff file.
  VISIBLE-FINAL-FIX-20260723-03
  NAV-SUBMENU-REMOVED-20260723-03
  WEBSITE-GROWTH-COMPACT-20260723-03
  COMPARISON-BUILT-20260723-06
  GITHUB-READY-CHECK-20260723-03
*/
(function () {
  "use strict";

  const api = window.YanmarAmplifyV17 || window.YanmarPortal || {};
  window.YanmarAmplifyV17 = api;
  window.YanmarPortal = api;
  const STORAGE = "yanmarAmplifyComparisonV21";
  const NA = "Not available";

  const cats = {
    generators: {
      label: "YDG Generators",
      fields: [["model", "Model"], ["ratedOutput", "Rated output"], ["frequency", "Frequency"], ["runtime75", "Runtime at 75% load"], ["fuelTank", "Fuel tank"], ["startingSystem", "Starting system"], ["stageV", "Stage V / emissions"], ["serviceSupport", "Service support"], ["application", "Typical application"], ["notes", "Notes"]],
    },
    pumps: {
      label: "YDP Pumps",
      fields: [["model", "Model"], ["pumpType", "Pump type"], ["portSize", "Inlet / outlet size"], ["maxCapacity", "Maximum capacity"], ["maxHead", "Maximum total head"], ["suctionLift", "Maximum suction head"], ["engineModel", "Engine model"], ["startingSystem", "Starting system"], ["application", "Typical application"], ["notes", "Notes"]],
    },
    engines: {
      label: "L-Series Engines",
      fields: [["model", "Model"], ["displacement", "Displacement"], ["ratedOutput", "Rated output"], ["ratedSpeed", "Rated speed"], ["cooling", "Cooling system"], ["startingSystem", "Starting system"], ["emissions", "Emissions"], ["application", "Typical application"], ["notes", "Notes"]],
    },
  };

  const products = [
    p("generators", "YDG3700N", "YDG3700N diesel generator", "assets/YDG3700-white-background.png", { model: "YDG3700N", ratedOutput: "3.2 kVA", frequency: "50 / 60 Hz", runtime75: NA, fuelTank: NA, startingSystem: "Electric and recoil options shown in supplied visual; verify exact local model", stageV: NA, serviceSupport: "Local Yanmar distributor service support", application: "Construction, rental, agriculture and site support", notes: "Verify latest local datasheet before publishing" }),
    p("generators", "YDG3700V", "YDG3700V diesel generator", "assets/YDG3700-white-background.png", { model: "YDG3700V", ratedOutput: "3.3 kVA", frequency: "50 Hz", runtime75: NA, fuelTank: NA, startingSystem: "Electric and recoil options shown in supplied visual; verify exact local model", stageV: "EU Stage V model", serviceSupport: "Local Yanmar distributor service support", application: "European professional portable power", notes: "Verify latest local datasheet before publishing" }),
    p("generators", "YDG5500N", "YDG5500N diesel generator", "assets/YDG5500-white-background.png", { model: "YDG5500N", ratedOutput: "5.1 kVA", frequency: "50 / 60 Hz", runtime75: NA, fuelTank: NA, startingSystem: NA, stageV: NA, serviceSupport: "Local Yanmar distributor service support", application: "Demanding job sites and backup use", notes: NA }),
    p("generators", "YDG5500V", "YDG5500V diesel generator", "assets/YDG5500-white-background.png", { model: "YDG5500V", ratedOutput: "5.1 kVA", frequency: "50 Hz", runtime75: NA, fuelTank: NA, startingSystem: NA, stageV: "EU Stage V model", serviceSupport: "Local Yanmar distributor service support", application: "Higher-output European portable power", notes: NA }),
    pump("YDP20N", "Fresh water pump", "2 in / 50 mm", "550 L/min", "32 m", "L48N6-PY", "Recoil"),
    pump("YDP30N", "Fresh water pump", "3 in / 80 mm", "900 L/min", "28 m", "L48N6-PY", "Recoil"),
    pump("YDP40N", "Fresh water pump", "4 in / 100 mm", "1300 L/min", "26.5 m", "L70N6-PY", "Recoil"),
    pump("YDP20STN", "Semi-trash pump", "2 in / 50 mm", "550 L/min", "22.5 m", "L48N6-PYST", "Recoil"),
    pump("YDP30TN", "Trash pump", "3 in / 80 mm", "1150 L/min", "27 m", "L70N6-PY", "Recoil"),
    p("engines", "L100V", "L100V air-cooled diesel engine", "assets/L-series-white-background.png", { model: "L100V", displacement: "0.435 L", ratedOutput: "6.8 kW", ratedSpeed: NA, cooling: "Air-cooled", startingSystem: NA, emissions: "EU Stage V", application: "Compact industrial equipment, generators and pump applications", notes: NA }),
    p("engines", "L100N", "L100N air-cooled diesel engine", "assets/L-series-white-background.png", { model: "L100N", displacement: "0.435 L", ratedOutput: NA, ratedSpeed: NA, cooling: "Air-cooled", startingSystem: NA, emissions: "Global / lower-regulated markets", application: "Compact industrial equipment, generators and pump applications", notes: "Fuel system: Direct injection" }),
  ];

  let state = load();

  function p(category, id, name, image, specs) {
    return { category, id, name, image, specs };
  }

  function pump(id, type, port, capacity, head, engine, start) {
    return p("pumps", id, `${id} diesel water pump`, "assets/YDP-white-background.png", {
      model: id,
      pumpType: type,
      portSize: port,
      maxCapacity: capacity,
      maxHead: head,
      suctionLift: "Up to 7 m (series-level specification)",
      engineModel: engine,
      startingSystem: start,
      application: /Trash/i.test(type) ? "Dewatering with debris and demanding site water" : "Fresh water transfer, irrigation and general dewatering",
      notes: "Verify latest local datasheet before publishing",
    });
  }

  function fresh() {
    const prod = products.find((item) => item.id === "YDG5500V") || products[0];
    return { version: 21, category: prod.category, productId: prod.id, title: "Yanmar product comparison", market: "Europe", useCase: "Sales follow-up", distributor: distributor(), yanmar: { ...prod.specs }, yImgData: "", yImgUrl: "", competitors: [competitor()], updatedAt: new Date().toISOString() };
  }

  function competitor(seed = {}) {
    return { id: `c-${Date.now()}-${Math.random().toString(16).slice(2)}`, brand: seed.brand || "", model: seed.model || "", source: seed.source || "", notes: seed.notes || "", imgUrl: seed.imgUrl || "", imgData: seed.imgData || "", values: { ...(seed.values || {}) } };
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE) || "null");
      if (raw?.version === 21 && cats[raw.category]) {
        const prod = byId(raw.productId, raw.category) || productsFor(raw.category)[0];
        return { ...fresh(), ...raw, productId: prod.id, yanmar: { ...prod.specs, ...(raw.yanmar || {}) }, competitors: (raw.competitors?.length ? raw.competitors : [competitor()]).slice(0, 4).map(competitor) };
      }
    } catch (error) {
      /* local draft is optional */
    }
    return fresh();
  }

  function save() {
    state.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (error) { /* localStorage is optional */ }
  }

  function distributor() {
    return document.getElementById("distributor-select")?.value || "Yanmar Europe Distributor";
  }

  function byId(id, category = state.category) {
    return products.find((item) => item.id === id && item.category === category) || null;
  }

  function current() {
    return byId(state.productId, state.category) || productsFor(state.category)[0];
  }

  function productsFor(category) {
    return products.filter((item) => item.category === category);
  }

  function fields() {
    return cats[state.category].fields;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char]));
  }

  function clean(value) {
    const text = String(value ?? "").trim();
    return !text || /^(undefined|null|nan|infinity|\\[object object\\])$/i.test(text) ? NA : text;
  }

  function isOverride(key) {
    return clean(state.yanmar[key]) !== clean(current().specs[key]);
  }

  function nameOf(item) {
    const brand = clean(item.brand);
    const model = clean(item.model);
    if (brand === NA && model === NA) return "Competitor";
    if (brand === NA) return model;
    if (model === NA) return brand;
    return `${brand} ${model}`;
  }

  function image(src, alt, cls = "ym21-img") {
    const value = clean(src);
    if (value === NA) return `<div class="ym21-empty-img">Image not available</div>`;
    return `<img class="${cls}" src="${esc(value)}" alt="${esc(alt)}" onerror="this.outerHTML='&lt;div class=&quot;ym21-empty-img&quot;&gt;Image not available&lt;/div&gt;';">`;
  }

  function notify(message) {
    if (typeof api.notify === "function") api.notify(message);
  }

  function addMarker() {
    document.getElementById("ym21-visible-marker")?.remove();
  }

  function removeSubmenus() {
    document.querySelectorAll(".sidebar .nav-button.sub, .admin-sidebar .nav-button.sub, .sidebar [data-page$='-selector'], .admin-sidebar [data-page$='-selector'], .sidebar [data-page='brochure-library'], .sidebar [data-page='visual-workspace']").forEach((node) => {
      node.setAttribute("hidden", "");
      node.style.setProperty("display", "none", "important");
    });
  }

  function renderGuide() {
    const root = document.getElementById("website-growth-guide-root");
    if (!root) return;
    root.className = "ym21-growth";
    root.innerHTML = `
      <section class="ym21-hero">
        <div>
          <p class="ym21-kicker">Website Growth Guide</p>
          <h2>Improve local Yanmar pages without turning this into a long report.</h2>
          <p>Use these compact checks for product pages, campaigns and paid-search landing pages.</p>
        </div>
        <span class="ym21-chip">SEO + SEA</span>
      </section>
      <section class="ym21-grid">
        ${card("SEO Basics", ["One page per product line or topic.", "Use a clear title, H1 and headings.", "Use local product and application keywords.", "Add internal links, alt text and a meta description.", "Avoid duplicate copy and outdated information."], chips(["YDG: diesel generator, backup power", "YDP: dewatering pump, water transfer", "L-Series: industrial diesel engine, OEM diesel engine"]))}
        ${card("SEA Tips", ["Separate campaigns for generators, pumps and engines.", "Send ads to the matching landing page.", "Use local language and location targeting.", "Track calls, forms and enquiries.", "Use negative keywords to reduce waste."])}
        ${card("Helpful Content", ["Answer real customer questions.", "Explain applications before specs.", "Mention service and parts support.", "Use clear local language.", "Do not only paste a datasheet."])}
        ${card("Landing Page Checklist", ["Headline with product line.", "Application-focused intro.", "Relevant product image.", "Key benefits and applications.", "Models, brochure, FAQ and contact CTA."])}
        ${card("Product Page Checklist", ["Product name is clear.", "Specs are readable.", "CTA is visible.", "Mobile and forms work.", "Downloads work and content is current."])}
        ${card("Yanmar Message Guidance", ["Reliability for professional use.", "Service and parts support.", "Long-term ownership value.", "Application fit.", "Avoid unsupported claims or invented specs."])}
      </section>
      <section class="ym21-card">
        <p class="ym21-kicker">Mini Templates</p>
        <div class="ym21-grid">
          ${template("Intro", "Yanmar [product line] supports [application] with dependable diesel engineering and local distributor support.")}
          ${template("CTA", "Request product advice from our team")}
          ${template("Meta description", "Explore Yanmar [product line] for [application]. Compare models and contact [distributor].")}
          ${template("SEA ad", "Yanmar [product line] for [urgent need]. Local advice and professional support.")}
        </div>
      </section>
    `;
  }

  function card(title, items, extra = "") {
    return `<article class="ym21-card"><h3>${esc(title)}</h3><ul>${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>${extra}</article>`;
  }

  function chips(items) {
    return `<div class="ym21-chipline">${items.map((item) => `<span class="ym21-chip">${esc(item)}</span>`).join("")}</div>`;
  }

  function template(label, text) {
    return `<label class="ym21-field"><span>${esc(label)}</span><textarea rows="3">${esc(text)}</textarea></label>`;
  }

  function renderBuilder() {
    const section = document.getElementById("competitive-intelligence");
    if (!section) return false;
    let root = document.getElementById("ym21-comparison-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "ym21-comparison-root";
      root.className = "ym21-comparison";
      section.replaceChildren(root);
    }
    root.dataset.built = "COMPARISON-BUILT-20260723-06";
    root.innerHTML = `
      <section class="ym21-hero">
        <div>
          <p class="ym21-kicker">Comparison Sheet Builder</p>
          <h2>Build a comparison sheet in four simple steps.</h2>
          <p>Yanmar is always first. Unknown technical values stay ${NA}. Edit local values only when verified.</p>
        </div>
        <span class="ym21-chip">Manual-first</span>
      </section>
      <section class="ym21-panel">
        <p class="ym21-kicker">Step 1 - Category</p>
        <div class="ym21-tabs">${Object.entries(cats).map(([key, cfg]) => `<button type="button" class="ym21-btn" data-ym21-action="cat" data-cat="${key}" aria-pressed="${state.category === key}">${esc(cfg.label)}</button>`).join("")}</div>
      </section>
      <section class="ym21-panel">
        <p class="ym21-kicker">Step 2 - Yanmar product</p>
        <div class="ym21-form">
          <label class="ym21-field"><span>Sheet title</span><input data-ym21-field="title" value="${esc(state.title)}"></label>
          <label class="ym21-field"><span>Market</span><input data-ym21-field="market" value="${esc(state.market)}"></label>
          <label class="ym21-field"><span>Use case</span><input data-ym21-field="useCase" value="${esc(state.useCase)}"></label>
          <label class="ym21-field"><span>Distributor</span><input data-ym21-field="distributor" value="${esc(state.distributor || distributor())}"></label>
          <label class="ym21-field"><span>Yanmar product</span><select data-ym21-select-product>${productsFor(state.category).map((item) => `<option value="${esc(item.id)}" ${item.id === state.productId ? "selected" : ""}>${esc(item.name)}</option>`).join("")}</select></label>
          <label class="ym21-field"><span>Yanmar image URL</span><input data-ym21-field="yImgUrl" value="${esc(state.yImgUrl)}" placeholder="https://..."></label>
          <label class="ym21-field"><span>Upload Yanmar image</span><input type="file" accept="image/png,image/jpeg,image/webp" data-ym21-upload="yanmar"></label>
        </div>
        <div class="ym21-product">
          ${image(state.yImgData || state.yImgUrl || current().image, current().name)}
          <div><h3>${esc(current().name)}</h3><p>Known values are prefilled from existing Yanmar Amplify data. Missing values remain ${NA}.</p><button type="button" class="ym21-btn" data-ym21-action="reset-product">Reset complete Yanmar product</button></div>
        </div>
        <div class="ym21-facts">${fields().map(([key, label]) => fact(key, label)).join("")}</div>
      </section>
      <section class="ym21-panel">
        <p class="ym21-kicker">Step 3 - Competitors</p>
        <div class="ym21-actions"><button type="button" class="ym21-btn primary" data-ym21-action="add" ${state.competitors.length >= 4 ? "disabled" : ""}>Add competitor</button><span class="ym21-chip">${state.competitors.length}/4 competitors</span></div>
        <div class="ym21-grid" style="grid-template-columns:1fr">${state.competitors.map(compCard).join("")}</div>
      </section>
      <section class="ym21-panel">
        <p class="ym21-kicker">Step 4 - Review and export</p>
        <div class="ym21-actions">
          <button type="button" class="ym21-btn primary" data-ym21-action="print">Print / Save as PDF</button>
          <button type="button" class="ym21-btn" data-ym21-action="html">Download self-contained HTML</button>
          <button type="button" class="ym21-btn" data-ym21-action="csv">Download CSV</button>
          <button type="button" class="ym21-btn" data-ym21-action="save">Save draft</button>
          <button type="button" class="ym21-btn" data-ym21-action="load">Load draft</button>
          <button type="button" class="ym21-btn danger" data-ym21-action="new">Start new comparison</button>
        </div>
      </section>
      <div id="ym21-sheet-wrap">${sheet()}</div>
    `;
    if (root.dataset.ym21Bound !== "true") {
      root.dataset.ym21Bound = "true";
      root.addEventListener("click", onClick);
      root.addEventListener("input", onInput);
      root.addEventListener("change", onChange);
    }
    return true;
  }

  function fact(key, label) {
    const override = isOverride(key);
    return `<div class="ym21-fact"><strong>${esc(label)}</strong><label class="ym21-field"><input data-ym21-yvalue="${esc(key)}" value="${esc(clean(state.yanmar[key]))}" placeholder="${NA}"></label><div>${override ? `<span class="ym21-override">Local override</span>` : ""}<button type="button" class="ym21-btn" data-ym21-action="reset-field" data-key="${esc(key)}">Reset field</button></div></div>`;
  }

  function compCard(item, index) {
    return `<article class="ym21-competitor" data-id="${esc(item.id)}">
      <div class="ym21-competitor-head"><div><p class="ym21-kicker">Competitor ${index + 1}</p><h3>${esc(nameOf(item))}</h3></div><div class="ym21-actions">
        <button type="button" class="ym21-btn" data-ym21-action="up" data-id="${esc(item.id)}" ${index === 0 ? "disabled" : ""}>Up</button>
        <button type="button" class="ym21-btn" data-ym21-action="down" data-id="${esc(item.id)}" ${index === state.competitors.length - 1 ? "disabled" : ""}>Down</button>
        <button type="button" class="ym21-btn" data-ym21-action="dupe" data-id="${esc(item.id)}" ${state.competitors.length >= 4 ? "disabled" : ""}>Duplicate</button>
        <button type="button" class="ym21-btn danger" data-ym21-action="remove" data-id="${esc(item.id)}" ${state.competitors.length <= 1 ? "disabled" : ""}>Remove</button>
      </div></div>
      <div class="ym21-form">
        <label class="ym21-field"><span>Brand *</span><input data-ym21-cfield="brand" data-id="${esc(item.id)}" value="${esc(item.brand)}"></label>
        <label class="ym21-field"><span>Model *</span><input data-ym21-cfield="model" data-id="${esc(item.id)}" value="${esc(item.model)}"></label>
        <label class="ym21-field"><span>Source</span><input data-ym21-cfield="source" data-id="${esc(item.id)}" value="${esc(item.source)}"></label>
        <label class="ym21-field"><span>Image URL</span><input data-ym21-cfield="imgUrl" data-id="${esc(item.id)}" value="${esc(item.imgUrl)}"></label>
        <label class="ym21-field"><span>Upload image</span><input type="file" accept="image/png,image/jpeg,image/webp" data-ym21-upload="competitor" data-id="${esc(item.id)}"></label>
        <label class="ym21-field"><span>Notes</span><textarea data-ym21-cfield="notes" data-id="${esc(item.id)}">${esc(item.notes)}</textarea></label>
      </div>
      <div class="ym21-product">${image(item.imgData || item.imgUrl, nameOf(item))}<div class="ym21-values">${fields().map(([key, label]) => `<label class="ym21-field"><span>${esc(label)}</span><input data-ym21-cvalue="${esc(key)}" data-id="${esc(item.id)}" value="${esc(item.values[key] || "")}" placeholder="${NA}"></label>`).join("")}</div></div>
    </article>`;
  }

  function sheet() {
    const comps = state.competitors.slice(0, 4);
    return `<article class="ym21-sheet">
      <header class="ym21-sheet-head"><div><p class="ym21-kicker">${esc(cats[state.category].label)}</p><h2>${esc(state.title)}</h2><p>${esc(state.useCase)} - ${esc(state.market)} - ${new Date().toLocaleDateString()}</p></div><div class="ym21-logo">YANMAR</div></header>
      <div class="ym21-product-strip"><div class="ym21-sheet-product">${image(state.yImgData || state.yImgUrl || current().image, current().name)}<strong>Yanmar ${esc(current().id)}</strong><p>Reference product</p></div>${comps.map((item) => `<div class="ym21-sheet-product">${image(item.imgData || item.imgUrl, nameOf(item))}<strong>${esc(nameOf(item))}</strong><p>${esc(clean(item.source))}</p></div>`).join("")}</div>
      <div class="ym21-table-wrap"><table class="ym21-table"><thead><tr><th>Specification</th><th>Yanmar</th>${comps.map((item) => `<th>${esc(nameOf(item))}</th>`).join("")}</tr></thead><tbody>${fields().map(([key, label]) => `<tr><th>${esc(label)}</th><td>${esc(clean(state.yanmar[key]))}${isOverride(key) ? `<br><span class="ym21-override">Local override</span>` : ""}</td>${comps.map((item) => `<td>${esc(clean(item.values[key]))}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
      <footer class="ym21-sheet-foot"><strong>Sources and notes</strong><p>Yanmar source: existing Yanmar Amplify product information. Verify all claims against the latest local datasheet before publishing.</p>${comps.map((item) => `<p><strong>${esc(nameOf(item))}:</strong> Source: ${esc(clean(item.source))}. Notes: ${esc(clean(item.notes))}.</p>`).join("")}</footer>
    </article>`;
  }

  function refreshSheet() {
    const wrap = document.getElementById("ym21-sheet-wrap");
    if (wrap) wrap.innerHTML = sheet();
  }

  function onInput(event) {
    const t = event.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.dataset.ym21Field) state[t.dataset.ym21Field] = t.value;
    if (t.dataset.ym21Yvalue) state.yanmar[t.dataset.ym21Yvalue] = t.value || NA;
    if (t.dataset.ym21Cfield) {
      const item = state.competitors.find((cmp) => cmp.id === t.dataset.id);
      if (item) item[t.dataset.ym21Cfield] = t.value;
    }
    if (t.dataset.ym21Cvalue) {
      const item = state.competitors.find((cmp) => cmp.id === t.dataset.id);
      if (item) item.values[t.dataset.ym21Cvalue] = t.value;
    }
    save();
    refreshSheet();
  }

  function onChange(event) {
    const t = event.target;
    if (!(t instanceof HTMLElement)) return;
    if (t.dataset.ym21SelectProduct !== undefined) {
      const prod = byId(t.value, state.category) || productsFor(state.category)[0];
      state.productId = prod.id;
      state.yanmar = { ...prod.specs };
      state.yImgData = "";
      state.yImgUrl = "";
      save();
      renderBuilder();
      return;
    }
    if (t.dataset.ym21Upload === "yanmar") {
      readImage(t.files?.[0]).then((data) => { if (data) { state.yImgData = data; save(); renderBuilder(); } });
    }
    if (t.dataset.ym21Upload === "competitor") {
      const item = state.competitors.find((cmp) => cmp.id === t.dataset.id);
      if (item) readImage(t.files?.[0]).then((data) => { if (data) { item.imgData = data; save(); renderBuilder(); } });
    }
  }

  function onClick(event) {
    if (!(event.target instanceof Element)) return;
    const b = event.target.closest("[data-ym21-action]");
    if (!b) return;
    event.preventDefault();
    const action = b.dataset.ym21Action;
    if (action === "cat") {
      const prod = productsFor(b.dataset.cat)[0];
      state.category = b.dataset.cat;
      state.productId = prod.id;
      state.yanmar = { ...prod.specs };
      state.yImgData = "";
      state.yImgUrl = "";
      state.competitors = [competitor()];
      save();
      renderBuilder();
      return;
    }
    if (action === "reset-field") {
      state.yanmar[b.dataset.key] = current().specs[b.dataset.key] || NA;
      save();
      renderBuilder();
      return;
    }
    if (action === "reset-product") {
      state.yanmar = { ...current().specs };
      state.yImgData = "";
      state.yImgUrl = "";
      save();
      renderBuilder();
      return;
    }
    if (action === "add" && state.competitors.length < 4) state.competitors.push(competitor());
    if (action === "remove") state.competitors = state.competitors.filter((item) => item.id !== b.dataset.id);
    if (action === "dupe" && state.competitors.length < 4) {
      const item = state.competitors.find((cmp) => cmp.id === b.dataset.id);
      if (item) state.competitors.push(competitor(item));
    }
    if (action === "up" || action === "down") {
      const from = state.competitors.findIndex((item) => item.id === b.dataset.id);
      const to = from + (action === "up" ? -1 : 1);
      if (from >= 0 && to >= 0 && to < state.competitors.length) {
        const [item] = state.competitors.splice(from, 1);
        state.competitors.splice(to, 0, item);
      }
    }
    if (action === "new") state = fresh();
    if (action === "save") notify("Comparison draft saved.");
    if (action === "load") state = load();
    if (action === "print") {
      document.body.classList.add("ym21-print");
      setTimeout(() => window.print(), 40);
      setTimeout(() => document.body.classList.remove("ym21-print"), 900);
      return;
    }
    if (action === "html") {
      download(`${fileName(state.title)}.html`, `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title)}</title><style>${sheetCss()}</style></head><body>${sheet()}</body></html>`, "text/html;charset=utf-8");
      return;
    }
    if (action === "csv") {
      download(`${fileName(state.title)}.csv`, csv(), "text/csv;charset=utf-8");
      return;
    }
    if (!state.competitors.length) state.competitors = [competitor()];
    save();
    renderBuilder();
  }

  function readImage(file) {
    return new Promise((resolve) => {
      if (!file || !/^image\/(png|jpe?g|webp)$/i.test(file.type)) {
        notify("Use PNG, JPG/JPEG or WebP.");
        resolve("");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  }

  function csv() {
    const comps = state.competitors.slice(0, 4);
    const rows = [["Category", cats[state.category].label], ["Yanmar product", current().name], [], ["Specification", "Yanmar value", ...comps.map(nameOf)], ...fields().map(([key, label]) => [label, clean(state.yanmar[key]), ...comps.map((item) => clean(item.values[key]))]), [], ["Image note", "CSV includes image references only; it does not embed image binary data."], ["Yanmar image", state.yImgData ? "Uploaded image stored in HTML export" : clean(state.yImgUrl || current().image)], ...comps.map((item) => [`${nameOf(item)} image`, item.imgData ? "Uploaded image stored in HTML export" : clean(item.imgUrl)]), [], ["Sources"], ["Yanmar", "Existing Yanmar Amplify product information"], ...comps.map((item) => [nameOf(item), `Source: ${clean(item.source)}; Notes: ${clean(item.notes)}`])];
    return rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  }

  function sheetCss() {
    return ".ym21-sheet{font-family:Arial,sans-serif;color:#111827}.ym21-sheet-head{display:flex;justify-content:space-between;border-top:6px solid #ed0016;padding:20px}.ym21-kicker{color:#ed0016;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.ym21-logo{color:#ed0016;font-weight:900;font-size:22px}.ym21-product-strip{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;padding:0 20px 16px}.ym21-sheet-product{border:1px solid #d9e0ea;border-radius:8px;padding:10px}.ym21-sheet-product img{width:100%;height:82px;object-fit:contain}.ym21-table-wrap{padding:0 20px 16px;overflow-x:auto}.ym21-table{width:100%;border-collapse:collapse;table-layout:fixed}.ym21-table th,.ym21-table td{border:1px solid #d9e0ea;padding:9px;vertical-align:top;overflow-wrap:anywhere}.ym21-table th{background:#f7f9fc;text-align:left}.ym21-table td:nth-child(2){background:#fff5f6;font-weight:800}.ym21-override{display:inline-flex;border-radius:999px;background:#fff0f1;color:#ed0016;padding:4px 8px;font-size:11px;font-weight:900}.ym21-sheet-foot{border-top:1px solid #d9e0ea;padding:14px 20px 18px}.ym21-empty-img{display:grid;place-items:center;min-height:82px;border:1px dashed #d9e0ea;border-radius:8px;color:#566276;font-weight:800}";
  }

  function fileName(value) {
    return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "yanmar-comparison";
  }

  function download(name, content, type) {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }


  function openComparisonV21(category) {
    if (!cats[category]) return false;
    const prod = productsFor(category)[0];
    state.category = category;
    state.productId = prod.id;
    state.yanmar = { ...prod.specs };
    state.yImgData = "";
    state.yImgUrl = "";
    state.competitors = (state.competitors?.length ? state.competitors : [competitor()]).slice(0, 4).map((item) => ({ ...item, values: {} }));
    save();
    const opened = typeof api.openPortalRoute === "function"
      ? api.openPortalRoute("competitive-intelligence", false, false)
      : (typeof api.setActivePage === "function" ? api.setActivePage("competitive-intelligence") : false);
    renderBuilder();
    return opened !== false;
  }

  function init() {
    addMarker();
    removeSubmenus();
    renderGuide();
    renderBuilder();
  }

  const previousOpen = api.openPortalRoute;
  api.openPortalRoute = function ym21OpenPortalRoute(route, adminMode = false, sharedTool = false) {
    const result = typeof previousOpen === "function" ? previousOpen.call(this, route, adminMode, sharedTool) : undefined;
    removeSubmenus();
    renderGuide();
    if (route === "competitive-intelligence") renderBuilder();
    return result;
  };
  api.initializeComparisonBuilder = renderBuilder;
  api.mountComparison = renderBuilder;
  api.openComparisonV21 = openComparisonV21;
  api.openComparison = openComparisonV21;
  window.initializeComparisonBuilder = renderBuilder;
  window.openComparison = openComparisonV21;

  document.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();
}());

;
