import React from 'react';
import './NeiJuanRanking.css';
import membersData from '../../data/members.json';

const NeijuanRanking = () => {
    // Sort members by marks in descending order and take the top 3
    const topThree = [...membersData]
        .sort((a, b) => b.marks - a.marks)
        .slice(0, 3);

    const getRankTitle = (index) => {
        if (index === 0) return "👑 Neijuan King (卷王)";
        if (index === 1) return "🥈 Neijuan Prince";
        if (index === 2) return "🥉 Neijuan General";
        return "";
    }

    return (
        <section className="neijuan-section">
            <h2 className="neijuan-title">🏆 内卷榜 (CAT201 - Overall Mark)🏆</h2>
            <p className="neijuan-subtitle">These people studied while you were sleeping. No excuses allowed.</p>
            <p className="neijuan-subtitle">Last Updated: 2026-01-23</p>
            
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