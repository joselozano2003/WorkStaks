import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getUser(email: any) {

    const user = await fetch(`http://localhost:3000/api/user/?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 120 }
    })
    return user.json();
}

export async function getTeams(userEmail: string) {

    const teams = await fetch(`http://localhost:3000/api/teams/?email=${userEmail}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 60 }
    })

    return teams.json();
}

export async function getTeam(id: any) {
    
    const team = await fetch(`http://localhost:3000/api/teams/team/?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 120 }
    })

    return team.json();
}

export async function getProjects(teamId: any) {
    const projects = await fetch(`http://localhost:3000/api/projects/?teamId=${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 120 }
    })
    return projects.json();
}

export async function getUserSession(){
    const session = await getServerSession(authOptions);

    return session;
}