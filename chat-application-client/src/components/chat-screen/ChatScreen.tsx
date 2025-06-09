import React, { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import ChatBubble from './ChatBubble';
import styles from './ChatScreen.module.scss';

interface Message {
    userid: string;
    user: string;
    text: string;
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read';
}

const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5138/chatHub')
            .withAutomaticReconnect()
            .build();

        connection.start().catch(err => console.error('SignalR Connection Error:', err));

        connection.on('ReceiveMessage', (user: string, text: string) => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    userid: Date.now().toString(),
                    user,
                    text,
                    timestamp: new Date().toLocaleTimeString([], { 
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    status: 'delivered'
                },
            ]);
        });

        return () => {
            connection.stop();
        };
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5138/chatHub')
                .withAutomaticReconnect()
                .build();

            await connection.start();
            await connection.invoke('SendMessage', 'User', newMessage);
            setNewMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className={styles.chatScreen}>
            <div className={styles.chatHeader}>
                <div className={styles.userInfo}>
                    <img 
                        src="https://via.placeholder.com/40" 
                        alt="Contact Avatar" 
                        className={styles.avatar} 
                    />
                    <div className={styles.userDetails}>
                        <span className={styles.username}>Chat Room</span>
                        <span className={styles.status}>online</span>
                    </div>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.iconButton}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className={styles.iconButton}>
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            </div>

            <div className={styles.chatMessages} ref={chatContainerRef}>
                <div className={styles.messagesList}>
                    {messages.map((message) => (
                        <ChatBubble
                            key={message.userid}
                            text={message.text}
                            timestamp={message.timestamp}
                            isSent={message.user === 'User'}
                            status={message.status}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.chatInput}>
                <div className={styles.inputActions}>
                    <button className={styles.iconButton}>
                        <i className="far fa-smile"></i>
                    </button>
                    <div className={styles.attachmentContainer}>
                        <button 
                            className={styles.iconButton}
                            onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                        >
                            <i className="fas fa-paperclip"></i>
                        </button>
                        {isAttachmentMenuOpen && (
                            <div className={styles.attachmentMenu}>
                                <button className={styles.attachmentOption}>
                                    <i className="fas fa-image"></i>
                                    <span>Photos & Videos</span>
                                </button>
                                <button className={styles.attachmentOption}>
                                    <i className="fas fa-file"></i>
                                    <span>Document</span>
                                </button>
                                <button className={styles.attachmentOption}>
                                    <i className="fas fa-camera"></i>
                                    <span>Camera</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.inputWrapper}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message"
                        rows={1}
                        className={styles.messageInput}
                    />
                </div>
                <button 
                    className={`${styles.iconButton} ${styles.sendButton}`}
                    onClick={sendMessage}
                >
                    {newMessage.trim() ? (
                        <i className="fas fa-paper-plane"></i>
                    ) : (
                        <i className="fas fa-microphone"></i>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;
