"use client"
import ChatbotClient from "@/app/chatbot/ChatbotClient";
import { useCallback, useState } from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { motion } from 'framer-motion';

interface ChatbotProps {
    listings?: any
    currentUser?: any
}
const ChatbotWindow: React.FC<ChatbotProps> = ({currentUser, listings}) => {

    if (currentUser == null) {
      return (<></>)
    }
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
      setIsOpen((value) => !value);
    }, []);

    
    return (
      <>
        <motion.div
          onClick={toggleOpen}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-10 right-10 z-10 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 flex items-center justify-center w-20 h-20 cursor-pointer"
        >
          <IoMdChatbubbles size={35} /> {/* Use the icon component */}
        </motion.div>
        {isOpen && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-24 fixed bottom-10 right-10 z-10 flex flex-col items-center justify-between rounded-md shadow-lg"
          >
            <div className="bg-red-400 p-3 w-full rounded-md text-white max-w-md overflow-y-auto">
              <h2 className="text-xl font-semibold mb-2">Your Personal Assistant</h2>
              <hr className="my-2 border-gray-400" />
              <ChatbotClient listings={listings} />
            </div>
          </motion.main>
        )}
      </>
    );
  };
  
export default ChatbotWindow;