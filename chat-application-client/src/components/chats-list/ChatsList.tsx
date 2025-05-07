import React from "react";
import styles from "./ChatsList.module.scss";
import ChatPreview from "./chat-preview/ChatPreview";
interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Let’s catch up later!",
    time: "9:15 AM",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Group Chat",
    lastMessage: "Meeting at 3 PM",
    time: "Yesterday",
    avatar: "https://via.placeholder.com/50",
  },
];

const ChatsList: React.FC = () => {
  return (
    <div className={styles.chatsList}>
      {mockChats.map((chat) => (
        <ChatPreview
          key={chat.id}
          profilePic={chat.avatar}
          name={chat.name}
          lastMessage={chat.lastMessage}
          time={chat.time}
          unreadCount={0} // You can add logic to show unread messages count
        />
      ))}
    </div>
  );
};

export default ChatsList;
