import ReactMarkdown from "react-markdown";

const Chats = ({ messages }) => {
  return (
    <div className="w-full px-64">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex gap-2.5 mb-4 ${
            msg.sender === "you" ? "justify-end" : ""
          }`}
        >
          <div className="grid">
          <div
            className={`px-3.5 py-2 rounded break-words ${
              msg.sender === "you"
                ? "bg-indigo-600 text-white ml-auto"
                : "bg-gray-100 text-gray-900"
            }`}
          >
  <ReactMarkdown
    children={msg.text}
    components={{
      p: ({ node, ...props }) => (
        <p
          className="text-sm font-normal leading-snug whitespace-pre-wrap"
          {...props}
        />
      ),
    }}
  />
</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;