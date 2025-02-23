import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SnowLeopardChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_GEN_AI_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chatBoxRef = useRef(null);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setIsLoading(true);
    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    const chatHistory = messages.map((msg) => `${msg.sender}: ${msg.text}`).join("\n");
    const prompt = `
      You're a wise and elusive Snow Leopard! You love discussing mountains, wildlife conservation, and your secretive life in the wild.
      Keep responses intriguing, educational, and under 50 words.
      
      Conversation so far:
      ${chatHistory}
      
      User: ${userInput}
      Snow Leopard:
    `;

    try {
      const result = await model.generateContent(prompt);
      const aiResponseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Prowl prowl! I'm not sure how to answer that, but let's explore the mountains together!";

      setMessages((prev) => [...prev, { sender: "snowLeopard", text: aiResponseText }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: "snowLeopard", text: "Oops! Something went wrong. Try again later." }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col justify-center items-center bg-cover bg-center">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2 animate-bounce">
          <span className="text-4xl">🐆</span>
          Chat with the Snow Leopard!
          <span className="text-4xl"></span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-200 to-white p-4 rounded-xl shadow-lg mb-4 border border-gray-300">
        <div className="h-96 overflow-y-auto space-y-4 p-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`${message.sender === "user" ? "bg-blue-100" : "bg-gray-300"} rounded-2xl p-3 max-w-[75%] shadow-sm`}>
                <div className="flex items-center gap-2">
                  {message.sender === "snowLeopard" && <span className="text-2xl">🐆</span>}
                  <p className={`${message.sender === "user" ? "text-blue-900" : "text-gray-900"}`}>
                    {message.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-bounce text-2xl"></div>
            </div>
          )}
          <div ref={chatBoxRef} />
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about the mountains..."
            className="flex-1 rounded-full px-6 py-3 border-2 border-gray-400 focus:border-gray-600 focus:outline-none text-lg shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !userInput.trim()}
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-full px-6 py-3 font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Thinking..." : "Send"} <span className="text-xl"></span>
          </button>
        </div>
      </div>

      <div className="text-center text-gray-900 text-sm">
        <p>❄️ Let's uncover the secrets of the mountains together! ❄️</p>
      </div>
    </div>
  );
};

export default SnowLeopardChat;
