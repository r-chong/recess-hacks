'use client';

import { useRef, useState, useEffect, use } from 'react';
import UserChatPreview from '@components/UserChatPreview';
import pfp from '@public/pfp.png';

const ChatsPage = () => {
    const [userMessages, setUserMessages] = useState([]);
    const [userInfos, setUserInfos] = useState([]);
    const [arrowDisable, setArrowDisable] = useState(true);
    const elementRef = useRef(null);

    //TODO Request the user's messages from the server based on the user's ID
    const getUserMessages = async () => {
        let userEmail = localStorage.getItem('email');
        // Returns a list of all the user's chats
        const messagesResponse = await fetch('/api/chat/?email=' + userEmail, {
            method: 'GET',
        }).then((res) => res.json());
        setUserMessages(messagesResponse.chatData);
    };

    const getUserInfo = async (userEmail) => {
        // Returns a list of all the user's chats
        const userInfoResponse = await fetch('/api/user/?email=' + userEmail, {
            method: 'GET',
        }).then((res) => res.json());
        if (userInfoResponse !== null && userInfoResponse.user !== null) {
            setUserInfos((userInfos) => [...userInfos, userInfoResponse]);
        }
    };

    const handleHorizantalScroll = (element, speed, distance, step) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
            if (scrollAmount >= distance) {
                clearInterval(slideTimer);
            }
            if (element.scrollLeft === 0) {
                setArrowDisable(true);
            } else {
                setArrowDisable(false);
            }
        }, speed);
    };

    useEffect(() => {
        getUserMessages();
    }, []);

    useEffect(() => {
        if (userMessages?.length > 0) {
            userMessages?.map((user) => {
                //if we add groups chats remove this 0
                getUserInfo(
                    user?.people[0] !== localStorage.getItem('email')
                        ? user?.people[0]
                        : user?.people[1]
                );
            });
        }
    }, [userMessages]);

    return (
        <div className={'h-[calc(100vh-148px)] '}>
            <div className="flex flex-col">
                {/* 
                <h1 className="p-4 text-3xl">Favourite People</h1> */}
                <div className="relative w-full">
                    <div className="relative">
                        <button
                            className={
                                'absolute left-0 text-gray-400 top-14 ' +
                                (arrowDisable && 'hidden')
                            }
                            onClick={() => {
                                handleHorizantalScroll(
                                    elementRef.current,
                                    25,
                                    100,
                                    -10
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                        <button
                            className="absolute right-0 text-gray-400 top-14"
                            onClick={() => {
                                handleHorizantalScroll(
                                    elementRef.current,
                                    25,
                                    100,
                                    10
                                );
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="white"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </button>
                    </div>

                    <div
                        className="flex w-auto gap-4 px-8 py-4 overflow-x-scroll"
                        ref={elementRef}
                    >
                        {userInfos.map(
                            (user, index) =>
                                /* Traditionally, we should check if they are favorite LOL */
                                user.user !== null && (
                                    <div
                                        key={index}
                                        className="p-8 text-xl text-white rounded-full bg-neutral-600"
                                    >
                                        <h1>
                                            {user.user.firstName[0] +
                                                user.user.lastName[0]}
                                        </h1>
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col h-screen pb-32 overflow-y-scroll">
                {userInfos.map(
                    (user, index) =>
                        user !== null && (
                            <UserChatPreview
                                key={index}
                                user={user.user}
                                lastMessage={
                                    userMessages[index]?.messages.length > 0
                                        ? userMessages[index].messages[0]
                                              ?.message
                                        : 'Start a Conversation'
                                }
                            />
                        )
                )}
            </div>
        </div>
    );
};

export default ChatsPage;
