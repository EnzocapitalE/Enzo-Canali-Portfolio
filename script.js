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

  // photo gallery lightbox
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const lbImg = lightbox.querySelector("img");
    const lbClose = lightbox.querySelector(".lb-close");
    const lbPrev = lightbox.querySelector(".lb-prev");
    const lbNext = lightbox.querySelector(".lb-next");
    let currentImages = [];
    let currentIndex = 0;

    const showImage = (index) => {
      currentIndex = (index + currentImages.length) % currentImages.length;
      const img = currentImages[currentIndex];
      lbImg.src = img.src;
      lbImg.alt = img.alt;
    };
    const openLightbox = (images, index) => {
      currentImages = images;
      showImage(index);
      lightbox.classList.add("open");
    };
    const closeLightbox = () => lightbox.classList.remove("open");

    document.querySelectorAll("[data-gallery]").forEach((gallery) => {
      const imgs = Array.from(gallery.querySelectorAll(".gallery-thumb img"));
      imgs.forEach((img, index) => {
        img.closest(".gallery-thumb").addEventListener("click", () => openLightbox(imgs, index));
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", () => showImage(currentIndex - 1));
    lbNext.addEventListener("click", () => showImage(currentIndex + 1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showImage(currentIndex - 1);
      if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
  }

  // footer email — copy address to clipboard instead of opening a mail client
  document.querySelectorAll(".email-copy-btn").forEach((btn) => {
    const originalText = btn.textContent;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      try {
        navigator.clipboard.writeText("Enzo.canali13@gmail.com")
          .then(() => {
            btn.textContent = "Copied!";
            setTimeout(() => { btn.textContent = originalText; }, 2000);
          })
          .catch(() => {});
      } catch (err) {
        // clipboard unavailable — fail silently
      }
    });
  });

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
