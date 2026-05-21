// ===== PREMIUM ANIMATIONS (Smooth Scroll Version) =====
// All premium features with Lenis.js for 10/10 smoothness

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ==================== LENIS SMOOTH SCROLL ====================
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Stop scroll during loading
lenis.stop();

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Enhanced smooth scroll with Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

// Hide cursor on touch devices
if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
} else {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
            ease: 'power2.out'
        });
        gsap.to(cursorFollower, {
            x: e.clientX - 4,
            y: e.clientY - 4,
            duration: 0.15,
            ease: 'power2.out'
        });
    });

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .distort, .service-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ==================== TEXT SPLIT ANIMATION ====================
// Split hero text into characters
document.querySelectorAll('.hero-title .reveal-text').forEach(textContainer => {
    const text = textContainer.querySelector('span');
    if (!text) return;

    const chars = text.textContent.split('');
    textContainer.innerHTML = '';

    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'char-split';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100%)';
        span.style.display = 'inline-block';
        textContainer.appendChild(span);
    });
});

// Split section titles into words
document.querySelectorAll('.section-title').forEach(title => {
    const words = title.textContent.split(' ');
    title.innerHTML = words.map((word, i) =>
        `<span class="word" style="opacity: 0; transform: translateY(30px); display: inline-block; margin-right: 0.25em;">${word}</span>`
    ).join(' ');
});

// ==================== NAVIGATION EFFECTS ====================
const nav = document.querySelector('nav');
lenis.on('scroll', (e) => {
    if (e.scroll > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// ==================== LOADING ANIMATION ====================
const loaderTimeline = gsap.timeline({
    onComplete: () => {
        lenis.start();
        ScrollTrigger.refresh();
    }
});

// Set initial state for content reveal
gsap.set('main', { scale: 0.95, opacity: 0 });

loaderTimeline
    .from('.loader-text .char', {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out'
    })
    .to('.loader-text .char', {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.3
    })
    .to('.loader-progress-bar', {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut'
    }, '-=0.8')
    .to({}, {
        duration: 2,
        ease: 'none'
    })
    .to('.loader-text', {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.inOut'
    })
    .to('.loader', {
        y: '-100%',
        duration: 1.5,
        ease: 'power4.inOut'
    }, '-=0.8')
    .to('main', {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power4.out',
        clearProps: "scale,transform"
    }, '-=1.2')
    .to('.hero-title .char-split', {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power4.out'
    }, '-=1.2');

// Hero animation for other elements
gsap.from('#hero .reveal-text:not(.hero-title .reveal-text)', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top 85%',
        end: 'top 20%',
        scrub: 1
    },
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 1.5,
    ease: 'power3.out'
});

// ==================== SCROLL PROGRESS BAR ====================
gsap.to('.scroll-progress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// ==================== PROJECT ITEMS ANIMATION ====================
document.querySelectorAll('.project-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 50%'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    });
});

// ==================== ENHANCED IMAGE REVEAL ====================
document.querySelectorAll('.image-reveal').forEach(image => {
    const img = image.querySelector('img');

    // Set loaded state - Essential for visibility (img has opacity: 0 by default)
    if (img && img.complete) {
        img.classList.add('loaded');
    } else if (img) {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }

    // Initial scale for all reveal images
    if (img) gsap.set(img, { scale: 1.15 });

    // Skip images inside the horizontal showcase for special scroll handling
    if (image.closest('#showcase')) return;

    // Reveal animation with scale
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 1
        }
    });

    tl.to(image, {
        '--reveal-scale': 0,
        '--clip-progress': '0%',
        duration: 1.5,
        ease: 'power4.inOut'
    })
    .to(img, {
        scale: 1,
        duration: 1.5,
        ease: 'power4.out'
    }, 0);

    // Enhanced hover effect
    image.addEventListener('mouseenter', () => {
        gsap.to(img, {
            scale: 1.05,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    image.addEventListener('mouseleave', () => {
        gsap.to(img, {
            scale: 1.15,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

// ==================== ENHANCED MAGNETIC BUTTONS ====================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    let bounds;

    const updateBounds = () => {
        bounds = btn.getBoundingClientRect();
    };

    btn.addEventListener('mouseenter', updateBounds);

    btn.addEventListener('mousemove', (e) => {
        if (!bounds) updateBounds();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;

        gsap.to(btn, {
            x: x * 0.5,
            y: y * 0.5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)'
        });
    });

    // Click ripple effect
    btn.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes if not exists
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== HORIZONTAL SCROLL SHOWCASE ====================
const showcaseSection = document.querySelector('#showcase');
const showcaseItems = document.querySelector('#showcase .flex.gap-8');

if (showcaseSection && showcaseItems) {
    const getScrollAmount = () => {
        return showcaseItems.scrollWidth - window.innerWidth;
    };

    const showcaseTl = gsap.timeline({
        scrollTrigger: {
            trigger: showcaseSection,
            start: 'top top',
            end: () => `+=${showcaseItems.scrollWidth}`,
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1
        }
    });

    // Faster and more reliable reveal
    showcaseTl.to('#showcase .image-reveal', {
        '--reveal-scale': 0,
        '--clip-progress': '0%',
        duration: 0.1,
        stagger: 0.02,
        ease: 'power2.out'
    });

    showcaseTl.to('#showcase img', {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        stagger: 0.02,
        ease: 'power2.out'
    }, 0);

    // Horizontal movement
    showcaseTl.to(showcaseItems, {
        x: () => -getScrollAmount(),
        ease: 'none',
        duration: 1
    }, 0.05);
}

// ==================== PARALLAX EFFECT ====================
gsap.utils.toArray('.project-image').forEach(image => {
    gsap.to(image, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        }
    });
});

// ==================== SECTION TITLES ANIMATION ====================
document.querySelectorAll('.section-title').forEach(title => {
    const words = title.querySelectorAll('.word');
    if (words.length > 0) {
        gsap.to(words, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            },
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power4.out'
        });
    } else {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 85%'
            },
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        });
    }
});

// ==================== SERVICE ITEMS ====================
document.querySelectorAll('.service-item').forEach((service, i) => {
    gsap.from(service, {
        scrollTrigger: {
            trigger: service,
            start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        delay: i * 0.1,
        duration: 1,
        ease: 'power4.out'
    });
});

// ==================== TEAM MEMBERS ====================
document.querySelectorAll('.team-member').forEach((member, i) => {
    gsap.from(member, {
        scrollTrigger: {
            trigger: member,
            start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        delay: i * 0.15,
        duration: 1,
        ease: 'power4.out'
    });
});

// ==================== CONTACT CTA ====================
gsap.from('#contact .magnetic-btn', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
});

// ==================== THREE.JS BACKGROUND ====================
const initThreeJS = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.002,
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 2;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Smooth mouse follow
        particlesMesh.rotation.y += mouseX * 0.01;
        particlesMesh.rotation.x += mouseY * 0.01;

        renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize Three.js
initThreeJS();

// ==================== PERFORMANCE OPTIMIZATION ====================
// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    gsap.globalTimeline.timeScale(1.3);
}

// Refresh ScrollTrigger on resize and after load
ScrollTrigger.addEventListener('refreshInit', () => {
    // Refresh calculations
});

// Initial refresh with delay for Lenis/Layout
setTimeout(() => {
    ScrollTrigger.refresh();
}, 500);

console.log('🚀 Nova Agency Premium Experience Loaded!');
