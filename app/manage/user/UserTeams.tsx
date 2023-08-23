import Link from "next/link"
import TeamListItem from "./TeamListItem"

interface Props {
    user: any;
    teams: any;
    errorVisible: (isVisible: boolean) => void;
    successMessage: (message: string) => void;
    successVisible: (isVisible: boolean) => void;
}

export default function UserTeams({ user, teams, errorVisible, successMessage, successVisible }: Props) {

    return (
        <div className="card w-80 bg-neutral text-neutral-content py-3 px-5">
            <div>
                <h1 className="text-2xl font-bold text-center">My Teams</h1>
                <hr className="border-2 border-info rounded my-3"/>
            </div>
                { teams.length == 0 ?
                    <div className="flex flex-col justify-center items-center h-full">
                        <p className="text-center font-bold text-lg m-3">You are not in any teams!</p>
                        <Link href="/create/team">
                            <button className="btn btn-primary m-3">Create Team</button>
                        </Link> 
                    </div>
                    
                    : 
                    <div className="flex flex-col justify-center h-full sm:p-0 md:pb-[45px]">
                        <hr className="border-2 border-accent-focus rounded"/>
                        {teams.map((team: any) => (
                            <div>
                                <TeamListItem key={team.id} team={team} user={user} errorVisible={errorVisible} successMessage={successMessage} successVisible={successVisible}/>
                                <hr className="border-2 border-accent-focus rounded"/>
                            </div>
                        ))}
                    </div>
                }
        </div>
    )
}

