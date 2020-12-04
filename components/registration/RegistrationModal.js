import { useState } from 'react';
import RegistrationForm from './RegistrationForm';

const RegistrationModal = ({
  handleCreateAccountClick,
  onChooseDifferentCommunity,
}) => {
  const [email, setEmail] = useState('');

  return (
    <div className="modalWrapper">
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="flex flex-col space-y-8 container mx-auto h-screen">
            {/* TODO: Add community background */}
            <img />
          </div>
          <div className="flex flex-col justify-between items-center space-y-8 w-full bg-white flex-grow p-8 h-screen">
            <div className="p-4 flex flex-col flex-row space-y-4">
              <div className="flex flex-col justify-center mt-6 items-center">
                <RegistrationForm
                  onSubmit={e => handleCreateAccountClick(e, email)}
                  setEmail={setEmail}
                  title="Welcome to Dito"
                  email={email}
                  subtitle={`You will be joining a "TODO: Get community name" community`}
                  cta="Create Account"
                  placeholderText="Please enter your email"
                />
                <a
                  onClick={onChooseDifferentCommunity}
                  href="#"
                  className=" pt-2 text-gray-500 underline"
                >
                  Select a different community
                </a>
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-gray-500"> DiTo © 2020</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
