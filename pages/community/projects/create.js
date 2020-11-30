import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext,
} from "../../../components/Store";
import CreateProjectForm from "../../../components/project/CreateProjectForm"

import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

function CreateProject() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const { register, handleSubmit, errors } = useForm();
    const [communityCategory, setCommunityCategory] = useState()
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

    const getCommunityCategory = async () => {
        const getCommRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/community/${userInfo.communityID}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const communityInfo = await getCommRes.json();
        console.log('comm', communityInfo)
        setCommunityCategory(communityInfo.category)
    }

    useEffect(() => {
        (async () => {
            await getCommunityCategory();
        })();
    }, []);


    return (

        <Layout
            navBar
            flex
            logo
            splash={{
                color: "blue",
                variant: "default",
                alignment: "left",
                isTranslucent: false,
                fullHeight: false
            }}
        >
            <div className="w-full p-8 h-full overflow-scroll">
                <h1 className="underline text-black text-4xl">Create New Project</h1>
                <CreateProjectForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} communityCategory={communityCategory} skill={userInfo.skills[0].skill} />
            </div>
            <div className="w-11/12 fixed flex bottom-0 justify-center mt-3 border-t-2 border-gray-600 bg-white z-10">
                <Link href="/community">
                    <a className="px-64 py-2 my-2 font-bold text-xl border-2 border-denim">Back to Dashboard</a>
                </Link>
            </div>
        </Layout>

    );
}

export default CreateProject;
