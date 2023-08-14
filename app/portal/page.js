'use client';

import Image from 'next/image';
import profilePic from '@public/pfp.png';

import { useState, useEffect } from 'react';

const accountsData = [
    {
        name: 'John Doe',
        profilePic, // Replace with image path
        interests: ['Gaming', 'Photography', 'Travel'],
    },
    {
        name: 'Jane Smith',
        profilePic, // Replace with image path
        interests: ['Cooking', 'Fitness', 'Reading'],
    },
    // Add more account data...
];

const PortalHome = () => {
    const [appointments, setAppointments] = useState([]);
    const email = localStorage.getItem('email');

    const getUserAppointments = async () => {
        // Returns a list of all the user's chats
        const appointments = await fetch(
            '/api/user/appointments/?email=' + email,
            {
                method: 'GET',
            }
        ).then((res) => res.json());
        if (appointments.appointments) {
            setAppointments(appointments?.appointments);
        } else {
            setAppointments([]);
        }
    };

    useEffect(() => {
        getUserAppointments(email);
    }, []);

    useEffect(() => {
        console.log(appointments);
    }, [appointments]);

    return (
        <div className="container p-6 mx-auto">
            <h1 className="mb-4 text-2xl font-semibold">
                Upcoming Appointments
            </h1>
            {appointments.length === 0 ? (
                <h1 className="">No Upcoming Meetings</h1>
            ) : (
                <div className="flex flex-col space-y-4">
                    {appointments.map((account, index) => (
                        <AccountBox key={index} {...account} email />
                    ))}
                </div>
            )}
        </div>
    );
};

const AccountBox = ({ people, date, email }) => {
    const appointmentDate = new Date(date);
    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
            <div>
                <h1 className="text-3xl font-medium">
                    {appointmentDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </h1>
                <h3 className="mb-2 font-medium text-gray-500 text-md">
                    Meeting with: {people[0] === email ? people[1] : people[0]}
                </h3>
            </div>

            <div className="flex gap-4">
                <div className="mb-4">
                    <Image
                        src={profilePic}
                        alt={`${email}'s Profile`}
                        className="w-16 h-16 mr-auto rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <h3>Interests:</h3>
                    <div className="flex space-x-2">
                        {['Cooking', 'Fitness', 'Reading'].map(
                            (interest, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm bg-gray-200 rounded"
                                >
                                    {interest}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortalHome;
