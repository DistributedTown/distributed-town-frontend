import { useState } from 'react';
import bgImages from '../utils/bgImages';
import Button from './Button';
import Card from './Card';
import Logo from './Logo';
import ModalPortal from './ModalPortal';
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
      <ModalPortal>
        <div className="fixed inset-0">
          <div className="flex flex-col bg-gray-100">
            <div className="flex flex-col items-center justify-center flex-grow w-full h-screen p-8 space-y-8">
              <img
                src={backgroundImageSrc}
                className="absolute top-0 block object-cover object-center w-full h-full"
              />
              <div className="z-10 flex flex-row flex-col p-4 space-y-4">
                <div className="flex flex-col items-center justify-center mt-6">
                  <div className="w-full max-w-sm rounded lg:max-w-full lg:flex">
                    <Card className="text-center">
                      <div className="mb-6">
                        {/* <div className="text-xl font-bold text-gray-900">
                      Welcome to
                    </div> */}
                        <Logo className="mx-auto" />
                        <p className="mt-6 text-base text-gray-700">
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
                          className="flex flex-col space-y-6"
                        >
                          <label>
                            <span className="mr-2 text-xl font-bold">
                              Email
                            </span>
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
                      <div className="w-full mt-4 justify-self-end">
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
      </ModalPortal>
    )
  );
};

export default RegistrationModal;
