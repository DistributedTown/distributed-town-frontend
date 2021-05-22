import Card from './Card';

function CommunityCard({ onSelectCommunity}) {

  return (
    <Card
      className="flex flex-col space-y-4 cursor-pointer border-2 rounded-3xl border-denim mb-4"
      onClick={onSelectCommunity}
    >
<<<<<<< HEAD
      <div className="flex">
        <div className="w-1/2 bg-white h-16 border-2 rounded-xl border-denim flex justify-evenly items-center">
          <img alt="Dito Black Logo"></img>
          <h3 className="underline bold text-xl">The Dark DiTo</h3>
=======
      {/* <Card outlined className="grid items-center grid-cols-2 gap-4">
        <h2 className="font-bold">{name}</h2>
        <Button filled disabled={selected || members === 24}>
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Card> */}
      <div className="flex">
        <div classsName="w-1/2 bg-gray-500">
          The Dark DiTo
>>>>>>> 74ec959d2fd2c9c22028226e8bb711bb491d2db2
        </div>
        <div className="w-1/2 bg-gray-50">
          Accepting new diTizens?
        </div>
      </div>

      <div 
<<<<<<< HEAD
=======
      // className="grid grid-cols-4"
>>>>>>> 74ec959d2fd2c9c22028226e8bb711bb491d2db2
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
