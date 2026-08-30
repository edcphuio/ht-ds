/* ==========================================================================
   HT Digital Solutions — Landing Page Scripts
   ========================================================================== */

(function () {
  "use strict";

  var config = window.HT_CONFIG || {};

  /* ---------- E-commerce / Store link ----------
     The store URL lives in index.html under `window.HT_CONFIG.ecommerceUrl`.
     If it's blank ("#" or empty), we keep it as a placeholder and add a
     sensible default so the button stays clickable and looks intentional. */
  function ecommerceHref() {
    var url = config.ecommerceUrl;
    // If a real URL was provided, use it; otherwise fall back to "#".
    return url && url !== "" && url !== "#" ? url : "#";
  }

  function bindStoreLinks() {
    var href = ecommerceHref();
    // Update the "Shop Online" CTA buttons in the page.
    var shopBtn = document.getElementById("shopOnlineBtn");
    var footerShop = document.getElementById("shopOnlineFooter");

    if (shopBtn) shopBtn.setAttribute("href", href);
    if (footerShop) footerShop.setAttribute("href", href);

    // If the store link is genuinely blank, let the user know it's a placeholder.
    var isPlaceholder = href === "#";
    if (shopBtn) {
      shopBtn.setAttribute(
        "title",
        isPlaceholder
          ? "Store link coming soon — set `ecommerceUrl` in index.html to enable."
          : "Visit our online store"
      );
    }
  }

  /* ---------- Dynamic company data ----------
     Fill phone / email / address / social links from the config so the page
     stays in sync with a single source of truth. */
  function bindCompanyData() {
    // Phone
    if (config.phone) {
      var phoneEl = document.getElementById("footerPhone");
      if (phoneEl) phoneEl.innerHTML = '<a href="tel:' + config.phone.replace(/[^+\d]/g, "") + '">' + config.phone + "</a>";
    }
    // Email
    if (config.email) {
      var emailEl = document.getElementById("footerEmail");
      if (emailEl) emailEl.innerHTML = '<a href="mailto:' + config.email + '">' + config.email + "</a>";
    }
    // Address
    if (config.address) {
      var addrEl = document.getElementById("footerAddress");
      if (addrEl) addrEl.textContent = config.address;
    }
    // Social links
    var socials = document.querySelectorAll("#socialLinks a");
    var socialKeys = ["facebook", "instagram", "linkedin", "twitter"];
    socials.forEach(function (link, i) {
      var key = socialKeys[i];
      if (config.social && config.social[key]) {
        link.setAttribute("href", config.social[key]);
      }
    });
  }

  /* ---------- Sticky header ---------- */
  function bindHeader() {
    var header = document.getElementById("siteHeader");
    function onScroll() {
      if (window.scrollY > 20) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile nav toggle ---------- */
  function bindNav() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      // Close menu when a link is clicked.
      links.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  /* ---------- Animated counters ---------- */
  function bindCounters() {
    var counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    var run = function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10) || 0;
      var duration = 1400;
      var start = null;

      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (c) {
      observer.observe(c);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function bindReveal() {
    var row = {
      hero: document.querySelector(".hero-inner"),
      services: document.querySelector(".services-grid"),
      about: document.querySelector(".about-grid"),
      why: document.querySelector(".why-grid"),
      testimonials: document.querySelector(".testimonial-grid"),
      contact: document.querySelector(".contact-grid")
    };

    Object.keys(row).forEach(function (key) {
      if (row[key]) row[key].classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.keys(row).forEach(function (key) {
      if (row[key]) observer.observe(row[key]);
    });
  }

  /* ---------- Footer year ---------- */
  function bindYear() {
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form ---------- */
  function bindForm() {
    var form = document.getElementById("contactForm");
    var note = document.getElementById("formNote");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation.
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();

      if (!name || !email || !message) {
        note.textContent = "Please fill in all required fields.";
        note.style.color = "#dc2626";
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = "Please enter a valid email address.";
        note.style.color = "#dc2626";
        return;
      }

      // Simulate a successful submission. Replace this with a real
      // backend endpoint (e.g. Formspree, EmailJS, etc.) when ready.
      note.textContent = "Thanks for reaching out! We'll get back to you within 24 hours. 🎉";
      note.style.color = "#16a34a";
      form.reset();
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    bindHeader();
    bindNav();
    bindCounters();
    bindReveal();
    bindYear();
    bindCompanyData();
    bindStoreLinks();
    bindForm();
  });
})();
