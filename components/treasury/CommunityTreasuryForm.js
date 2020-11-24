import { useState } from "react"

const CommunityTreasuryForm = ({ register, errors, clearErrors, apy, availableDAI }) => {
    const [returns, setReturns] = useState(0)
    return (
        <div className="flex flex-col border-2 border-denim px-8 py-4 mt-8">
            <h1 class="flex font-bold underline justify-center">
                Add funds to Treasury
            </h1>
            <div className="flex">
                <div className="flex flex-col w-1/2 p-3">
                    <h2 htmlFor="currency" className="font-bold underline text-center mb-3">
                        Currency
                    </h2>
                    <div className="flex justify-around">
                        <div className="flex items-center">
                            <input type="checkbox" key={"DAI"} id="DAI" name="DAI" ref={register} onChange={() => clearErrors()} />
                            <p className="font-bold pl-3">DAI </p>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" key={"USDC"} id="USDC" name="USDC" ref={register} onChange={() => clearErrors()} />
                            <p className="font-bold pl-3">USDC</p>
                        </div>
                    </div>
                    {errors.currency && <p className="text-red-600">{errors.currency.message}</p>}
                    <p class="mt-2 text-left text-sm text-dove-gray">
                        Stablecoins are not regular<br></br>crypto. They are "pegged" to <br></br>Fiat (USD), so they are not<br></br>volatile (they are stable):<br></br>1 DAI = 1 Dollar<br></br>1USDC = 1 Dollar<br></br>
                    </p>
                </div>

                <div className="flex flex-col w-1/2 p-3">
                    <h2 className="font-bold underline text-center mb-3">
                        Community APY
                    </h2>
                    <div className="mb-3 relative max-w-xl rounded-full h-8 border-2 border-denim overflow-hidden">
                        <div className="w-full h-full bg-white absolute"></div>
                        <div
                            id="bar"
                            className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-24"
                        >{Math.round((apy + Number.EPSILON) * 1000) / 1000}%
                        </div>
                    </div>
                    <p className="text-sm text-dove-gray">
                        "Staking" is different from<br></br>"Donating" - basically your <br></br>community is "looking" these<br></br>funds to provide liquidity. In<br></br>exchange, you all get a higher<br></br>interest return!<br></br>
                    </p>
                </div>
            </div>

            <div className="flex">
                <div className="flex flex-col w-1/2 p-3">
                    <label className="font-bold underline text-center mb-3">Amount</label>
                    <input
                        className="justify-center text-center border border-denim h-16"
                        type="number"
                        id="amount"
                        name="amount"
                        min="1"
                        ref={register({ required: true })}
                        onChange={e => { setReturns(e.target.value * (apy / 100)) }}
                    />
                    <p className="text-right text-sm">DAI/USDC</p>
                    {errors.amount && <p className="text-red-600">A value to stake is required</p>}
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
                        <div className="w-full h-full bg-white absolute"></div>
                        <div
                            id="bar"
                            className="font-bold text-white pr-2 text-right transition-all ease-out duration-1000 h-full bg-denim relative w-48"
                        >
                            ${Math.round((returns + Number.EPSILON) * 100) / 100}
                        </div>
                    </div>
                    <p className="text-left text-sm  text-dove-gray">
                        It is based on the size of your <br></br>staking, and the amount of DiTo <br></br>you own!<br></br>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CommunityTreasuryForm;