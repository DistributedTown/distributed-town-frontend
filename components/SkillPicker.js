import { useState, useEffect } from 'react';
import produce from 'immer';
import Layout from './Layout';

import SkillsCard from './SkillsCard';

import Button from './Button';
import NicknameSelection from './NicknameSelection';
import { getSkillTreeByCategory, getSkillTreeBySkill } from '../api';

export default function SkillPicker({
  categorySkill,
  communityCategory,
  onSubmit,
}) {
  const [skillTree, setSkillTree] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getSkillTree = async () => {
      let skillTreeResponse;
      if (categorySkill) {
        skillTreeResponse = await getSkillTreeBySkill(categorySkill);
      } else if (communityCategory) {
        skillTreeResponse = await getSkillTreeByCategory(communityCategory);
      } else {
        throw new Error('should provide skill or community category');
      }

      // Transform skill string to skill object with skill name field
      skillTreeResponse.categories.forEach(c => {
        // eslint-disable-next-line no-param-reassign
        c.skills = c.skills.map(skill => ({ skill }));
      });
      setSkillTree(skillTreeResponse.categories);
    };

    getSkillTree();
  }, []);

  function toggleSelectedSkill(categoryIndex, selectedSkillIndex) {
    const newSkillTree = produce(skillTree, draft => {
      const skill = draft
        .find((_, cIndex) => cIndex === categoryIndex)
        .skills.find((_, sIndex) => sIndex === selectedSkillIndex);

      skill.selected = !skill.selected;
    });

    setSkillTree(newSkillTree);
  }

  function setSkillLevel(categoryIndex, skillIndex, level) {
    const newSkillTree = produce(skillTree, draft => {
      const skill = draft
        .find((_, cIndex) => cIndex === categoryIndex)
        .skills.find((_, sIndex) => sIndex === skillIndex);

      skill.level = level;
    });

    setSkillTree(newSkillTree);
  }

  function getSelectedSkills() {
    const skills = skillTree
      .flatMap(category => category.skills || [])
      .filter(skill => skill.selected)
      .map(skill => ({ ...skill, level: skill.level || 0 }));

    return skills;
  }

  function getTotalSelected() {
    return getSelectedSkills().length;
  }

  const handleSubmit = async () => {
    onSubmit({ username, skills: getSelectedSkills() });
  };

  return (
    <Layout
      navBar={{ hideNav: true }}
      flex
      splash={{
        color: 'blue',
        variant: 'default',
        alignment: 'left',
      }}
      logo
      bgImage={{ src: '/background-image.svg', alignment: 'left', size: 40 }}
    >
      <div className="flex flex-wrap justify-between h-full w-full relative">
        <div
          className="flex w-1/2 justify-center items-center space-y-8 p-8 flex-grow-0 h-full"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <NicknameSelection
            value={username}
            onChange={e => setUsername(e.target.value)}
            title="Welcome to Distributed Town!"
            subtitle="This is the first step to join a global community of local people or the other way around :)"
            placeholderText="Please choose a nickname"
          />
        </div>
        <div className="flex flex-col justify-center align-center text-center space-y-1 p-8 flex-grow w-1/2 overflow-auto h-full py-24">
          <h1 className="font-bold text-xl">Tell us about you!</h1>
          <p>
            Pick your Skills (<span className="underline">between 1 and 3</span>
            )
          </p>
          <p>Select what you’re the best at, and receive Credits for it.</p>
          {skillTree.map((category, i) => {
            return (
              <SkillsCard
                key={i}
                title={category.subCat}
                skills={category.skills}
                totalSelected={getTotalSelected()}
                selectSkill={skillSelectedIndex =>
                  toggleSelectedSkill(i, skillSelectedIndex)
                }
                setSkillLevel={(skillIndex, skillLevel) =>
                  setSkillLevel(i, skillIndex, skillLevel)
                }
              />
            );
          })}
          <div className="bg-denim flex flex-row  items-center justify-between p-4 text-white">
            <p className=" flex md:h-16 lg:h-24 xl:h-28 w-1/2 items-center justify-center">
              Your selection
            </p>
            <div className="w-1/2">
              {getSelectedSkills().map((skill, i) => {
                return (
                  <div className="flex justify-between text-xs" key={i}>
                    <p>{skill.skill}</p>
                    <p>{`${skill.level}%`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-0 p-4 bg-white">
          <Button className="font-black" onClick={handleSubmit}>
            Pick skills
          </Button>
        </div>
      </div>
    </Layout>
  );
}
