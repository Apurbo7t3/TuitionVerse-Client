import React from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import robot from '../../assets/robot_2.webp'

const MessageList = ({ messages, loading }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                    <div className={`avatar placeholder rounded-full w-8 h-8 flex items-center justify-center text-white ${msg.role === "user" ? "bg-purple-700" : "bg-purple-500"}`}>
                        {msg.role === "user" ? <FaUser size={14} /> : <img src={robot} />}
                    </div>
                    <div
                        className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${msg.role === "user"
                            ? "bg-purple-700 text-white rounded-br-none"
                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                    >
                        <p className="whitespace-pre-wrap text-md font-semibold">
                            {typeof msg.content === "string"
                                ? msg.content
                                : msg.content?.message?.content || "Invalid response"}
                        </p>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex items-start gap-2">
                    <div className="avatar placeholder bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                        <img src={robot} />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-4 py-2">
                        <span className="loading text-primary loading-dots loading-xl"></span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageList;