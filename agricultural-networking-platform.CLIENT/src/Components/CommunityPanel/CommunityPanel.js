import React from 'react';
import './CommunityPanel.css';

const CommunityPanel = ({ onBack }) => {
    const communities = [
        {
            name: 'Organic Farmers Hub',
            description: 'Share best practices and tips on organic farming.',
            members: 2400,
        },
        {
            name: 'Crop Cultivation Club',
            description: 'Talk about crops, fertilizers, irrigation, and seasons.',
            members: 1800,
        },
        {
            name: 'AgriTech Innovators',
            description: 'Explore farming technologies and smart solutions.',
            members: 1250,
        },
    ];

    return (
        <div className="community-panel">
            <button className="back-btn" onClick={onBack}>← Back</button>
            <h2>Farming Communities</h2>
            {communities.map((community, idx) => (
                <div className="community-card" key={idx}>
                    <h3>{community.name}</h3>
                    <p>{community.description}</p>
                    <span>{community.members.toLocaleString()} members</span>
                    <button className="join-btn">Join</button>
                </div>
            ))}
        </div>
    );
};

export default CommunityPanel;
