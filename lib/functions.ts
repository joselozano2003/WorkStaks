const URL = "https://work-staks.vercel.app"

export async function getUser(email: any) {

    const user = await fetch(`${URL}/api/user/?email=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })
    return user.json();
}

export async function getUserWithId(id: any) {
    const user = await fetch(`${URL}/api/user/id/?userId=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })
    return user.json();
}

export async function getTeams(userEmail: string) {

    const teams = await fetch(`${URL}/api/teams/?email=${userEmail}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })

    return teams.json();
}

export async function getTeam(id: any) {
    
    const team = await fetch(`${URL}/api/teams/team/?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })

    return team.json();
}

export async function getProjects(teamId: any) {
    const projects = await fetch(`${URL}/api/projects/?teamId=${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })
    return projects.json();
}

export async function getProject(projectId: any) {
    const project = await fetch(`${URL}/api/projects/project/?projectId=${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })
    return project.json();
}

export async function getTasks(projectId: any) {
    const tasks = await fetch(`${URL}/api/tasks/?projectId=${projectId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        next: { revalidate: 10 }
    })
    return tasks.json();

}

