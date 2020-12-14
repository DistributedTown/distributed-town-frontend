import { useState } from 'react';
import bgImages from '../../utils/bgImages';
import RegistrationForm from './RegistrationForm';

const RegistrationModal = ({
  loading,
  communityName,
  chosenSkill = 'default',
  handleCreateAccountClick,
  onChooseDifferentCommunity,
}) => {
  const [email, setEmail] = useState('');
  const backgroundImageSrc = bgImages[chosenSkill.toLowerCase()];

  return (
    <div className="modalWrapper">
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col container hidden sm:block">
          <img
            src={backgroundImageSrc}
            className="h-full object-cover object-center hidden sm:block"
          />
        </div>
        <div className="flex flex-col justify-center items-center space-y-8 w-full bg-white flex-grow p-8 h-screen">
          <img
            src={backgroundImageSrc}
            className="absolute block sm:hidden top-0 h-full w-full object-cover object-center"
          />
          <div className="p-4 bg-white flex flex-col flex-row space-y-4 z-10">
            <div className="flex flex-col justify-center mt-6 items-center">
              <RegistrationForm
                loading={loading}
                onSubmit={() => handleCreateAccountClick(email)}
                setEmail={setEmail}
                title="Welcome to Dito"
                email={email}
                subtitle={`You will be joining ${communityName ||
                  `a ${chosenSkill} community`}`}
                cta="Create Account"
                placeholderText="Please enter your email"
              />
              {onChooseDifferentCommunity && (
                <a
                  onClick={onChooseDifferentCommunity}
                  href="#"
                  className=" pt-2 text-gray-500 underline"
                >
                  Select a different community
                </a>
              )}
            </div>
          </div>
          <div className="w-full z-10 justify-self-end">
            <h4 className="text-gray-500"> DiTo © 2020</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
