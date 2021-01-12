import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSkills } from '../../hooks/useGetSkills';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import Button from '../Button';
import Card from '../Card';
import TextField from '../TextField';

const CreateGigForm = ({ isSubmitting, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm();
  const { data: community } = useGetCommunity();
  const communityCategory = community && community.communityInfo.category;

  const [budgetRequired, setBudgetRequired] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [commitment, setCommitment] = useState(50);

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
              Title
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
            <label className="text-xl font-bold" htmlFor="description">
              Description
            </label>
            <p className="text-dove-gray">
              Hint: be as detailed as possible, and be nice - there are real
              people on the other side ;)
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
        <div className="flex flex-col flex-wrap gap-10 md:flex-row">
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
              Hint: the effort needed for this task. This value
              <br />
              influences the DiTo reward.
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
            <h1 className="text-xl font-bold">Budget needed</h1>
            <h2 className="text-dove-gray">
              Hint: the amount of DiTo you offer.
            </h2>
            <div className="flex flex-col">
              <TextField value={budgetRequired} />
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
