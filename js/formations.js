document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // NAVIGATION ACTIVE
    // ==============================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".main-nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });


    // ==============================
    // ANIMATIONS AU DÉFILEMENT
    // ==============================

    const revealElements = document.querySelectorAll(
        ".formations-intro, .formations-heading, " +
        ".formation-card, .practical-heading, " +
        ".practical-card, .benefits-content, .formations-cta"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==============================
    // RÉCUPÉRATION DES PHOTOS
    // ==============================

    const photos = Array.from(
        document.querySelectorAll(".practical-card img")
    );

    if (photos.length === 0) return;

    let currentIndex = 0;
    let touchStartX = 0;


    // ==============================
    // CRÉATION DE LA VISIONNEUSE
    // ==============================

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <div class="lightbox-content">

            <button class="lightbox-close" aria-label="Fermer">
                &times;
            </button>

            <button class="lightbox-prev" aria-label="Photo précédente">
                &#10094;
            </button>

            <img class="lightbox-image" src="" alt="Photo de formation">

            <button class="lightbox-next" aria-label="Photo suivante">
                &#10095;
            </button>

            <div class="lightbox-counter"></div>

        </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const counter = lightbox.querySelector(".lightbox-counter");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");


    // ==============================
    // AFFICHER UNE PHOTO
    // ==============================

    function showPhoto(index) {

        currentIndex = (index + photos.length) % photos.length;

        const selectedPhoto = photos[currentIndex];

        lightboxImage.src = selectedPhoto.src;
        lightboxImage.alt = selectedPhoto.alt;

        counter.textContent =
            `${currentIndex + 1} / ${photos.length}`;
    }


    // ==============================
    // OUVRIR LA VISIONNEUSE
    // ==============================

    function openLightbox(index) {

        showPhoto(index);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    // ==============================
    // FERMER LA VISIONNEUSE
    // ==============================

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }
      // ==============================
    // PHOTO SUIVANTE
    // ==============================

    function nextPhoto() {
        showPhoto(currentIndex + 1);
    }


    // ==============================
    // PHOTO PRÉCÉDENTE
    // ==============================

    function previousPhoto() {
        showPhoto(currentIndex - 1);
    }


    // ==============================
    // CLIC SUR LES PHOTOS
    // ==============================

    photos.forEach((photo, index) => {

        photo.addEventListener("click", () => {
            openLightbox(index);
        });

    });


    // ==============================
    // BOUTONS DE NAVIGATION
    // ==============================

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextPhoto);

    prevButton.addEventListener("click", previousPhoto);


    // ==============================
    // FERMETURE EN CLIQUANT À L'EXTÉRIEUR
    // ==============================

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    // ==============================
    // TOUCHES DU CLAVIER
    // ==============================

    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("active")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            nextPhoto();
        }

        if (event.key === "ArrowLeft") {
            previousPhoto();
        }

    });


    // ==============================
    // BALAYAGE SUR TÉLÉPHONE
    // ==============================

    lightbox.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    lightbox.addEventListener("touchend", event => {

        const touchEndX = event.changedTouches[0].screenX;

        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) < 50) return;

        if (difference < 0) {
            nextPhoto();
        } else {
            previousPhoto();
        }

    }, { passive: true });

});