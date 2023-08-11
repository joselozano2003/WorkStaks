"use client";

import React, { useState } from 'react';
import cover from '@/public/team.png'
import Image from 'next/image';
import CreateTeamForm from './CreateTeamForm';
import { ErrorAlert, SuccessAlert } from '@/components/Alerts';

export default function CreateTeamPage() {
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return (
        <div className='min-h-[calc(100vh-64px)] mb-12'>
            <div className='flex flex-col items-center m-0 min-h-[calc(100vh-64px)] justify-center'>
                {isErrorVisible && <ErrorAlert/>}
                {isSuccessVisible && <SuccessAlert message={success}/>}
                <div className="card lg:card-side my-5 lg:mt-0 bg-base-100 shadow-xl">
                    <figure><Image src={cover} alt="Album" width={400} height={400}/></figure>
                    <div className="card-body flex justify-center">
                        <CreateTeamForm errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
                    </div>
                </div>
            </div>
        </div>
    );
}