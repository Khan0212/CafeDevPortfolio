// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
burger.addEventListener("click", () => {
    nav.classList.toggle("open");
});
nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
);

// Simple project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    cards.forEach(card => {
      const types = card.getAttribute("data-type").split(" ");
      if (filter === "all" || types.includes(filter)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });

    // Update active button UI
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Stop redirect

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        showToast("☕ Message sent! I’ll reply soon.");
        form.reset();
    } else {
        showToast("⚠️ Something went wrong. Try again?", true);
    }
});

function showToast(message, error = false) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.className = "form-toast" + (error ? " form-toast-error" : "");
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add("show"));
    setTimeout(() => toast.classList.remove("show"), 3200);
    setTimeout(() => toast.remove(), 3600);
}
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", (e) => {
        // ignore clicks on inner buttons/links
        if (e.target.tagName.toLowerCase() === "a") return;

        const url = card.dataset.link;
        if (url) window.open(url, "_blank");
    });
});