import { useState } from 'react';

const CommunityTreasuryForm = ({
  register,
  errors,
  apy,
  availableDAI,
  handleSubmit,
  onSubmit,
  stakingStage,
}) => {
  const [returns, setReturns] = useState(0);
  return (
    <form className="z-0 lg:mb-20" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col border-2 border-denim px-8 py-4 mt-8">
        <h1 className="flex font-bold underline justify-center">
          Add funds to Treasury
        </h1>
        <div className="flex">
          <div className="flex flex-col w-1/2 p-3">
            <h2
              htmlFor="currency"
              className="font-bold underline text-center mb-3"
            >
              Currency
            </h2>
            <div className="flex justify-around">
              <div>
                <input
                  name="currency"
                  type="radio"
                  value="DAI"
                  id="DAI"
                  ref={register({ required: true })}
                />
                <label className="font-bold pl-3" htmlFor="DAI">
                  DAI
                </label>
              </div>
              <div>
                <input
                  name="currency"
                  type="radio"
                  value="USDC"
                  id="USDC"
                  ref={register({ required: true })}
                />
                <label className="font-bold pl-3" htmlFor="USDC">
                  USDC
                </label>
              </div>
            </div>
            {errors.currency && (
              <p className="text-red-600">Please select stablecoin to stake</p>
            )}
            <p className="mt-2 text-left text-sm text-dove-gray">
              Stablecoins are not regular
              <br />
              crypto. They are "pegged" to <br />
              Fiat (USD), so they are not
              <br />
              volatile (they are stable):
              <br />1 DAI = 1 Dollar
              <br />
              1USDC = 1 Dollar
              <br />
            </p>
          </div>

          <div className="flex flex-col w-1/2 p-3">
            <h2 className="font-bold underline text-center mb-3">
              Community APY
            </h2>
            <div className="mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
              <div className="w-full h-full bg-white absolute" />
              <div
                id="bar"
                className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-24"
              >
                {Math.round((apy + Number.EPSILON) * 1000) / 1000}%
              </div>
            </div>
            <p className="text-sm text-dove-gray">
              "Staking" is different from
              <br />
              "Donating" - basically your <br />
              community is "looking" these
              <br />
              funds to provide liquidity. In
              <br />
              exchange, you all get a higher
              <br />
              interest return!
              <br />
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col w-1/2 p-3">
            <label className="font-bold underline text-center mb-3">
              Amount
            </label>
            <input
              className="justify-center text-center border border-denim h-16"
              type="number"
              id="amount"
              name="amount"
              min="1"
              ref={register({ required: true })}
              onChange={e => {
                setReturns(e.target.value * (apy / 100));
              }}
            />
            <p className="text-right text-sm">DAI/USDC</p>
            {errors.amount && (
              <p className="text-red-600">A value to stake is required</p>
            )}
            <p className="text-left text-dove-gray text-sm">
              The amount of tokens you stake for your community
            </p>
            {availableDAI && <p>Available DAI balance: {availableDAI}</p>}
          </div>

          <div className="flex flex-col w-1/2 p-3">
            <h2 className="text-center font-bold underline mb-3">
              Your return
            </h2>
            <p className="text-left text-dove-gray">
              Your intial investment plus
            </p>
            <div className="mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
              <div className="w-full h-full bg-white absolute" />
              <div
                id="bar"
                className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-48"
              >
                ${Math.round((returns + Number.EPSILON) * 100) / 100}
              </div>
            </div>
            <p className="text-left text-sm  text-dove-gray">
              It is based on the size of your <br />
              staking, and the amount of DiTo <br />
              you own!
              <br />
            </p>
          </div>
        </div>
        <div className="flex w-full bg-white">
          <button
            type="submit"
            disabled={stakingStage > 0}
            className=" w-full my-3 py-2 bg-blue-600 text-white text-xl underline"
          >
            {stakingStage === 0
              ? 'Stake now!'
              : stakingStage === 1
              ? 'Approving DAI to stake with ... please wait '
              : stakingStage === 2
              ? 'Depositing DAI to community treasury ... please wait'
              : stakingStage === 3
              ? 'Investing DAI to community ... please wait'
              : stakingStage === 4
              ? 'Staking complete, please refresh page to see new values!'
              : 'Error has occured while processing transaction, please refresh.'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommunityTreasuryForm;
