"use client";

import { useState } from "react";
import ManageTeamForm from "./ManageTeamForm";
import ManageTeamUsers from "./ManageTeamUsers";
import { ErrorAlert, SuccessAlert } from "@/components/Alerts";

export default function ManageTeamPage({ team }: any) {
    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return (
        <div className="flex flex-row flex-wrap justify-around [&>*]:my-3">
            {isErrorVisible && <ErrorAlert/>}
            {isSuccessVisible && <SuccessAlert message={success}/>}
            <ManageTeamForm team={team} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
            <ManageTeamUsers team={team} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>
        </div>
    )
}