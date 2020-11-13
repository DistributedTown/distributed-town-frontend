export default function CheckupCard() {
  return (
    <div className="flex w-2/5 justify-center items-center">
      <div className="flex flex-col border-2 border-blue-600">
        <div className="bg-blue-600 p-4">
          {/* <h2>{typeof userInfo.communityID !== undefined ? userInfo.communityID : ''}</h2> */}
          <h2>{""}</h2>
          <p>Check-up Card</p>
        </div>
        <div className="flex flex-col justify-center bg-white p-4 space-y-4">
          <div className="flex flex-row justify-between">
            <p>Members</p>
            {/* <p>{numOfMembers === -1 ? "Loading members..." : numOfMembers}</p> */}
            <p>"Loading members..."</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Open Proposals</p>
            <p>0</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Liquidity Pool</p>
            {/* <p>
                        {liquidityPoolBalance === -1
                            ? "Loading liquidity pool balance..."
                            : liquidityPoolBalance}
                    </p> */}
            <p>"Loading liquidity pool balance..."</p>
          </div>
          <div className="flex flex-col border-2 border-blue-600 p-4">
            <p>Scarcity score</p>
            <p>72</p>
          </div>
        </div>
      </div>
    </div>
  );
}
