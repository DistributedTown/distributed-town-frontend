import { useState } from 'react';
import Link from 'next/link';
import RegistrationModal from '../../../components/RegistrationModal';
import { useRouter } from 'next/router';
import Logo from '../../../components/Logo';
import Button from '../../../components/Button';
import Blob from '../../../components/Blob';
import LogoWithBlob from '../../../components/LogoWithBlob';

const Join = ({ skills = [] }) => {

  const [chosenSkill, setChosenSkill] = useState('');
  const showRegistrationModal = !!chosenSkill;

  const router = useRouter();

  return (
    <div className="w-full h-full">
      <LogoWithBlob />
      <div>
        <Logo className="p-8 mx-auto sm:ml-0" />
        <div className="flex flex-col items-center w-full h-full px-4 space-y-8">
          <div className="border-2 border-denim rounded-xl text-2xl bg-white w-10/12 lg:w-8/12 text-center pt-2 pb-2"> 
            Have you ever thought, 
            <br />
            'I would like to contribute, but …' 
          </div>
          <p className="text-center text-gray-500">
            Distributed Town (DiTo) lets you <strong>create</strong> or{' '}
            <strong>join</strong> a community with one click.
            <br />
            No <strong>name</strong>, <strong>location</strong> or{' '}
            <strong>bank account</strong> necessary.
          </p>
          <div className="flex flex-wrap justify-center py-8 w-10/12 lg:w-8/12 text-center">
            {skills.map(skill => (
              <Button
                key={skill}
                onClick={async () => {
                  setChosenSkill(skill);
                  await router.push(
                    `/community/join/pick-skills?categorySkill=${skill}`,
                  );
                }}
                className="m-2 rounded-full"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </div>
                
      {/* <RegistrationModal
        show={showRegistrationModal}
        loading={isLoading}
        chosenSkill={chosenSkill}
        handleCreateAccountClick={handleCreateAccountClick}
        onChooseDifferentCommunity={() => setChosenSkill('')}
      /> */}
    </div>
  );
};

export async function getServerSideProps() {
  // TODO: replace mock data with backend call
  // let skills = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, {
  //   method: 'GET',
  // });
  // skills = await skills.json();
  let skills = [
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
]
  return {
    props: { skills }, // will be passed to the page component as props
  };
}

export default Join;
