'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import GradientButton from '@components/GradientButton';
import sendMessage from '@app/lib/sendMessage';

export default function ProfilePage() {
    const router = useRouter();
    const params = useParams();
    const profileEmail = params.userEmail;
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
        interests: [],
        age: 0,
        email: '',
    });

    useEffect(() => {
        fetch('/api/user?email=' + profileEmail)
            .then((response) => response.json())
            .then((data) => {
                setProfileData(data.user);
                return data;
            });
    }, [profileEmail]);
    return (
        <div className="container flex flex-col gap-3 p-10">
            <div className="flex flex-row flex-wrap justify-between">
                <Image
                    src={profileData.profilePicture}
                    alt={`${profileData.name}'s Profile`}
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full"
                />
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
