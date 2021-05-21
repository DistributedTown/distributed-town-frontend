import Button from './Button';
import Card from './Card';

function CommunityCard({ onSelectCommunity, selected, community }) {
  const { name, members, scarcityScore } = community;

  return (
    <Card
      className="flex flex-col space-y-4 cursor-pointer"
      onClick={onSelectCommunity}
    >
      {/* <Card outlined className="grid items-center grid-cols-2 gap-4">
        <h2 className="font-bold">{name}</h2>
        <Button filled disabled={selected || members === 24}>
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Card> */}
      <div className="flex">
        <div classsName="w-1/2 bg-gray-500">
          The Dark DiTo
        </div>
        <div className="w-1/2 bg-gray-50">
          Accepting new diTizens?
        </div>
      </div>

      <div 
      // className="grid grid-cols-4"
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
