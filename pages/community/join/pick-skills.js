import { useRouter } from 'next/router';
import { useState } from 'react';
import SkillPicker from '../../../components/SkillPicker';
import { getSkillDisplayNames } from '../../../api/skills'

function PickSkills() {
  const router = useRouter();
  const { categorySkill } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ username, skills, category, image }) => {
    setIsLoading(true);
    localStorage.setItem('username', username);
    const skillNames = await getSkillDisplayNames();
    console.log(skillNames);
    const formatedSkills = {
      skill1: {
        level: skills[0].level / 10,
        displayStringId: skillNames.indexOf(skills[0].skill),
        skillName: skills[0].skill
      }
    };
    if(skills.length <= 3) {
      formatedSkills.skill2 = {
        level: skills[1]?.level / 10,
        displayStringId: skillNames.indexOf(skills[1]?.skill),
        skillName: skills[1].skill
      } 
    }; 
    if(skills.length == 3) {
      formatedSkills.skill3 = {
        level: skills[2]?.level / 10,
        displayStringId: skillNames.indexOf(skills[2]?.skill),
        skillName: skills[2]?.skill
      }

      
    };

    localStorage.setItem('skills', JSON.stringify(formatedSkills));
    localStorage.setItem('imageUrl', image);

    setIsLoading(false);
    await router.push(
      `/community/join/choose-community?category=${encodeURIComponent(
        category,
      )}`,
    );
  };

  return (
    <>
    {isLoading ? 
    <div className="item">
    <h2>Loading</h2>  
    <i className="loader two"></i>
    </div> : <div></div>}
    
    <SkillPicker
      isSubmitting={false}
      categorySkill={categorySkill}
      onSubmit={onSubmit}
    />
    </>
  );
}

export default PickSkills;
