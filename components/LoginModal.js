import Button from './Button';
import Card from './Card';
import Modal from './Modal';
import Logo from './Logo';

export default function LoginModal({
  open,
  onClose,
  onSkillWalletLogin,
}) {

  return (
    <Modal open={open} onClose={onClose}>
      <Card className="flex flex-col space-y-6 w-96">
        {/* <Logo className="mx-auto w-88" /> */}
        <div className="flex justify-end">
          <button onClick={onClose}><img src="/cancel.svg" className="w-4"></img></button>
        </div>
        <h2 id="loginModal">Login</h2>
        <hr />
        <br />
        <Button
          // icon={<img width="40" src='/dito-logo.svg' />}
          style={{backgroundColor: '#1E739A', color: 'white', borderRadius: '40px'}}
          onClick={() => onSkillWalletLogin()}
        >
          <span>SkillWallet</span>
        </Button>
      </Card>
    </Modal>
  );
}
