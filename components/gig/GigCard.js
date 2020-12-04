const GigCard = ({ key, gig, takeGig }) => {
    return (
        <div
            key={key}
            className="border-2 border-blue-600 h-auto"
        >
            <div className="flex justify-between border-b-2 border-gray-400 p-2">
                <p>{gig.title}</p>
                <p><span className="text-carrot">DiTo offered:</span> {gig.creditsOffered}</p>
            </div>
            <p className="p-2">{gig.description}</p>
            <div className="grid grid-cols-2 border-t-2 border-gray-400 p-2">
                <p className=" font-bold text-lg">Skills needed: </p>
                {gig.skills.map((skill, j) => (
                    <span key={j} className=" text-red-500">{`#${skill}`}</span>
                ))}
            </div>

            <button

                type="button"
                className="bg-red-600 text-white w-full underline"
                onClick={() => takeGig(gig._id)}
            >
                Take this gig!
            </button>
        </div>
    )
}

export default GigCard