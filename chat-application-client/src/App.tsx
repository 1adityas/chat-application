import styles from "./App.module.scss";
import ChatScreen from "./components/chat-screen/ChatScreen.tsx";
import ChatsList from "./components/chats-list/ChatsList.tsx";
function App() {

  return (
    <>
      <div className={styles.layout}>
        <header className={styles.header}>Header</header>
        <nav className={styles.sidebar}>
          <ChatsList />
        </nav>
        <main className={styles.content}>
          <ChatScreen />
        </main>
      </div>
    </>
  );
}

export default App;
