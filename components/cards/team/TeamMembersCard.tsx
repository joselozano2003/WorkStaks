"use client";

export default function TeamMembersCard({ members }: any) {

    return (
        <div className="bg-neutral text-neutral-content card w-80 shadow-xl p-3">
            <h2 className="font-bold text-3xl text-warning pb-3">Members</h2>
            <div className="flex flex-row flex-wrap justify-center">
                {members?.map((member: any) => (
                    <div key={member.id} className="flex flex-row flex-wrap justify-center">
                        <div className="m-4">
                            <img src={member?.image!} alt={member?.name!} width={100} height={100} referrerPolicy="no-referrer"/>
                            <p className="font-bold">{member.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}