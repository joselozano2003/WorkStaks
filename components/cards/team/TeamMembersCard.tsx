export default async function TeamMembersCard({ members }: any) {

    return (
        <div className="bg-neutral text-neutral-content card w-80 shadow-xl p-3">
            <h3 className="font-bold text-2xl text-warning">Members</h3>
                <div className="flex flex-row flex-wrap justify-center">
                    {members?.members.map((member: any) => (
                        <div className="flex flex-row flex-wrap justify-center">
                            <div className="m-1">
                                <img src={member?.image!} alt={member?.name!} width={100} height={100} />
                                <p key={member.id} className="font-bold">{member.name}</p>
                            </div>

                            <div className="m-1">
                                <img src={member?.image!} alt={member?.name!} width={100} height={100} />
                                <p key={member.id} className="font-bold">{member.name}</p>
                            </div>
                            <div className="m-1">
                                <img src={member?.image!} alt={member?.name!} width={100} height={100} />
                                <p key={member.id} className="font-bold">{member.name}</p>
                            </div>
                            <div className="m-1">
                                <img src={member?.image!} alt={member?.name!} width={100} height={100} />
                                <p key={member.id} className="font-bold">{member.name}</p>
                            </div>
                            <div className="m-1">
                                <img src={member?.image!} alt={member?.name!} width={100} height={100} />
                                <p key={member.id} className="font-bold">{member.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}