export const getSkillTreeBySkill = skill => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill?skill=${encodeURIComponent(
      skill,
    )}`,
    { method: 'GET' },
  ).then(res => res.json());
};

export const getSkillTreeByCategory = category => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/skill?category=${encodeURIComponent(
      category,
    )}`,
    { method: 'GET' },
  ).then(res => res.json());
};

export const getSkillDisplayNames = () => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill/names`, {
    method: 'GET',
  })
    .then(res => res.json());
}