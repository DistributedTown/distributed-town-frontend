import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext,
} from "../../../components/Store";
import CreateProjectForm from "../../../components/project/CreateProjectForm"

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";

function CreateProject() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const { register, handleSubmit, errors } = useForm();
    const router = useRouter();

    // async function postNewProject(projectTitle, projectDescription, projectSkills, fundsNeeded) {
    //     try {
    //         const payload = {
    //             userID: userInfo._id,
    //             title: projectTitle,
    //             description: projectDescription,
    //             skills: projectSkills,
    //             fundsNeeded: parseInt(fundsNeeded),
    //         };

    //         console.log("create project payload", JSON.stringify(payload));

    //         console.log("create project token", token);
    //         let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
    //             method: "POST",
    //             headers: new Headers({
    //                 Authorization: "Bearer " + token,
    //                 'Content-Type': 'application/json'
    //             }),
    //             body: JSON.stringify(payload),
    //         });

    //         result.json().then(data => {
    //             console.log(data)
    //         })

    //         router.push("/community/projects");
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    const onSubmit = data => {
        console.log(data)
        router.push("/community/projects");

    };


    return (
        <div className="w-full h-screen p-8 space-y-3">
            <h1 className="underline text-black text-4xl">Create New Project</h1>
            <CreateProjectForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
        </div>
    );
}

export default CreateProject;
