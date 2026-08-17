/* ===== Sticky header shadow ===== */
const header = document.getElementById("site-header");
window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});

/* ===== Year ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Mobile nav ===== */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

/* ===== FAQ accordion ===== */
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        const answer = button.nextElementSibling;

        // close others
        document.querySelectorAll(".faq-question").forEach(other => {
            if (other !== button) {
                other.setAttribute("aria-expanded", "false");
                other.nextElementSibling.hidden = true;
            }
        });

        button.setAttribute("aria-expanded", String(!expanded));
        answer.hidden = expanded;
    });
});

/* ===== Reveal on scroll ===== */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add("visible"));
}

/* ===== Form handling ===== */
const form = document.getElementById("booking-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("f-name").value.trim();
    const phone = document.getElementById("f-phone").value.trim();

    if (!name || !phone) {
        status.textContent = "Please fill in name and phone.";
        status.style.color = "#991b1b";
        return;
    }

    status.textContent = `Thank you, ${name}! Your request has been received. I'll reply within 24 hours.`;
    status.style.color = "var(--teal-dark)";

    form.reset();

    setTimeout(() => { status.textContent = ""; }, 8000);
});