import Card from '../Card';
import Button from '../Button';
import { useTakeGig } from '../../hooks/useTakeGig';
// import milestoneChain from "../../public/milestone-chain.png";

const GigCard = ({ key, gig }) => {
  const [takeGig, { isLoading }] = useTakeGig();

  return (
    <Card key={key} className="flex flex-col space-y-3">
      <div className="flex justify-between items-center p-2">
        <img className="w-8 h-2 mr-4" src="/milestone-chain.png" />
        <p>{gig.title}</p>
      </div>
      <p className="pb-2">{gig.description}</p>
      <div className="pb-2 border-b-2 border-gray-400">
        <p>Skills needed: </p>
        <ul>
          {gig.props.skills.map((skill, j) => (
            <li key={j} className="list-disc list-inside">
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
        onClick={() => takeGig(gig._id)}
      >
        Take Gig
      </Button>
    </Card>
  );
};

export default GigCard;
