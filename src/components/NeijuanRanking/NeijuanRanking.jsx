import React, { useState } from 'react';
import './NeiJuanRanking.css';
import membersData from '../../data/members.json';
import AntigravitySphere from './AntigravitySphere';

const NeijuanRanking = () => {
    const [members, setMembers] = useState(membersData);

    const handleScoreChange = (name, newScore) => {
        setMembers(members.map(member =>
            member.name === name ? { ...member, marks: Number(newScore) || 0 } : member
        ));
    };

    // Sort members by marks in descending order and take the top 3
    const topThree = [...members]
        .sort((a, b) => b.marks - a.marks)
        .slice(0, 3);

    const getRankTitle = (index) => {
        if (index === 0) return "👑 Neijuan King (卷王)";
        if (index === 1) return "🥈 Neijuan Prince";
        if (index === 2) return "🥉 Neijuan General";
        return "";
    }

    return (
        <section className="neijuan-section snap-section">
            <AntigravitySphere />
            <div className="neijuan-content">
                <div className="neijuan-left-column">
                    <h2 className="neijuan-title">Check Out Neijuan Rankings for Hanzheng Club</h2>
                    <p className="neijuan-subtitle">These people studied while you were sleeping. No excuses allowed.</p>
                    <p className="neijuan-subtitle">Last Updated: 2026-01-23</p>

                    <div className="admin-panel">
                        <h3 className="admin-title">📝 Edit Marks (Live Update)</h3>
                        <div className="admin-list">
                            {members.map(member => (
                                <div key={member.name} className="admin-item">
                                    <img src={member.image} alt={member.name} className="admin-item-img" />
                                    <span className="admin-item-name">{member.name}</span>
                                    <div className="admin-input-wrapper">
                                        <button className="admin-btn" onClick={() => handleScoreChange(member.name, member.marks - 1)}>-</button>
                                        <input
                                            type="number"
                                            className="admin-input"
                                            value={member.marks}
                                            onChange={(e) => handleScoreChange(member.name, e.target.value)}
                                        />
                                        <button className="admin-btn" onClick={() => handleScoreChange(member.name, member.marks + 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="neijuan-right-column">
                    <div className="custom-podium-wrapper">
                        <div className="ranking-container">
                            {[topThree[1], topThree[0], topThree[2]].map((member) => {
                                if (!member) return null;
                                const trueIndex = topThree.findIndex(m => m.name === member.name);
                                return (
                                    <div key={member.name} className="podium-group">
                                        <div className={`rank-card rank-${trueIndex + 1}`}>
                                            <div className="rank-badge">#{trueIndex + 1}</div>
                                            <img src={member.image} alt={member.name} className="rank-avatar" />
                                            <div className="rank-info">
                                                <h3>{member.name}</h3>
                                                <span className="neijuan-label">{getRankTitle(trueIndex)}</span>
                                                <div className="personality-badges">
                                                    {member.personality?.map((trait, i) => (
                                                        <span key={i} className={`personality-badge badge-${trait.toLowerCase()}`}>
                                                            {trait}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="score-box">
                                                    Score: {member.marks}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* The User-Provided Podium Image */}
                        <div className="custom-podium-container">
                            <img src="/winners podium.webp" alt="Winners Podium" className="custom-podium-img" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeijuanRanking;