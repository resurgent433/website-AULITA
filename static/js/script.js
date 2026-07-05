
document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       1. SCROLL REVEAL ANIMATION
    ================================= */
    const elements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    elements.forEach(el => observer.observe(el));


    /* ================================
       2. ACTIVE NAVIGATION LINK
    ================================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (
                window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    }


    /* ================================
       3. NAVBAR SCROLL EFFECT
    ================================= */
    const navbar = document.querySelector(".navbar");

    function setNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }


    /* ================================
       4. SCROLL EVENTS (1x saja)
    ================================= */
    window.addEventListener("scroll", () => {
        setActiveLink();
        setNavbar();

        /* progress bar */
        const bar = document.getElementById("progress-bar");
        if (bar) {
            const scrollTop = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / height) * 100;
            bar.style.width = scrolled + "%";
        }
    });


    /* RUN ON LOAD */
    setActiveLink();
    setNavbar();

});


/* ================================
   DARK MODE TOGGLE
================================= */
// function toggleDark() {
//     document.body.classList.toggle("dark-mode");
// }


/* ================================
   LOADER FIX (PASTI MUNCUL & HILANG)
================================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 400);

        }, 800);
    }
});