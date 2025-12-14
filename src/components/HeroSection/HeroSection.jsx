import './HeroSection.css'

const HeroSection = () => {
    return (
        <div className='hero-container'>
            <h1>Welcome to HanZheng Club</h1>
            <p>The journey of USM CS Students.</p>

            <div className="hero-buttons">
                <a href="/timeline" className="button button-primary">
                    Explore Our Journey
                </a>
            </div>
        </div>
    )
}

export default HeroSection