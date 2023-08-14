'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

import MessagesDisplay from '@components/MessagesDisplay';

const API_KEY = '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';

function ChatAI() {
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            message: 'Hey there!',
            sender: 'ChatGPT',
            direction: 'incoming',
        },
    ]);

    const [inputMessage, setInputMessage] = useState('');

    const textRef = useRef(null);

    useEffect(() => {
        textRef.current.focus();
    }, []);

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing',
            icon: {
                type: 'image',
                value: 'https://example.com/image.png',
            },
        };

        const newMessages = [...messages, newMessage];

        // update messages state
        setMessages(newMessages);

        // set typing indicator
        setTyping(true);

        // process message to chatgpt
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        // chatMessages {sender: "user" or "ChatGPT", message: "The message content here"}
        // apiMessages {role: "user" or "assistant", content: "The message content here"}

        let apiMessages = chatMessages.map((messageObject) => {
            let role = '';
            if (messageObject.sender === 'ChatGPT') {
                role = 'assistant';
            } else {
                role = 'user';
            }
            return { role: role, content: messageObject.message };
        });

        // role: "user"
        // role: "assistant"
        // role: "system"

        const systemMessage = {
            role: 'system',
            content:
                'You are a friend to an elderly person who is stuggling with loneliness and depression.',
        };

        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...apiMessages],
        };

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log(data);
                console.log(data.choices[0].message.content);
                setMessages([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: 'ChatGPT',
                    },
                ]);
                setTyping(false);
            });
    }

    return (
        <div className="flex flex-col h-[calc(100vh-148px)] bg-neutral">
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
                            <h1>AI</h1>
                        </div>
                        <h1>{'Your AI Friend'}</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-end flex-grow mb-4 overflow-y-auto">
                <MessagesDisplay
                    messages={messages}
                    userId={'user'}
                    receiverEmail={'receiverEmail'}
                />

                {typing && (
                    <div className="self-center mb-4 font-white">
                        <span className="text-gray-600">
                            Assistant is typing...
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full p-2 bg-gray-100">
                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend(inputMessage);
                        setInputMessage('');
                    }}
                >
                    <input
                        type="text"
                        ref={textRef}
                        value={inputMessage}
                        onChange={(e) => {
                            setInputMessage(e.target.value);
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
}

export default ChatAI;
