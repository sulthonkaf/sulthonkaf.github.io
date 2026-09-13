(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const progress = document.querySelector("[data-scroll-progress]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const navigationLinks = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
  const observedSections = [...document.querySelectorAll("main section[id]")];

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.querySelector(".sr-only")?.replaceChildren("Open navigation");
    mobileMenu?.classList.remove("is-open");
    header?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    const isOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    menuToggle?.setAttribute("aria-expanded", String(!isOpen));
    menuToggle?.querySelector(".sr-only")?.replaceChildren(isOpen ? "Open navigation" : "Close navigation");
    mobileMenu?.classList.toggle("is-open", !isOpen);
    header?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  };

  const updateChrome = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = pageHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / pageHeight) * 100)) : 0;
    progress?.style.setProperty("--scroll-progress", `${percentage}%`);
  };

  const setCurrentSection = (id) => {
    navigationLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
  };

  menuToggle?.addEventListener("click", toggleMenu);
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  document.addEventListener("click", (event) => {
    if (!header?.contains(event.target) && menuToggle?.getAttribute("aria-expanded") === "true") closeMenu();
  });
  window.addEventListener("resize", () => { if (window.innerWidth > 860) closeMenu(); });
  window.addEventListener("scroll", updateChrome, { passive: true });
  document.querySelectorAll("[data-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setCurrentSection(visible.target.id);
    }, { rootMargin: "-25% 0px -60%", threshold: [0, .15, .4] });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -36px" });

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    root.classList.add("motion-ready");
    requestAnimationFrame(() => {
      document.querySelectorAll(".hero .reveal").forEach((element) => element.classList.add("is-visible"));
    });
  } else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
  }

  updateChrome();
})();
