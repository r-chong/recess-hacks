'use client';

import { useEffect, useRef } from 'react';

function MessagesDisplay({ messages, userId, receiverId }) {
    const lastMessageRef = useRef(null);

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView();
    }, [messages]);
    return (
        <div className="overflow-y-scroll h-[calc(100vh-292px)]">
            <div className="flex justify-center w-full mt-8 text-center text-gray-400">
                Start Your Conversation Off Strong <br />
                This is the Start of Something Beautiful
            </div>
            <div className="mt-8">
                {messages?.map((message, index) => (
                    <div
                        key={index}
                        dir={message.sender === userId ? 'rtl' : 'ltr'}
                        className={'block'}
                    >
                        <div
                            className={
                                'p-2 px-4 m-2 rounded-3xl inline-block max-w-[min(75vw,24rem)] ' +
                                (message.sender === userId
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-900')
                            }
                        >
                            <h1 dir="ltr">{message.message}</h1>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={lastMessageRef} className="h-4"></div>
        </div>
    );
}

export default MessagesDisplay;
