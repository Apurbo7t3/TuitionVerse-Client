import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const MessageInput = ({ onSend, disabled }) => {
    const [input, setInput] = useState("");
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + "px";
        }
    }, [input]);

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input.trim());
        setInput("");
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex gap-2">
                <textarea
                    ref={textareaRef}
                    rows="1"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask me anything about your studies..."
                    className="flex-1 textarea textarea-bordered rounded-full py-2 px-4 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    style={{ minHeight: "44px", maxHeight: "100px" }}
                    disabled={disabled}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !input.trim()}
                    className="btn btn-primary rounded-full px-4 disabled:opacity-50"
                >
                    <FaPaperPlane />
                </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
                AI may make mistakes. Verify important information.
            </p>
        </div>
    );
};

export default MessageInput;


