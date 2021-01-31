import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import TextField from './TextField';
import Modal from './Modal';
import Logo from './Logo';
import { AiOutlineMail } from 'react-icons/ai';
export default function LoginModal({
  open,
  onClose,
  onLoginWithEmail,
  onLoginWithMetamask,
}) {
  const [email, setEmail] = useState('');
  const [showEmailButton, setShowEmailButton] = useState(true);

  return (
    <Modal open={open} onClose={onClose}>
      <Card className="flex flex-col space-y-6">
        <Logo className="mx-auto w-88" />
        <hr />
        <form
          className="flex flex-col space-y-2"
          onSubmit={e => {
            e.preventDefault();
            onLoginWithEmail(email);
          }}
        >
          {showEmailButton ?
            <Button filled type="submit" onClick={() => setShowEmailButton(false)}>

              <a className="flex items-center justify-center space-x-4 text-xl">
                <AiOutlineMail />
                <span>Email</span>
              </a>
            </Button> :
            <label className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
              <TextField
                type="email"
                required
                value={email}
                placeholder="your.email@example.com"
                onChange={e => setEmail(e.target.value)}
              />
            </label>
          }


        </form>
        <hr />
        <Button
          icon={<img width="40" src="/metamask-fox.svg" />}
          onClick={() => onLoginWithMetamask()}
        >
          <span>Metamask</span>
        </Button>
      </Card>
    </Modal>
  );
}
