'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Datepicker from 'tailwind-datepicker-react';

const options = {
    title: 'Book A Date',
    autoHide: true,
    todayBtn: true,
    defaultDate: new Date(),
    language: 'en',
    theme: {
        background: 'bg-gray-100 dark:bg-gray-100',
        icons: 'bg-gray-200 dark:bg-gray-200',
        clearBtn: 'bg-gray-300 dark:bg-gray-300',
        text: 'text-gray-900 dark:text-gray-900',
        disabledText: 'text-gray-300 dark:text-gray-300',
        input: 'bg-gray-300 dark:bg-gray-300',
    },
};

const DemoComponent = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [show, setShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (selectedDate) => {
        setSelectedDate(selectedDate);
    };
    const handleClose = (state) => {
        setShow(state);
    };

    const sendAppointment = async (e) => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        const receiverEmail = pathname.split('/')[3];
        const appointment = {
            people: [email, receiverEmail],
            date: selectedDate,
        };
        await fetch('/api/user/appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                appointment: appointment,
            }),
        }).then((res) => res.json());
        router.push('/portal');
    };

    return (
        <form
            onSubmit={sendAppointment}
            className="relative flex flex-col items-center justify-center h-full gap-4 pb-48 "
        >
            <Link href="./">
                <svg
                    className="absolute w-10 top-6 left-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                </svg>
            </Link>
            <h1 className="text-3xl text-medium">Select a Date to Talk! </h1>
            <div className="relative">
                <Datepicker
                    classNames="max-w-xs text-black"
                    options={options}
                    onChange={handleChange}
                    show={show}
                    setShow={handleClose}
                />
            </div>
            <button
                type="submit"
                className="px-8 py-2 text-xl text-white bg-gray-500 rounded-lg"
            >
                Confirm
            </button>
        </form>
    );
};

export default DemoComponent;
