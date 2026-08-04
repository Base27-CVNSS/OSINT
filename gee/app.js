(() => {
  "use strict";

  const resources = Array.isArray(window.GEE_RESOURCES) ? window.GEE_RESOURCES : [];
  const meta = window.GEE_META || {};
  const byId = new Map(resources.map((item) => [item.id, item]));
  const favoriteKey = "base27-gee-favorites-v1";
  const themeKey = "base27-gee-theme";
  const collator = new Intl.Collator("vi", { sensitivity: "base", numeric: true });

  const elements = {
    search: document.querySelector("#searchInput"),
    grid: document.querySelector("#resourceGrid"),
    categories: document.querySelector("#categoryList"),
    categoryPanel: document.querySelector("#categoryPanel"),
    mobileFilter: document.querySelector("#mobileFilterButton"),
    closeCategories: document.querySelector("#closeCategories"),
    quickFilters: document.querySelector("#quickFilters"),
    sort: document.querySelector("#sortSelect"),
    visibleCount: document.querySelector("#visibleCount"),
    activeContext: document.querySelector("#activeContext"),
    empty: document.querySelector("#emptyState"),
    reset: document.querySelector("#resetFilters"),
    theme: document.querySelector("#themeToggle"),
    dialog: document.querySelector("#resourceDialog"),
    dialogTitle: document.querySelector("#dialogTitle"),
    dialogOriginal: document.querySelector("#dialogOriginal"),
    dialogDescription: document.querySelector("#dialogDescription"),
    dialogSection: document.querySelector("#dialogSection"),
    dialogTags: document.querySelector("#dialogTags"),
    dialogNote: document.querySelector("#dialogNote"),
    dialogOpen: document.querySelector("#dialogOpen"),
    dialogFavorite: document.querySelector("#dialogFavorite"),
  };

  const storedFavorites = (() => {
    try { return JSON.parse(localStorage.getItem(favoriteKey) || "[]"); }
    catch { return []; }
  })();

  const url = new URL(window.location.href);
  const state = {
    query: url.searchParams.get("q") || "",
    section: url.searchParams.get("nhom") || "all",
    quick: url.searchParams.get("loc") || "all",
    sort: url.searchParams.get("xep") || "featured",
    favorites: new Set(Array.isArray(storedFavorites) ? storedFavorites : []),
    dialogId: null,
  };

  const sectionIcons = {
    "Nguồn chính thức": "◉",
    "Bắt đầu": "↗",
    "Trợ giúp": "?",
    "JavaScript API": "JS",
    "Python API": "Py",
    "Ngôn ngữ R": "R",
    QGIS: "Q",
    "Nhà phát triển": "⌘",
    "Cộng đồng X/Twitter": "@",
    "Ứng dụng": "◇",
    "Khóa học miễn phí": "▤",
    "Bài trình bày": "▥",
    Video: "▶",
    "Dự án": "◆",
    "Website chuyên đề": "◎",
    "Bộ dữ liệu": "▦",
    "Nghiên cứu khoa học": "◫",
  };

  function normalize(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>'"]/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    })[character]);
  }

  function displayHost(value) {
    try { return new URL(value).hostname.replace(/^www\./, ""); }
    catch { return value; }
  }

  function sectionCounts() {
    const counts = new Map();
    resources.forEach((item) => counts.set(item.section, (counts.get(item.section) || 0) + 1));
    return counts;
  }

  function saveFavorites() {
    localStorage.setItem(favoriteKey, JSON.stringify([...state.favorites]));
  }

  function updateUrl() {
    const next = new URL(window.location.href);
    [["q", state.query], ["nhom", state.section === "all" ? "" : state.section], ["loc", state.quick === "all" ? "" : state.quick], ["xep", state.sort === "featured" ? "" : state.sort]]
      .forEach(([key, value]) => value ? next.searchParams.set(key, value) : next.searchParams.delete(key));
    history.replaceState(null, "", `${next.pathname}${next.search}${next.hash}`);
  }

  function renderCategories() {
    const counts = sectionCounts();
    const rows = [
      ["all", "Tất cả tài nguyên", resources.length, "⌁"],
      ...[...counts.entries()].map(([section, count]) => [section, section, count, sectionIcons[section] || "•"]),
    ];
    if (state.section !== "all" && !counts.has(state.section)) state.section = "all";
    elements.categories.innerHTML = rows.map(([value, label, count, icon]) => `
      <button class="category-button${state.section === value ? " active" : ""}" type="button" data-section="${escapeHtml(value)}">
        <span><b aria-hidden="true">${escapeHtml(icon)}</b>&nbsp; ${escapeHtml(label)}</span><small>${count}</small>
      </button>`).join("");
  }

  function matchesQuick(item) {
    if (state.quick === "all") return true;
    if (state.quick === "official") return item.official;
    if (state.quick === "favorites") return state.favorites.has(item.id);
    return item.tags.some((tag) => normalize(tag) === normalize(state.quick));
  }

  function filteredResources() {
    const query = normalize(state.query.trim());
    const output = resources.filter((item) => {
      if (state.section !== "all" && item.section !== state.section) return false;
      if (!matchesQuick(item)) return false;
      if (!query) return true;
      const haystack = normalize([item.name, item.originalName, item.section, item.group, item.description, item.url, ...item.tags].filter(Boolean).join(" "));
      return query.split(/\s+/).every((term) => haystack.includes(term));
    });

    return output.sort((a, b) => {
      if (state.sort === "az") return collator.compare(a.name, b.name);
      if (state.sort === "category") return collator.compare(a.section, b.section) || collator.compare(a.name, b.name);
      return Number(b.official) - Number(a.official) || Number(a.legacy) - Number(b.legacy) || collator.compare(a.name, b.name);
    });
  }

  function cardTemplate(item) {
    const visibleTags = item.tags.filter((tag) => tag !== item.section).slice(0, 3);
    const tags = visibleTags.map((tag) => `<span class="tag${tag === "Chính thức" ? " official" : ""}${tag === "Cần rà soát" ? " legacy" : ""}">${escapeHtml(tag)}</span>`).join("");
    return `<article class="resource-card" data-id="${escapeHtml(item.id)}">
      <div class="card-top">
        <span class="resource-kind">${escapeHtml(item.group || item.section)}</span>
        <button class="favorite-button${state.favorites.has(item.id) ? " active" : ""}" type="button" data-action="favorite" aria-label="${state.favorites.has(item.id) ? "Bỏ lưu" : "Lưu"} ${escapeHtml(item.name)}" title="Lưu tài nguyên">
          <svg class="icon"><use href="#i-star"/></svg>
        </button>
      </div>
      <h3>${escapeHtml(item.name)}</h3>
      ${item.originalName ? `<div class="original-title" lang="en">Tên gốc: ${escapeHtml(item.originalName)}</div>` : ""}
      <p>${escapeHtml(item.description)}</p>
      <div class="card-tags">${tags}</div>
      <div class="card-actions">
        <button class="details-button" type="button" data-action="details">Chi tiết · ${escapeHtml(displayHost(item.url))}</button>
        <a class="open-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Mở <svg class="icon"><use href="#i-external"/></svg></a>
      </div>
    </article>`;
  }

  function contextLabel() {
    const parts = [];
    if (state.section !== "all") parts.push(`nhóm ${state.section}`);
    if (state.quick === "official") parts.push("nguồn chính thức");
    else if (state.quick === "favorites") parts.push("danh sách đã lưu");
    else if (state.quick !== "all") parts.push(`thẻ ${state.quick}`);
    if (state.query) parts.push(`từ khóa “${state.query}”`);
    return parts.length ? `cho ${parts.join(" · ")}` : "trong toàn bộ kho";
  }

  function syncFilterButtons() {
    elements.quickFilters.querySelectorAll("[data-filter]").forEach((button) => {
      const active = button.dataset.filter === state.quick;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    elements.categories.querySelectorAll("[data-section]").forEach((button) => {
      button.classList.toggle("active", button.dataset.section === state.section);
    });
  }

  function render() {
    const result = filteredResources();
    elements.grid.innerHTML = result.map(cardTemplate).join("");
    elements.visibleCount.textContent = String(result.length);
    elements.activeContext.textContent = contextLabel();
    elements.empty.hidden = result.length > 0;
    elements.grid.hidden = result.length === 0;
    syncFilterButtons();
    updateUrl();
  }

  function toggleFavorite(id) {
    if (!byId.has(id)) return;
    if (state.favorites.has(id)) state.favorites.delete(id);
    else state.favorites.add(id);
    saveFavorites();
    render();
    if (state.dialogId === id) syncDialogFavorite();
  }

  function syncDialogFavorite() {
    const active = state.favorites.has(state.dialogId);
    elements.dialogFavorite.textContent = active ? "★ Đã lưu — bấm để bỏ" : "☆ Lưu tài nguyên";
  }

  function openDialog(id) {
    const item = byId.get(id);
    if (!item || !elements.dialog) return;
    state.dialogId = id;
    elements.dialogSection.textContent = `${item.section} · ${item.group}`;
    elements.dialogTitle.textContent = item.name;
    elements.dialogOriginal.textContent = item.originalName ? `Tên gốc: ${item.originalName}` : displayHost(item.url);
    elements.dialogOriginal.hidden = !item.originalName && !item.url;
    elements.dialogDescription.textContent = item.description;
    elements.dialogTags.innerHTML = item.tags.map((tag) => `<span class="tag${tag === "Chính thức" ? " official" : ""}${tag === "Cần rà soát" ? " legacy" : ""}">${escapeHtml(tag)}</span>`).join("");
    elements.dialogNote.textContent = item.legacy
      ? "Liên kết này dùng HTTP, tên miền cũ hoặc nền tảng đã thay đổi. Hãy kiểm tra trạng thái và nguồn thay thế trước khi sử dụng."
      : `Tài nguyên được nhập từ Awesome-GEE ngày ${meta.importedAt || "2026-08-04"}. Hãy kiểm tra quyền truy cập và điều khoản của nguồn đích.`;
    elements.dialogOpen.href = item.url;
    syncDialogFavorite();
    elements.dialog.showModal();
  }

  function closeCategoryPanel() {
    elements.categoryPanel.classList.remove("open");
    document.body.classList.remove("filter-open");
    elements.mobileFilter.setAttribute("aria-expanded", "false");
  }

  function resetFilters() {
    state.query = "";
    state.section = "all";
    state.quick = "all";
    state.sort = "featured";
    elements.search.value = "";
    elements.sort.value = "featured";
    renderCategories();
    render();
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(themeKey, theme);
  }

  function initializeTheme() {
    const stored = localStorage.getItem(themeKey);
    const preferred = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
    setTheme(stored === "light" || stored === "dark" ? stored : preferred);
  }

  function initializeStats() {
    const official = resources.filter((item) => item.official).length;
    const dataAndResearch = resources.filter((item) => item.section === "Bộ dữ liệu" || item.section === "Nghiên cứu khoa học").length;
    const legacy = resources.filter((item) => item.legacy).length;
    const sections = new Set(resources.map((item) => item.section)).size;
    document.querySelector("#resourceCount").textContent = resources.length;
    document.querySelector("#officialCount").textContent = official;
    document.querySelector("#datasetCount").textContent = dataAndResearch;
    document.querySelector("#legacyCount").textContent = legacy;
    document.querySelector("#heroResourceCount").textContent = resources.length;
    document.querySelector("#heroSectionCount").textContent = sections;
  }

  elements.search.addEventListener("input", (event) => { state.query = event.target.value; render(); });
  elements.quickFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.quick = button.dataset.filter;
    render();
  });
  elements.categories.addEventListener("click", (event) => {
    const button = event.target.closest("[data-section]");
    if (!button) return;
    state.section = button.dataset.section;
    render();
    closeCategoryPanel();
  });
  elements.grid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-id]");
    if (!card) return;
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "favorite") toggleFavorite(card.dataset.id);
    if (action === "details") openDialog(card.dataset.id);
  });
  elements.sort.addEventListener("change", (event) => { state.sort = event.target.value; render(); });
  elements.reset.addEventListener("click", resetFilters);
  elements.mobileFilter.addEventListener("click", () => {
    const open = !elements.categoryPanel.classList.contains("open");
    elements.categoryPanel.classList.toggle("open", open);
    document.body.classList.toggle("filter-open", open);
    elements.mobileFilter.setAttribute("aria-expanded", String(open));
  });
  elements.closeCategories.addEventListener("click", closeCategoryPanel);
  document.addEventListener("click", (event) => {
    if (document.body.classList.contains("filter-open") && !elements.categoryPanel.contains(event.target) && !elements.mobileFilter.contains(event.target)) closeCategoryPanel();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName)) {
      event.preventDefault(); elements.search.focus();
    }
    if (event.key === "Escape") closeCategoryPanel();
  });
  elements.theme.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  elements.dialogFavorite.addEventListener("click", () => toggleFavorite(state.dialogId));
  elements.dialog.addEventListener("close", () => { state.dialogId = null; });

  initializeTheme();
  initializeStats();
  elements.search.value = state.query;
  elements.sort.value = ["featured", "az", "category"].includes(state.sort) ? state.sort : "featured";
  state.sort = elements.sort.value;
  renderCategories();
  render();
})();
