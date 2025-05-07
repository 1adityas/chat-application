import React, { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
// import ChatBubble from './ChatBubble'; // Assume you have a ChatBubble component
import './ChatScreen.scss'; // Optional: Add styles for the chat screen

// Define the structure of a Message object
interface Message {
    userid: string; // Unique identifier for the message, typically a timestamp or UUID
    user: string;   // The name or identifier of the user who sent the message
    text: string;   // The content of the message
}

const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Create a new SignalR connection to the chatHub endpoint
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:5138/chatHub') // Replace with your SignalR server URL
            .withAutomaticReconnect() // Automatically reconnect if the connection is lost
            .build();

        // Start the SignalR connection and log any errors
        connection.start().catch(err => console.error('SignalR Connection Error:', err));

        // Listen for the 'ReceiveMessage' event from the server
        connection.on('ReceiveMessage', (user: string, text: string) => {
            // Update the messages state with the new message received
            setMessages(prevMessages => [
                ...prevMessages,
                { userid: Date.now().toString(), user, text }, // Add the new message to the list
            ]);
        });

        // Cleanup function to stop the SignalR connection when the component unmounts
        return () => {
            connection.stop();
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages are updated
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]); // Dependency on messages ensures this effect runs whenever messages change

    const sendMessage = async () => {
        // Check if the new message is not empty or just whitespace
        if (newMessage.trim()) {
            // Create a new SignalR connection to the chatHub endpoint
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5138/chatHub') // Replace with your SignalR server URL
                .withAutomaticReconnect() // Automatically reconnect if the connection is lost
                .build();

            // Start the SignalR connection
            await connection.start();

            // Log the message being sent for debugging purposes
            console.log('Sending message:', newMessage);

            // Invoke the 'SendMessage' method on the server with the user and message content
            await connection.invoke('SendMessage','User', newMessage);

            // Clear the input field after sending the message
            setNewMessage('');
        }
    };

    return (
        
        <div className="chat-screen">
            <div className="chat-header">
                <div className="user-info">
                    <img src="default-avatar.png" alt="User Avatar" className="avatar" />
                    <span className="username">Chat Room</span>
                </div>
                <div className="header-actions">
                    <button className="icon-button">
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="icon-button">
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            </div>

            <div className="chat-messages" ref={chatContainerRef}>
                {messages.map((message) => (
                    <div 
                        key={message.userid}
                        className={`message ${message.user === 'User' ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <p>{message.text}</p>
                            <span className="message-time">
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <button className="icon-button">
                    <i className="far fa-smile"></i>
                </button>
                <button className="icon-button">
                    <i className="fas fa-paperclip"></i>
                </button>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message"
                />
                <button 
                    className="icon-button send-button"
                    onClick={sendMessage}
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatScreen;