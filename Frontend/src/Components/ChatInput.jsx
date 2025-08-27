import { useState } from "react";

const ChatInput = ({ onSend, hasMessages }) => {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFile(file);
        setPrompt(`Uploaded file : ${file.name}.`);
    };

  const handleSend = () => {
    if (prompt.trim() === "") return;
    onSend(prompt, file);
    setPrompt("");
    setFile(null);
  };

  return (
    
        <div className={` ${hasMessages ? "w-5xl" : "w-3xl"} border mt-7 rounded-lg overflow-hidden flex flex-col`}>
            
            <textarea style={{ scrollbarWidth: "none", msOverflowStyle: "none"}} className={`w-full px-4 mt-4 resize-none text-lg font-sans border-none outline-none ${hasMessages ? "h-7" : "h-10"}`}
            placeholder='Type your message here'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}>
            </textarea>
            
            <div className='flex justify-between items-center p-5'>
            <button className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 relative overflow-hidden">
                Upload
                <input
                type="file"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
            </button>
            <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Send
            </button>
            </div>
        </div>
  );
};

export default ChatInput;