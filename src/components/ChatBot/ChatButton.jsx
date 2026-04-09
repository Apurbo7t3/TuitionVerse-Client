import React from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import robot1 from '../../assets/robot_1.png'
import ask from '../../assets/ask.png'
const ChatButton = ({ isOpen, onClick }) => {
    return (
        // <button
        //     onClick={onClick}
        //     className="fixed bottom-6 right-6 z-50 btn btn-primary rounded-full shadow-lg p-4 text-white hover:scale-105 transition-transform"
        //     aria-label="Open chat"
        // >
        //     {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        // </button>
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 group transition-all duration-300 hover:scale-110 active:scale-95 outline-none ">
            {isOpen ? <FaTimes className="bg-purple-600 text-white w-20 h-10 rounded-2xl" size={24} /> :
                <div className="flex relative ">
                    <img src={ask} alt="" className="w-16 md:w-28 absolute -top-8 -left-8 md:-top-12 md:-left-16" />
                    <img src={robot1} alt="" className="w-20 md:w-28" />
                </div>
            }
        </button>
    );
};

export default ChatButton;

