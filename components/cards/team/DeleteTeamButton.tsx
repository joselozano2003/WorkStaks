"use client";
import { Team } from "@prisma/client";

import { useState } from "react";

import { ErrorAlert, SuccessAlert } from "@/components/Alerts";

interface Props {
    team: Team;
}

export default function DeleteTeamButton({team}: Props){

    const [showPopup, setShowPopup] = useState(false);

    function handleMainClick() {
        setShowPopup(true);
    }

    const [isErrorVisible, setIsErrorVisible] = useState(false);
    const [success, setSuccess] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    return (
        <div>
            <div className="flex justify-center">
                {isErrorVisible && <ErrorAlert/>}
                {isSuccessVisible && <SuccessAlert message={success}/>}
                {showPopup && <Popup setShow={setShowPopup} team={team} errorVisible={setIsErrorVisible} successMessage={setSuccess} successVisible={setIsSuccessVisible}/>}
            </div>
            <div className="flex justify-center">
                <button className="btn btn-error" onClick={handleMainClick}>Delete Team</button>
            </div>
        </div>
    )
}



interface PopupProps {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    team: Team;
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

function Popup({setShow, team, errorVisible, successMessage, successVisible}: PopupProps){

    function handleExit(){
        setShow(false);
    }

    async function deleteTeam(){
        console.log(team.id);
        const res = await fetch(`/api/teams/team/?id=${team.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok){
            successMessage('Team Deleted Successfully!');
            successVisible(true);

            setTimeout(() => {
                successVisible(false)
                window.location.href = `/home`
            }, 3000);
        }

        else {
            errorVisible(true);

            setTimeout(() => {
                errorVisible(false);
            }, 5000);
        }
    }

    return (
        <div className="popup">
            <div id="join-team" className="card w-80 bg-error shadow-xl fixed">
                <div className="flex justify-end">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleExit()}>X</button>
                </div>
                <div className="card-body [&>*]:text-center">
                    <h2 className="card-title justify-center text-black font-bold text-3xl">WARNING</h2>
                    <hr className="border-t-2 border-black"/>
                    <h3 className="">Do you want to delete the Team?</h3>
                    <div className="card-actions justify-center">
                        <button className="btn btn-success" onClick={() => handleExit()}>No</button>
                        <button className="btn btn-error border-black border" onClick={() => deleteTeam()}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}