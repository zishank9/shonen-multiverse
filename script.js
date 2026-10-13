
"use strict";

/* =========================================================
   SHONEN MULTIVERSE V2
   Cinematic Portal & Interactive Homepage
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. INTERACTIVE MULTIVERSE ENERGY CORE
       ===================================================== */

    const energyModes = {
        balance: {
            name: "Equilibrium",
            symbol: "✦",
            color: "#f2c575",
            rgb: "242, 197, 117",
            description: "All possibilities begin in balance."
        },
        anime: {
            name: "Willpower",
            symbol: "魂",
            color: "#f58b45",
            rgb: "245, 139, 69",
            description: "The power of imagination and determination."
        },
        physics: {
            name: "Cosmic Energy",
            symbol: "Φ",
            color: "#77bdfb",
            rgb: "119, 189, 251",
            description: "Discover the laws that shape reality."
        },
        math: {
            name: "Infinite Patterns",
            symbol: "∞",
            color: "#7ed6b0",
            rgb: "126, 214, 176",
            description: "Find the structures hidden within everything."
        }
    };

    const energyCore = document.querySelector("#hero-core");
    const orbitScene = document.querySelector("#orbit-scene");
    const energyButtons = document.querySelectorAll("[data-mode]");
    const energyName = document.querySelector("#mode-name");
    const energySymbol = document.querySelector("#hero-symbol");
    const energyDescription = document.querySelector("#mode-description");

    const energyModeNames = Object.keys(energyModes);

    let currentEnergyMode = "balance";

    function changeEnergy(mode) {
        const selected = energyModes[mode];

        if (!selected) return;

        currentEnergyMode = mode;

        // Update the CSS variables used by the portal,
        // rotating rings, glow, and energy core.
        if (orbitScene) {
            orbitScene.style.setProperty("--energy", selected.color);
            orbitScene.style.setProperty("--energy-rgb", selected.rgb);
            orbitScene.dataset.mode = mode;
        }

        // Update the surrounding energy control panel.
        const heroArt = document.querySelector(".hero-art");

        if (heroArt) {
            heroArt.style.setProperty("--energy", selected.color);
            heroArt.style.setProperty("--energy-rgb", selected.rgb);
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
            const isActive = button.dataset.mode === mode;

            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        if (energyCore) {
            energyCore.setAttribute(
                "aria-label",
                `Current energy: ${selected.name}. Click to change mode.`
            );
        }
    }

    energyButtons.forEach(button => {
        button.addEventListener("click", () => {
            changeEnergy(button.dataset.mode);
        });
    });

    // Clicking the portal core cycles through all four modes.
    if (energyCore) {
        energyCore.addEventListener("click", () => {
            const currentIndex = energyModeNames.indexOf(currentEnergyMode);
            const nextIndex = (currentIndex + 1) % energyModeNames.length;

            changeEnergy(energyModeNames[nextIndex]);
        });
    }

    const initialEnergyButton = document.querySelector(
        "[data-mode].active"
    );

    changeEnergy(initialEnergyButton?.dataset.mode || "balance");


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function closeMobileMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                closeMobileMenu();
            }
        });
    }


    /* =====================================================
       3. SCROLL REVEAL ANIMATIONS
       ===================================================== */

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
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("visible");
                    entry.target.classList.add("is-visible");

                    revealObserver.unobserve(entry.target);
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -20px 0px"
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


    /* =====================================================
       4. THE INFINITY TRIAL
       ===================================================== */

    const trialForm = document.querySelector("#trial-form");
    const trialInput = document.querySelector("#trial-answer");
    const trialFeedback = document.querySelector("#trial-feedback");

    function checkInfinityAnswer() {
        if (!trialInput || !trialFeedback) return;

        const rawAnswer = trialInput.value.trim();

        trialFeedback.classList.remove("success", "error");

        if (!rawAnswer) {
            trialFeedback.textContent =
                "Enter your answer to begin the trial.";

            trialFeedback.classList.add("error");
            return;
        }

        // Support decimal answers as well as fractions.
        let answer;

        if (rawAnswer.includes("/")) {
            const parts = rawAnswer.split("/");

            if (parts.length !== 2) {
                answer = NaN;
            } else {
                const numerator = Number(parts[0].trim());
                const denominator = Number(parts[1].trim());

                answer = denominator !== 0
                    ? numerator / denominator
                    : NaN;
            }
        } else {
            answer = Number(rawAnswer);
        }

        if (!Number.isFinite(answer)) {
            trialFeedback.textContent =
                "Please enter a valid number or fraction.";

            trialFeedback.classList.add("error");
            return;
        }

        // 1/2 + 1/4 + 1/8 + 1/16 + ... = 1

        if (Math.abs(answer - 1) < 0.000001) {
            trialFeedback.textContent =
                "Correct! The infinite geometric series converges to 1. " +
                "Every term brings the total closer to its limit.";

            trialFeedback.classList.add("success");
        } else {
            trialFeedback.textContent =
                "Not quite! Hint: Each term is half the previous one. " +
                "Think about what happens as the number of terms grows.";

            trialFeedback.classList.add("error");
        }
    }

    if (trialForm) {
        trialForm.addEventListener("submit", event => {
            event.preventDefault();
            checkInfinityAnswer();
        });
    }


    /* =====================================================
       5. COMING SOON NOTIFICATIONS
       ===================================================== */

    const comingSoonButtons = document.querySelectorAll(
        "[data-coming-soon]"
    );

    const toast = document.querySelector("#toast");

    let toastTimeout;

    function showToast(message) {
        if (!toast) return;

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

            const feature = button.dataset.comingSoon ||
                "This experience";

            showToast(
                `${feature} is coming to the Multiverse soon!`
            );
        });
    });


    /* =====================================================
       6. ACTIVE NAVIGATION ON SCROLL
       ===================================================== */

    const sections = document.querySelectorAll("main section[id]");

    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const activeId = entry.target.id;

                    navigationLinks.forEach(link => {
                        const isActive =
                            link.getAttribute("href") === `#${activeId}`;

                        link.classList.toggle("active", isActive);

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


    /* =====================================================
       7. SMOOTH ANCHOR NAVIGATION
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.getElementById(
                targetId.substring(1)
            );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });


    /* =====================================================
       8. INITIALIZATION COMPLETE
       ===================================================== */

    console.log(
        "%c SHONEN MULTIVERSE V2 ",
        "background:#080d1b;color:#f2c575;" +
        "font-size:18px;font-weight:bold;padding:10px;"
    );

    console.log(
        "Anime × Physics × Mathematics — Enter the Multiverse."
    );

});
