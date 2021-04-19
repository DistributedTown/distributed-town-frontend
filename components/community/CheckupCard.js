import { useGetCommunity } from '../../hooks/useGetCommunity';
import { community as mockCommunity } from '../../utils/mockData';
import Card from '../Card';

export default function CheckupCard() {
  // TODO: replace mock data with backend call
  // const { data: community } = useGetCommunity();
  const community = mockCommunity;

  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full justify-center items-center py-8 bg-cover bg-center"
    >
      <Card className="flex flex-col w-7/12">
        <Card filled className="text-white">
          <h2>{!community ? 'Loading' : community.name}</h2>
          <p>Check-up Card</p>
        </Card>
        <div className="flex flex-col justify-center bg-white p-4 space-y-4">
          <div className="flex flex-row justify-between">
            <p>Members</p>
            <p>{!community ? 'Loading' : community.members}</p>
          </div>
          <div className="flex justify-between">
            <p>Open Proposals</p>
            <p>0</p>
          </div>
          <div className="flex justify-between">
            <p>Liquidity Pool</p>
            <p>0</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Scarcity score</p>
            <div>
              <p>{!community ? 'Loading' : community.scarcityScore}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
