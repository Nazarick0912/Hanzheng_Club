import HeroSection from '../components/HeroSection/HeroSection'
import NeijuanRanking from '../components/NeijuanRanking/NeijuanRanking';
import '../css/Home.css'
import memberData from '../data/members.json';

function Home() {

    const members = memberData;

    return (
        <div>
            <HeroSection />
            <section>
                <h1 className="section-title">HanZheng Club</h1>

                <div className="member-container">
                    {members.map((item, index) => {
                        return (
                            <div key={index} className="member-card">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="member-picture"
                                    onError={(e) => { e.target.src = "/members/default.jpg" }}
                                />

                                <h3 className="member-name">{item.name}</h3>
                                <h4 className="member-role">{item.role}</h4>
                                <p className="member-desc">{item.desc}</p>

                                <div className="personality-container">
                                    {item.personality.map((per, ind) => (
                                        <span key={ind} className="personality-badge">
                                            {per}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <NeijuanRanking />
        </div>
    )
}

export default Home