import HeroSection from '../components/HeroSection/HeroSection'
import NeijuanRanking from '../components/NeijuanRanking/NeijuanRanking';
import '../css/Home.css'

function Home() {

    const members = [
        {
            name: "Han Zheng", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/hanzheng.jpg",
            personality: ["Shuai", "Sao"]
        },
        {
            name: "Chin Qian", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/chinqian.jpg",
            personality: ["Shuai", "Sao"]
        },
        {
            name: "Goo", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/goo.jpg",
            personality: ["Shuai", "2727"]
        },
        {
            name: "Elson", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/elson.jpg",
            personality: ["Shuai", "Sao"]
        },
        {
            name: "Han Lim", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/hanlim.jpg",
            personality: ["Shuai", "Sao"]
        },
        {
            name: "Ivan", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/ivan.jpg",
            personality: ["Shuai", "Sao"]
        },
        {
            name: "Jun Hao ", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/junhao.jpg",
            personality: ["Sadona", "Sao"]
        },
        {
            name: "Kyzer", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            image: "/kyzer.jpg",
            personality: ["Shuai", "Clash Royale King"]
        },
    ];

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
                                    onError={(e) => {e.target.src = "/members/default.jpg"}} 
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