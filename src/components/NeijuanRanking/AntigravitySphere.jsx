import React, { useEffect, useRef } from 'react';

const AntigravitySphere = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width = 0;
        let height = 0;

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

        // 3D Fibonacci Sphere mathematically mapped
        const particles = [];
        const numPoints = 1200; // Dense enough to look like the screenshot
        
        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            const inclination = Math.acos(1 - 2 * t);
            const azimuth = 2 * Math.PI * 1.618033988749895 * i;

            const x = Math.sin(inclination) * Math.cos(azimuth);
            const y = Math.sin(inclination) * Math.sin(azimuth);
            const z = Math.cos(inclination);
            particles.push({ ox: x, oy: y, oz: z });
        }

        let rotationX = 0.5; // Tilted slightly down
        let rotationY = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            rotationY += 0.0015; // Elegant slow rotate

            // Position the sphere on the right side of the screen, like the screenshot
            const cx = width > 1024 ? width * 0.75 : width * 0.5;
            const cy = height * 0.5;
            const radius = Math.min(width, height) * 0.8;

            particles.forEach((p, index) => {
                const cosX = Math.cos(rotationX);
                const sinX = Math.sin(rotationX);
                const cosY = Math.cos(rotationY);
                const sinY = Math.sin(rotationY);

                // Y-axis
                let x1 = p.ox * cosY - p.oz * sinY;
                let z1 = p.oz * cosY + p.ox * sinY;

                // X-axis
                let y2 = p.oy * cosX - z1 * sinX;
                let z2 = z1 * cosX + p.oy * sinX;

                const fov = Math.max(width, height); // Dynamically scale FOV
                const perspective = fov / (fov + z2 * radius);
                const px = cx + x1 * radius * perspective;
                const py = cy + y2 * radius * perspective;

                // Only draw front and middle-back particles
                const opacity = Math.min(Math.max((z2 + 0.8) / 1.5, 0), 1);
                
                if (perspective > 0 && opacity > 0.05 && px > -50 && px < width + 50 && py > -50 && py < height + 50) {
                   ctx.beginPath();
                   
                   // Draw short dashes instead of perfect circles for motion effect
                   const isAccent = index % 4 === 0;
                   const dotSize = Math.max(0.1, (isAccent ? 2 : 1.2) * perspective); // Ensure dotSize is never negative!
                   ctx.arc(px, py, dotSize, 0, Math.PI * 2);
                   
                   // The signature Antigravity Blue
                   ctx.fillStyle = isAccent ? `rgba(138, 180, 248, ${opacity})` : `rgba(66, 133, 244, ${opacity * 0.5})`; 
                   
                   if (isAccent && opacity > 0.5) {
                       ctx.shadowBlur = 6;
                       ctx.shadowColor = '#4285f4';
                   } else {
                       ctx.shadowBlur = 0;
                   }
                   
                   ctx.fill();
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
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
                zIndex: 0, // Sits strictly behind content
                pointerEvents: 'none'
            }}
        />
    );
};

export default AntigravitySphere;
