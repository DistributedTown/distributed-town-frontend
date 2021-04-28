

export const createProject = async (project) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project`, {
      method: 'POST',
      headers: new Headers({
        // TODO: add token
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(project),
    }).then(res => res.json());
  };
  