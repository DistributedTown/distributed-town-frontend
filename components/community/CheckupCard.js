import { useGetCommunity } from '../../hooks/useGetCommunity';
import Card from '../Card';

export default function CheckupCard() {
  const { data: community } = useGetCommunity();

  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full justify-center items-center py-8 bg-cover bg-center"
    >
      <Card className="flex flex-col w-7/12">
        <Card filled className="text-white">
          <h2>{!community ? 'Loading' : community.communityInfo.name}</h2>
          <p>Check-up Card</p>
        </Card>
        <div className="flex flex-col justify-center bg-white p-4 space-y-4">
          <div className="flex flex-row justify-between">
            <p>Members</p>
            <p>{!community ? 'Loading' : community.numberOfMembers}</p>
          </div>
          <div className="flex justify-between">
            <p>Open Proposals</p>
            <p>0</p>
          </div>
          <div className="flex justify-between">
            <p>Liquidity Pool</p>
            <p>{!community ? 'Loading' : community.liquidityPoolBalance}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Scarcity score</p>
            <p>
              {!community ? 'Loading' : community.communityInfo.scarcityScore}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
