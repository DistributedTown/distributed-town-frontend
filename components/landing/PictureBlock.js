import { FaAccusoft, FaAddressBook } from 'react-icons/fa';
import bgImages from '../../utils/bgImages';
import Button from '../Button';

export default function PictureBlock({
  flip = false,
  imageSrc = bgImages['governance & consensus'],
}) {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col m-4 overflow-hidden bg-white sm:flex-row rounded-2xl">
        <img
          className={`object-cover max-h-64 sm:max-h-96 ${
            flip ? '' : 'sm:order-last'
          } sm:w-1/2`}
          src={imageSrc}
        />
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-center sm:w-1/2">
          <FaAddressBook size="3rem" />
          <h2 className="text-2xl">Adipisicing labore</h2>
          <p className="text-gray-600">
            Proident nostrud velit reprehenderit minim proident elit nulla
            voluptate incididunt quis exercitation qui eu.
          </p>
          <hr className="w-full" />
          <Button>Minim fugiat</Button>
        </div>
      </div>
    </div>
  );
}
