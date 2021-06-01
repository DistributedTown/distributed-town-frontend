import Card from './Card';

function CommunityCard({ onSelectCommunity, selected, community}) {
  console.log(community);
  return (
    <Card
      className="flex flex-col space-y-4 cursor-pointer border-2 rounded-3xl border-denim mb-4"
      onClick={onSelectCommunity}
    >
      <div className="flex">
        <div className="w-1/2 bg-white h-16 border-2 rounded-xl border-denim flex justify-around items-center">
          <img src="/dark-dito.svg" className="w-12 mx-4" />
          <h3 className="underline bold text-xl">{community.name}</h3>
        </div>
        <div className="w-1/2 bg-gray-50 flex-col items-center">
          <p>Accepting new diTizens?</p>
          <img src="/yes.svg" className="w-12 inline" />
        </div>
      </div>

      <div 
      >
        {community.description}
      </div>
    </Card>
  );
}

export default CommunityCard;
