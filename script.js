document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const eventButtons = document.querySelectorAll('.event-btn');
    const modalOverlay = document.getElementById('eventModal');
    const modalCloseBtn = document.querySelector('.modal-close');
    const cancelBtn = document.getElementById('cancelBtn');
    const selectedEventTitle = document.getElementById('selectedEventTitle');
    
    // Event data
    const eventData = {
        'web-dev': {
            title: 'Modern Web Development 2024',
            link: 'https://example.com/daftar?event=web-dev'
        },
        'ai-challenge': {
            title: 'AI Innovation Challenge',
            link: 'https://example.com/daftar?event=ai-challenge'
        },
        'leadership': {
            title: 'Tech Leadership Forum',
            link: 'https://example.com/daftar?event=leadership'
        }
    };
    
    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Mobile menu toggle
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
    
    // Smooth scroll
    function smoothScrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            closeMobileMenu();
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    // Open modal
    function openEventModal(e) {
        e.preventDefault();
        const eventId = this.getAttribute('data-event');
        
        if (eventData[eventId]) {
            selectedEventTitle.textContent = eventData[eventId].title;
            const modalBtn = document.querySelector('.modal-btn.btn-primary');
            modalBtn.setAttribute('href', eventData[eventId].link);
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close modal
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Hero animations
    function initHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        heroSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';
        
        heroButtons.style.opacity = '0';
        heroButtons.style.transform = 'translateY(20px)';
        heroButtons.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);
        
        setTimeout(() => {
            heroButtons.style.opacity = '1';
            heroButtons.style.transform = 'translateY(0)';
        }, 900);
    }
    
    // Update active nav link
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    // Initialize
    function init() {
        initHeroAnimations();
        setTimeout(initScrollAnimations, 1000);
        
        // Add animation classes to event cards
        document.querySelectorAll('.event-card').forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Event listeners
        window.addEventListener('scroll', handleNavbarScroll);
        window.addEventListener('scroll', updateActiveNavLink);
        handleNavbarScroll();
        updateActiveNavLink();
        
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', smoothScrollToSection);
        });
        
        eventButtons.forEach(button => {
            button.addEventListener('click', openEventModal);
        });
        
        modalCloseBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) closeModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
        
        // Update year in footer
        const yearElement = document.querySelector('.copyright');
        if (yearElement) {
            yearElement.textContent = yearElement.textContent.replace('2024', new Date().getFullYear());
        }
        
        console.log('%c💻 HIMAFORKA - Premium Technology Platform', 'color: #C1121F; font-size: 16px; font-weight: bold;');
        console.log('%cWebsite professional dengan desain merah premium telah dimuat.', 'color: #8B0000;');
    }
    
    init();
});