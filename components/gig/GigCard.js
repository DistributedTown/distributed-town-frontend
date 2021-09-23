import Card from '../Card';
import Button from '../Button';
// import milestoneChain from "../../public/milestone-chain.png";
import { useState, useEffect, useMemo } from 'react';
import { getCommunityById } from '../../api/communities';
import { getCommunityGigsAddress } from '../../contracts/community'
import { takeGig } from '../../contracts/gigs'

const GigCard = ({
  gig }) => {
  const [gigsAddress, setGigsAddress] = useState(null);
  const [skillWallet, setSkillWallet] = useState(null);
  const [community, setCommunity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('skillWallet'));
    setSkillWallet(s);
    getCommunityAndGigs(s.community);
  }, []);

  const getCommunityAndGigs = async (communityAddress) => {
    if (!community) {
      setIsLoading(true);
      const comm = await getCommunityById(communityAddress);
      console.log('community: ', comm);
      setCommunity(comm);
      const gigsAddress = await getCommunityGigsAddress(comm.address);
      setIsLoading(false);
      setGigsAddress(gigsAddress);
    }
  }

  return (
    <Card
      key={gig.id} 
      className="flex flex-col space-y-3 border-2 border-burgundy">
      <div className="flex justify-between items-center p-2">
        <img className="w-8 h-8 mr-4" src={gig.image} />
        <p>{gig.title}</p>
      </div>
      <p className="pb-2">{gig.description}</p>
      <div className="pb-2 border-b-2 border-gray-400">
        <p>Skills needed: </p> {console.log(gig)}
        <ul>
          {gig.props.skills.map((skill, j) => (
            <li
              key={j}
              className="list-disc list-inside">
              {skill.name}
            </li>
          ))}
        </ul>
      </div>
      <p>
        <span>Worth: </span>{gig.credits}
      </p>
      <Button
        type="button"
        loading={isLoading}
        className="border-2 border-burgundy"
        disabled={!gig.taker && gig.creator !== window.ethereum.selectedAddress}
        onClick={() => takeGig(gigsAddress, gig.id)}
      >
        Take Gig
      </Button>
    </Card>
  );
};

export default GigCard;
