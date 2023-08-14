import React from 'react';

const achievementsData = [
    {
        title: 'New Member',
        description:
            "Welcome to the community! You've taken the first step towards improving your mental well-being.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Profile Button',
        description: "You've clicked the profile button",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Social Butterfly',
        description:
            "You've engaged in a certain number of conversations and made new friends within the app.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Daily Journaler',
        description:
            "You've consistently written in your journal every day, promoting self-reflection and mindfulness.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Memory Sharer',
        description:
            "You've shared a significant memory from your past, allowing others to connect with your life experiences.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Inspiring Storyteller',
        description:
            "You've written a story that has inspired others or sparked meaningful discussions.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Supportive Friend',
        description:
            "You've provided comfort and encouragement to fellow members through thoughtful comments and messages.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Health and Happiness',
        description:
            "You've completed a set of mental health exercises or mindfulness activities in a single day.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Adventurer',
        description:
            "You've shared photos of a recent adventure or activity, promoting an active lifestyle and curiosity.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Creative Expression',
        description:
            "You've uploaded a piece of artwork, poetry, or craft that showcases your creativity.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Tech Explorer',
        description:
            "You've mastered navigating the app's features and settings, becoming a tech-savvy member.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Life Wisdom',
        description:
            'Your life experiences and advice have been valuable to others seeking guidance.',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Compassionate Listener',
        description:
            "You've been actively engaging in empathetic conversations, making others feel heard.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Gratitude Practitioner',
        description:
            "You've consistently expressed gratitude for the positive aspects of life, enhancing your mental well-being.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Community Organizer',
        description:
            "You've initiated a group chat or event that brought people together for a common purpose.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Positive Feedback',
        description:
            "You've received a certain number of positive comments and reactions on your posts.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Wellness Milestone',
        description:
            "You've completed a mental health challenge or achieved a goal that promotes your overall well-being.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Local Explorer',
        description:
            "You've shared a hidden gem or interesting place to visit in your local area.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
    {
        title: 'Bookworm',
        description:
            "You've recommended a book that has been a source of inspiration, knowledge, or entertainment for you.",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                />
            </svg>
        ),
        earned: false,
    },
];

export default achievementsData;
