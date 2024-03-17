"use client"
import { useCallback, useState } from 'react';

import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";
import { SafeUser } from '@/app/types';
import ListingRow from '../components/listings/ListingRow';


import qs from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

import { useChat, Message } from "ai/react"
import getListings from '../actions/getListings';


interface ChatbotProps {
    listings?: any
}

const ChatbotClient: React.FC<ChatbotProps> = ({listings}) => {

    // Vercel AI SDK (ai package) useChat()
    // useChat -> handles messages for us, user input, handling user submits, etc.
    interface Listing {
        id: string;
        title: string;
        description: string;
        typeOfOrganization: string;
        email: string;
        phoneNumber: string;
    }
      
    const modifiedListings: Listing[] = listings.map(({ id, title, description, typeOfOrganization, email, phoneNumber }: Listing) => ({
        id,
        title,
        description,
        typeOfOrganization,
        email,
        phoneNumber
    }));
    

    const options = {
        body: {listings: modifiedListings},
    }
    const { input, handleInputChange, handleSubmit, isLoading, messages} = useChat(options)
    // useChat hook expects a route at api/chat, and handle a post request at that


    // messages -> [user asks a question, gpt-4 response, user asks again, gpt-4 responds], its an array of history
    console.log(messages);
    console.log(input);

    return (
        <div>
            <div>
                <h3 className='text-lg font-semibold mt-7'> Virtual Assistant </h3>
                <p> Hi, I am your personal virtual assistant, ask away about your current school partners </p>
            </div>

            {messages.map((message : Message) => {
                return (
                    
                    <div key={message.id}>
                        {/*  Name of person talking */}
                        {
                            message.role === "assistant"
                            ?
                            <h3 className="text-lg font-semibold mt-7 ,">
                                Virtual Assistant - 
                            </h3> 
                            :
                            <h3 className="text-lg font-semibold mt-7">
                                User
                            </h3>
                        }
                        
                        {/* Formatting the message */}
                        {message.content.split("\n").map((currentTextBlock: string, index : number) => {
                            if(currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p>
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                            }
                        })}

                    </div>
                )
            })}
          
            <form className="mt-12" onSubmit={handleSubmit}> 
                <p>User Message</p>
                <textarea
                    className="  rounded-md mt-2 w-full bg-slate-100 p-2 text-black"
                    placeholder={"Ask for some clarifying information about school partnerships"}
                    value={input}
                    onChange={handleInputChange} //updates input to textarea
                />
                <button className="rounded-md bg-red-500 p-2 mt-2">
                    Send message
                </button>
            </form>
        </div>
    )
}

export default ChatbotClient;
