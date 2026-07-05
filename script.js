"use strict";

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navigationLinks = document.querySelectorAll(".nav-menu a");
const currentYear = document.querySelector("#current-year");

function closeNavigation() {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

function openNavigation() {
  if (!navToggle || !navMenu) return;

  navToggle.setAttribute("aria-expanded", "true");
  navToggle.setAttribute("aria-label", "Close navigation menu");
  navMenu.classList.add("is-open");
  document.body.classList.add("nav-open");
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen =
      navToggle.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      closeNavigation();
    } else {
      openNavigation();
    }
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeNavigation();
    }
  });
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

/*
  Show a helpful placeholder when an image file is missing
  or has a different filename.
*/
document.querySelectorAll(".image-shell img").forEach((image) => {
  image.addEventListener("error", () => {
    const imageShell = image.closest(".image-shell");

    if (imageShell) {
      imageShell.classList.add("is-missing");
    }
  });
});

/*
  Lightweight reveal animation.
*/
const revealElements = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}