'use client';

import React, { useEffect, useState } from 'react';
import GradientButton from '@components/GradientButton';
import sendMessage from '@app/lib/sendMessage';
import { useRouter } from 'next/navigation';

const ExplorePage = () => {
    // search variables
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [userData, setUserData] = useState();
    const [filteredInterests, setFilteredInterests] = useState([]);
    const router = useRouter();

    const getAllUsers = async () => {
        // Returns a list of all the user cards (no params)
        await fetch('/api/user')
            .then((res) => res.json())
            .then((data) => {
                // Map this data to a component

                setUserData(data.userList);
            });
    };

    const getAllInterests = async () => {
        fetch('/api/user/interests/', {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                let filteredData = data.interests.filter((interest) =>
                    interest.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredInterests(filteredData);
            });
    };

    useEffect(() => {
        getAllUsers();
        getAllInterests();
    }, []);

    const getSearchTerm = async (interest) => {
        // Returns a list of all the user cards (no params)
        await fetch('/api/user/interests/?interest=' + interest, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (userCards) {
                    setUserCards(userCards[0]?.userCards);
                } else {
                    setUserCards([]);
                }
            });
    };

    // search functions
    const handleSearch = (event) => {
        event.preventDefault();
        getSearchTerm(searchTerm);
    };

    // only filter if it exists
    const handleInterestToggle = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(
                selectedInterests.filter((item) => item !== interest)
            );
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    return (
        <div className="container p-8 mx-auto">
            <form
                onSubmit={handleSearch}
                className="flex flex-row justify-around gap-3"
            >
                <input
                    type="text"
                    placeholder="Search interests"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    className="w-full px-4 py-2 border rounded"
                />
                <GradientButton text="Search" type="submit" />
            </form>

            <div className="flex flex-row flex-wrap gap-2 pt-5">
                {filteredInterests.map((interest, index) => (
                    <button
                        key={index}
                        onClick={
                            (() => getSearchTerm(interest),
                            () => handleInterestToggle(interest))
                        }
                        className={`py-1 px-3 rounded flex-grow-1 ${
                            selectedInterests.includes(interest)
                                ? 'bg-red-400 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        {interest}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {userData?.map((user, index) => (
                    <UserCard key={index} user={user} router={router} />
                ))}
            </div>
        </div>
    );
};

const UserCard = ({ user, router }) => {
    return (
        <div
            onClick={() => {
                let success = sendMessage(user.email);
                if (success) router.push('/portal/chats');
            }}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded shadow-md cursor-pointer "
        >
            <h1 className="text-2xl font-bold">
                {user.firstName + ' ' + user.lastName}
            </h1>
            <p className="text-gray-500">{user.bio}</p>
            <div className="flex flex-row gap-2">
                {user.interests.map((interest, index) => (
                    <button
                        key={index}
                        className="px-3 py-1 text-gray-500 bg-gray-200 rounded flex-grow-1"
                    >
                        {interest}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
