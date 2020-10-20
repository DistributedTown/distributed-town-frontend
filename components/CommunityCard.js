function CommunityCard({
  name,
  members,
  scarcityScore,
  selectCommunity,
  selected,
}) {
  function getCardState() {
    if (members == 24) return "Not accepting";
    if (!selected) return "Can join";
    if (selected) return "Joined!";
  }

  return (
    <div
      className="flex flex-col border-2 border-denim bg-white cursor-pointer"
      onClick={selectCommunity}
    >
      <div className="grid grid-cols-2 p-4 border-b-2 border-denim">
        <h2>{name}</h2>
        <p>{getCardState()}</p>
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
