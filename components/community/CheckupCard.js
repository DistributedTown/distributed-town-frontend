import { useState, useEffect } from 'react';

export default function CheckupCard({
  numOfMembers,
  liquidityPoolBalance,
  communityId,
  token,
}) {
  const bgImage = { src: '/background-image.svg', alignment: 'left', size: 60 };
  const [scarcityScore, setScarcityScore] = useState();
  const [communityName, seCommunityName] = useState();

  useEffect(() => {
    (async function() {
      const community = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/community/${communityId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const communityDetails = await community.json();
      console.log(communityDetails);
      setScarcityScore(communityDetails.scarcityScore);
      seCommunityName(communityDetails.name);
    })();
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
      className="flex w-2/5 justify-center items-center"
    >
      <div className="flex flex-col border-2 border-blue-600 w-7/12">
        <div className="bg-blue-600 p-4">
          <h2>{communityName}</h2>
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
            <p>{scarcityScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
