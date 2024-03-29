import Link from 'next/link';
import Button from '../Button';
import Card from '../Card';

export default function CheckupCard(props) {

  return (
    <div
      style={{
        backgroundImage: 'url(/background-image.svg)',
      }}
      className="flex w-full justify-center items-center py-8 bg-cover bg-center"
    >
      {props.community ?
        <div className="flex flex-col justify-center items-center">
          <Card className="flex flex-col w-7/12 border-2 border-denim mb-4">
            <div className="flex flex-start items-center mb-8">
              <img src={props.community.image} className="w-16 mr-12" />
              <strong className="underline text-center text-xl">{props.community.name}</strong>
            </div>
            <div>
              <p className="italic">
                {props.community.description}
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
