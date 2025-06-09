import React from 'react';
import styles from './ChatBubble.module.scss';

interface ChatBubbleProps {
    text: string;
    timestamp: string;
    isSent: boolean;
    status?: 'sent' | 'delivered' | 'read';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
    text,
    timestamp,
    isSent,
    status = 'sent'
}) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'read':
                return '✓✓';
            case 'delivered':
                return '✓✓';
            case 'sent':
                return '✓';
            default:
                return '';
        }
    };

    return (
        <div className={`${styles.bubble} ${isSent ? styles.sent : styles.received}`}>
            <div className={styles.content}>
                <p className={styles.text}>{text}</p>
                <div className={styles.metadata}>
                    <span className={styles.time}>{timestamp}</span>
                    {isSent && (
                        <span className={`${styles.status} ${status === 'read' ? styles.read : ''}`}>
                            {getStatusIcon()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;
