
"use strict";

/* ==========================================
   SHONEN MULTIVERSE — HOMEPAGE V1
   Interactive JavaScript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================
       1. INTERACTIVE ENERGY CORE
    ====================================== */

    const energyModes = {
        balance: {
            name: "Equilibrium",
            symbol: "✦",
            color: "#e9b75b",
            description: "The universe is waiting to be explored."
        },
        anime: {
            name: "Willpower",
            symbol: "魂",
            color: "#f58b45",
            description: "The power of imagination and determination."
        },
        physics: {
            name: "Cosmic Energy",
            symbol: "Φ",
            color: "#77bdfb",
            description: "Discover the laws that shape reality."
        },
        math: {
            name: "Infinite Patterns",
            symbol: "∞",
            color: "#7ed6b0",
            description: "Find the structures hidden within everything."
        }
    };

    const energyCore = document.querySelector(".energy-core");
    const energyButtons = document.querySelectorAll("[data-energy]");
    const energyName = document.querySelector("#energy-name");
    const energySymbol = document.querySelector("#energy-symbol");
    const energyDescription = document.querySelector("#energy-description");

    function changeEnergy(mode) {
        const selected = energyModes[mode];

        if (!selected) return;

        if (energyCore) {
            energyCore.style.setProperty("--energy-color", selected.color);
            energyCore.dataset.mode = mode;
        }

        if (energyName) {
            energyName.textContent = selected.name;
        }

        if (energySymbol) {
            energySymbol.textContent = selected.symbol;
        }

        if (energyDescription) {
            energyDescription.textContent = selected.description;
        }

        energyButtons.forEach(button => {
            const isActive = button.dataset.energy === mode;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });
    }

    energyButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeEnergy(button.dataset.energy);
        });
    });

    if (energyButtons.length > 0) {
        const initialMode =
            document.querySelector("[data-energy].active")?.dataset.energy ||
            "balance";

        changeEnergy(initialMode);
    }


    /* ======================================
       2. MOBILE NAVIGATION
    ====================================== */

    const menuToggle = document.querySelector(
        ".menu-toggle, .nav-toggle"
    );

    const navLinks = document.querySelector(
        ".nav-links"
    );

    if (menuToggle && navLinks) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            });

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navLinks.classList.remove("open");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* ======================================
       3. SCROLL REVEAL ANIMATIONS
    ====================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, [data-reveal]"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        entry.target.classList.add("is-visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

            element.classList.add("is-visible");

        });

    }


    /* ======================================
       4. INFINITY TRIAL
    ====================================== */

    const infinityForm = document.querySelector(
        "#infinity-form"
    );

    const infinityInput = document.querySelector(
        "#infinity-answer"
    );

    const infinityResult = document.querySelector(
        "#infinity-result"
    );

    function checkInfinityAnswer() {

        if (!infinityInput || !infinityResult) return;

        const rawAnswer = infinityInput.value.trim();

        if (rawAnswer === "") {

            infinityResult.textContent =
                "Enter your answer to begin the trial.";

            infinityResult.className = "trial-result error";

            return;
        }

        const answer = Number(rawAnswer);

        if (!Number.isFinite(answer)) {

            infinityResult.textContent =
                "Please enter a valid number.";

            infinityResult.className = "trial-result error";

            return;
        }

        // The geometric series:
        // 1/2 + 1/4 + 1/8 + ... = 1

        if (Math.abs(answer - 1) < 0.000001) {

            infinityResult.textContent =
                "Correct! The infinite geometric series converges to 1.";

            infinityResult.className = "trial-result success";

        } else {

            infinityResult.textContent =
                "Not quite. Hint: Each term is half the previous one.";

            infinityResult.className = "trial-result error";

        }

    }

    if (infinityForm) {

        infinityForm.addEventListener("submit", event => {

            event.preventDefault();

            checkInfinityAnswer();

        });

    }

    const infinityCheckButton = document.querySelector(
        "#check-infinity"
    );

    if (infinityCheckButton && !infinityForm) {

        infinityCheckButton.addEventListener(
            "click",
            checkInfinityAnswer
        );

    }


    /* ======================================
       5. COMING SOON FEATURES
    ====================================== */

    const comingSoonButtons = document.querySelectorAll(
        "[data-coming-soon]"
    );

    let toastTimeout;

    function showToast(message) {

        let toast = document.querySelector(
            ".multiverse-toast"
        );

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "multiverse-toast";

            toast.setAttribute("role", "status");

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {

            toast.classList.remove("show");

        }, 3200);

    }

    comingSoonButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const feature =
                button.dataset.comingSoon || "This experience";

            showToast(
                `${feature} is coming to the Multiverse soon!`
            );

        });

    });


    /* ======================================
       6. ACTIVE NAVIGATION ON SCROLL
    ====================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const activeId = entry.target.id;

                    navigationLinks.forEach(link => {

                        const isActive =
                            link.getAttribute("href") ===
                            `#${activeId}`;

                        link.classList.toggle(
                            "active",
                            isActive
                        );

                        if (isActive) {

                            link.setAttribute(
                                "aria-current",
                                "location"
                            );

                        } else {

                            link.removeAttribute("aria-current");

                        }

                    });

                });

            },
            {
                rootMargin: "-25% 0px -60% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* ======================================
       7. SMOOTH ANCHOR NAVIGATION
    ====================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

        });

    });


    /* ======================================
       8. INITIALIZATION COMPLETE
    ====================================== */

    console.log(
        "%c SHONEN MULTIVERSE ",
        "background:#0a0e1b;color:#e9b75b;font-size:18px;font-weight:bold;padding:10px;"
    );

    console.log(
        "Anime × Physics × Mathematics — The adventure begins."
    );

});
