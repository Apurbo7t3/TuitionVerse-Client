import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default ChatBot;