function CommunityCard({ onSelectCommunity, selected, community }) {
  const { name, members, scarcityScore } = community;

  function getCardState(members) {
    if (members === 24) return 'Not accepting';
    if (!selected) return 'Can join';
    if (selected) return 'Selected!';
  }

  return (
    <div
      className="flex flex-col border-2 border-denim bg-white cursor-pointer"
      onClick={onSelectCommunity}
    >
      <div
        className={`grid grid-cols-2 p-4 border-b-2 border-denim ${
          selected ? 'bg-denim text-white' : ''
        }`}
      >
        <h2>{name}</h2>
        <p>{getCardState(members)}</p>
      </div>
      <div className="grid grid-cols-2 p-4">
        <p>Members</p>
        <p>{members}</p>
        <p>Scarcity score</p>
        <p>{scarcityScore}</p>
      </div>
    </div>
  );
}

export default CommunityCard;
