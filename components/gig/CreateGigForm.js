import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';

const CreateGigForm = ({ onSubmit, skill, isProject = false }) => {
  const { register, handleSubmit, errors } = useForm();

  const [budgetRequired, setBudgetRequired] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [commitment, setCommitment] = useState(50);

  const { data, error } = useQuery('skillTree', () =>
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/skill?skill=${encodeURIComponent(
        skill,
      )}`,
    ).then(res => res.json()),
  );

  const skillsList = useMemo(
    () =>
      ((data && data.categories) || []).flatMap(category => {
        return category.skills.map(skillName => ({
          name: skillName,
          credits: category.credits,
        }));
      }),
    [data],
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

  return (
    <form
      className="flex flex-col pl-4 border-l-2 border-denim mt-6 mb-24"
      onSubmit={handleSubmit(data =>
        onSubmit({
          ...data,
          skills: selectedSkills.map(s => s.name),
          creditsOffered: parseInt(budgetRequired, 10),
        }),
      )}
    >
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label className="font-bold  text-xl underline" htmlFor="title">
            Title
          </label>
          <p className="text-dove-gray">
            Hint: a short, clear title will catch contributors’ attention. Just
            be honest please.
          </p>
        </div>
        <input
          className="border border-dove-gray py-3 mb-5 px-2 "
          id="title"
          name="title"
          ref={register({ required: true })}
        />
        {errors.title && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <label className="font-bold text-xl underline" htmlFor="description">
            Description
          </label>
          <p className="text-dove-gray">
            Hint: be as detailed as possible, and be nice - there are real
            people on the other side ;)
          </p>
        </div>
        <textarea
          style={{ border: '1px solid #707070' }}
          className="border border-dove-gray py-6 px-2"
          id="description"
          name="description"
          ref={register({ required: true })}
        />
        {errors.description && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div className="flex">
        <div className="p-2">
          <div className="px-10 py-12">
            <h1 className="font-bold text-xl underline">Skills needed</h1>
            <h2 className="text-dove-gray">
              Hint: If the gig requires many different skills, consider
              <br />
              breaking it down in 2+ gigs, or starting a new project.
            </h2>
            <div className="h-full mt-5 px-4 overflow-scroll h-20 border-2 border-blue-600">
              {error && <p>Couldn't fetch skills</p>}
              {skillsList ? (
                skillsList.map(s => {
                  return (
                    <label key={s.name} className="flex items-center">
                      <input
                        type="checkbox"
                        onChange={() => {
                          toggleSkill(s);
                        }}
                      />
                      <div className="flex flex-col font-bold pl-2">
                        <p>{s.name}</p>
                      </div>
                    </label>
                  );
                })
              ) : (
                <p>loading</p>
              )}
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="px-10 py-12">
            <h1 className="font-bold  text-xl underline">Commitment</h1>
            <h2 className="text-dove-gray">
              Hint: the effort needed for this task. This value
              <br />
              influences the DiTo reward.
            </h2>
            <input
              id="commitment"
              name="commitment"
              style={{ width: '250px' }}
              className="bg-white h-32 py-3 w-32"
              type="range"
              value={commitment}
              onChange={e => {
                setCommitment(e.target.value);
              }}
            />
          </div>
        </div>

        <div className=" sm:w-1/2 lg:w-1/3 p-2">
          <div className="flex flex-col flex-1 px-10 py-12">
            <h1 className="font-bold text-xl underline">Budget needed</h1>
            <h2 className="text-dove-gray">
              Hint: the amount of DiTo you offer.
            </h2>
            <p className="border-black border-2 p-4 text-xl mt-2">
              {budgetRequired}
            </p>
            <h2 className="text-right">DiTo</h2>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="py-3 text-lg underline bg-alizarin text-white w-full"
      >
        Publish
      </button>
      {/* TODO: Display error */}
    </form>
  );
};

export default CreateGigForm;
