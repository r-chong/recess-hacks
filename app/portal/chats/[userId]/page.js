'use client';

import { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import MessagesDisplay from '@components/MessagesDisplay';
import pfp from '@public/pfp.png';

const ChatPage = ({ userId }) => {
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.focus();
        getUserMessages(receiverEmail, userEmail);
    }, []);

    const params = useParams();
    const receiverEmail = params.userId.replace('%40', '@');
    const userEmail = localStorage.getItem('email');

    const getUserMessages = async (receiverEmail, userEmail) => {
        // Returns a list of all the user's chats
        const messagesResponse = await fetch(
            '/api/chat/specific/?userEmail=' +
                userEmail +
                '&receiverEmail=' +
                receiverEmail,
            {
                method: 'GET',
            }
        ).then((res) => res.json());
        if (messagesResponse.messages) {
            setMessages(messagesResponse?.messages[0]?.messages);
        } else {
            setMessages([]);
        }
    };

    const pushMessage = async (message) => {
        // Returns a list of all the user's chats
        await fetch('/api/chat', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                people: [userEmail, receiverEmail],
                messages: { sender: userEmail, message },
            }),
        });
    };

    useEffect(() => {
        setInterval(() => {
            console.log('Getting messages');
            getUserMessages(receiverEmail, userEmail);
        }, 10000);
    }, [receiverEmail, userEmail]);

    const receiverName = 'John Doe';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textMessage === '') return;
        pushMessage(textMessage);
        setMessages([...messages, { sender: userEmail, message: textMessage }]);
        //Send the message to the server
        setTextMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center w-full gap-8 px-8 py-4 text-2xl shadow-sm">
                <Link href="/portal/chats">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </Link>
                <div className="flex items-center gap-4">
                    <Image
                        className="w-12 rounded-full"
                        src={pfp}
                        alt={receiverName + ' profile picture'}
                    />
                    <h1>{receiverName}</h1>
                </div>
            </div>
            <div className="flex-grow">
                <MessagesDisplay
                    messages={messages}
                    userId={userEmail}
                    receiverEmail={receiverEmail}
                />
            </div>
            <div className="flex flex-col p-2 bg-gray-100">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        ref={textRef}
                        value={textMessage}
                        onChange={(e) => {
                            setTextMessage(e.target.value);
                        }}
                        placeholder="Type your message here"
                        className="flex-grow p-2 px-4 bg-white border rounded-full"
                    />
                    <button
                        type="submit"
                        className="p-3 text-white bg-gray-500 rounded-full"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                            />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatPage;
