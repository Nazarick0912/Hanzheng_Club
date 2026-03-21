import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particles = [];
        // Increased particles significantly for a richer effect
        const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 250;
        const colors = [
            { r: 255, g: 107, b: 107 }, // Pink
            { r: 77, g: 171, b: 247 },  // Blue
            { r: 218, g: 119, b: 242 }, // Purple
            { r: 255, g: 212, b: 59 }   // Yellow
        ];
        const connectionDistance = 120;
        const mouse = { x: null, y: null, radius: 150 };

        let width = 0;
        let height = 0;

        // Resize Canvas and handle Retina/High-DPI displays for sharpness
        const resizeCanvas = () => {
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            const dpr = window.devicePixelRatio || 1;
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Track Mouse
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Click to Scatter Interaction
        const handleMouseClick = () => {
            if (mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 40000) { // 200 radius for the blast
                        const dist = Math.sqrt(distSq);
                        const force = (200 - dist) / 200;
                        // Apply strong velocity outwards
                        p.oldX = p.x - (dx / dist) * force * 50;
                        p.oldY = p.y - (dy / dist) * force * 50;
                    }
                }
            }
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('click', handleMouseClick);

        // Particle Class (Verlet Integration)
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                // Add initial velocity offset for oldX/oldY
                this.oldX = this.x - (Math.random() - 0.5) * 3;
                this.oldY = this.y - (Math.random() - 0.5) * 3;
                
                this.colorObj = colors[Math.floor(Math.random() * colors.length)];
                this.color = `rgb(${this.colorObj.r}, ${this.colorObj.g}, ${this.colorObj.b})`;
                this.radius = Math.random() * 2 + 0.8; // Slightly smaller for a crisp look
            }

            update() {
                // Verlet velocity
                let vx = (this.x - this.oldX) * 0.96; // 0.96 dampening for smooth glide
                let vy = (this.y - this.oldY) * 0.96;

                this.oldX = this.x;
                this.oldY = this.y;

                // Mouse Repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < mouse.radius * mouse.radius) {
                        const dist = Math.sqrt(distSq);
                        const force = (mouse.radius - dist) / mouse.radius;
                        // Push outward
                        vx += (dx / dist) * force * 1.5;
                        vy += (dy / dist) * force * 1.5;
                    }
                }

                // Add slight wandering force naturally
                vx += (Math.random() - 0.5) * 0.2;
                vy += (Math.random() - 0.5) * 0.2;

                this.x += vx;
                this.y += vy;

                // Boundary Bounce
                if (this.x < 0) {
                    this.x = 0;
                    this.oldX = this.x + vx; 
                } else if (this.x > width) {
                    this.x = width;
                    this.oldX = this.x + vx;
                }

                if (this.y < 0) {
                    this.y = 0;
                    this.oldY = this.y + vy;
                } else if (this.y > height) {
                    this.y = height;
                    this.oldY = this.y + vy;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                // Subtle sharper glow instead of heavy blur
                ctx.shadowBlur = 4;
                ctx.shadowColor = this.color;
                
                ctx.fill();
                ctx.closePath();

                // Reset shadow for lines
                ctx.shadowBlur = 0;
            }
        }

        // Initialize Particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation Loop
        const animate = () => {
            // Clear entirely each frame to avoid blur trails, achieving a sharper look
            ctx.clearRect(0, 0, width, height);

            // Build spatial grid or O(N^2) for connections
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect nearby particles (Tethers)
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < connectionDistance * connectionDistance) {
                        const dist = Math.sqrt(distSq);
                        const opacity = 1 - dist / connectionDistance;

                        // Pull them very slightly together
                        const tetherForce = 0.0008 * opacity;
                        particles[i].oldX += dx * tetherForce;
                        particles[i].oldY += dy * tetherForce;
                        particles[j].oldX -= dx * tetherForce;
                        particles[j].oldY -= dy * tetherForce;

                        // Draw lines using the particle's own color combined with the opacity
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${particles[i].colorObj.r}, ${particles[i].colorObj.g}, ${particles[i].colorObj.b}, ${opacity * 0.4})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }

            // Draw interaction lines to mouse
            if (mouse.x !== null && mouse.y !== null) {
                for (let i = 0; i < particles.length; i++) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 22500) { // 150 radius squared
                        const dist = Math.sqrt(distSq);
                        const opacity = 1 - dist / 150;

                        ctx.beginPath();
                        // Draw brightly colored line connecting to the cursor
                        ctx.strokeStyle = `rgba(${particles[i].colorObj.r}, ${particles[i].colorObj.g}, ${particles[i].colorObj.b}, ${opacity * 0.8})`;
                        ctx.lineWidth = 1.2; // Slightly thicker
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            canvas.removeEventListener('click', handleMouseClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'auto',
                opacity: 1 // Full opacity for brighter, sharper particles
            }}
        />
    );
};

export default ParticleBackground;
