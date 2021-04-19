import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSkills } from '../../hooks/useGetSkills';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import {community as mockCommunity } from '../../utils/mockData';
import Button from '../Button';
import Card from '../Card';
import TextField from '../TextField';

const CreateGigForm = ({ isSubmitting, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  // TODO: replace mock data with backend call
  // const { data: community } = useGetCommunity();
  const community = mockCommunity;
  const communityCategory = community && community.communityInfo.category;

  const [budgetRequired, setBudgetRequired] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [commitment, setCommitment] = useState(50);

  // TODO: replace mock data with backend call
  const { data: skillTree, error } = useGetSkills(
    { category: communityCategory },
    { enabled: communityCategory },
  );

  useEffect(() => {
    const totalCredits = selectedSkills
      .map(s => s.credits)
      .reduce((acc, curr) => acc + curr, 0);
    const budget = (totalCredits * commitment) / 10;
    setBudgetRequired(budget);
  }, [commitment, selectedSkills]);

  const toggleSkill = skill => {
    setSelectedSkills(prev => {
      if (prev.find(s => s.name === skill.name)) {
        return prev.filter(s => s.name !== skill.name);
      }
      return [...prev, skill];
    });
  };

  // TODO: Refactor color passing
  return (
    <form
      className="mt-8"
      onSubmit={handleSubmit(data =>
        onSubmit({
          ...data,
          skills: selectedSkills.map(s => s.name),
          creditsOffered: parseInt(budgetRequired, 10),
        }),
      )}
    >
      <Card className="flex flex-col py-8 space-y-6">
        <div className="flex flex-col">
          <div className="flex justify-between space-x-8">
            <label className="text-xl font-bold" htmlFor="title">
              Project Title
            </label>
            <p className="text-dove-gray">
              Hint: a short, clear title will catch contributors’ attention.
              Just be honest please.
            </p>
          </div>
          <TextField
            id="title"
            name="title"
            ref={register({ required: true })}
          />
          {errors.title && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between space-x-8">
            <label className="text-xl font-bold min-w-max" htmlFor="description">
              Project Description
            </label>
            <p className="text-dove-gray max-w-4xl">
              Hint: whether you want to build a dApp, or launch a new Art event - your community can help to 
              make it happen! Be clear in the description, and assign the right tasks!
            </p>
          </div>
          <TextField
            id="description"
            name="description"
            ref={register({ required: true })}
          />
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-4 lg:flex-row">
          <div className="flex flex-col space-y-4">
            <h1 className="text-xl font-bold">Skills needed</h1>
            <h2 className="text-dove-gray">
              Hint: If the gig requires many different skills, consider
              <br />
              breaking it down in 2+ gigs, or starting a new project.
            </h2>
            <Card outlined>
              {error && <p>Couldn't fetch skills</p>}
              {skillTree
                ? skillTree.categories.map(category => (
                    <div>
                      <div className="font-bold">{category.subCat}</div>
                      <div className="pl-6">
                        {category.skills.map(skill => (
                          <label key={skill} className="flex items-center">
                            <input
                              type="checkbox"
                              step="1"
                              onChange={() => {
                                toggleSkill({
                                  name: skill,
                                  credits: category.credits,
                                });
                              }}
                            />
                            <div className="flex flex-col pl-2">
                              <p>{skill}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                : 'Loading skills'}
            </Card>
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <h1 className="text-xl font-bold">Commitment</h1>
            <h2 className="text-dove-gray">
              Hint: the effort to complete this Project. This value influences the Funds needed 
              in your Community Treasury!
            </h2>
            {/* TODO: Fix color */}
            <input
              id="commitment"
              name="commitment"
              type="range"
              step="10"
              value={commitment}
              onChange={e => setCommitment(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 space-y-4">
            <h1 className="text-xl font-bold">Funds needed</h1>
            <h2 className="text-dove-gray">
              Hint: the amount of funds needed for this project.
            </h2>
            <div className="flex flex-col">
              <TextField value={budgetRequired} name="fundsNeeded"/>
              <h2 className="text-right">DiTo</h2>
            </div>
          </div>
        </div>
        <Button filled type="submit" loading={isSubmitting}>
          Publish
        </Button>
        {/* TODO: Display error */}
      </Card>
    </form>
  );
};

export default CreateGigForm;
