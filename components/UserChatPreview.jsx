import Image from 'next/image';
import Link from 'next/link';

const UserChatPreview = ({ user, lastMessage }) => {
    // Always do user? in case the user is null
    return (
        <Link
            href={'/portal/chats/' + user?.email}
            className="flex items-center justify-between py-6 mx-8 border-t-2 border-gray-200"
        >
            <div className="flex gap-4 ">
                <div>
                    <div className="flex items-center justify-center text-white rounded-full w-14 h-14 bg-neutral-600">
                        <h1>{user?.firstName[0] + user?.lastName[0]}</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium">
                        {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-gray-500">{lastMessage}</p>
                </div>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
        </Link>
    );
};

export default UserChatPreview;
