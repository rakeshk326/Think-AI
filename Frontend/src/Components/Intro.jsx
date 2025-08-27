import {useState} from 'react'
import ChatMessages from './ChatMessages';


const Intro = () => {

    const [messages, setMessages] = useState("Hi");
    const [prompt, setPrompt] = useState("");

  return (
    <div className='flex-1 flex items-center justify-center'>

        {messages.length == 0 ? (
        <div className='flex flex-col items-center justify-center gap-8'>
            <h1 className='text-4xl font-bold font-sans'>Think AI</h1>
            <div className='w-2xl border rounded-lg overflow-hidden flex flex-col'>
                
                <textarea className='w-full h-20 p-4 resize-none text-lg font-sans border-none outline-none'
                placeholder='Type your message here'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}>
                </textarea>
                
                <div className='flex justify-between items-center p-5'>
                <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">
                    Upload
                </button>
                <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    Send
                </button>
                </div>
                
            </div>
        </div>
        ) : 

        <ChatMessages></ChatMessages>
        }
    </div>
  )
}

export default Intro