import { FaFacebook, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Button from './Button';
import Card from './Card';

export default function InviteModal({ open, onClose, shareLink }) {
  const handleCopyLinkToClipboard = () => {
    const text = `Hey there! We've got some funds from DistributedTown,
    join my community - and let's work on something meaningful together! ${shareLink}`;
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Async: Copying to clipboard was successful!');
      },
      err => {
        console.error('Async: Could not copy text: ', err);
      },
    );
  };

  return (
    <div
      className={`fixed inset-0 h-screen w-screen bg-opacity-50 bg-black flex justify-center items-center ${
        open ? 'flex' : 'hidden'
      }`}
      onClick={e => e.currentTarget === e.target && onClose()}
    >
      <Card className="bg-white flex flex-col gap-6">
        <Button>
          <a
            target="_blank"
            rel="noreferrer"
            href={encodeURI(`https://twitter.com/intent/tweet?text=Hey there! We've got some funds from DistributedTown,
join my community - and let's work on something meaningful together! ${shareLink}`)}
          >
            <FaTwitter className="inline-block mr-2" />
            Twitter
          </a>
        </Button>
        <Button>
          <a
            href={encodeURI(`https://www.facebook.com/sharer/sharer.php?href=`)}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              const text = encodeURIComponent(
                `Hey there! We've got some funds from DistributedTown, join my community - and let's work on something meaningful together!`,
              );
              console.log(text);
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${text}`,
                'facebook-share-dialog',
                'width=626,height=436',
              );
            }}
          >
            <FaFacebook className="inline-block mr-2" />
            Facebook
          </a>
        </Button>
        <Button>
          <a
            target="_blank"
            rel="noreferrer"
            href={encodeURI(`https://www.linkedin.com/shareArticle?mini=true&url=http://developer.linkedin.com&title=DiTo&summary=Hey there! We've got some funds from DistributedTown,
              join my community - and let's work on something meaningful together! ${shareLink}`)}
          >
            <FaLinkedin className="inline-block mr-2" />
            LinkedIn
          </a>
        </Button>
        <Button onClick={handleCopyLinkToClipboard}>
          <FaLink className="inline-block mr-2" />
          Copy link
        </Button>
      </Card>
    </div>
  );
}
