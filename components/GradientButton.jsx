'use client';
import { useState } from 'react';

function GradientButton({ text, ...props }) {
    return (
        <button
            {...props}
            className="px-8 py-2 font-semibold text-white bg-red-400 rounded-2xl hover:bg-red-500 hover:shadow-xl"
        >
            {text}
        </button>
    );
}

export default GradientButton;
