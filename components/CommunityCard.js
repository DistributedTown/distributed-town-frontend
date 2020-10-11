function CommunityCard({ name, isAccepting, members, scarcityScore }) {
  return (
    <div className="flex flex-col border-2 border-blue-600 bg-white">
      <div className="grid grid-cols-2 p-4 border-b-2 border-blue-600">
        <h2>{name}</h2>
        <p>{isAccepting ? "Not accepting" : "Selected!"}</p>
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
