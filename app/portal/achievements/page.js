'use client';

import React, { useEffect, useState } from 'react';
import achievementsData from './achievementsData';

const AchievementsPage = () => {
    const totalPoints = achievementsData.length;
    const [userBadges, setUserBadges] = useState([]);
    let currentPoints = 1;
    const progressPercentage = (currentPoints / totalPoints) * 100;

    useEffect(() => {
        fetch('/api/user?email=' + localStorage.getItem('email'), {
            method: 'GET',
        }).then(async (res) => {
            if (res.status == 200) {
                let body = await res.json();
                let badges = body.user.achievements;
                for (let i = 0; i < achievementsData.length; i++) {
                    let acheivementTitle = achievementsData[i].title;
                    if (badges.includes(acheivementTitle)) {
                        achievementsData[i].earned = true;
                        currentPoints++;
                    }
                }
                setUserBadges(achievementsData);
            }
        });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="p-5 mb-4 bg-white rounded-t shadow-md">
                <h1 className="mb-4 text-2xl font-semibold">Achievements</h1>
                <div className="mb-4">
                    <p>
                        Achievements Completed: {currentPoints}/{totalPoints}
                    </p>
                    <div className="w-full h-4 bg-gray-400 rounded">
                        <div
                            className="h-4 bg-blue-500 rounded"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-4 h-[calc(100vh-148px)] overflow-scroll p-6">
                {userBadges.map((achievement, index) => (
                    <AchievementCard key={index} {...achievement} />
                ))}
            </div>
        </div>
    );
};

const AchievementCard = ({ title, description, icon, earned }) => {
    return (
        <div
            className={
                'flex flex-row p-4 ' +
                (earned ? 'bg-green-500' : 'bg-blue-50') +
                ' rounded shadow'
            }
        >
            <div className="w-20 h-20 mr-4">{icon}</div>

            <div className="flex flex-col">
                <h2 className="mb-1 text-2xl font-semibold">{title}</h2>{' '}
                <p className="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default AchievementsPage;
