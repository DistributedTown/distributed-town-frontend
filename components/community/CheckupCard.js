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
      className="flex-col w-full justify-center items-center py-8 bg-cover bg-center"
    >
      <div className="mb-12">
          <h1 className="mt-5 mb-4 text-3xl text-black text-center underline">
            Stake in your <span className="underline">diTreasury</span>
          </h1>
          <h2 className="text-lg text-center">Delegate assets to your Treasury to <span className="underline">accrue returns </span> 
           & <span className="underline">fund new projects!</span></h2>
      </div>
      
      <Card className="rounded-xlg border-2 border-denim w-7/12 m-auto mb-12 flex justify-evenly items-center">
        <img src="/dark-dito.svg" className="w-20" />
        <h2 className="text-xl underline">{!community ? 'Loading' : community.name}</h2>
      </Card>
      <Card className="flex flex-col w-7/12 m-auto">
        <div className="flex flex-col justify-center bg-white p-4 space-y-4">
        <div className="flex justify-between font-bold border-b-2 border-black mb-4 pb-4">
            <p className="underline">Scarcity score</p>
            <div>
              <p>{!community ? 'Loading' : community.scarcityScore}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <p className="underline">diTizens</p>
            <p>{!community ? 'Loading' : community.members}</p>
          </div>
          <div className="flex justify-between">
            <p className="underline">Open Projects</p>
            <p>0</p>
          </div>
          <div className="flex justify-between">
            <p className="underline">Liquidity Pool</p>
            <p>0</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
