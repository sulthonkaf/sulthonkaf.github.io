(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setThemeLabel = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  };

  const toggleTheme = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    try { localStorage.setItem("theme", nextTheme); } catch (_) {}
    setThemeLabel();
  };

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileMenu?.classList.remove("is-open");
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    menuToggle?.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu?.classList.toggle("is-open", !isOpen);
    header?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  };

  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 16);
  themeToggle?.addEventListener("click", toggleTheme);
  menuToggle?.addEventListener("click", toggleMenu);
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("resize", () => { if (window.innerWidth > 900) closeMenu(); });
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  if (reducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px" });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  }

  setThemeLabel();
  updateHeader();
})();
