document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // NAVIGATION ACTIVE
    // =================================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".main-nav a").forEach(link => {

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
        ".contact-intro, " +
        ".contact-info, " +
        ".contact-form-container, " +
        ".section-heading, " +
        ".location-card"
    );

    elementsToReveal.forEach(element => {
        element.classList.add("reveal");
    });


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


    elementsToReveal.forEach(element => {
        observer.observe(element);
    });


    // =================================
    // FORMULAIRE DE CONTACT
    // =================================

    const contactForm = document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            // Récupération des informations

            const nom = document.getElementById("nom").value.trim();

            const telephone = document.getElementById("telephone").value.trim();

            const service = document.getElementById("service").value;

            const message = document.getElementById("message").value.trim();


            // Vérification des champs

            if (!nom || !telephone || !service || !message) {

                alert("Veuillez remplir tous les champs.");

                return;

            }


            // Préparation du message WhatsApp

            const whatsappMessage =
                `Bonjour MPESSA FILS SARL,\n\n` +
                `Je souhaite obtenir des renseignements sur vos prestations.\n\n` +
                `Nom : ${nom}\n` +
                `Téléphone : ${telephone}\n` +
                `Prestation souhaitée : ${service}\n\n` +
                `Mon message :\n${message}\n\n` +
                `Merci.`;

            
            // Numéro WhatsApp de l'entreprise

            const whatsappNumber = "237693524331";


            // Création du lien WhatsApp

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


            // Ouverture de WhatsApp

            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        });

    }

});