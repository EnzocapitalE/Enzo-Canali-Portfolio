document.addEventListener("DOMContentLoaded", () => {
  // remove blackout overlay from flow after animation completes
  const bo = document.getElementById("blackout");
  if (bo) {
    setTimeout(() => bo.remove(), 1400);
  }

  // mobile nav toggle
  const toggle = document.querySelector(".navtoggle");
  const links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.textContent = links.classList.contains("open") ? "CLOSE" : "MENU";
    });
  }

  // tabbed panels
  document.querySelectorAll(".tabs").forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tab-btn");
    const panels = tabs.querySelectorAll(".tab-panel");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.tab;
        buttons.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-selected", isActive);
        });
        panels.forEach((p) => {
          p.classList.toggle("active", p.dataset.panel === target);
        });
      });
    });
  });
});
