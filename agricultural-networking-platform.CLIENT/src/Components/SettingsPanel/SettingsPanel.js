import React from 'react';
import './SettingsPanel.css';

const SettingsPanel = ({ onBack }) => {
    return (
        <div className="settings-panel">
            <button className="back-btn" onClick={onBack}>← Back</button>
            <h2>Settings</h2>

            <div className="setting-section">
                <h3>Profile Settings</h3>
                <label>
                    Name: <input type="text" placeholder="Your name" />
                </label>
                <label>
                    Email: <input type="email" placeholder="you@example.com" />
                </label>
            </div>

            <div className="setting-section">
                <h3>Preferences</h3>
                <label>
                    Theme: 
                    <select>
                        <option>Light</option>
                        <option>Dark</option>
                    </select>
                </label>
            </div>

            <div className="setting-section notifications">
                <h3>Notifications</h3>
                <label className="notification-option">
                    <input type="checkbox" /> Email
                </label>
                <label className="notification-option">
                    <input type="checkbox" /> SMS alerts
                </label>
            </div>


            <button className="save-btn">Save Settings</button>
        </div>
    );
};

export default SettingsPanel;
