// 1. Menú móvil
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// 2. Pestañas Musculación vs Nutrición
const switchButtons = document.querySelectorAll(".switch-btn");
const servicePanels = document.querySelectorAll(".service-panel");

switchButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-panel");

    switchButtons.forEach((b) => b.classList.remove("active"));
    servicePanels.forEach((panel) => panel.classList.remove("active"));

    btn.classList.add("active");
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});

// 3. Filtro del equipamiento por zona muscular
const filterButtons = document.querySelectorAll(".filter-btn");
const equipCards = document.querySelectorAll(".equip-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedZone = btn.getAttribute("data-zone");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    equipCards.forEach((card) => {
      const cardZone = card.getAttribute("data-zone");
      const show = selectedZone === "all" || cardZone === selectedZone;
      card.classList.toggle("hidden", !show);
    });
  });
});

// 4. Aparición suave al hacer scroll
const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealItems.forEach((item) => observer.observe(item));

// 5. Formulario directo a WhatsApp (texto limpio UTF-8 sin caracteres corruptos)
const qbossForm = document.getElementById("qboss-form");
const formError = document.getElementById("form-error");

if (qbossForm && formError) {
  qbossForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("f-name").value.trim();
    const contact = document.getElementById("f-contact").value.trim();
    const service = document.getElementById("f-service").value;
    const msg = document.getElementById("f-msg").value.trim();

    if (!name) {
      formError.textContent = "Por favor, escribe tu nombre antes de enviar.";
      return;
    }

    formError.textContent = "";

    const lines = [
      "*NUEVA CONSULTA WEB - QBOSS LLANES*",
      "----------------------------------------",
      "*Nombre:* " + name,
      contact ? "*Contacto:* " + contact : null,
      "*Interes:* " + service,
      msg ? "*Mensaje:* " + msg : null,
      "----------------------------------------"
    ].filter(Boolean);

    const message = lines.join("\n");
    const whatsappUrl = "https://wa.me/34636765975?text=" + encodeURIComponent(message);

    const win = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!win) {
      window.location.assign(whatsappUrl);
    }
  });
}