import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { sendMessageToAI } from "./chatService";

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm your AI study assistant. Ask me anything about your subjects, homework, or exam prep! 📚" }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const handleSend = async (userMessage) => {
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        const reply = await sendMessageToAI(userMessage);
        setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        setLoading(false);
    };

    return (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-125 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-purple-800 to-purple-400 text-white px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <span className="text-xl">🤖</span>
                    <div>
                        <h3 className="font-bold">Study Assistant</h3>
                        <p className="text-xs opacity-90">Powered by TuitionVerse</p>
                    </div>
                </div>
                <button onClick={onClose} className="btn btn-ghost btn-sm text-white">
                    <FaTimes size={18} />
                </button>
            </div>

            {/* Messages */}
            <MessageList messages={messages} loading={loading} />
            <div ref={messagesEndRef} />

            {/* Input */}
            <MessageInput onSend={handleSend} disabled={loading} />
        </div>
    );
};

export default ChatWindow;


