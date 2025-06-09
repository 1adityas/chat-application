import React from "react";
import styles from "./ChatsList.module.scss";
import ChatPreview from "./chat-preview/ChatPreview";

interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  isTyping?: boolean;
  avatar: string;
  unreadCount?: number;
}

const mockContacts: Contact[] = [
  {
    id: 1,
    name: "Swati",
    lastMessage: "typing...",
    time: "02:01",
    isTyping: true,
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 2,
    name: "Chintu Voda",
    lastMessage: "in box top n center",
    time: "Yesterday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 3,
    name: "Pinder whatzap",
    lastMessage: "K",
    time: "Yesterday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 4,
    name: "Priyanshu pune",
    lastMessage: "मैं आपको बाद में पूछूं - अभी चेकलिस्ट है आ...",
    time: "Yesterday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 5,
    name: "Harash-mumbai",
    lastMessage: "✌️ Aram se",
    time: "Monday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 6,
    name: "Jiten",
    lastMessage: "K",
    time: "Monday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  },
  {
    id: 7,
    name: "Akki",
    lastMessage: "✓ I shall be there",
    time: "Friday",
    avatar: "https://via.placeholder.com/50",
    unreadCount: 0
  }
];

const ContactsList: React.FC = () => {
  return (
    <div className={styles.chatsList}>
      {mockContacts.map((contact) => (
        <ChatPreview
          key={contact.id}
          profilePic={contact.avatar}
          name={contact.name}
          lastMessage={contact.isTyping ? "typing..." : contact.lastMessage}
          time={contact.time}
          unreadCount={contact.unreadCount || 0}
          isTyping={contact.isTyping}
        />
      ))}
    </div>
  );
};

export default ContactsList;
