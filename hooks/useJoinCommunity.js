import { useMutation } from 'react-query';
import { pushJSONDocument } from '../utils/textile.hub';
import { joinCommunity as joinCommunityContract } from '../contracts/community';

const skillNames = [
  //Local
  'Fun & Entertainment', 'Administration & Management', 'Community Life', 'Leadership & Public Speaking',
  'Legal', 'Accounting', 'Art, Music & Creativity', 'Teaching',
  'Company', 'Householding', 'Gardening', 'Cooking',

  //Art
  'Performance & Theather', 'Project Management', 'Production', 'Gaming',
  'Music', 'Painting', 'Photography', 'Video-making',
  'Training & Sport', 'Hiking', 'Biking', 'Writing',

  // Tech
  'Network Design', 'Tokenomics', 'Game Theory', 'Governance & Consensus',
  'Backend', 'Frontend', 'Web Dev', 'Mobile Dev',
  'DeFi', 'Blockchain infrastructure', 'Architecture', 'Smart Contracts'
];

export const useJoinCommunity = () => {

  async function joinCommunity(community) {

    const skills = localStorage.getItem('skills');
    const image = localStorage.getItem('imageUrl');
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

      ]
    };
    if (skillsJson.skill3)
      skillsFormated.skills.push({
        name: skillsJson.skill3.skillName,
        value: skillsJson.skill3.level
      })
    const metadataJson = {
      name: `${username}'s SkillWallet`,
      description: "Universal, self-sovereign IDs tied to skills & contributions rather than personal data.",
      image: image,
      properties: {
        username,
        skills: skillsFormated.skills
      }
    }
    const url = await pushJSONDocument(metadataJson)
    console.log(url);

    const totalDitos = '2222';

    console.log('skillsFormated', skillsFormated);
    const tokenId = await joinCommunityContract(
      community.address,
      url,
      totalDitos,
    );
    localStorage.setItem('credits', totalDitos);
    localStorage.setItem('tokenId', tokenId);
    return tokenId;
  }

  return useMutation(joinCommunity, { throwOnError: true });
};
