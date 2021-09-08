import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useGetCommunity } from '../../hooks/useGetCommunity';
import { community as mockCommunity } from '../../utils/mockData';
import Button from '../Button';
import Card from '../Card';

export default function CheckupCard() {
  const [community, setCommunity] = useState(undefined);

  useEffect(() => {
    const com = JSON.parse(localStorage.getItem('community'));
    setCommunity(com);
  }, []);

  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full justify-center items-center py-8 bg-cover bg-center"
    >
      {community ?
        <div className="flex flex-col justify-center items-center">
          <Card className="flex flex-col w-7/12 border-2 border-denim mb-4">
            <div className="flex flex-start items-center mb-8">
              <img src={community.image} className="w-16 mr-12" />
              <strong className="underline text-center text-xl">{community.name}</strong>
            </div>
            <div>
              <p className="italic">
                {community.description}
              </p>
            </div>
          </Card>

          <Link href="" >
            <Button disabled className="w-7/12 rounded-full">
              <a>Activity & Logs</a>
            </Button>
          </Link>
        </div>
        : undefined}
    </div>
  );
}
