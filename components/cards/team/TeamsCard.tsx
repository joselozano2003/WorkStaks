'use client';

import Link from "next/link";
import Image from "next/image";
import openLink from "@/public/links/icons8-open-link-48.png"

import React, { useState } from "react";
  
interface Team {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
}

export default function TeamsCard({ teams }: any) {
    
    const [showJoinTeam, setShowJoinTeam] = useState(false);

    function handleClick(){
        setTimeout(() => {
            setShowJoinTeam(!showJoinTeam);
        }, 100);
       
    }

    return(
        <div id="teams" className="card w-80 bg-warning shadow-xl">
            {showJoinTeam ? <JoinTeamCard setShowJoinTeam={setShowJoinTeam}/> : <></>}
            <div className="card-body">
                <h2 className="card-title justify-center text-black font-bold text-2xl">My Teams</h2>
                <hr className="border-t-2 border-black"/>

                <div className="flex flex-col">
                    {teams.map((team: Team) => (
                        <div className="flex flex-row justify-between my-2" key={team.id}>
                            <div>
                                <h2 className=" text-black font-bold text-lg">{team.name}</h2>
                            </div>
                            <div>
                                <p>{team.description}</p>
                            </div>
                            <div className="card-actions justify-center">
                                <Link href={`team/${team.id}`}>
                                    <Image src={openLink} alt="Album" width={20} height={20}/>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card-actions justify-center">
                    <button className="btn btn-secondary" onClick={() => handleClick()}>Join</button>
                    <Link href="create/team">
                        <button className="btn btn-primary">Create</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

interface JoinTeamCardProps {
    setShowJoinTeam: React.Dispatch<React.SetStateAction<boolean>>;
}

function JoinTeamCard({ setShowJoinTeam }: JoinTeamCardProps){

    function handleJoinTeam() {
        // Join the team
        setShowJoinTeam(false);
    }

    async function JoinTeam(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const body = {
            teamId: formData.get('team-id'),
        }

        try {
            const res = await fetch('/api/teams/team', {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/example',
                },
            })
        }
        catch(err) {
            console.log(err);
        }
    }

    return(
        <div className="popup">
            <div id="join-team" className="card w-80 bg-pink-400 shadow-xl fixed">
            <div className="flex justify-end">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => handleJoinTeam()}>X</button>
            </div>
                <div className="card-body">
                    <h2 className="card-title justify-center text-black font-bold text-2xl">Join a Team</h2>
                    <hr className="border-t-2 border-black"/>
                    <div className="card-actions justify-center">
                        <form onSubmit={JoinTeam} className="form-control flex flex-col items-center">
                            <input type="text" name="team-id" id="team-id" className="input input-bordered" placeholder="Team ID" required={true}/>
                            <button className="btn btn-success m-2">Join</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}