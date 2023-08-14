'use client';

import { useRef, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

import MessagesDisplay from '@components/MessagesDisplay';
import pfp from '@public/pfp.png';

const ChatPage = ({ userId }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [receiverData, setRecieverData] = useState({
        name: 'T',
        initials: '',
        profilePicture: pfp,
    });
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

    const controlReceiverData = async () => {
        const response = await fetch('/api/user/?email=' + receiverEmail, {
            method: 'GET',
        }).then((res) => res.json());
        const user = response.user;
        const data = {
            name: user.firstName + ' ' + user.lastName,
            initials: user.firstName[0] + user.lastName[0],
            profilePicture: user.profilePicture,
        };
        setRecieverData(data);
        console.log(data);
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

        controlReceiverData();
    }, [receiverEmail, userEmail]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (textMessage === '') return;
        pushMessage(textMessage);
        setMessages([...messages, { sender: userEmail, message: textMessage }]);
        //Send the message to the server
        setTextMessage('');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-148px)]">
            <div className="flex items-center justify-between w-full gap-8 px-8 py-4 text-2xl shadow-sm">
                <div className="flex items-center gap-8">
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
                        <div className="p-3 text-white rounded-full bg-neutral-600">
                            <h1>{receiverData.initials}</h1>
                        </div>
                        <h1>{receiverData.name}</h1>
                    </div>
                </div>
                <button
                    onClick={() => {
                        router.replace(pathname + '/book-date');
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9"
                        />
                    </svg>
                </button>
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
