import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import TextField from './TextField';
import Modal from './Modal';

export default function LoginModal({
  open,
  onClose,
  onLoginWithEmail,
  onLoginWithMetamask,
}) {
  const [email, setEmail] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Card className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form
          className="flex flex-col space-y-2"
          onSubmit={e => {
            e.preventDefault();
            onLoginWithEmail(email);
          }}
        >
          <label className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 sm:items-center">
            <span className="font-bold">Email</span>
            <TextField
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <Button filled type="submit">
            Login
          </Button>
        </form>
        <hr />
        <Button
          icon={<img width="40" src="/metamask-fox.svg" />}
          onClick={() => onLoginWithMetamask()}
        >
          <span>Login with Metamask</span>
        </Button>
      </Card>
    </Modal>
  );
}
