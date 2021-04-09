import { useMutation } from 'react-query';
import { join } from '../api/communities';
import { pushJSONDocument } from '../utils/textile.hub';

export const useJoinCommunity = () => {

  async function joinCommunity(community) {

    const skills = localStorage.getItem('skills');
    const skillsJson = JSON.parse(skills);
    console.log(skillsJson)
    console.log(community.address)
    const username = localStorage.getItem('username');
    const skillsFormated = {
      skills: [
        {
          name: skillsJson.skill1.skillName,
          value: skillsJson.skill1.level
        },
        {
          name: skillsJson.skill2.skillName,
          value: skillsJson.skill2.level
        },
        {
          name: skillsJson.skill3.skillName,
          value: skillsJson.skill3.level
        }
      ]
    };
    const metadataJson = {
      name: `${username}'s SkillWallet`,
      description: "Universal, self-sovereign IDs tied to skills & contributions rather than personal data.",
      image: 'https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-avatar-icon-png-image_4017288.jpg',
      properties: {
        username,
        skills: skillsFormated.skills
      }
    }
    const url = await pushJSONDocument(metadataJson)
    console.log(url);

    const credits = await join({
      communityAddress: community.address,
      userAddress: '0xE5dFc64faD45122545B0A5B88726ff7858509600',
      url: url,
      skills: skillsFormated
    });

    localStorage.setItem('credits', credits.toString());
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
