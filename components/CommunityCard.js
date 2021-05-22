import Card from './Card';

function CommunityCard({ onSelectCommunity}) {

  return (
    <Card
      className="flex flex-col space-y-4 cursor-pointer border-2 rounded-3xl border-denim mb-4"
      onClick={onSelectCommunity}
    >
      <div className="flex">
        <div className="w-1/2 bg-white h-16 border-2 rounded-xl border-denim flex justify-evenly items-center">
          <img alt="Dito Black Logo"></img>
          <h3 className="underline bold text-xl">The Dark DiTo</h3>
        </div>
        <div className="w-1/2 bg-gray-50">
          Accepting new diTizens?
        </div>
      </div>

      <div 
      >
        The greatest Description you could think of. A story about passion, cooperation, 
        conflict & chaos - unveiling word by word, a deeper truth about humankind. The
        greatest DDescription you could think  of. A story about passion, cooperation, 
        conflict & chaos - unveiling word by word.
      </div>
    </Card>
  );
}

export default CommunityCard;
