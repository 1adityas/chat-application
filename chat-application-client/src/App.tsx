import styles from "./App.module.scss";
import ChatScreen from "./components/chat-screen/ChatScreen.tsx";
import ChatsList from "./components/chats-list/ChatsList.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/theme-toggle/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.layout}>
        <header className={styles.header}>
          <span>Header</span>
          <ThemeToggle />
        </header>
        <nav className={styles.sidebar}>
          <ChatsList />
        </nav>
        <main className={styles.content}>
          <ChatScreen />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
