import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext
} from "../../../components/Store";
import CreateGigForm from "../../../components/gig/CreateGigForm"

import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";


import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

function CreateGig() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const { register, handleSubmit, errors } = useForm();
    const [communityCategory, setCommunityCategory] = useState()
    const router = useRouter();

    async function postNewGig(gigTitle, gigDescription, gigSkills, creditsOffered) {
        try {
            const payload = {
                userID: userInfo._id,
                title: gigTitle,
                description: gigDescription,
                skills: gigSkills,
                creditsOffered: parseInt(creditsOffered),
            };

            console.log("create gigs payload", JSON.stringify(payload));

            console.log("create gigs token", token);
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
            })

            router.push("/community/gigs");
        } catch (err) {
            console.error(err);
        }
    }

    const onSubmit = data => {
        console.log(data)
        // const gigTitle = data.gigTitle
        // const gigDescription = data.gigDescription
        // const creditsOffered = data.creditsOffered
        // delete data.gigTitle
        // delete data.gigDescription
        // delete data.creditsOffered

        // Object.filter = (obj, predicate) =>
        //     Object.keys(obj)
        //         .filter(key => predicate(obj[key]))
        //         .reduce((res, key) => (res[key] = obj[key], res), {});

        // let skills = Object.filter(data, data => data === true);
        // postNewGig(gigTitle, gigDescription, Object.keys(skills), creditsOffered)
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
                color: "red",
                variant: "default",
                alignment: "left",
                isTranslucent: false,
                fullHeight: false
            }}
        >
            <div className="w-full p-8 h-full overflow-scroll bg-white">
                <h1 className="underline text-black text-4xl">Create New Gig</h1>
                <CreateGigForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} communityCategory={communityCategory} skill={userInfo.skills[0].skill} />
            </div>
            <div className="w-11/12 fixed flex bottom-0 justify-center mt-3 border-t-2 border-gray-600 bg-white z-10">
                <Link href="/community">
                    <a className="px-64 py-2 my-2 font-bold text-xl border-2 border-denim">Back to Dashboard</a>
                </Link>
            </div>
        </Layout>

    );
}

export default CreateGig;
