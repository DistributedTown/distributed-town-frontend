import Link from 'next/link';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import { community as mockCommunity } from '../../utils/mockData';
import Button from '../Button';
import Card from '../Card';

export default function CheckupCard() {
  // TODO: replace mock data with backend call
  // const { data: community } = useGetCommunity();
  const community = mockCommunity;

  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full justify-center items-center py-8 bg-cover bg-center"
    >
        <div className="flex flex-col justify-center items-center">
      <Card className="flex flex-col w-7/12 border-2 border-denim mb-4">
        <div className="flex flex-start items-center mb-8">
            <img src="/dark-dito.svg" className="w-16 mr-12" />
            <strong className="underline text-center text-xl">The Dark Dito</strong>
        </div>
        <div>
            <p className="italic">
            The greatest Description you could think of. A story about passion, cooperation, 
            conflict & chaos - unveiling word by word, a deeper truth about humankind.
            </p>
            <br></br>
            <p className="italic">
            The greatest Description you could think of. A story about passion, cooperation, 
            conflict & chaos - unveiling word by word
            </p>
        </div>
      </Card>

      <Link href="" >
        <Button disabled className="w-7/12 rounded-full">
            <a>Activity & Logs</a>
        </Button>
      </Link>
        </div>
    </div>
  );
}
