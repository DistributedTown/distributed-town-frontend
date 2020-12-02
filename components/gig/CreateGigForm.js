import useSWR from 'swr'
import { useState, useEffect } from "react";

const fetcher = (...args) => fetch(...args).then(res => res.json())

const CreateGigForm = ({ register, handleSubmit, onSubmit, errors, skill, getValues, creationState }) => {
    const [budgetRequired, setBudgetRequired] = useState()
    const [selectedSkills, setSelectedSkills] = useState([])
    const [commitment, setCommitment] = useState(getValues("commitment"))
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/skill?skill=${encodeURIComponent(skill)}`, fetcher)
    const [subCategories, setSubCategories] = useState()

    let skillsList = []
    if (data) {
        for (let category of data.categories) {
            Array.prototype.push.apply(skillsList, category.skills)
        }
    }

    const calculateBudgetRequired = (commitment, skillsSelected) => {
        let totalCredits = 0;
        for (let skill of skillsSelected) {
            for (let subCategory of subCategories) {
                if (subCategory.skills.indexOf(skill) !== -1) {
                    totalCredits += subCategory.credits
                }
            }
        }
        const budgetRequired = ((totalCredits * Number(commitment)) / 10)
        setBudgetRequired(budgetRequired)
        return null;
    }

    const getSelectedSkills = () => {
        let selectedSkills = []
        for (skill of skillsList) {
            if (getValues(skill)[0] === "on" || getValues(skill)) {
                selectedSkills.push(skill)
            }
        }
        setSelectedSkills(selectedSkills)
    }

    useEffect(() => {
        if (data) setSubCategories(data.categories)
    })

    return (
        <form className="flex flex-col pl-4 border-l-2 border-denim mt-6 mb-24" onSubmit={handleSubmit(onSubmit)}>
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
                            {skillsList ? skillsList.map((skill, i) => {
                                return (
                                    <div key={skill} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            key={skill}
                                            id={skill}
                                            name={skill}
                                            ref={register}
                                            onChange={e => { getSelectedSkills(); calculateBudgetRequired(commitment, selectedSkills) }}
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
                            id="commitment"
                            name="commitment"
                            style={{ width: "250px" }}
                            className="bg-white h-32 py-3 w-32"
                            type="range"
                            ref={register({ required: true })}
                            onChange={e => { setCommitment(e.target.value); calculateBudgetRequired(e.target.value, selectedSkills) }}
                        />
                        {errors.commitment && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>

                <div className=" sm:w-1/2 lg:w-1/3 p-2">
                    <div className="flex flex-col flex-1 px-10 py-12">
                        <h1 className="font-bold text-xl underline">Budget needed</h1>
                        <h2 className="text-dove-gray">
                            Hint: the amount of DiTo<br></br>you offer for this gig.
                            </h2>
                        <input id="creditsOffered" name="creditsOffered" type="number" ref={register} value={budgetRequired} hidden></input>
                        <p className="border-black border-2 p-4 text-xl mt-2">{budgetRequired}</p>
                        <h2 className="text-right">DiTo</h2>
                    </div>
                </div>
            </div>
            {creationState === undefined ?
                <button
                    type="submit"
                    className="py-3 text-lg underline bg-alizarin text-white w-full"
                >
                    Publish your gig!
            </button> : creationState === 1 ? <p>Loading, please wait</p> : creationState === 2 ? <p>Can't create gig, community is not yet active</p> : <p>An error occured, please try again</p>}

        </form>

    );
}

export default CreateGigForm;