/**
 * FACTURE — entry point.
 *
 * Loaded as a classic deferred script rather than an ES module so the page
 * also works when index.html is opened straight from disk over file://.
 */
(() => {
  "use strict";

  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".mobile-menu");
  const header = document.querySelector(".site-header");

  if (!toggle || !menu || !header) {
    return;
  }

  const desktop = window.matchMedia("(min-width: 1024px)");

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setMenu = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menu.classList.toggle("is-open", open);
    menu.inert = !open;
    header.classList.toggle("is-menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  const closeMenu = ({ refocus = false } = {}) => {
    if (!isOpen()) {
      return;
    }
    setMenu(false);
    if (refocus) {
      toggle.focus();
    }
  };

  setMenu(false);

  toggle.addEventListener("click", () => {
    setMenu(!isOpen());
  });

  // Any link inside the overlay closes it before jumping to its target.
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu({ refocus: true });
    }
  });

  // Leaving the mobile breakpoint with the overlay open would trap the page.
  desktop.addEventListener("change", (event) => {
    if (event.matches) {
      closeMenu();
    }
  });
})();
