import RegistrationForm from "./RegistrationForm"

import bgImages from "../../utils/bgImages";



const RegistrationModal = ({ selectedPill, skills, handleCreateAccountClick, email, setEmail, showRegisterModal, getCommunityBgImg }) => {



    const getSelectedSkillName = (selectedPill) => {
        return typeof (selectedPill !== "undefined") && selectedPill >= 0
            ? ` ${skills[selectedPill]}`
            : `${skills[0]}`;
    };

    return (<div className="modalWrapper">
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="flex flex-col space-y-8 container mx-auto h-screen">
                    <img src={getCommunityBgImg(selectedPill)} />
                </div>
                <div className="flex flex-col justify-between items-center space-y-8 w-full bg-white flex-grow p-8 h-screen">
                    <div className="p-4 flex flex-col flex-row space-y-4">
                        {selectedPill >= 0 ? (
                            <div className="flex flex-col justify-center mt-6 items-center">
                                <RegistrationForm
                                    onSubmit={handleCreateAccountClick}
                                    setEmail={setEmail}
                                    title="Welcome to Dito"
                                    email={email}
                                    subtitle={`You will be joining a ${getSelectedSkillName(
                                        selectedPill
                                    )} community`}
                                    cta="Create Account"
                                    placeholderText="Please enter your email"
                                />
                                <a
                                    onClick={showRegisterModal}
                                    href="#"
                                    className=" pt-2 text-gray-500 underline"
                                >
                                    Select a different community
                      </a>
                            </div>
                        ) : (
                                <></>
                            )}
                    </div>
                    <div className="w-full">
                        <h4 className="text-gray-500"> DiTo © 2020</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default RegistrationModal


