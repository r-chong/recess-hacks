'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GradientButton from '@components/GradientButton';
import sendMessage from '@app/lib/sendMessage';
import { set } from 'mongoose';

export default function ProfilePage() {
    const router = useRouter();
    const params = useParams();
    let profileEmail = params.userEmail;
    profileEmail = profileEmail.replace('%40', '@');
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        interests: [],
        age: 0,
        email: '',
    });

    const findUser = async () => {
        console.log(profileEmail);
        const response = await fetch('/api/user?email=' + profileEmail, {
            method: 'GET',
        }).then((res) => res.json());
        const user = response.user;
        setProfileData(user);
    };

    useEffect(() => {
        findUser();
    }, []);

    return (
        <div className="container flex flex-col gap-3 p-10">
            <div className="flex flex-row flex-wrap justify-between">
                {console.log(profileData)}
                {profileData.profilePicture ? (
                    <Image
                        src={profileData.profilePicture}
                        alt={`${profileData.name}'s Profile`}
                        width={192}
                        height={192}
                        className="rounded-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-48 h-48 text-white rounded-full bg-neutral-600">
                        <h1>
                            {profileData.firstName[0]} {profileData.lastName[0]}
                        </h1>
                    </div>
                )}
                <div className="flex flex-col justify-between">
                    <h1 className="text-2xl font-semibold">
                        {profileData.firstName} {profileData.lastName}
                    </h1>
                    <GradientButton
                        text="Message"
                        className="px-2 py-2 text-white bg-blue-500 rounded-md"
                        onClick={() => {
                            let success = sendMessage(profileEmail);
                            if (success) router.push('/portal/chats');
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2 text-left">
                <p className="text-gray-600">Age: {profileData.age}</p>
                <div className="flex space-x-2">
                    {profileData.interests.map((interest, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-sm bg-gray-200 rounded"
                        >
                            {interest.toUpperCase()}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600">{profileData.bio}</p>
            </div>
        </div>
    );
}
