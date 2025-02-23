import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PolarBearChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GOOGLE_GEN_AI_KEY;
  // console.log(apiKey);
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
      You're a friendly and knowledgeable Polar Bear experiencing climate change.
      Keep the conversation engaging and informative, responding in a warm and natural way.
      Keep responses under 50 words.
      
      Conversation so far:
      ${chatHistory}
      
      User: ${userInput}
      Polar Bear:
    `;

    try {
      const result = await model.generateContent(prompt);
      console.log(result);
      console.error("API response:", result);
    

      const aiResponseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? 
        "I'm not sure how to answer that, but I can try again!";

      setMessages((prev) => [...prev, { sender: "polarBear", text: aiResponseText }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { sender: "polarBear", text: "Oops! Something went wrong. Try again later." }]);
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
  //   <div 
  //   className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
  //   style={{ backgroundImage: "url('https://unsplash.com/photos/polar-bear-on-snow-covered-ground-during-daytime-qQWV91TTBrE')" }}
  // >
  
    




    <div className="max-w-2xl mx-auto p-4">
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-blue-900 flex items-center justify-center gap-2 animate-bounce">
          <span className="text-4xl">🐻‍❄️</span>
          Chat with Snowy the Polar Bear!
          <span className="text-4xl"></span>
        </div>
      </div>

      <div className="bg-gradient-to-b from-blue-50 to-white p-4 rounded-xl shadow-lg mb-4 border border-blue-100">
        <div className="h-96 overflow-y-auto space-y-4 p-2">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`${message.sender === "user" ? "bg-green-100" : "bg-blue-100"} rounded-2xl p-3 max-w-[75%] shadow-sm`}>
                <div className="flex items-center gap-2">
                  {message.sender === "polarBear" && <span className="text-2xl">🐻‍❄️</span>}
                  <p className={`${message.sender === "user" ? "text-green-900" : "text-blue-900"}`}>
                    {message.text}
                  </p>
                  {message.sender === "user" && <span className="text-2xl">👤</span>}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-bounce text-2xl">🐾</div>
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
            placeholder="Type your message here..."
            className="flex-1 rounded-full px-6 py-3 border-2 border-blue-200 focus:border-blue-400 focus:outline-none text-lg shadow-sm"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !userInput.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Thinking..." : "Send"} <span className="text-xl">🐾</span>
          </button>
        </div>
      </div>

      <div className="text-center text-blue-900 text-sm">
        <p>❄️ Remember to be kind and friendly! ❄️</p>
      </div>
    </div>
    //  </div>

  );
};

export default PolarBearChat;
