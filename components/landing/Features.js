import { FaBuilding, FaLink, FaPalette } from 'react-icons/fa';
import Card from '../Card';

export default function Features() {
  const features = [
    {
      icon: FaLink,
      title: 'Web3 & Blockchain',
      text: 'For small, functional Web3 teams',
      details: (
        <ul className="list-disc list-inside">
          <li>keep accounting & run proposals</li>
          <li>fair, milestone-based rewards & payments to members</li>
          <li>efficiently distribute tasks</li>
          <li>get initial fundings for their projects</li>
          <li>coordinate for hackathons & sprints</li>
        </ul>
      ),
    },
    {
      icon: FaPalette,
      title: 'Art & Lifestyle',
      text: 'For artists & creative minds',
      details: (
        <ul className="list-disc list-inside">
          <li>keep accounting & run proposals</li>
          <li>manage multi-disciplinary projects & distribute tasks</li>
          <li>distribute shares & royalties fairly</li>
          <li>maintain continuous funding flow</li>
          <li>update scores & rank while gaming</li>
        </ul>
      ),
    },
    {
      icon: FaBuilding,
      title: 'Local Community',
      text: 'For neighbors, condos & small local clubs',
      details: (
        <ul className="list-disc list-inside">
          <li>hold a common treasury</li>
          <li>vote for local proposals based on reputation & commitment</li>
          <li>share & track common resources</li>
          <li>organize & fund local projects</li>
          <li>divide tasks for mutual support</li>
        </ul>
      ),
    },
  ];
  return (
    <div className="container mx-auto flex flex-col md:grid md:grid-cols-3 flex-wrap justify-center gap-4 p-4">
      <h1 className="text-center text-3xl sm:text-5xl mb-8 w-full md:col-span-3">
        Three community types to choose from
      </h1>
      {features.map(feature => (
        <Card className={['flex flex-col gap-2 p-8', { shadow: false }]}>
          <feature.icon size="4rem" className="text-denim mb-6 self-center" />
          <h2 className="text-2xl text-center">{feature.title}</h2>
          <p className="text-xl text-center text-gray-600">{feature.text}</p>
          {/* <p className="text-gray-600 font-light self-center">
            {feature.details}
          </p> */}
        </Card>
      ))}
    </div>
  );
}
