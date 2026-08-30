# HT Digital Solutions — Landing Page

A modern, responsive landing page for **HT Digital Solutions** — a digital agency offering
Digital Marketing, Web & App Development, SEO, Data Entry, Profile Backlinks and more.

## ✨ Sections

- **Hero** — headline, animated stats & visual
- **Services** — 9 service cards (Marketing, Development, SEO, Data Entry, Backlinks, Design, Content, Social Media, E-Commerce)
- **E-Commerce CTA** — dedicated "Shop Online" section
- **About** — company info & highlights
- **Why Us** — differentiators
- **Testimonials** — client feedback
- **Contact** — info + inquiry form
- **Footer**

## 🚀 Run locally

No build step required. Open `index.html` in a browser, or serve it with any static server:

```bash
# Python
python3 -m http.server 8080
# then open http://localhost:8080
```

## ⚙️ Company data & the E-Commerce link

All editable company details live in a single config block at the top of `index.html`:

```html
<script>
  window.HT_CONFIG = {
    companyName: "HT Digital Solutions",
    phone: "+1 (555) 012-3456",
    email: "info@htdigitalsolutions.com",
    address: "123 Business Avenue, Suite 400, Tech City, TC 10001",
    ecommerceUrl: "#", // <-- PASTE YOUR ECOMMERCE / STORE LINK HERE
    social: { facebook: "#", instagram: "#", linkedin: "#", twitter: "#" }
  };
</script>
```

Update the **`ecommerceUrl`** value to point at your real online store (e.g.
`"https://shop.htdigital.com"`). The "Shop Online" buttons and the footer
"E-Commerce Store" link update automatically from that single value.

While it's blank (`"#"`), the buttons remain styled and clickable as a placeholder, and a
tooltip on the main CTA explains how to enable it.

## 📁 Structure

```
index.html      → page markup + config block
css/styles.css  → responsive styles / design system
js/main.js      → interactions, counters, reveal animation, form, link binding
```

## 🛠 Notes

- The contact form is front-end only; wire it to a backend (Formspree, EmailJS, etc.) before going live.
- Social links, phone, email and address in the footer are populated from the config block above.
