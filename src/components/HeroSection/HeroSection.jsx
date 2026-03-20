import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import ParticleBackground from './ParticleBackground';

const WORD_CONFIG = [
    { text: "Welcome", color: "#ffffff" },
    { text: "to", color: "#ffffff" },
    { text: "our", color: "#ffffff" },
    { text: "computer", color: "#ffffff" },
    { text: "science", color: "#ffffff" },
    { text: "community.", color: "#ffffff" }
];

const FULL_TEXT = WORD_CONFIG.map(w => w.text).join(' ');

const HeroSection = () => {
    const [typedText, setTypedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < FULL_TEXT.length) {
                setTypedText(FULL_TEXT.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setIsTypingComplete(true);
            }
        }, 50);

        return () => clearInterval(typingInterval);
    }, []);

    const renderColoredText = () => {
        let remainingLength = typedText.length;
        
        return WORD_CONFIG.map((config, index) => {
            if (remainingLength <= 0) return null;
            
            let wordWithSpace = config.text;
            if (index < WORD_CONFIG.length - 1) wordWithSpace += ' ';
            
            const charsToTake = Math.min(remainingLength, wordWithSpace.length);
            const displayedText = wordWithSpace.slice(0, charsToTake);
            
            remainingLength -= charsToTake;
            
            return (
                <span key={index} style={{ color: config.color }}>
                    {displayedText}
                </span>
            );
        });
    };

    return (
        <div className='hero-container'>
            <ParticleBackground />
            
            <div className="hero-top-label">
                <span>HanZheng Club</span>
            </div>
            
            <h1 className="hero-title">
                {renderColoredText()}
                {!isTypingComplete && <span className="cursor">|</span>}
            </h1>

            <div className={`hero-content-fade ${isTypingComplete ? 'show' : ''}`}>
                <p>The journey of USM CS Students.</p>
                <div className="hero-buttons">
                    <a href="/timeline" className="button button-glass-dark">
                        Explore Our Journey
                    </a>
                    <a href="/subscribe" className="button button-glass-light">
                        Subscribe
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;