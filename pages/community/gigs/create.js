import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { useRouter } from 'next/router';
import CreateGigForm from '../../../components/gig/CreateGigForm';
import {
  MagicContext,
  LoggedInContext,
  TokenContext,
  UserInfoContext,
} from '../../../components/Store';
import Layout from '../../../components/Layout';

function CreateGig() {
  const [creationState, setCreationState] = useState();
  const [token] = useContext(TokenContext);
  const [userInfo] = useContext(UserInfoContext);
  const { register, handleSubmit, errors, getValues } = useForm();
  const [communityCategory, setCommunityCategory] = useState();
  const router = useRouter();

  async function postNewGig(
    gigTitle,
    gigDescription,
    gigSkills,
    creditsOffered,
  ) {
    try {
      const payload = {
        title: gigTitle,
        description: gigDescription,
        skills: gigSkills,
        creditsOffered: parseInt(creditsOffered),
        isProject: false,
      };
      setCreationState(1);

      console.log('create gigs payload', JSON.stringify(payload));

      console.log('create gigs token', token);
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
        method: 'POST',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(payload),
      });

      result.json().then(data => {
        console.log(data);
        if (data.message === 'The community is not yet active.') {
          setCreationState(2);
        } else {
          router.push('/community/gigs');
        }
      });
    } catch (err) {
      console.error(err);
      setCreationState(3);
    }
  }

  const onSubmit = data => {
    const { gigTitle } = data;
    const { gigDescription } = data;
    const { creditsOffered } = data;
    delete data.gigTitle;
    delete data.gigDescription;
    delete data.creditsOffered;
    delete data.commitment;

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {});

    const skills = Object.filter(
      data,
      data => data[0] === 'on' || data === true,
    );

    postNewGig(gigTitle, gigDescription, Object.keys(skills), creditsOffered);
  };

  const getCommunityCategory = async () => {
    const getCommRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/community/${userInfo.communityID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const communityInfo = await getCommRes.json();
    setCommunityCategory(communityInfo.category);
  };

  useEffect(() => {
    (async () => {
      await getCommunityCategory();
    })();
  }, []);

  return (
    <Layout
      navBar
      flex
      logo
      splash={{
        color: 'red',
        variant: 'default',
        alignment: 'left',
        isTranslucent: false,
        fullHeight: false,
      }}
    >
      <div className="w-full p-8 h-full overflow-scroll bg-white">
        <h1 className="underline text-black text-4xl">Create New Gig</h1>
        <CreateGigForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
          communityCategory={communityCategory}
          skill={userInfo.skills[0].skill}
          getValues={getValues}
          creationState={creationState}
        />
      </div>
      <div className="w-11/12 fixed flex bottom-0 justify-center mt-3 border-t-2 border-gray-600 bg-white z-10">
        <Link href="/community">
          <a className="px-64 py-2 my-2 font-bold text-xl border-2 border-denim">
            Back to Dashboard
          </a>
        </Link>
      </div>
    </Layout>
  );
}

export default CreateGig;
