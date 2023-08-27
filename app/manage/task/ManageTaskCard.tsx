'use client';

import React, { useState } from 'react';
import type { Task } from "@prisma/client";

import { ErrorAlert, SuccessAlert } from '@/components/Alerts';
import ManageTaskForm from './ManageTaskForm';

import Image from 'next/image';
import cover from '@/public/team3.png'

interface Props {
    task: Task;
}

export default function ManageTaskCard({ task }: Props) {

    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return (
        <div className='flex flex-col items-center justify-center'>
            {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>}
            <div className='card lg:card-side bg-base-100 shadow-2xl'>
                <figure><Image src={cover} alt="Album" width={410} height={410}/></figure>
                <div className="card-body p-3">
                    <ManageTaskForm task={task} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
                </div>
            </div>
        </div>
    )
}