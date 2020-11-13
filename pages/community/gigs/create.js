import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext,
} from "../../../components/Store";
import CreateGigForm from "../../../components/gig/CreateGigForm"

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

function CreateGig() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const { register, handleSubmit, errors } = useForm();
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
        const gigTitle = data.gigTitle
        const gigDescription = data.gigDescription
        const creditsOffered = data.creditsOffered
        delete data.gigTitle
        delete data.gigDescription
        delete data.creditsOffered

        Object.filter = (obj, predicate) =>
            Object.keys(obj)
                .filter(key => predicate(obj[key]))
                .reduce((res, key) => (res[key] = obj[key], res), {});

        let skills = Object.filter(data, data => data === true);
        console.log(skills, userInfo)
        postNewGig(gigTitle, gigDescription, Object.keys(skills), creditsOffered)
    };


    return (
        <>
            <Layout />
            <div className="w-full h-screen p-8">
                <h1 className="underline text-black text-4xl">Create New Gig</h1>
                <CreateGigForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} />
            </div>
        </>

    );
}

export default CreateGig;
