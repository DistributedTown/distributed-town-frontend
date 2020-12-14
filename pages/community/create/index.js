import { useState } from 'react';
import { useRouter } from 'next/router';

import Button from '../../../components/Button';
import TextField from '../../../components/TextField';
import Card from '../../../components/Card';

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
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center">
        <div
          className="p-8 bg-cover bg-center w-full h-full grid content-center md:w-1/2"
          style={{ backgroundImage: 'url(/background-image.svg)' }}
        >
          <Card className="flex flex-col items-center w-3/4 mx-auto">
            <div className="text-gray-900 font-bold text-3xl mb-8 text-center">
              Welcome to Distributed Town!
            </div>
            <p className="text-lg mb-6">
              <span>
                This is your first Community. Pick up a simple, intuitive{' '}
                <strong>name</strong> (i.e.: your-project-name, or
                yourcommunity-city) and a good <strong>avatar</strong> to make
                it cozier!
              </span>
            </p>
            <TextField
              id="communityName"
              type="text"
              value={communityName}
              placeholder="Community name"
              onChange={e => setCommunityName(e.target.value)}
              required
            />
          </Card>
        </div>
        <div className="p-8 text-center md:w-1/2">
          <h1 className="font-bold text-3xl mb-8">Select community type</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {communityCategories.map(category => {
              const { name, color, subtitle, description } = category;

              return (
                <Card
                  className="w-5/12 overflow-hidden flex flex-col gap-4"
                  key={name}
                  color={color}
                >
                  <h1 className={`text-${color} font-black text-xl`}>{name}</h1>
                  <div className="bg-white h-full">
                    <div className="text-left">
                      <p className="text-sm text-center mb-2">{subtitle}</p>
                      <ul className="list-disc text-xs">
                        {description.map((desc, index) => {
                          return <li key={index}>{desc}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                  {selectedCategory && selectedCategory.name === name ? (
                    <Button disabled color={color} filled>
                      Selected
                    </Button>
                  ) : (
                    <Button
                      color={color}
                      onClick={() => setSelectedCategory(category)}
                    >
                      Select
                    </Button>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full bottom-0 p-4 bg-white">
        <Button
          filled
          className="font-black text-2xl px-32"
          onClick={handleCreateCommunity}
        >
          Create Community
        </Button>
      </div>
    </div>
  );
}

export default CommunityCreate;
