import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGetSkills } from '../../hooks/useGetSkills';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import { community as mockCommunity } from '../../utils/mockData';
import { Form, Input } from "formik-antd";
import { Formik, ErrorMessage } from "formik";
import Button from '../Button';
import Card from '../Card';
import TextArea from '../TextArea';
import TextField from '../TextField';
import { createGig } from '../../utils/utils';
import { getCommunityById, getCommunityGigsAddress } from '../../api/communities';

const CreateGigForm = ({ isSubmitting, onSubmit, isProject }) => {
  const { register,  errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [community, setCommunity] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [gigsAddress, setGigsAddress] = useState(null);
  // TODO: replace mock data with backend call
  // const { data: community } = useGetCommunity();
  // const community = mockCommunity;
  // const communityCategory = community && community.communityInfo.category;

  const [budgetRequired, setBudgetRequired] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [commitment, setCommitment] = useState(50);

  // TODO: replace mock data with backend call
  // const { data: skillTree, error } = useGetSkills(
  //   { category: communityCategory },
  //   { enabled: communityCategory },
  // );

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(s);    
  }, []);

  useEffect(() => {
    getCommunityAndGigs();
  }, [userInfo]);

  const getCommunityAndGigs = async () => {
    if (userInfo && !community) {
      setIsLoading(true);
      const comm = await getCommunityById(userInfo.currentCommunity.address);
      console.log('community: ', comm);
      setCommunity(comm);
      const gigsAddress = await getCommunityGigsAddress(comm.address);
      setIsLoading(false);
      setGigsAddress(gigsAddress);
    }
  }

  //called & calculated when a skill selection changes (or commitment changes). sent to final Submit contract call.
  useEffect(() => {
    const totalCredits = selectedSkills
      .map(s => s.credits)
      .reduce((acc, curr) => acc + curr, 0);
    const budget = (totalCredits * commitment) / 10;
    setBudgetRequired(budget);
  }, [commitment, selectedSkills]);

// called when a new skill selected
  const toggleSkill = skill => {
    setSelectedSkills(prev => {
      // remove skill from selectedSkills if user toggles skill "off"
      if (prev.find(s => s.name === skill.name)) {
        return prev.filter(s => s.name !== skill.name);
      }
      return [...prev, skill];
    });
  };

  const isFormValid = (errors) => {
    // setSubmitButtonClass(Object.keys(errors).length === 0 && !isLoading ? 'integrate-deploy' : 'integrate-deploy deploy-disabled')
    return errors === {};
}

  return (
    // <form
    //   
      // onSubmit={handleSubmit(data => {

      //     onSubmit({
      //       ...data,
      //       skills: selectedSkills.map(s => s.name),
      //       creditsOffered: parseInt(budgetRequired, 10),
      //     })
      // }
    // >
    <>
    <Formik
        initialValues={{
            title: '',
            description: '',
            commitment: 50
        }}

        validate={(values) => {
            const errors = {};

            if (!values.title) {
              errors.title = "Required"
            }
            if (!values.description) {
              errors.description = "Required"
            }

            return errors;
        }}

        onSubmit={async (values) => {
          setIsLoading(true);
          await createGig(values, userInfo, gigsAddress, budgetRequired);
          setIsLoading(false);
        }}>
          {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
          }) => (
    <Form 
      className="mt-8"
      onSubmit={handleSubmit}>
          {isLoading ? 
            <div id="item">
            <h2>Loading</h2>  
            <i id="loader"></i>
            </div> : <div></div>}

      <Card className="flex flex-col py-8 space-y-6">
        <div className="flex flex-col">
          <div className="flex justify-between space-x-8">
            <label className="text-xl font-bold" htmlFor="title">
              {isProject ? 'Project Title' : 'Gig Title'}
            </label>

            <p className="text-dove-gray">
              Hint: a short, clear title will catch contributors’ attention.
              Just be honest please.
            </p>
          </div>

          <TextField
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            color="burgundy"
            ref={register({ required: true })}
          />
          <ErrorMessage render={msg => <div className="text-red-600">{msg}</div>} name="title" />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between space-x-8">
            <label className="text-xl font-bold min-w-max" htmlFor="description">
              {isProject ? 'Project Description' : 'Gig Description'}
            </label>
            <p className="text-dove-gray max-w-4xl">
              {isProject
                ? 'Hint: whether you want to build a dApp, or launch a new Art event - your community can help to make it happen! Be clear in the description, and assign the right tasks!'
                : 'Hint: be as detailed as possible, and be nice - there are real people on the other side :)'
              }
            </p>
          </div>
          <TextArea
            id="description"
            name="description"
            value={values.description}
            onChange={handleChange}
            color="burgundy"
            ref={register({ required: true })}
          />
          {errors.description && (
            <span className="text-red-600">This field is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:space-x-60 lg:flex-row">
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold w-5/12">Commitment</h1>
              <h2 className="text-dove-gray w-7/12">
                {isProject
                  ? 'Hint: the effort to complete this Project. This value influences the Funds needed in your Community Treasury!'
                  : 'Hint: the effort needed for this task. This value influences the DiTo set as a reward for your gig!'
                }
              </h2>
            </div>
            {/* TODO: Fix color */}
            <input
              id="commitment"
              name="commitment"
              type="range"
              min="0"
              max="100"
              step="10"
              value={values.commitment}
              onChange={e => {
                handleChange(e);
                setCommitment(e.target.valueAsNumber);
              }}
            />
          </div>

          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex flex-start items-center">
              <h1 className="text-xl font-bold mr-4">{isProject ? 'Funds needed: ' : 'Budget needed: '}</h1>
              <div className="flex">
                <p  name="fundsNeeded" className="mr-1 font-bold" color="burgundy">{budgetRequired} </p>
                <h2 className="text-right">{isProject ? 'DAI/USDC' : 'DiTo'}</h2>
              </div>
            </div>
            <h2 className="text-dove-gray">
              {isProject
                ? 'Hint: the amount of funds needed for this project.'
                : 'Hint: the amount of DiTo you offer for this gig.'
              }
            </h2>
          </div>
        </div>

          <div className="flex flex-col space-y-4">
            <div className="flex">
              <h1 className="text-xl font-bold pr-8">Skills needed</h1>
              <h2 className="text-dove-gray">
                {
                  isProject ?
                    ['Hint: If the Project requires skills not available in the community, just Send a Signal to attract more talent.']
                    : ['Hint: If the gig requires many different skills, consider breaking it down in 2+ gigs, or starting a new project.']
                }

              </h2>
            </div>
            <Card outlined>
              {/* {error && <p>Couldn't fetch skills</p>} */}
              {userInfo && community
                ? community.skills.categories.map((category, i) => (
                  <div
                  key={i}>
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
        <Button filled type="submit" color="burgundy" // id="disabled"
         disabled={isFormValid(errors) || isLoading}>
          {isProject ? 'Propose your Project!' : 'Scan QR-Code to Publish your Gig!'}
        </Button>
        {/* TODO: Display error */}
      </Card>
      </Form>
                )}
      </Formik>
    {/* </form> */}
    </>
  );
};

export default CreateGigForm;
