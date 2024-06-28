import Image from 'next/image'
import ChatbotClient from "./ChatbotClient";
import getListings from '../actions/getListings';
import { motion } from 'framer-motion';

const ChatbotPage = async() => {
 
  const listings = await getListings({});

  // ChatComponent ? Why make a new component?
  // ChatComponent -> client, text inputs -> onChange -> we need to make a client side component
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="bg-slate-800 p-3 w-[800px] rounded-md text-white"
      >
        <h2 className="text-2xl">Your Personal Assistant</h2>
        <hr className="my-4 border-gray-400"></hr>
        <ChatbotClient listings={listings}/>
      </motion.div>
    </main>
  );
};

export default ChatbotPage;