'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import GradientButton from './GradientButton';

function Register() {
    const [stage, setStage] = useState(0);
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        type: 'youth',
        age: 0,
        bio: '',
    });

    const router = useRouter();

    const titles = ['Register', 'About Yourself', 'Tell Us More'];

    const inputs = [
        {
            type: 'email',
            label: 'Email',
            inputData: userData.email,
            dataField: 'email',
            stage: 0,
        },
        {
            type: 'password',
            label: 'Password',
            inputData: userData.password,
            dataField: 'password',
            stage: 0,
        },
        {
            type: 'text',
            label: 'First Name',
            inputData: userData.firstName,
            dataField: 'firstName',
            stage: 1,
        },
        {
            type: 'text',
            label: 'Last Name',
            inputData: userData.lastName,
            dataField: 'lastName',
            stage: 1,
        },
        {
            type: 'text',
            label: 'Biography',
            inputData: userData.bio,
            dataField: 'bio',
            stage: 2,
        },
        {
            type: 'number',
            label: 'Age',
            inputData: userData.age,
            dataField: 'age',
            stage: 1,
        },
    ];

    const handleNext = () => {
        if (stage === 2) {
            sendData();
            router.push('/portal');
        } else {
            setStage((prev) => prev + 1);
        }
    };

    function sendData() {
        fetch('./api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(async (res) => {
            if (res.status === 201) {
                let data = await res.json();
                localStorage.setItem('firstName', data.firstName);
                localStorage.setItem('lastName', data.lastName);
                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);
            } else {
                //TODO Show some toast with an error or smth
            }
        });
    }

    return (
        <div>
            <div className="w-[80%] p-10">
                <h1 className="text-2xl">{titles[stage]}</h1>
                <div className="flex flex-row flex-wrap gap-5 p-5">
                    {inputs.map(
                        (key) =>
                            key.stage === stage && (
                                <Input
                                    key={key.dataField}
                                    userData={userData}
                                    setData={setUserData}
                                    {...key}
                                />
                            )
                    )}
                    {stage === 1 && (
                        <div className="flex flex-col flex-1">
                            <label htmlFor="age-group" className="text-xl">
                                Age Group
                            </label>
                            <select
                                id="age-group"
                                className="p-2 bg-gray-100 rounded-md outline-none"
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        type: e.target.value,
                                    })
                                }
                                value={userData.type}
                            >
                                <option value="youth">Youth</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                    )}
                    <GradientButton onClick={handleNext} text="Next" />
                </div>
            </div>
        </div>
    );
}

const Input = ({ userData, setData, label, type, inputData, dataField }) => {
    return (
        <div className="flex flex-col flex-1">
            <label className="text-xl">{label}</label>
            <input
                type={type}
                value={inputData}
                onChange={(e) =>
                    setData({ ...userData, [dataField]: e.target.value })
                }
                className="p-2 bg-gray-100 rounded-md outline-none"
            />
        </div>
    );
};

export default Register;
