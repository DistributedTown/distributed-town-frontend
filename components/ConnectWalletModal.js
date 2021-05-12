import React, {useState} from 'react';
import QRModal from '../components/QRModal';

const ConnectWalletModal = (props) => {
    const [showQRModal, setShowQRModal] = useState(false);
    // const toggleQRModal = () => setShowQRModal(!showQRModal);

    const showNewQRModal = () => {
        
        // props.toggleModal();
        // const connectWallet = document.getElementById("topDiv");
        // connectWallet.style.display = 'none';
        setShowQRModal(!showQRModal);

        // console.log(showQRModal);
    };

    const closeQR = () => {
        setShowQRModal(!showQRModal);
        props.toggleModal();
    }

    const hideQRModal = () => setShowQRModal(!showQRModal);

    const modalText = [
        'Scan with your ', 
        <a href="" className="underline text-blue-600 hover:text-blue-400 visited:text-purple-400" >SkillWallet App</a>, 
        ' to login to your community.'];

    return (
        <div id="topDiv">
            <div id="modalWindow" className="flex-col justify-center"> 
                <div className="flex flex-col justify-center py-7">
                    <div className="flex justify-center mb-12">
                        <img src="/wallet.svg" className="w-8 mx-4" />
                        <h2 className="underline text-3xl text-gray-100">Connect your wallet</h2>
                    </div>

                    <div className="flex justify-center">
                        <button 
                            onClick={() => showNewQRModal()}  
                            className="rounded-2xl bg-gray-50 px-10 py-3 w-48 flex justify-between items-center">
                            <img src="/qr-code.svg" className="w-4"/>
                            <p className="px-2 text-xl">Skillwallet</p>
                        </button>
                    </div>
                </div>
            </div>
            { showQRModal ? <QRModal key={'qr'} toggleModal={showNewQRModal} closeOnClick={closeQR} modalText={modalText} /> : null}
        </div>
    );
}


export default ConnectWalletModal;