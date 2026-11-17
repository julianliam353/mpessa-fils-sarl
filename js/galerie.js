document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       1. NAVIGATION ACTIVE
    ================================= */

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }

    });


    /* =================================
       2. FILTRES DE LA GALERIE
    ================================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter = button.dataset.filter;

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            galleryItems.forEach(item => {

                const category = item.dataset.category;

                if (filter === "all" || category === filter) {

                    item.style.display = "block";

                    setTimeout(() => {
                        item.classList.add("visible");
                    }, 50);

                } else {

                    item.classList.remove("visible");
                    item.style.display = "none";

                }

            });

        });

    });


    /* =================================
       3. CRÉATION DE LA VISIONNEUSE
    ================================= */

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

            <img class="lightbox-image" src="" alt="Photo agrandie">

            <button class="lightbox-next" aria-label="Photo suivante">
                &#10095;
            </button>

            <div class="lightbox-counter"></div>

        </div>
    `;

    document.body.appendChild(lightbox);


    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const closeButton = lightbox.querySelector(".lightbox-close");
    const prevButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");
    const counter = lightbox.querySelector(".lightbox-counter");

    let currentIndex = 0;
    let visiblePhotos = [];


    /* =================================
       4. OUVRIR UNE PHOTO
    ================================= */

    function openLightbox(index) {

        visiblePhotos = Array.from(galleryItems).filter(item => {
            return item.style.display !== "none";
        });

        if (visiblePhotos.length === 0) return;

        currentIndex = index;

        showPhoto();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =================================
       5. AFFICHER UNE PHOTO
    ================================= */

    function showPhoto() {

        const item = visiblePhotos[currentIndex];

        if (!item) return;

        const image = item.querySelector("img");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        counter.textContent =
            `${currentIndex + 1} / ${visiblePhotos.length}`;

        prevButton.style.display =
            visiblePhotos.length > 1 ? "block" : "none";

        nextButton.style.display =
            visiblePhotos.length > 1 ? "block" : "none";

    }


    /* =================================
       6. PHOTO SUIVANTE
    ================================= */

    function nextPhoto() {

        currentIndex++;

        if (currentIndex >= visiblePhotos.length) {
            currentIndex = 0;
        }

        showPhoto();

    }


    /* =================================
       7. PHOTO PRÉCÉDENTE
    ================================= */

    function previousPhoto() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = visiblePhotos.length - 1;
        }

        showPhoto();

    }


    /* =================================
       8. FERMER LA VISIONNEUSE
    ================================= */

    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* =================================
       9. CLIC SUR LES PHOTOS
    ================================= */

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            visiblePhotos = Array.from(galleryItems).filter(photo => {
                return photo.style.display !== "none";
            });

            const index = visiblePhotos.indexOf(item);

            if (index !== -1) {
                openLightbox(index);
            }

        });

    });


    /* =================================
       10. BOUTONS DE NAVIGATION
    ================================= */

    closeButton.addEventListener("click", closeLightbox);

    nextButton.addEventListener("click", nextPhoto);

    prevButton.addEventListener("click", previousPhoto);


    /* =================================
       11. FERMETURE EN CLIQUANT À CÔTÉ
    ================================= */

    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });


    /* =================================
       12. CLAVIER
    ================================= */

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


    /* =================================
       13. BALAYAGE SUR TÉLÉPHONE
    ================================= */

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    lightbox.addEventListener("touchend", event => {

        touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) < 50) return;

        if (difference > 0) {
            nextPhoto();
        } else {
            previousPhoto();
        }

    }, { passive: true });


    /* =================================
       14. ANIMATIONS AU DÉFILEMENT
    ================================= */

    const revealElements = document.querySelectorAll(
        ".gallery-intro, .gallery-heading, .gallery-item, .gallery-cta"
    );

    const observer = new IntersectionObserver(entries => {

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

        element.classList.add("reveal");

        observer.observe(element);

    });


});