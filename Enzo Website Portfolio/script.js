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
});
