import Link from "next/link";
import Image from "next/image";
import openLink from "@/public/links/icons8-open-link-48.png"

export default function TeamsCard({ teams }: any) {
    return(
        <div id="teams" className="card w-80 bg-warning shadow-xl">
            <div className="card-body">
                <h2 className="card-title justify-center text-black font-bold text-2xl">My Teams</h2>
                <hr className="border-t-2 border-black"/>

                <div className="flex flex-col">
                    {teams.map((team: any) => (
                        <div className="flex flex-row justify-around my-2">
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
                    <button className="btn btn-secondary">Join</button>
                    <Link href="create/team">
                        <button className="btn btn-primary">Create</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}