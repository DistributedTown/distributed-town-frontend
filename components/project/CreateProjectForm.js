import useSWR from 'swr'
import { useState, useEffect } from "react";


const fetcher = (...args) => fetch(...args).then(res => res.json())

const CreateProjectForm = ({ register, handleSubmit, onSubmit, errors, skill, getValues }) => {
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
        <form className="border-l-2 border-denim flex flex-col p-2 mt-6 mb-24" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <label
                        className="font-bold  text-xl underline"
                        htmlFor="projectTitle">
                        Project Title
                        </label>
                    <p className="text-dove-gray">
                        Hint: a short, clear title will catch contributors’ attention.
                        Just be honest please.
                        </p>
                </div>
                <input
                    className="border border-dove-gray py-3 mb-5 px-2 "
                    id="projectTitle"
                    name="projectTitle"
                    ref={register({ required: true })}
                />
                {errors.projectTitle && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <label
                        className="font-bold  text-xl underline w-1/3"
                        htmlFor="projectDescription">
                        Project Description
                        </label>
                    <p className="text-dove-gray">
                        Hint: whether you want to build a dApp, or launch a new Art event - your community can help to make it happen! Be clear in the description, and assign the right tasks!
                        </p>
                </div>
                <textarea
                    style={{ border: " 1px solid #707070" }}
                    className="border border-dove-gray py-6 px-2"
                    id="projectDescription"
                    name="projectDescription"
                    ref={register({ required: true })}
                ></textarea>
                {errors.projectDescription && <span className="text-red-600">This field is required</span>}
            </div>
            <div className="flex">
                <div className="p-2">
                    <div className="px-10 py-12">
                        <h1 className="font-bold text-xl underline">Skills needed</h1>
                        <h2 className="text-dove-gray">
                            Hint: If the Project requires skills not available in the community, just send a signal to attract more talent.
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
                            Hint: the effort needed to complete this Project. This value influences the Funds needed in your Community Treasury!
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
                    </div>
                </div>

                <div className=" p-2">
                    <div className="flex flex-col flex-1 px-10 py-12">
                        <h1 className="font-bold text-xl underline">Funds needed</h1>
                        <h2 className="text-dove-gray">
                            Hint: the amount of Funds needed for this project.
                            </h2>
                        <input id="creditsOffered" name="creditsOffered" type="number" ref={register} value={budgetRequired} hidden></input>
                        <p className="border-black border-2 p-4 text-xl mt-2">{budgetRequired}</p>
                        <h2 className="text-right">DAI/USD</h2>
                        {errors.creditsOffered && <span className="text-red-600">This field is required</span>}
                    </div>
                </div>
            </div>
            {creationState === undefined ?
                <button
                    type="submit"
                    className="py-3 text-lg underline bg-blue-700 text-white w-full"
                >
                    Propose your Project!
                </button> : creationState === 1 ? <p>Loading, please wait</p> : creationState === 2 ? <p>Can't create project, community is not yet active</p> : <p>An error occured, please try again</p>}
        </form>
    );
}

export default CreateProjectForm;