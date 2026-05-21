// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.2 });
    gsap.to(cursorFollower, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.1 });
});

// Hover effects for cursor
const hoverElements = document.querySelectorAll('a, button, .distort, .service-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Loading Animation
const loaderTimeline = gsap.timeline();

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
    .to('.hero-title .reveal-text span', {
        y: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1.5,
        ease: 'power4.out'
    }, '-=1.2'); // เริ่มพร้อมกับ loader ลง

// Hero Animation - Only animate elements that aren't part of the loader animation
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

// Hero Title - Make sure it stays visible after animation
gsap.set('.hero-title .reveal-text span', { 
    transform: 'translateY(100%)',
    opacity: 1
});

// Scroll Progress Bar
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

// Project Items Animation
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

// Image Reveal Animation
document.querySelectorAll('.image-reveal').forEach(image => {
    gsap.to(image, {
        scrollTrigger: {
            trigger: image,
            start: 'top 80%'
        },
        onComplete: () => {
            gsap.to(image.querySelector('img'), {
                scale: 1,
                duration: 1.5,
                ease: 'power4.out'
            });
        }
    });

    // Initial state
    gsap.set(image.querySelector('img'), { scale: 1.1 });

    // Reveal animation - remove the overlay
    gsap.to(image, {
        scrollTrigger: {
            trigger: image,
            start: 'top 80%'
        },
        '--reveal-scale': 0,
        duration: 1.2,
        ease: 'power4.out'
    });

    // Hover effect
    image.addEventListener('mouseenter', () => {
        gsap.to(image.querySelector('img'), { scale: 1, duration: 0.8 });
    });

    image.addEventListener('mouseleave', () => {
        gsap.to(image.querySelector('img'), { scale: 1.1, duration: 0.8 });
    });
});

// Service Items
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

// Horizontal Scroll for Showcase
const showcaseSection = document.querySelector('#showcase');
const showcaseItems = document.querySelector('#showcase .flex.gap-8');

if (showcaseSection && showcaseItems) {
    gsap.to(showcaseItems, {
        x: () => -(showcaseItems.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: showcaseSection,
            start: 'top top',
            end: () => `+=${showcaseItems.scrollWidth}`,
            scrub: 1,
            pin: true
        }
    });
}

// Parallax Effect
gsap.utils.toArray('.project-image').forEach(image => {
    gsap.to(image, {
        yPercent: -15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: image,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5
        }
    });
});

// Text Split Animation
document.querySelectorAll('.section-title').forEach(title => {
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
});

// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    let bounds;
    
    btn.addEventListener('mouseenter', () => {
        bounds = btn.getBoundingClientRect();
    });

    btn.addEventListener('mousemove', (e) => {
        if (!bounds) bounds = btn.getBoundingClientRect();
        const x = e.clientX - bounds.left - bounds.width / 2;
        const y = e.clientY - bounds.top - bounds.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
    });
});

// Team Member Animations
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

// Contact Section Animation
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

// Three.js Background Animation
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

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 0
                },
                ease: 'power4.inOut'
            });
        }
    });
});

// Refresh ScrollTrigger on resize
ScrollTrigger.addEventListener('refreshInit', () => {
    // Refresh any size-dependent calculations
});

// Initial refresh
ScrollTrigger.refresh();

console.log('🚀 Nova Agency website loaded successfully!');
