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

export const gigs = [{
    "title": "Implement milestones on Q2T",
    "props": {
      "skills": [
        "DeFi"
      ],
      "credits": 240,
      "commitment": "100"
    },
    "image": "https://hub.textile.io/ipfs/bafkreiaks3kjggtxqaj3ixk6ce2difaxj5r6lbemx5kcqdkdtub5vwv5mi",
    "description": "Implement Milestones.sol contract which should validate and handle the Milestones flow. Connect it to the FrontEnd. Calculate Budget needed authomatically using the formula commitment * skills positional value.",
    "status": 1,
    "gigId":1,
    "creditsOffered": 72
  }]