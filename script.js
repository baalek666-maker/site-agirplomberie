/* ========================================
   Le Gruau Lorrain — Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar scroll effect =====
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ===== Mobile menu toggle =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ===== Smooth scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== Intersection Observer for fade-in =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to animatable elements
    const animateSelectors = [
        '.creation-card',
        '.stat-card',
        '.avis-card',
        '.creations-highlight',
        '.histoire-content',
        '.histoire-stats',
        '.horaires-content',
        '.horaires-cta',
        '.contact-info',
        '.map-wrapper'
    ];

    animateSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    });

    // ===== Mobile CTA show/hide =====
    const mobileCta = document.getElementById('mobileCta');
    if (mobileCta) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > 400) {
                mobileCta.style.transform = 'translateY(0)';
            } else {
                mobileCta.style.transform = 'translateY(100%)';
            }
            lastScroll = current;
        }, { passive: true });
        mobileCta.style.transform = 'translateY(100%)';
        mobileCta.style.transition = 'transform 0.3s ease';
    }

});
