import hanzheng_pic from '../assets/hanzheng.jpg'
import Timeline from '../components/Timeline/Timeline'
import '../css/Home.css'

function Home() {

    const members = [
        {
            name: "Han Zheng", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Chin Qian", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Goo", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Elson", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Han Lim", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Ivan", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
        {
            name: "Jun Hao ", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Sadona",
                "Sao"
            ]
        },
        {
            name: "Kyzer", 
            role: "Founder", 
            desc: "The founder of HanZheng Club", 
            personality: [
                "Shuai",
                "Sao"
            ]
        },
    ];

    return (
        <div>
            <section>
                <h1 className="section-title">HanZheng Club</h1>
                <div className="member-container">
                    {members.map((item, index) => {
                        return (
                            <div key={index} className="member-item">
                                <div className="member-detail">
                                    <h3>{item.name}</h3>
                                    <h4>{item.role}</h4>
                                    <p>{item.desc}</p>
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
            
            <Timeline />
        </div>
    )
}

export default Home