const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const gallery = document.getElementById("gallery");
const bookingForm = document.getElementById("bookingForm");
const formNote = document.getElementById("formNote");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("open");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

if (gallery) {
  gallery.addEventListener("click", (event) => {
    const item = event.target.closest(".gallery-item");
    if (!item) return;
    const img = item.querySelector("img");
    const src = item.getAttribute("data-src");
    if (!img || !src) return;
    openLightbox(src, img.alt || "Portfolio image");
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox?.classList.contains("open")) {
    closeLightbox();
  }
});

if (bookingForm && formNote) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!bookingForm.checkValidity()) {
      formNote.textContent = "Please fill in all required fields before submitting.";
      formNote.style.color = "#6e2323";
      bookingForm.reportValidity();
      return;
    }

    formNote.textContent = "Thank you. Your inquiry has been received and we will contact you soon.";
    formNote.style.color = "#2f5f3f";
    bookingForm.reset();
  });
}
