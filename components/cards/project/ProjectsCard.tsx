import Link from "next/link";
import Image from "next/image";
import openLink from "@/public/links/icons8-open-link-48.png"

export default function ProjectsCard({ projects, team }: any) {

    return(
        <div id="teams" className="card w-80 bg-warning shadow-xl min-h-[170px] flex-shrink-0 mb-5">
            <div className="card-body">
                <h2 className="card-title justify-center text-black font-bold text-2xl">{team.name}'s Projects</h2>
                <hr className="border-t-2 border-black"/>

                <div className="flex flex-col">
                    {projects.map((project: any) => (
                        <div className="flex flex-row justify-between my-2">
                            <div>
                                <h2 className=" text-black font-bold text-lg">{project.name}</h2>
                            </div>
                            <div>
                                <p>{project.description}</p>
                            </div>
                            <div className="card-actions justify-center">
                                <Link href={`project/${project.id}`}>
                                    <Image src={openLink} alt="Album" width={20} height={20}/>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card-actions justify-center">
                    <Link href= {`/create/project/${team.id}`} >
                        <button className="btn btn-secondary">Create</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}