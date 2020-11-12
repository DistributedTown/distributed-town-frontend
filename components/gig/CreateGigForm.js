import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const CreateGigForm = ({ register, handleSubmit, onSubmit, errors }) => {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/skill`, fetcher)

    return (
        <div className="flex flex-col border-l-2 border-denim p-2">
            <form className="border-l-2 flex flex-col pl-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <label
                            className="font-bold  text-xl underline"
                            htmlFor="gigTitle">
                            Gig Title
                        </label>
                        <p className="text-dove-gray">
                            Hint: a short, clear title will catch contributors’ attention.
                            Just be honest please.
                        </p>
                    </div>
                    <input
                        className="border border-dove-gray py-3 mb-5 px-2 "
                        id="gigTitle"
                        name="gigTitle"
                        ref={register({ required: true })}
                    />
                    {errors.gigTitle && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between">
                        <label
                            className="font-bold  text-xl underline"
                            htmlFor="gigDescription">
                            Gig Description
                        </label>
                        <p className="text-dove-gray">
                            Hint: be as detailed as possible, and be nice - there are real
                            people on the other side ;)
                        </p>
                    </div>
                    <textarea
                        style={{ border: " 1px solid #707070" }}
                        className="border border-dove-gray py-6 px-2"
                        id="gigDescription"
                        name="gigDescription"
                        ref={register({ required: true })}
                    ></textarea>
                    {errors.gigDescription && <span className="text-red-600">This field is required</span>}
                </div>
                <div className="flex">
                    <div className="p-2">
                        <div className="px-10 py-12">
                            <h1 className="font-bold text-xl underline">Skills needed</h1>
                            <h2 className="text-dove-gray">
                                Hint: If the gig requires many different skills, consider<br></br>breaking it down in 2+ gigs, or starting a new project.
                                </h2>
                            <div className=" mt-5 px-4 overflow-scroll h-20 border-2 border-blue-600">
                                {error && <p>Couldn't fetch skills</p>}
                                {data ? data.map(skill => {
                                    return (
                                        <div className="flex flex-row items-start">
                                            <input
                                                type="checkbox"
                                                key={skill}
                                                id={skill}
                                                name={skill}
                                                ref={register}
                                            />
                                            <div className="flex flex-col font-bold pl-2">
                                                <p>{skill}</p>
                                            </div>
                                        </div>
                                    )
                                }) : <p>loading</p>}
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="px-10 py-12">
                            <h1 className="font-bold  text-xl underline">Commitment</h1>
                            <h2 className="text-dove-gray">
                                Hint: the effort needed for this task. This value<br></br>influences the DiTo set as a reward for your gig!
                                </h2>
                            <input
                                step={10}
                                style={{ width: "250px" }}
                                className="bg-white h-32 py-3 w-32"
                                type="range"
                                required
                            />
                        </div>
                    </div>

                    <div className=" sm:w-1/2 lg:w-1/3 p-2">
                        <div className="flex flex-col flex-1 px-10 py-12">
                            <h1 className="font-bold text-xl underline">Budget needed</h1>
                            <h2 className="text-dove-gray">
                                Hint: the amount of DiTo<br></br>you offer for this gig.
                            </h2>
                            <input
                                className="border-2 border-denim py-6 px-4 mt-5 mb-1"
                                id="creditsOffered"
                                name="creditsOffered"
                                ref={register({ required: true })}
                                type="number"
                                min="0"
                            />
                            <h2 className="text-right">DiTo</h2>
                            {errors.creditsOffered && <span className="text-red-600">This field is required</span>}
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="py-3 text-lg underline bg-alizarin text-white w-full"
                >
                    Publish your gig!
                </button>
            </form>
        </div >
    );
}

export default CreateGigForm;