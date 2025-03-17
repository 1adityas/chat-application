import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (<div className="layout">
    <header className="header">Header</header>
    <nav className="sidebar">Sidebar</nav>
    <main className="content">Main Content</main>
  </div>)

}

export default App
