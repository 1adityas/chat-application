import React from 'react';
import styles from './ChatPreview.module.scss';

interface ChatPreviewProps {
  profilePic: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isTyping?: boolean;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({
  profilePic,
  name,
  lastMessage,
  time,
  unreadCount = 0,
  isTyping = false
}) => {
  return (
    <div className={styles.chatPreview}>
      <img 
        src={profilePic} 
        alt={`${name}'s profile`} 
        className={styles.avatar} 
      />
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.name}>{name}</h2>
          <span className={styles.time}>{time}</span>
        </div>
        <div className={styles.footer}>
          <span className={`${styles.message} ${isTyping ? styles.typing : ''}`}>
            {lastMessage}
          </span>
          {unreadCount > 0 && (
            <span className={styles.unreadBadge}>{unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;
