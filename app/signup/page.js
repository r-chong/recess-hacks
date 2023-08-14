'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import HandsHolding from 'public/handsholding.png';
import GradientButton from '@components/GradientButton';
import Register from '@components/Register';

export default function SignupPage() {
    return (
        <div>
            <div className="flex flex-col content-center min-h-screen">
                <Register className="fixed" />
                <div className="flex justify-center">
                    <Image
                        src={HandsHolding}
                        alt="Landing Page"
                        width="100%"
                        quality={100}
                    />
                </div>
                <div className="flex justify-center pt-[1em]">
                    <div className="w-[80%] flex flex-col p-10 text-center">
                        <h1 className="flex flex-wrap pb-5 text-5xl font-bold">
                            Find Your Legacy
                        </h1>
                        <p className="pb-5">
                            Join with us and socialize across generations.
                        </p>
                        {/* <GradientButton onClick={''} text="Get Started" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
