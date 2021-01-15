import { useState, useEffect } from 'react';
import produce from 'immer';

import SkillsCard from './SkillsCard';

import Button from './Button';
import { getSkillTreeByCategory, getSkillTreeBySkill } from '../api';
import TextField from './TextField';
import Card from './Card';
import Logo from './Logo';

export default function SkillPicker({
  isSubmitting,
  categorySkill,
  communityCategory,
  onSubmit,
}) {
  const [skillTree, setSkillTree] = useState([]);
  const [username, setUsername] = useState('');
  // TODO: Refactor
  // This is used to pass the category to the next page so we can get the correct list to choose from.
  const [category, setCategory] = useState('');
  const isDisabled = !username || getSelectedSkills().length === 0;

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
      setCategory(skillTreeResponse.main);
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
      .flatMap(
        c =>
          c.skills.map(s => ({
            ...s,
            redeemableDitos: c.credits,
          })) || [],
      )
      .filter(skill => skill.selected)
      .map(skill => ({ ...skill, level: skill.level || 0 }));

    return skills;
  }

  function getTotalSelected() {
    return getSelectedSkills().length;
  }

  const handleSubmit = async () => {
    onSubmit({ username, skills: getSelectedSkills(), category });
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-screen">
      <div className="flex flex-col flex-1 md:flex-row">
        <div
          className="flex flex-col items-center justify-center w-1/2 w-full p-8 space-y-8 bg-center bg-cover"
          style={{
            backdropFilter: 'blur(5px)',
            backgroundImage: 'url(/background-image.svg)',
          }}
        >
          <div className="grid md:absolute md:top-0 md:left-0">
            <Logo className={[{ 'p-8': false }, 'md:p-8 p-0']} />
          </div>
          <Card className="flex flex-col items-center ">
            <div className="mb-8 text-3xl font-bold text-center text-gray-900">
              Welcome to Distributed Town!
            </div>
            <p className="mb-6 text-base text-xl leading-8 text-center">
              This is the first step to join a global community of local people
              or the other way around :)
            </p>
            <label className="flex flex-col">
              <strong>User Nickname </strong>
              <TextField
                id="nickname"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
            </label>
          </Card>
        </div>
        <div className="flex flex-col justify-center flex-grow w-full h-full p-8 space-y-1 space-y-2 overflow-auto text-center align-center">
          <h1 className="text-xl font-bold">Tell us about you!</h1>
          <p>
            Pick your Skills (<span>between 1 and 3</span>)
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
          <Card
            filled
            className="flex flex-row items-center justify-between h-24"
          >
            <p className="flex items-center justify-center w-1/2">
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
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-4 bg-white">
        <Button
          filled
          loading={isSubmitting}
          disabled={isDisabled}
          onClick={handleSubmit}
        >
          Pick skills
        </Button>
      </div>
    </div>
  );
}
