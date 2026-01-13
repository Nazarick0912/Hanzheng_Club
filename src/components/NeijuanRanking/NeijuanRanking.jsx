import React from 'react';
import './NeijuanRanking.css';
import members from '../../data/members.json';


const NeijuanRanking = () => {
    const members = [
        { name: "Han Zheng", marks: 100, image: "/hanzheng.jpg" },
        { name: "Chin Qian", marks: 95, image: "/chinqian.jpg" },
        { name: "Elson", marks: 95, image: "/elson.jpg" },
        { name: "Goo", marks: 95, image: "/goo.jpg" },
        { name: "Ivan", marks: 97.5, image: "/ivan.jpg" },
        { name: "Han Lim", marks: 1000, image: "/hanlim.jpg" },
        { name: "Jun Hao", marks: 77, image: "/junhao.jpg" },
        { name: "Kyzer", marks: 80, image: "/kyzer.jpg" }
    ];

const NeijuanRanking = () => {
    const topThree = members.sort((a, b) => b.marks - a.marks).slice(0, 3);

    const getRankTitle = (index) => {
        if (index === 0) return "👑 Neijuan King (卷王)";
        if (index === 1) return "🥈 Neijuan Prince";
        if (index === 2) return "🥉 Neijuan General";
        return "";
    }

    return (
        <section className="neijuan-section">
            <h2 className="neijuan-title">🏆 内卷榜 (CSE241 Test 2) Last Updated: 2026-01-13 🏆</h2>
            <p className="neijuan-subtitle">
                These people studied while you were sleeping. No excuses allowed.
            </p>

            <div className="ranking-container">
                {topThree.map((member, index) => (
                    <div key={index} className={`rank-card rank-${index + 1}`}>

                        <div className="rank-badge">#{index + 1}</div>

                        <img src={member.image} alt={member.name} className="rank-avatar" />

                        <div className="rank-info">
                            <h3>{member.name}</h3>
                            <span className="neijuan-label">{getRankTitle(index)}</span>
                            <div className="score-box">
                                Score: {member.marks}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NeijuanRanking;