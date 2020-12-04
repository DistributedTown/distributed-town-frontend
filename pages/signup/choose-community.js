import { useContext, useEffect, useState } from 'react';
import produce from 'immer';
import { useJoinCommunity } from '../../hooks/useJoinCommunity';
import { UserInfoContext } from '../../components/Store';

import CommunityCard from '../../components/CommunityCard';

function SignupPhaseTwo() {
  const [userInfo] = useContext(UserInfoContext);
  const [isJoining] = useState(false);

  const [communities, setCommunities] = useState([]);
  const [joinCommunity] = useJoinCommunity();

  useEffect(() => {
    (async () => {
      try {
        const communitiesToAdd = new Map();
        for await (const { skill } of userInfo.skills) {
          let communityList = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/community?skill=${skill}`,
            {
              method: 'GET',
            },
          );
          communityList = await communityList.json();

          communityList.map(community => {
            return { ...community, selected: false };
          });

          console.log(communityList);

          communityList.forEach(community => {
            if (!communitiesToAdd.has(community._id)) {
              communitiesToAdd.set(community._id, community);
            }
          });
          console.log(communitiesToAdd);
        }

        setCommunities(Array.from(communitiesToAdd.values()));
      } catch (err) {
        console.error(err.message);
      }
    })();
  }, []);

  function selectCommunity(commIndex) {
    setCommunities(prevCommunities =>
      produce(prevCommunities, draft => {
        // eslint-disable-next-line no-param-reassign
        draft[commIndex].selected = true;
      }),
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col space-y-8 container mx-auto bg-blue-100 p-8 h-screen overflow-y-auto">
          <h1>Here's a few communities for you!</h1>
          {communities.map((community, i) => (
            <CommunityCard
              key={i}
              {...community}
              selectCommunity={() => selectCommunity(i)}
            />
          ))}
        </div>
        <div className="flex flex-col justify-between space-y-8 w-full flex-grow p-8 h-screen">
          <h1>The credit you will earn with your skills</h1>
          <p>
            Your skills are your main asset. And the only thing that matters.
            The more rare they are, the more credits you’ll get!
          </p>
          <div className="w-full border-2 border-gray-400 p-2 text-center">
            <button type="button" onClick={joinCommunity}>
              {isJoining
                ? 'Joining the community, please wait'
                : 'Join and get your credits!'}
            </button>
          </div>
          {isJoining && (
            <div className="fixed inset-0 h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center">
              <div className="w-48 h-48 bg-white rounded flex justify-center items-center">
                Joining community...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupPhaseTwo;
