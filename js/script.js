

console.log("Portfolio Loaded Successfully");

// ===================================
// 1. CURRENT YEAR
// ===================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ===================================
// 2. DARK / LIGHT MODE
// ===================================

const themeButton = document.getElementById("theme-btn");

if (themeButton) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeButton.textContent = "🌙";
    } else {
        document.body.classList.remove("light-mode");
        themeButton.textContent = "☀️";
    }

    themeButton.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const isLight =
            document.body.classList.contains("light-mode");

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
        );

        themeButton.textContent =
            isLight ? "🌙" : "☀️";

    });
}


// ===================================
// 3. AOS SCROLL ANIMATION
// ===================================

if (typeof AOS !== "undefined") {

    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

}


// ===================================
// 4. TYPING ANIMATION
// ===================================

const roles = [
    "ASP.NET Core Developer",
    "SQA Engineer",
    "Software Engineer",
    "Full-Stack Developer"
];

const typingElement =
    document.getElementById("typing");

if (typingElement) {

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeText() {

        const currentRole = roles[roleIndex];

        if (!deleting) {

            typingElement.textContent =
                currentRole.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeText, 1500);
                return;
            }

        } else {

            typingElement.textContent =
                currentRole.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                roleIndex =
                    (roleIndex + 1) % roles.length;

            }

        }

        setTimeout(typeText, deleting ? 50 : 100);

    }

    typeText();
}


// ===================================
// 5. EMAILJS CONTACT FORM
// ===================================


// ===================================
// EMAILJS CONTACT FORM
// ===================================

const contactForm = document.getElementById("contact-form");
const sendBtn = document.getElementById("send-btn");
const formStatus = document.getElementById("form-status");

if (contactForm && sendBtn) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        sendBtn.disabled = true;
        sendBtn.textContent = "Sending...";

        if (formStatus) {
            formStatus.textContent = "Sending your message...";
        }

        emailjs.sendForm(
            "service_tz4yi8j",
            "template_xgz5j6c",
            contactForm
        )

        .then(function (response) {

            console.log("SUCCESS!", response.status, response.text);

            if (formStatus) {
                formStatus.textContent =
                    "Your message was sent successfully!";
            }

            contactForm.reset();

            sendBtn.textContent = "Message Sent ✓";

        })

       .catch(function (error) {

    console.error("EMAILJS ERROR:", error);

    if (formStatus) {
        formStatus.textContent =
            "Error: " + (error.text || error.message || JSON.stringify(error));
    }

    sendBtn.textContent = "Try Again";

})

        .finally(function () {

            sendBtn.disabled = false;

            setTimeout(function () {
                sendBtn.textContent = "Send Message";
            }, 3000);

        });

    });

}



// ===================================
// 6. ACTIVE NAVIGATION
// ===================================

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");

function updateActiveNav() {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


// ===================================
// 7. MOBILE NAVIGATION
// ===================================

// Mobile Navigation Toggle

// Mobile Navigation Toggle

const menuBtn = document.getElementById("menu-btn");
const navMenu = document.getElementById("nav-menu");

if (menuBtn && navMenu) {

    // Open and close menu
    menuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        menuBtn.textContent =
            navMenu.classList.contains("active") ? "✕" : "☰";

    });

    // Close menu after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuBtn.textContent = "☰";

        });

    });

}



// ===================================
// 8. BACK TO TOP
// ===================================

const topBtn =
    document.getElementById("top-btn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}




// ===================================
// 11. PROJECT MOUSE GLOW
// ===================================

document.querySelectorAll(".project-card")
.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);

    });

});


// ===================================
// 12. DESCRIPTION MOUSE EFFECT
// ===================================

document.querySelectorAll(".description")
.forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX - rect.left}px`
        );

        card.style.setProperty(
            "--y",
            `${e.clientY - rect.top}px`
        );

    });

});


// ===================================
// 13. TAB FUNCTIONALITY
// ===================================

const tabButtons =
    document.querySelectorAll(".tab-btn");

const tabContents =
    document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {

    button.addEventListener("click", () => {

        tabButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        tabContents.forEach(tab =>
            tab.classList.remove("active")
        );

        button.classList.add("active");

        const selectedTab =
            document.getElementById(button.dataset.tab);

        if (selectedTab) {
            selectedTab.classList.add("active");
        }

    });

});


// ===================================
// 14. PRELOADER
// ===================================

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }

});




// Portfolio Filtering

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Get selected category
        const selectedFilter = this.dataset.filter;

        // Filter projects
        projectCards.forEach(card => {

            const projectCategory = card.dataset.category;

            if (
                selectedFilter === "all" ||
                selectedFilter === projectCategory
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

});





// =================================
// MY JOURNEY TABS
// =================================

const journeyTabs = document.querySelectorAll(".journey-tab");
const journeyPanels = document.querySelectorAll(".journey-panel");

journeyTabs.forEach(tab => {

    tab.addEventListener("click", function () {

        const target = this.dataset.tab;

        // Remove active class from all tabs
        journeyTabs.forEach(item => {
            item.classList.remove("active");
        });

        // Hide all panels
        journeyPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        // Activate clicked tab
        this.classList.add("active");

        // Show selected panel
        const selectedPanel = document.getElementById(target);

        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

    });

});





/* =========================================
   9. ABOUT SECTION - SKILL BAR ANIMATION
========================================= */

function initializeSkillBars() {

    const skillBars = document.querySelectorAll(
        ".skills-container .skill-bar span[data-progress]"
    );

    console.log("Total skill bars found:", skillBars.length);

    skillBars.forEach((bar, index) => {

        const progress = Number(bar.dataset.progress);

        if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
            console.error("Invalid skill percentage:", bar);
            return;
        }

        // Reset before animation
        bar.style.width = "0%";

        // Animate after a short delay
        setTimeout(() => {
            bar.style.width = progress + "%";
        }, 100 + index * 50);

    });
}

// Run whether DOM is loaded or not
if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", initializeSkillBars);

} else {

    initializeSkillBars();

}


/* =========================================
   10. ABOUT SECTION - ANIMATED COUNTERS
========================================= */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    const aboutSection = document.querySelector("#about");

    if (!aboutSection || !counters.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                counters.forEach(counter => {

                    const target = Number(counter.dataset.target);

                    if (!Number.isFinite(target)) return;

                    let count = 0;

                    const increment = Math.max(1, Math.ceil(target / 50));

                    const interval = setInterval(() => {

                        count = Math.min(count + increment, target);

                        counter.textContent = count + "+";

                        if (count >= target) {
                            clearInterval(interval);
                        }

                    }, 40);

                });

                observer.unobserve(aboutSection);
            }

        });

    }, { threshold: 0.1 });

    observer.observe(aboutSection);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCounters);
} else {
    initializeCounters();
}








// ===================================
// FLOATING LIVE CHATBOX
// ===================================

document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("chat-toggle");
    const chatClose = document.getElementById("chat-close");
    const chatBox = document.getElementById("chat-box");
    const chatForm = document.getElementById("chat-form");

    const chatSend = document.getElementById("chat-send");
    const chatStatus = document.getElementById("chat-status");

    // Open chatbox
    chatToggle.addEventListener("click", function () {
        chatBox.classList.toggle("active");
    });

    // Close chatbox
    chatClose.addEventListener("click", function () {
        chatBox.classList.remove("active");
    });

    // Send message using EmailJS
    chatForm.addEventListener("submit", function (e) {

        e.preventDefault();

        if (typeof emailjs === "undefined") {
            chatStatus.textContent = "Email service is unavailable.";
            return;
        }

        const name = document.getElementById("chat-name").value.trim();
        const email = document.getElementById("chat-email").value.trim();
        const message = document.getElementById("chat-message").value.trim();

        if (!name || !email || !message) {
            chatStatus.textContent = "Please complete all fields.";
            return;
        }

        chatSend.disabled = true;
        chatSend.textContent = "Sending...";

        chatStatus.textContent = "";

        emailjs.send(
            "service_tz4yi8j",
            "template_xgz5j6c",
            {
                name: name,
                email: email,
                phone: "Not provided",
                service: "Portfolio Live Chat",
                message: message
            }
        )

        .then(function () {

            chatStatus.textContent =
                "Message sent successfully! Thank you.";

            chatStatus.style.color = "#28a745";

            chatForm.reset();

            chatSend.disabled = false;
            chatSend.innerHTML =
                '<i class="fas fa-paper-plane"></i> Send Message';

        })

        .catch(function (error) {

            console.error("EmailJS error:", error);

            chatStatus.textContent =
                "Message failed. Please try again.";

            chatStatus.style.color = "#ff4444";

            chatSend.disabled = false;
            chatSend.innerHTML =
                '<i class="fas fa-paper-plane"></i> Send Message';

        });

    });

});



















// ===================================
// CIRCULAR TECHNICAL SKILLS ANIMATION
// ===================================

//document.addEventListener("DOMContentLoaded", function () {
/*
    const skills = document.querySelectorAll(".technical-skill");

    if (!skills.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const skill = entry.target;
                const progress = Number(skill.dataset.progress);
                const circle = skill.querySelector(".skill-circle");

                circle.style.background = `
                    conic-gradient(
                        var(--orange) ${progress * 3.6}deg,
                        #383838 ${progress * 3.6}deg
                    )
                `;

                observer.unobserve(skill);
            }

        });

    }, {
        threshold: 0.3
    });

    skills.forEach(skill => observer.observe(skill));

});*/