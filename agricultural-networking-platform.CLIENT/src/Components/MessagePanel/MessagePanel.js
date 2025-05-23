import React from 'react';
import './MessagePanel.css';

const MessagePanel = ({ onClose, conversations = [], onSelectConversation }) => {
  return (
    <div className="MessagePanel">
      <div className="MessagePanelHeader">
        Messages
        <button className="CloseButton" onClick={onClose}>×</button>
      </div>

      <div className="MessageSearch">
        <input type="text" placeholder="Search conversations..." />
      </div>

      <div className="ConversationList">
        {conversations.length === 0 ? (
          <div style={{ padding: '16px', textAlign: 'center', color: '#888' }}>
            No conversations found.
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              className="ConversationItem"
              key={conv.id}
              onClick={() => onSelectConversation(conv)}
            >
              <img
                src={conv.avatar || '/defaultProfile.png'}
                alt="avatar"
                className="Avatar"
              />
              <div className="ConversationText">
                <strong>{conv.name}</strong>
                <span>{conv.lastMessage || 'No messages yet.'}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagePanel;
