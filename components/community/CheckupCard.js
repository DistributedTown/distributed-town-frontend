import { useState, useEffect } from 'react';
import { getCommunityById } from '../../api';
import { useMagic } from '../Store';

export default function CheckupCard({
  numOfMembers,
  liquidityPoolBalance,
  communityId,
}) {
  const magic = useMagic();
  const [community, setCommunity] = useState({});

  useEffect(() => {
    (async () => {
      const didToken = await magic.user.getIdToken();
      const communityResponse = getCommunityById(didToken, communityId);
      setCommunity(communityResponse);
    })();
  }, []);
  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full md:w-2/5 justify-center items-center py-8"
    >
      <div className="flex flex-col border-2 border-blue-600 w-7/12">
        <div className="bg-blue-600 p-4">
          <h2>{community.name}</h2>
          <p>Check-up Card</p>
        </div>
        <div className="flex flex-col justify-center bg-white p-4 space-y-4">
          <div className="flex flex-row justify-between">
            <p>Members</p>
            <p>{numOfMembers === -1 ? 'Loading members...' : numOfMembers}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Open Proposals</p>
            <p>0</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Liquidity Pool</p>
            <p>
              {liquidityPoolBalance === -1
                ? 'Loading liquidity pool balance...'
                : liquidityPoolBalance}
            </p>
          </div>
          <div className="flex flex-col border-2 border-blue-600 p-4">
            <p>Scarcity score</p>
            <p>{community.scarcityScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
