import { FaHandsHelping } from 'react-icons/fa';
import Button from '../Button';

export default function FullBlock() {
  return (
    <div className="flex flex-col px-8 py-16 space-y-12 text-center text-white bg-denim">
      <div className="container flex flex-col mx-auto space-y-8">
        <h2 className="max-w-3xl mx-auto text-3xl font-bold sm:text-5xl">
          Sint minus doloribus commodi? Odio, cumque, cupiditate.
        </h2>
        <h3 className="max-w-4xl mx-auto font-light sm:text-xl">
          Cupiditate quis sequi excepturi est maiores fugiat suscipit culpa
          consequatur atque necessitatibus, nemo voluptatum, enim iure repellat?
        </h3>
        <Button
          className="self-center"
          style={{ border: '2px solid white' }}
          filled
        >
          Exercitation esse
        </Button>
      </div>
    </div>
  );
}

export function FullBlockWhite() {
  return (
    <div className="flex flex-col px-8 py-16 space-y-12 text-center bg-white">
      <div className="container flex flex-col mx-auto space-y-8">
        <FaHandsHelping className="self-center" size="7rem" />
        <h2 className="max-w-3xl mx-auto text-3xl font-bold sm:text-5xl">
          Laboris duis deserunt id culpa est anim.
        </h2>
        <h3 className="max-w-4xl mx-auto font-light text-gray-700 sm:text-xl">
          Elit magna quis consequat dolore commodo anim aute ex mollit.
          Cupiditate quis sequi excepturi est maiores fugiat suscipit culpa
          consequatur atque necessitatibus, nemo voluptatum, enim iure repellat?
        </h3>
        <div className="flex self-center space-x-4 sm:space-x-8">
          <Button className="self-center" filled>
            Create Community
          </Button>
          <Button>Join Community</Button>
        </div>
      </div>
    </div>
  );
}
