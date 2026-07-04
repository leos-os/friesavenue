document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const loader = document.querySelector("#loader");
    const menuToggle = document.querySelector("#menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMobile = document.querySelector(".close-mobile");
    const topButton = document.querySelector("#topButton");

    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 700);
    }

    if (header) {
        window.addEventListener("scroll", () => {
            header.classList.toggle("scrolled", window.scrollY > 80);
        });
    }

    if (menuToggle && mobileMenu) {
        menuToggle.onclick = () => mobileMenu.classList.add("active");
    }

    if (closeMobile && mobileMenu) {
        closeMobile.onclick = () => mobileMenu.classList.remove("active");
    }

    document.querySelectorAll(".mobile-menu a").forEach(link => {
        link.onclick = () => mobileMenu.classList.remove("active");
    });

    if (topButton) {
        window.addEventListener("scroll", () => {
            topButton.classList.toggle("show", window.scrollY > 400);
        });

        topButton.onclick = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", e => {
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    const counters = document.querySelectorAll(".stats-grid h2");
    const stats = document.querySelector(".stats");
    let started = false;

    if (stats && counters.length > 0) {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !started) {
                started = true;

                counters.forEach(counter => {
                    const original = counter.textContent;
                    const number = parseInt(original.replace(/\D/g, ""));
                    const hasPlus = original.includes("+");
                    const hasK = original.includes("K");

                    let current = 0;
                    const step = Math.ceil(number / 60);

                    const run = setInterval(() => {
                        current += step;

                        if (current >= number) {
                            current = number;
                            clearInterval(run);
                        }

                        counter.textContent =
                            (hasPlus ? "+" : "") +
                            current +
                            (hasK ? "K" : "");
                    }, 25);
                });
            }
        }, { threshold: 0.4 });

        observer.observe(stats);
    }

    const revealItems = document.querySelectorAll(
        ".food-card, .gallery-item, .promo-card, .testimonial, .section-title"
    );

    if (revealItems.length > 0) {
        revealItems.forEach(item => item.classList.add("fade-up"));

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(item => revealObserver.observe(item));
    }

    const promoModal = document.querySelector("#promoModal");
    const closeModal = document.querySelector(".close-modal");

    if (promoModal) {
        setTimeout(() => {
            promoModal.classList.add("active");
        }, 3000);
    }

    if (closeModal && promoModal) {
        closeModal.onclick = () => promoModal.classList.remove("active");

        promoModal.onclick = e => {
            if (e.target === promoModal) {
                promoModal.classList.remove("active");
            }
        };
    }
});