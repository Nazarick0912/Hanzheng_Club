import React, { useState, useEffect, useCallback } from 'react';
import './GalleryPage.css';

const photos = [
    { src: "/memories/Oct2024-1-1.jpg", title: "USM Orientation Week", date: "Oct 2024" },
    { src: "/memories/Oct2024-1-2.jpg", title: "USM Orientation Week", date: "Oct 2024" },
    { src: "/memories/Oct2024-1-3.jpg", title: "USM Orientation Week", date: "Oct 2024" },
    { src: "/memories/Nov2024-1-1.jpg", title: "邪恶炸鸡皮", date: "Nov 2024" },
    { src: "/memories/Nov2024-1-2.jpg", title: "邪恶炸鸡皮", date: "Nov 2024" },
    { src: "/memories/Nov2024-1-3.jpg", title: "邪恶炸鸡皮", date: "Nov 2024" },
    { src: "/memories/Dec2024-1-1.jpg", title: "Q1 Mookata", date: "Dec 2024" },
    { src: "/memories/Jan2025-1-1.jpg", title: "Happy New Year 2025!", date: "Jan 2025" },
    { src: "/memories/Jan2025-2-1.jpg", title: "Meet with CS Buddy", date: "Jan 2025" },
    { src: "/memories/Jan2025-2-2.jpg", title: "Meet with CS Buddy", date: "Jan 2025" },
];

const GalleryPage = () => {
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const openLightbox = (index) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goPrev = useCallback(() => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
    }, []);

    const goNext = useCallback(() => {
        setLightboxIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
    }, []);

    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
        };

        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [lightboxIndex, goPrev, goNext]);

    return (
        <div className="gallery-container">
            <section className="gallery-header">
                <h1>Memory Gallery</h1>
                <p className="gallery-subtitle">Moments we'll never forget ✨</p>
            </section>

            <div className="gallery-grid">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="gallery-card"
                        onClick={() => openLightbox(index)}
                    >
                        <img src={photo.src} alt={photo.title} loading="lazy" />
                        <div className="gallery-card-overlay">
                            <h4>{photo.title}</h4>
                            <span>{photo.date}</span>
                        </div>
                    </div>
                ))}
            </div>

            {lightboxIndex !== null && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lightbox-close" onClick={closeLightbox}>✕</button>
                    <button
                        className="lightbox-prev"
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                    >
                        ‹
                    </button>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={photos[lightboxIndex].src}
                            alt={photos[lightboxIndex].title}
                        />
                        <div className="lightbox-caption">
                            {photos[lightboxIndex].title}
                            <span>{photos[lightboxIndex].date}</span>
                        </div>
                    </div>
                    <button
                        className="lightbox-next"
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                    >
                        ›
                    </button>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;