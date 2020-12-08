import { useState } from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import NicknameSelection from '../../../components/NicknameSelection';
import Button from '../../../components/Button';

const communityCategories = [
  {
    name: 'DLT & Blockchain',
    color: 'denim',
    subtitle: 'Ideal for small, functional Web3 teams aiming to',
    description: [
      'keep accounting & run proposals',
      'fair, milestone-based rewards & payments to members',
      'efficiently distribute tasks',
      'get initial fundings for their project',
      'coordinate for hackathons & sprints',
    ],
  },
  {
    name: 'Art & Lifestyle',
    color: 'rain-forest',
    subtitle: 'For artists & creative minds who want to:',
    description: [
      'keep accounting & run proposals',
      'manage multi-disciplinary projects & distribute tasks',
      'distribute shares & royalties fairly',
      'maintain continuous funding flow',
      'update scores & rank while gaming',
    ],
  },
  {
    name: 'Local Community',
    color: 'alizarin',
    subtitle: 'For neighbors, condos & small local clubs who need to',
    description: [
      'hold a common treasury',
      'vote for local proposals based on reputation & commitment',
      'share & track common resources',
      'organize & fund local projects',
      'divide tasks for mutual support',
    ],
  },
];

function CommunityCreate() {
  const [communityName, setCommunityName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
  const router = useRouter();

  const handleCreateCommunity = async () => {
    await router.push(
      `/community/create/created?name=${encodeURIComponent(
        communityName,
      )}&category=${encodeURIComponent(selectedCategory.name)}`,
    );
  };

  return (
    <Layout
      navBar={{ hideNav: true }}
      flex
      splash={{
        color: 'green',
        variant: 'default',
        alignment: 'left',
      }}
      logo
      bgImage={{ src: '/background-image.svg', alignment: 'left', size: 40 }}
    >
      <div className="flex flex-wrap justify-between h-full w-full">
        <div
          className="flex w-1/2 justify-center items-center space-y-8 p-8 flex-grow-0 h-full overflow-auto"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <NicknameSelection
            onChange={e => setCommunityName(e.target.value)}
            value={communityName}
            title="Welcome to Distributed Town!"
            subtitle={
              <span>
                This is your first Community. Pick up a simple, intuitive{' '}
                <strong>name</strong> (i.e.: your-project-name, or
                yourcommunity-city) and a good <strong>avatar</strong> to make
                it cozier!
              </span>
            }
            placeholderText="Please choose a community name"
            inputLabel="Community Name"
          />
        </div>
        <div className="flex flex-col text-center py-24 px-8 pb-32 flex-grow w-1/2 overflow-auto h-full">
          <h1 className="font-bold text-3xl">Choose the perfect Community</h1>
          <p className="text-xl px-16 mt-2 mb-8">
            Read the short description and pick the best type of community for
            you and your needs!
          </p>
          <div className="flex flex-wrap justify-center">
            {communityCategories.map(category => {
              const { name, color, subtitle, description } = category;

              return (
                <div
                  className="rounded-xl border-4 border-black w-2/5 m-4"
                  onClick={() => setSelectedCategory(category)}
                  key={name}
                >
                  <div
                    className={`bg-${color} text-white text-3xl font-bold border-b-4 rounded-md p-2 border-black leading-7`}
                  >
                    {name}
                  </div>
                  <div
                    className={`m-2 border-${color} border rounded-md p-1 leading-4 text-left ${
                      (selectedCategory && selectedCategory.name) ===
                      category.name
                        ? `bg-${color} text-white`
                        : ''
                    }`}
                  >
                    <p className="text-sm text-center mb-2">{subtitle}</p>
                    <ol className="list-decimal list-inside my-2 text-xs">
                      {description.map((desc, index) => {
                        return <li key={index}>{desc}</li>;
                      })}
                    </ol>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center items-center w-full absolute bottom-0 p-4 bg-white border-black border-t">
          <Button
            className="font-black font-bold text-2xl px-32"
            color="rain-forest"
            onClick={handleCreateCommunity}
          >
            Next: Launch & Get Community Credits!
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default CommunityCreate;
