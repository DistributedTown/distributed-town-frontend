import {
    MagicContext,
    LoggedInContext,
    TokenContext,
    UserInfoContext,
} from "../../../components/Store";
import GigCard from "../../../components/gig/GigCard"
import SkillsDisplay from "../../../components/SkillsDisplay"

import { useContext, useState, useEffect } from "react";

import Link from 'next/link'

function Gigs() {
    const [token, setToken] = useContext(TokenContext);
    const [userInfo, setUserInfo] = useContext(UserInfoContext);
    const [openGigs, setOpenGigs] = useState();

    useEffect(() => {
        async function fetchGigs() {
            try {
                let resFetchGigs = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/gig?isOpen=true`,
                    {
                        method: "GET",
                        headers: new Headers({
                            Authorization: "Bearer " + token,
                        }),
                    }
                );
                const openGigsResp = await resFetchGigs.json();
                setOpenGigs(openGigsResp);
            } catch (err) {
                console.log(err);
            }
        }
        fetchGigs();
    }, []);

    const takeGig = async (gigID) => {
        try {
            let result = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/gig/${gigID}/accept`,
                {
                    method: "POST",
                    headers: new Headers({
                        Authorization: "Bearer " + token,
                    }),
                }
            );
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="m-20 w-full">
            <h1 className="underline text-black text-4xl">Open Gigs</h1>
            <div className="mt-10 grid grid-cols-3 gap-12 items-baseline">
                {typeof openGigs === "undefined" ? (
                    <div>
                        <h2>Loading Open Gigs...</h2>
                    </div>
                ) : openGigs.length === 0 ? (
                    () => <h2>There are no Open Gigs.</h2>
                ) : (openGigs.map((gig) => {
                    return (
                        <GigCard key={gig._id} gig={gig} />
                    );
                })
                        )}
            </div>
            <div className="flex w-full mt-20">
                <Link href='/community/gigs/create'>
                    <div className="flex py-5 justify-center w-2/6 mr-20 border-2 border-blue-600">
                        <a className="flex flex-col items-center">
                            <p className="text-2xl mb-2">Create new gig</p>
                            <img src="/plusbutton.svg" />
                        </a>
                    </div>
                </Link>
                <SkillsDisplay skills={userInfo.skills} />
            </div>
        </div >
    );
}

export default Gigs;
