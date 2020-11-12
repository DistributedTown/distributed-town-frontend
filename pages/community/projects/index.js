import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext,
} from "../../../components/Store";
import ProjectCard from "../../../components/project/ProjectCard"
import SkillsDisplay from "../../../components/SkillsDisplay"

import { useContext, useState, useEffect } from "react";

import Link from 'next/link'

function Projects() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const [openGigs, setOpenGigs] = useState([]);

    const projects = [
        { _id: "1", projectTitle: "Test project 1", projectDescription: "Test description", skillsNeeded: ["skill 1", "skill 2"], fundsNeeded: 10 },
        { _id: "2", projectTitle: "Test project 2", projectDescription: "Another Test description", skillsNeeded: ["skill 3", "skill 2"], fundsNeeded: 1000 },
        { _id: "3", projectTitle: "Test project 3", projectDescription: "Test description", skillsNeeded: ["skill 1", "skill 3"], fundsNeeded: 20 },
        { _id: "4", projectTitle: "Test project 4", projectDescription: "Test description Test description Test description Test description", skillsNeeded: ["skill 1", "skill 4"], fundsNeeded: 40 },
    ]

    return (
        <div className="m-20 w-full">
            <h1 className="underline text-black text-4xl">Projects</h1>
            <div className="mt-10 grid grid-cols-3 gap-12 items-baseline">
                {typeof projects === "undefined" ? (
                    <div>
                        <h2>Loading projects...</h2>
                    </div>
                ) : projects.length === 0 ? (
                    () => <h2>There are no projects.</h2>
                ) : (projects.map((project) => {
                    return (
                        <ProjectCard key={project._id} project={project} />
                    );
                })
                        )}
            </div>


            <div className="flex w-full mt-20">
                <Link href='/community/projects/create'>
                    <div className="flex py-5 justify-center w-2/6 mr-20 border-2 border-blue-600">
                        <a className="flex flex-col items-center">
                            <p className="text-2xl mb-2">Create new project</p>
                            <img src="/plusbutton.svg" />
                        </a>
                    </div>
                </Link>
                <SkillsDisplay skills={userInfo.skills} />
            </div>
        </div>
    );
}

export default Projects;
