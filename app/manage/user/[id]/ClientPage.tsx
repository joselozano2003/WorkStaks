"use client";

import { useState } from "react";
import ProfileForm from "../ProfileForm";
import UserTeams from "../UserTeams";
import { ErrorAlert, SuccessAlert } from "@/components/Alerts";


export default function ClientPage({user, teams}: any){
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    return (
    <div>
        <div className="flex justify-center">
            {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>}
        </div>
        <div className="flex flex-row flex-wrap justify-around [&>*]:my-5">
                <ProfileForm user={user} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
                <UserTeams user={user} teams={teams} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
        </div>
    </div>
    )
}