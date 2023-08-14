'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const inputs = [
        {
            type: 'email',
            label: 'Email',
            inputData: userData.email,
            dataField: 'email',
        },
        {
            type: 'password',
            label: 'Password',
            inputData: userData.password,
            dataField: 'password',
        },
    ];
    function submitData() {
        fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
            }),
        }).then(async (response) => {
            if (response.status === 200) {
                let body = await response.json();
                localStorage.setItem('email', body.user.email);
                localStorage.setItem('password', body.user.password);
                router.push('/portal');
            } else {
                toast.error('Your credentials are invalid');
            }
        });
    }

    return (
        <>
            <div className="flex flex-col gap-5 p-5">
                <div className="w-full p-5 rounded-md bg-slate-300">
                    <h1 className="text-lg text-center">
                        Login to Your Account
                    </h1>
                </div>
                {inputs.map((input) => (
                    <Input
                        key={input.label}
                        userData={userData}
                        setData={setUserData}
                        {...input}
                    />
                ))}
                <input
                    type="submit"
                    value="Login"
                    className="p-2 bg-gray-200 rounded-md outline-none hover:cursor-pointer"
                    onClick={submitData}
                />
                <ToastContainer />
            </div>
        </>
    );
};

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

export default LoginPage;
