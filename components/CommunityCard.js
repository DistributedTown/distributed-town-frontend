import Button from './Button';
import Card from './Card';

function CommunityCard({ onSelectCommunity, selected, community }) {
  const { name, members, scarcityScore } = community;

  return (
    <Card
      className="flex flex-col space-y-4 cursor-pointer"
      onClick={onSelectCommunity}
    >
      <Card outlined className="grid items-center grid-cols-2 gap-4">
        <h2 className="font-bold">{name}</h2>
        <Button filled disabled={selected || members === 24}>
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Card>
      <div className="grid grid-cols-4">
        <p>Members:</p>
        <p>{members}</p>
        <p>Scarcity score:</p>
        <p>{scarcityScore}</p>
      </div>
    </Card>
  );
}

export default CommunityCard;
