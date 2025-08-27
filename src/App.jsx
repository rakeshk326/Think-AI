import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import ChatSpace from './Components/ChatSpace'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="flex flex-col h-screen">
      <div className="shrink-0">
        <Header />
      </div>
      <div className="flex-1 overflow-y-auto">
        <ChatSpace />
      </div>
      <div className="shrink-0">
        <Footer />
      </div>
    </div>
  )
}


export default App