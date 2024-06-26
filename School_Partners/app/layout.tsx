import { Nunito } from 'next/font/google'
import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/PartnerModal';

import ChatbotWindow from '@/app/components/chatbot/ChatbotWindow';

import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import getCurrentUser from './actions/getCurrentUser';
import getListings from './actions/getListings';

export const metadata = {
  title: 'Community Connect',
  description: 'Community Connect',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const listings = await getListings({});

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <ChatbotWindow currentUser={currentUser} listings={listings}/>
          
        </ClientOnly>
        <div className="pb-20 pt-28">
         {children}
        </div>
      </body>
    </html>
  )
}
