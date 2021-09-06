import Card from '../Card';
import Button from '../Button';
// import milestoneChain from "../../public/milestone-chain.png";
import { useState, useEffect, useMemo } from 'react';
import { getCommunityById, getCommunityGigsAddress } from '../../api/communities';
import { takeGig } from '../../utils/utils';

const GigCard = ({
  gig }) => {
  const [gigsAddress, setGigsAddress] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [community, setCommunity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(s);
    getCommunityAndGigs(s);
  }, []);

  const getCommunityAndGigs = async (userInfo) => {
    if (!community) {
      setIsLoading(true);
      const comm = await getCommunityById(userInfo.currentCommunity.address);
      console.log('community: ', comm);
      setCommunity(comm);
      const gigsAddress = await getCommunityGigsAddress(comm.address);
      setIsLoading(false);
      setGigsAddress(gigsAddress);
    }
  }

  return (
    <Card
      // key={key} 
      className="flex flex-col space-y-3 border-2 border-burgundy">
      <div className="flex justify-between items-center p-2">
        <img className="w-8 h-2 mr-4" src="/milestone-chain.png" />
        <p>{gig.title}</p>
      </div>
      <p className="pb-2">{gig.description}</p>
      <div className="pb-2 border-b-2 border-gray-400">
        <p>Skills needed: </p>
        <ul>
          {gig.props.skills.map((skill, j) => (
            <li
              key={j}
              className="list-disc list-inside">
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <p>
        <span>Worth: </span>{gig.creditsOffered}
      </p>
      <Button
        type="button"
        loading={isLoading}
        className="border-2 border-burgundy"
        onClick={() => takeGig(gigsAddress, gig.gigId)}
      >
        Take Gig
      </Button>
    </Card>
  );
};

export default GigCard;
