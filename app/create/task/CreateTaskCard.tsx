'use client';

import React, { useState } from 'react';
import type { Project, User } from "@prisma/client";

import { ErrorAlert, SuccessAlert } from '@/components/Alerts';
import CreateTaskForm from './CreateTaskForm';

import Image from 'next/image';
import cover from '@/public/team3.png'

interface Props {
    project: Project;
    user: User;
}


export default function CreateTaskCard({ project, user }: Props) {

    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return(
        <div className='flex flex-col items-center justify-center'>
            {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>}
            <div className="card lg:card-side bg-base-100 shadow-2xl">
                <figure><Image src={cover} alt="Album" width={410} height={410}/></figure>
                <div className="card-body p-3">
                    <CreateTaskForm project={project} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible} user={user}/>
                </div>
            </div>
        </div>
    );
};