import React from 'react';
import styles from './ChatPreview.module.scss';

interface ChatPreviewProps {
  profilePic: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  profilePic,
  name,
  lastMessage,
  time,
  unreadCount = 0
}) => {
  return (
    <div className={styles['chat-card']}>
      <img src={profilePic} alt={`${name}'s profile`} className={styles.__avatar} />
      <div className={styles.__content}>
        <div className={styles.__header}>
          <span className={styles['chat-card__name']}>{name}</span>
          <span className={styles['chat-card__time']}>{time}</span>
        </div>
        <div className={styles.__footer}>
            <span className={styles['chat-card__message']}>{lastMessage}</span>
            {unreadCount > 0 && (
            <span className={styles['chat-card__badge']}>{unreadCount}</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
