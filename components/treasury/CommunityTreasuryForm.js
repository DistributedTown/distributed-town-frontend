import { useState } from 'react';
import Card from '../Card';
import Button from '../Button';
import TextField from '../TextField';

const CommunityTreasuryForm = ({
  register,
  errors,
  apy,
  availableDAI,
  handleSubmit,
  onSubmit,
  stakingStage,
}) => {
  const [weeks, setWeeks] = useState(0);
  return (
    <form className=" lg:mb-20 w-9/12" onSubmit={handleSubmit(onSubmit)}>
      <Card className="flex flex-col mt-8 border-2 border-denim">
        <label className="flex font-bold text-xl underline mb-4 ">Asset & Amount</label>
        <div className="flex-col mb-8">
        
          <div  className="border-2 border-denim rounded-xl flex justify-between text-center p-4 w-8/12 mb-4">
            <div className="flex flex-col w-48">
              <select
                name="asset"
                id="asset"
                className="border-2 border-denim mb-2"
                ref={register({ required: true })}
                >
                  <option value="USDC">USDC</option>
                  <option value="DAI">DAI</option>
                </select>
              <label className="underline text-left" htmlFor="asset">
                Balance: 
              </label>
            </div>
            {errors.asset && (
              <p className="text-red-600">Please select an asset to stake</p>
            )}
            <div>0.0</div>
          </div>
          <p className="w-8/12">The amount of tokens you stake for your community. <strong className="italic">Stablecoins</strong> are non-volatile & "pegged"
             to Fiat (USD): 1 DAI/USDC = 1 USD
          </p>
        </div>

        <div className="flex-col">
          <div className="flex flex-col w-1/2 mb-8">
            <label className="font-bold text-xl text-left mb-3 underline">Locking Period</label>
            <TextField
              type="number"
              className="text-center"
              id="amount"
              name="amount"
              min="1"
              ref={register({ required: true })}
              onChange={e => {
                setWeeks(e.target.value * (apy / 100));
              }}
            />
            <p className="text-right text-sm underline">Weeks</p>
            {errors.amount && (
              <p className="text-red-600">A value to stake is required</p>
            )}
            <p className="text-left text-dove-gray text-sm">
              The longer you lock your assets, the higher the returns. No worries, if you need, 
              you can withdraw at any time, just by paying a fee.
            </p>
            <p>Available DAI balance: {availableDAI && {availableDAI}}</p>
          </div>

          <div className="flex flex-col w-1/2">
            <h3 className="text-left text-xl underline font-bold mb-3">diTown APY</h3>
            <div className="mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden  text-center flex">
              <div
                id="bar"
                className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-4"
              >
              </div>
              <p className="m-auto">{Math.round((weeks + Number.EPSILON) * 100) / 100}%</p>
            </div>
            <p className="text-left text-sm text-dove-gray">
              "<strong className="italic">Staking</strong>" is not "<strong className="italic">Donating</strong>" - your Treasury 
              "<strong className="italic">locks</strong>" these funds to provide liquidity. 
              This way you get a higher interest in return!
            </p>
          </div>
        </div>
      </Card>

      <Button
        type="submit"
        disabled={stakingStage > 0}
        className="w-full text-xl rounded-full mt-4 h-16"
      >
        {stakingStage === 0
          ? 'Delegate & Stake'
          : stakingStage === 1
          ? 'Approving DAI to stake with ... please wait '
          : stakingStage === 2
          ? 'Depositing DAI to community treasury ... please wait'
          : stakingStage === 3
          ? 'Investing DAI to community ... please wait'
          : stakingStage === 4
          ? 'Staking complete, please refresh page to see new values!'
          : 'Error has occured while processing transaction, please refresh.'}
      </Button>
    </form>
  );
};

export default CommunityTreasuryForm;
