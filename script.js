/* =====================================================
   AMEH JOHN BRYMO PORTFOLIO
   SCRIPT.JS
===================================================== */

"use strict";

/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("hide");

            // Remove completely after animation
            setTimeout(() => {
                preloader.remove();
            }, 600);

        }, 1500);
    }
});

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");

        });

    });

}

/* =====================================================
   STICKY HEADER
===================================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});
/* =====================================================
   TYPING ANIMATION
===================================================== */

const typingElement = document.getElementById("typing");

if (typingElement) {

    const words = [
    "Full Stack Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Computer Programmer"
];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentWord.substring(0, charIndex);

        let speed = isDeleting ? 60 : 100;

        // Finished typing
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            speed = 1800;
        }

        // Finished deleting
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    const icon = themeToggle.querySelector("i");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {

            localStorage.setItem("theme", "light");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            localStorage.setItem("theme", "dark");

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    });

}
/* =====================================================
   REVEAL ANIMATION
===================================================== */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach((element) => {

        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
        }

    });

}

// Run on page load
revealSections();

// Run while scrolling
window.addEventListener("scroll", revealSections);


/* =====================================================
   SCROLL TO TOP BUTTON
===================================================== */

const scrollTopBtn = document.getElementById("scrollTop");

if (scrollTopBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

    scrollTopBtn.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================================
   EMAILJS INITIALIZATION
===================================================== */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "Y4BCdakitom5E8cov"
    });

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm && typeof emailjs !== "undefined") {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const submitBtn = this.querySelector("button");

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        emailjs.sendForm(
            "service_chfsnth",
            "template_nlrds3j",
            this
        )

        .then(() => {

            alert("✅ Message sent successfully!");

            contactForm.reset();

        })

        .catch((error) => {

            console.error("EmailJS Error:", error);

            alert("❌ Failed to send message. Please try again.");

        })

        .finally(() => {

            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";

        });

    });

}
