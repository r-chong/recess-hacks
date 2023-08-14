'use client';

import React, { useEffect, useState } from 'react';
import GradientButton from '@components/GradientButton';

const ExplorePage = () => {
    // search variables
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [userCards, setUserCards] = useState([]);
    const [filteredInterests, setFilteredInterests] = useState([]);
    const getUserCards = async () => {
        // Returns a list of all the user cards (no params)
        await fetch('/api/user').then((res) => res.json());
        setUserCards([]);
    };

    useEffect(() => {
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
    }, [searchTerm]);

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
        <div className="container p-6 mx-auto ">
            <div className="flex flex-row mb-4">
                <form onSubmit={handleSearch}>
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
            </div>
            <GradientButton
                text="get all interests"
                onClick={getAllInterests}
            />
            <div className="flex flex-wrap space-x-2">
                {filteredInterests.map((interest, index) => (
                    <button
                        key={index}
                        onClick={() => handleInterestToggle(interest)}
                        className={`py-1 px-3 rounded ${
                            selectedInterests.includes(interest)
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                        }`}
                    >
                        {interest}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExplorePage;
