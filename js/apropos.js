document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // NAVIGATION ACTIVE
    // =================================

    const currentPage = window.location.pathname.split("/").pop();

    const navLinks = document.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {

        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =================================
    // ANIMATIONS AU DÉFILEMENT
    // =================================

    const elementsToReveal = document.querySelectorAll(
        ".about-intro-image, " +
        ".about-intro-content, " +
        ".section-heading, " +
        ".expertise-card, " +
        ".values-content, " +
        ".values-image, " +
        ".team-image, " +
        ".about-cta .container"
    );

    elementsToReveal.forEach(element => {
        element.classList.add("reveal");
    });


    // =================================
    // OBSERVATEUR DES ANIMATIONS
    // =================================

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    // =================================
    // ACTIVER LES ANIMATIONS
    // =================================

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });


    // =================================
    // ANIMATION DES CARTES
    // =================================

    const cards = document.querySelectorAll(".expertise-card");

    cards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 0.15}s`;

    });

});