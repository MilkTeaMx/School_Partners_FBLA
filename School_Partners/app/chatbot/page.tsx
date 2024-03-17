import Image from 'next/image'
import ChatbotClient from "./ChatbotClient";
import getListings from '../actions/getListings';


const ChatbotPage = async() => {
 
  const listings = await getListings({});

  // ChatComponent ? Why make a new component?
  // ChatComponent -> client, text inputs -> onChange -> we need to make a client side component
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-slate-800 p-3 w-[800px] rounded-md text-white">
        <h2 className="text-2xl">Your Personal Assistant</h2>
        <hr className="my-4 border-gray-400"></hr>
        <ChatbotClient listings={listings}/>
      </div>
    </main>
  )
}

export default ChatbotPage;