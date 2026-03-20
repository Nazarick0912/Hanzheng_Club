import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        // Configuration
        const particles = [];
        const particleCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 180;
        const colors = ['#ff6b6b', '#4dabf7', '#da77f2']; // Pink, Blue, Purple
        const connectionDistance = 100;
        const mouse = { x: null, y: null, radius: 150 };

        // Resize Canvas
        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
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

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        // Particle Class (Verlet Integration)
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Add initial velocity offset for oldX/oldY
                this.oldX = this.x - (Math.random() - 0.5) * 4;
                this.oldY = this.y - (Math.random() - 0.5) * 4;
                
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.radius = Math.random() * 2.5 + 1;
            }

            update() {
                // Verlet velocity
                let vx = (this.x - this.oldX) * 0.96; // 0.96 dampening (viscous fluid friction)
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
                } else if (this.x > canvas.width) {
                    this.x = canvas.width;
                    this.oldX = this.x + vx;
                }

                if (this.y < 0) {
                    this.y = 0;
                    this.oldY = this.y + vy;
                } else if (this.y > canvas.height) {
                    this.y = canvas.height;
                    this.oldY = this.y + vy;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                
                // Add soft glow
                ctx.shadowBlur = 10;
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
            // Semi-transparent clear for slight trail effect
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // If you want pure trails, use fillRect with rgba. 
            // We use clearRect to keep the background image visible.

            // Build spatial grid or just O(N^2) for connections
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

                        // Pull them very slightly together mimicking surface tension / tethering
                        const tetherForce = 0.001 * opacity;
                        particles[i].oldX += dx * tetherForce;
                        particles[i].oldY += dy * tetherForce;
                        particles[j].oldX -= dx * tetherForce;
                        particles[j].oldY -= dy * tetherForce;

                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
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
                pointerEvents: 'auto', // Needs to capture mouse for repulsion
                opacity: 0.85
            }}
        />
    );
};

export default ParticleBackground;
