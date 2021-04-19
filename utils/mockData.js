export const user = {
    username: 'migrenaa',
    skillSet: {
        skills: [ 
            {
                name: "Mobile Dev",
                value: 4
            },
            {
                name: "Smart Contracts",
                value: 8
            },
            {
                name: "Network Design",
                value: 8
            }
        ]
    }
}

export const community = {
    name: 'DiTo 23',
    members: 12, 
    scarcityScore: 72,
    address: '0x..',
    communityInfo: {
        category: 'Blockchain'
    }
}

export const postNewProject = {
    title: 'asd',
    description: 'asd',
    skills: [1, 2, 3],
    commitment: 6
}

export const getAllProjects = {
    projects: [
        {
            title: 'Distributed Towns',
            description: 'Create or join your own local community!',
            skills: ['frontend', 'backend', 'data science'],
            funds: 3600
        }
    ]
}

export const skills = {
    skillSets:[
        {
            setId: 1,
            posValue: 6,
            skills: [{id: 1, displayName: 'Mobile Dev'}, {id: 2, displayName: 'Backend'}]
        },
        {
            setId: 2,
            posValue: 12,
            skills: [{id: 3, displayName: 'Smart Contracts'}, {id: 4, displayName: 'Network Design'}]
        }
    ]
}