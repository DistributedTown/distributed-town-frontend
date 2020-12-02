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
    const [creationState, setCreationState] = useState()
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const { register, handleSubmit, errors, getValues } = useForm();
    const [communityCategory, setCommunityCategory] = useState()
    const router = useRouter();

    async function postNewProject(projectTitle, projectDescription, projectSkills, fundsNeeded) {
        try {
            const payload = {
                title: projectTitle,
                description: projectDescription,
                skills: projectSkills,
                creditsOffered: parseInt(fundsNeeded),
                isProject: true
            };

            setCreationState(1)

            console.log("create project payload", JSON.stringify(payload));

            console.log("create project token", token);
            let result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gig`, {
                method: "POST",
                headers: new Headers({
                    Authorization: "Bearer " + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(payload),
            });

            result.json().then(data => {
                console.log(data)
                if (data.message === "The community is not yet active.") {
                    setCreationState(2)
                } else {
                    router.push("/community/projects");
                }
            })
        } catch (err) {
            console.error(err);
            setCreationState(3)

        }
    }

    const onSubmit = data => {
        console.log(data)
        const projectTitle = data.projectTitle
        const projectDescription = data.projectDescription
        const creditsOffered = data.creditsOffered
        delete data.projectTitle
        delete data.projectDescription
        delete data.creditsOffered
        delete data.commitment

        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});

        let skills = Object.filter(data, data => (data[0] === "on" || data === true));
        postNewProject(projectTitle, projectDescription, Object.keys(skills), creditsOffered)
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
                <CreateProjectForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} communityCategory={communityCategory} skill={userInfo.skills[0].skill} getValues={getValues} />
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
