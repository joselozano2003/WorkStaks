'use client';

import React, { useState } from 'react';

import { ErrorAlert, SuccessAlert } from '@/components/Alerts';
import CreateProjectForm from './CreateProjectForm';

import cover from '@/public/team2.png'
import Image from 'next/image';

interface Member {
    id: string;
    name: string | null;
    bio: string | null;
    age: number | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}
  
  interface Team {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
    members: Member[];
}

interface Props {
    team: Team | null;
}

export default function CreateProjectCard({ team }: Props) {

    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return(
        <div className='flex flex-col items-center justify-center'>
            {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>}
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <div className="card-body">
                    <CreateProjectForm team={team} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
                </div>
                <figure><Image src={cover} alt="Album" width={400} height={400}/></figure>
            </div>
        </div>
    )
}


