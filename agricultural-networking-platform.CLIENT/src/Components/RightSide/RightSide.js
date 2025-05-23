import React, { useState } from 'react';
import './RightSide.css';
import Home from '../../Img/home.png';
import Noti from '../../Img/noti.png';
import Comment from '../../Img/comment.png';
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../ShareModal/ShareModal';
import CommunityPanel from '../CommunityPanel/CommunityPanel';
import SettingsPanel from '../SettingsPanel/SettingsPanel';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from 'react-router-dom';
import MessagePanel from '../MessagePanel/MessagePanel';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const resetPanels = () => {
    setShowCommunity(false);
    setShowSettings(false);
    setShowMessages(false);
  };

  const toggleCommunityPanel = () => {
    setShowCommunity(true);
    setShowSettings(false);
    setShowMessages(false);
  };

  const toggleSettingsPanel = () => {
    setShowSettings(true);
    setShowCommunity(false);
    setShowMessages(false);
  };

  const toggleMessagesPanel = () => {
    setShowMessages(true);
    setShowSettings(false);
    setShowCommunity(false);
  };

  const isMenuVisible = !showCommunity && !showSettings && !showMessages;

  return (
    <div className='RightSide'>
      {isMenuVisible && (
        <div className="navIcons">
          <Link to='../home'>
            <img src={Home} alt="Home" />
          </Link>

          <SettingsOutlinedIcon
            style={{ cursor: 'pointer' }}
            onClick={toggleSettingsPanel}
          />

          <img
            src={Noti}
            alt="Notifications"
            style={{ cursor: 'pointer' }}
            onClick={toggleCommunityPanel}
          />

          <img
            src={Comment}
            alt="Messages"
            style={{ cursor: 'pointer' }}
            onClick={toggleMessagesPanel}
          />
        </div>
      )}

      {showCommunity ? (
        <CommunityPanel onBack={resetPanels} />
      ) : showSettings ? (
        <SettingsPanel onBack={resetPanels} />
      ) : showMessages ? (
        <MessagePanel onClose={resetPanels} />
      ) : (
        <>
          <TrendCard />
          <div className="button rg-button" onClick={() => setModalOpened(true)}>
            Share
          </div>
          <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </>
      )}
    </div>
  );
};

export default RightSide;
