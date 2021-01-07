import { useState } from 'react';
import bgImages from '../utils/bgImages';
import Button from './Button';
import Card from './Card';
import Logo from './Logo';
import TextField from './TextField';

const RegistrationModal = ({
  show,
  loading,
  communityName,
  chosenSkill = 'default',
  handleCreateAccountClick,
  onChooseDifferentCommunity,
}) => {
  const [email, setEmail] = useState('');
  const backgroundImageSrc = bgImages[chosenSkill.toLowerCase()];

  const getArticle = word =>
    'aeiou'.includes(word[0].toLowerCase()) ? 'an' : 'a';

  return (
    show && (
      <div className="fixed inset-0">
        <div className="flex flex-col bg-gray-100">
          <div className="flex flex-col justify-center items-center space-y-8 w-full flex-grow p-8 h-screen">
            <img
              src={backgroundImageSrc}
              className="absolute block top-0 h-full w-full object-cover object-center"
            />
            <div className="p-4 flex flex-col flex-row space-y-4 z-10">
              <div className="flex flex-col justify-center mt-6 items-center">
                <div className="max-w-sm rounded w-full lg:max-w-full lg:flex">
                  <Card className="text-center">
                    <div className="mb-6">
                      {/* <div className="text-gray-900 font-bold text-xl">
                      Welcome to
                    </div> */}
                      <Logo className="mx-auto" />
                      <p className="text-gray-700 text-base mt-6">
                        {`You will be joining ${communityName ||
                          `${getArticle(
                            chosenSkill,
                          )} ${chosenSkill} community`}`}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          handleCreateAccountClick(email);
                        }}
                        className="flex flex-col gap-6"
                      >
                        <label>
                          <span className="mr-2 font-bold text-xl">Email</span>
                          <TextField
                            id="email"
                            type="email"
                            value={email}
                            placeholder="yourmail@me.io"
                            onChange={e => setEmail(e.target.value)}
                            required
                          />
                        </label>
                        <Button filled loading={loading} type="submit">
                          Create Account
                        </Button>
                      </form>
                    </div>
                    <div className="mt-4 w-full justify-self-end">
                      {onChooseDifferentCommunity && (
                        <button
                          type="button"
                          onClick={onChooseDifferentCommunity}
                          className="text-denim"
                        >
                          Select a different community
                        </button>
                      )}
                      <h4 className="text-gray-500">DiTo © 2020</h4>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RegistrationModal;
