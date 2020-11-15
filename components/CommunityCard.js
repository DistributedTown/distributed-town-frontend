import { useState, useEffect, useContext } from "react";
import { UserInfoContext } from "./Store";

function CommunityCard({ selectCommunity, selected, _id }) {
  const userInfo = useContext(UserInfoContext);
  function getCardState(members) {
    if (members === 24) return "Not accepting";
    if (!selected) return "Can join";
    if (selected) return "Joined!";
  }
  const [communityDetails, setCommunityDetails] = useState();

  useEffect(() => {
    (async function() {
      let community = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/community/${_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo[0].DIDT}`
          }
        }
      );
      const communityDetails = await community.json();
      setCommunityDetails(communityDetails);
    })();
  }, []);

  if (!communityDetails) {
    return null;
  }

  const { name, members, scarcityScore } = communityDetails;

  return (
    <div
      className="flex flex-col border-2 border-denim bg-white cursor-pointer"
      onClick={selectCommunity}
    >
      <div className="grid grid-cols-2 p-4 border-b-2 border-denim">
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
