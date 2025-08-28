import { useState } from "react";
import axios from "axios";
import Chats from "./Chats";
import ChatInput from "./ChatInput";

const ChatSpace = () => {
  const [messages, setMessages] = useState([]);

  const getGeminiResponse = async(payload) => {
    try {
      const res = await axios.post("http://localhost:5000/prompt/gemini", payload, {withCredentials: true})
      const aiMsg = { sender : "Gemini", text : res.data.message}
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error fetching response", error);
    }
  }

  const handleSend = (prompt, file) => {

    let payload;
    let headers;
    let newMsg;

    if(file == null) {
      newMsg = {
        sender: "you",
        text : prompt,
      };
      payload = new FormData();
      payload.append("Prompt", prompt);
    } else {
      newMsg = {
        sender : "you",
        text : prompt
      }
      payload = new FormData();
      payload.append("Prompt", prompt)
      payload.append("File", file);
    }
    
    setMessages((prev) => [...prev, newMsg]);
    getGeminiResponse(payload, headers);
  };

  return (

    <div className="flex flex-col h-full justify-center">
        {messages.length > 0 && 
  <div className="flex-1 overflow-y-auto">
    <Chats messages={messages}/>
  </div>
}

  {messages.length == 0 &&
    <div className='flex flex-col items-center justify-center gap-8'>
    <h1 className='text-4xl font-bold font-sans'>Think AI</h1>
    </div>
    }

  <div className="flex justify-center shrink-0 items-center">
    
    <ChatInput onSend={handleSend} hasMessages={messages.length > 0} />
  </div>
</div>

  )
};


export default ChatSpace;