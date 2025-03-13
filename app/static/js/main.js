// app/static/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations with more options
    AOS.init({
        duration: 1200,
        once: false,
        offset: 100,
        delay: 100,
        mirror: true,
        easing: 'ease-out-cubic'
    });

    // Smooth scroll for navigation links with enhanced behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Highlight active nav item
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll with easing
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced navbar background change on scroll with transparency
    const nav = document.querySelector('.main-nav');
    const logo = document.querySelector('.logo');
    const scrollThreshold = 100;
    
    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            nav.style.padding = '0.7rem 0';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
            nav.style.padding = '1rem 0';
        }
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initial call

    // Scroll reveal animation
    function revealElements() {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            } else {
                if(!element.classList.contains('once')) {
                    element.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial call

    // Enhanced contact form submission with validation and animations
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const inputs = this.querySelectorAll('input, textarea, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    input.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.classList.remove('error');
                        }
                    });
                }
            });
            
            if (!isValid) {
                return;
            }
            
            // Add form submission animation with success indicator
            const button = this.querySelector('button');
            button.innerHTML = '<span class="loading-animation"></span> 发送中...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                button.innerHTML = '<span class="success-icon">✓</span> 发送成功';
                button.classList.add('success');
                this.reset();
                
                setTimeout(() => {
                    button.innerHTML = '发送消息';
                    button.disabled = false;
                    button.classList.remove('success');
                }, 2500);
            }, 1800);
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const button = this.querySelector('button');
            
            if (!input.value.trim()) {
                input.classList.add('error');
                return;
            }
            
            button.innerHTML = '<span class="loading-animation"></span> 订阅中...';
            button.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                button.innerHTML = '✓ 订阅成功';
                input.value = '';
                
                setTimeout(() => {
                    button.innerHTML = '订阅';
                    button.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add enhanced hover effects to product cards with depth
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.03)';
            card.style.zIndex = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.zIndex = '0';
        });
        
        // Add 3D tilt effect
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            const rotateX = mouseY * -0.05;
            const rotateY = mouseX * 0.05;
            
            card.style.transform = `translateY(-15px) scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
    
    // Product Modal Functionality
    const modal = document.querySelector('.product-modal');
    const closeModal = document.querySelector('.close-modal');
    const productPreviewBtns = document.querySelectorAll('.product-preview-btn');
    
    if (modal && closeModal && productPreviewBtns.length > 0) {
        // Open modal
        productPreviewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const card = this.closest('.product-card');
                const title = card.querySelector('h3').textContent;
                const desc = card.querySelector('p').textContent;
                const imgSrc = card.querySelector('img').src;
                const notes = card.querySelector('.fragrance-notes').innerHTML;
                const price = card.querySelector('.product-price').textContent;
                
                // Update modal content
                modal.querySelector('.modal-title').textContent = title;
                modal.querySelector('.modal-description').textContent = desc;
                modal.querySelector('.modal-image img').src = imgSrc;
                modal.querySelector('.modal-notes').innerHTML = notes;
                modal.querySelector('.modal-price').textContent = price;
                
                // Show modal with animation
                modal.classList.add('open');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        closeModal.addEventListener('click', function() {
            modal.classList.remove('open');
            document.body.style.overflow = '';
        });
        
        // Close modal on click outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length > 0 && dots.length > 0) {
        let currentIndex = 0;
        
        // Show specific slide
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }
        
        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }
        
        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        }
        
        // Add event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto slide every 5 seconds
        setInterval(nextSlide, 5000);
    }
    
    // Add floating animation to certain elements
    const addFloatingAnimation = () => {
        const elements = document.querySelectorAll('.product-card h3, .contact-content h2, .hero-content h1');
        elements.forEach((element, index) => {
            // Add subtle floating animation with different delays
            element.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
        });
    };
    
    // Create floating keyframes dynamically
    const createFloatingKeyframes = () => {
        const styleSheet = document.createElement('style');
        styleSheet.innerHTML = `
            @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
        `;
        document.head.appendChild(styleSheet);
    };
    
    createFloatingKeyframes();
    addFloatingAnimation();
    
    // Add typing animation effect to hero subtitle
    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add class to all sections for reveal animations
    document.querySelectorAll('section').forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('reveal', 'reveal-left');
        } else {
            section.classList.add('reveal', 'reveal-right');
        }
    });
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .modal-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '已加入购物车';
            this.classList.add('success');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('success');
            }, 2000);
            
            // Show cart notification (could be implemented)
            showCartNotification();
        });
    });
    
    // Cart notification
    function showCartNotification() {
        // Check if notification already exists
        let notification = document.querySelector('.cart-notification');
        
        if (!notification) {
            // Create notification element
            notification = document.createElement('div');
            notification.className = 'cart-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="success-icon">✓</span>
                    <span>已成功加入购物车</span>
                </div>
            `;
            document.body.appendChild(notification);
            
            // Add styles dynamically
            const style = document.createElement('style');
            style.innerHTML = `
                .cart-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--gradient-1);
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    z-index: 9999;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transform: translateY(-20px);
                    animation: notificationFadeIn 0.3s forwards, notificationFadeOut 0.3s forwards 2.5s;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                @keyframes notificationFadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes notificationFadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
            
            // Remove notification after animation completes
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
    
    // Particle effect in hero section
    function createParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particles = document.createElement('div');
        particles.className = 'particles';
        hero.appendChild(particles);
        
        // Create particle style
        const style = document.createElement('style');
        style.innerHTML = `
            .particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1;
                overflow: hidden;
            }
            
            .particle {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                animation: float-particle 15s infinite;
            }
            
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                20% {
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-100vh) translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size
            const size = Math.random() * 10 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random animation duration and delay
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            particle.style.animation = `float-particle ${duration}s ${delay}s infinite`;
            
            particles.appendChild(particle);
        }
    }
    
    createParticles();

    // Back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});