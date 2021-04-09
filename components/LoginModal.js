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
      <Card className="flex flex-col space-y-6">
        <Logo className="mx-auto w-88" />
        <hr />
        <Button
          icon={<img width="40" src='/dito-logo.svg' />}
          onClick={() => onSkillWalletLogin()}
        >
          <span>SkillWallet</span>
        </Button>
      </Card>
    </Modal>
  );
}
