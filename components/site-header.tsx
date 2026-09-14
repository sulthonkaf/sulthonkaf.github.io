"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  ["Work", "#work"],
  ["Approach", "#approach"],
  ["About", "#about"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="shell nav-shell">
        <a className="brand" href="#top" aria-label="Sulthon KAF, back to top" onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true">S/</span>
          <span className="brand-copy"><strong>Sulthon KAF</strong><small>Engineer · Builder</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-end">
          <span className="availability-chip"><i aria-hidden="true" /> Available for opportunities</span>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      <nav className={`mobile-nav${open ? " is-open" : ""}`} id="mobile-menu" aria-label="Mobile navigation">
        {navigation.map(([label, href], index) => (
          <a key={href} href={href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
        ))}
      </nav>
    </header>
  );
}
