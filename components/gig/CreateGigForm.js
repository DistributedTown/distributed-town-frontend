import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Input } from "formik-antd";
import { Formik, ErrorMessage } from "formik";
import Button from '../Button';
import Card from '../Card';
import TextArea from '../TextArea';
import TextField from '../TextField';
import { createGig } from '../../contracts/gigs'
import { getCommunityById } from '../../api/communities';
import { getCommunityGigsAddress } from '../../contracts/community'

const CreateGigForm = ({ isSubmitting, onSubmit, isProject }) => {
  const { register,  errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [community, setCommunity] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [gigsAddress, setGigsAddress] = useState(null);
  const [budgetRequired, setBudgetRequired] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [commitment, setCommitment] = useState(50);

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

  useEffect(() => {
    const totalCredits = selectedSkills
      .map(s => s.credits)
      .reduce((acc, curr) => acc + curr, 0);
    const budget = (totalCredits * commitment) / 10;
    setBudgetRequired(budget);
  }, [commitment, selectedSkills]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => {
      if (prev.find(s => s.name === skill.name)) {
        return prev.filter(s => s.name !== skill.name);
      }
      return [...prev, skill];
    });
    isOneCategorySelected();
  };

  const isOneCategorySelected = () => {
    const categories = community.skills.categories.map((c) => {
      return c.skills;
    })
    let catCount = 0;

    categories.forEach(category => {
      let increment = 0;
      selectedSkills.forEach(skill => {
        if (category.includes(skill.name)) {
          increment = 1;
          return;
        }
      })
      catCount += increment;
    })

    if (selectedSkills.length >  4) {
      return false;
    } else if (catCount > 1) {
      return false;
    } else {
      return true;
    }
  }

  const isFormValid = (errors) => {
    // setSubmitButtonClass(Object.keys(errors).length === 0 && !isLoading ? 'integrate-deploy' : 'integrate-deploy deploy-disabled')
    return errors === {};
}

  return (
    <>
    <Formik
        initialValues={{
            title: '',
            description: '',
            commitment: 50,
            categories: ''
        }}

        validate={(values) => {
            const errors = {};

            if (!values.title) {
              errors.title = "Required"
            }
            if (!values.description) {
              errors.description = "Required"
            }
            if (!isOneCategorySelected()) {
              errors.categories = "Must select skills from just one category"
            }
            if (selectedSkills.length === 0) {
              errors.categories = "Please select one or more skills"
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
                { isProject ?
                    ['Hint: If the Project requires skills not available in the community, just Send a Signal to attract more talent.']
                    : ['Hint: If the gig requires many different skills, consider breaking it down in 2+ gigs, or starting a new project.']
                }
              </h2>
            </div>
            {errors.categories && (
            <span className="text-red-600">{errors.categories}</span>
          )}
              <Card outlined id="categories" name="categories">
                {/* {error && <p>Couldn't fetch skills</p>} */}
                <div className="flex justify-between pr-16 pl-16">
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
                  </div>
              </Card>
          </div>
        <Button filled type="submit" color="burgundy"
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
