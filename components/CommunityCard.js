import Button from './Button';
import Card from './Card';

function CommunityCard({ onSelectCommunity, selected, community }) {
  const { name, members, scarcityScore } = community;

  return (
    <Card
      className="cursor-pointer flex flex-col gap-4"
      onClick={onSelectCommunity}
    >
      <Card outlined className="grid grid-cols-2 items-center gap-4">
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
