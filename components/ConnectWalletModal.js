import React, { useState, useEffect } from 'react';
import QRModal from '../components/QRModal';
import { generateNonce } from '../api/users'
import TorusModal from './TorusModal';
    
const ConnectWalletModal = (props) => {
    const [showQRModal, setShowQRModal] = useState(false);
    const [showTorusModal, setShowTorusModal] = useState(false);
    const [nonce, setNonce] = useState();

    const showNewQRModal = () => {
        setShowQRModal(!showQRModal);
    };

    const showNewTorusModal = () => {
        setShowTorusModal(!showTorusModal)
    }

    const closeQR = () => {
        setShowQRModal(!showQRModal);
        props.toggleModal();
    }

    useEffect(() => {
        const getNonce = async () => {
            const nonce = await generateNonce(1, -1);
            setNonce(nonce);
        }
        getNonce();
    }, [])

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
                            <img src="/qr-code.svg" className="w-4" />
                            <p className="px-2 text-xl">SkillWallet</p>
                        </button>
                        <button
                            onClick={() => showNewQRModal()}
                            className="rounded-2xl bg-gray-50 px-10 py-3 w-48 flex justify-between items-center">
                            <img src="/metamask.svg" className="w-4" />
                            <p className="px-2 text-xl">Metamask</p>
                        </button>
                        <button
                            onClick={() => showNewTorusModal()}
                            className="rounded-2xl bg-gray-50 px-10 py-3 w-48 flex justify-between items-center">
                            <img src="/torus.jpeg" className="w-4" />
                            <p className="px-2 text-xl">Torus</p>
                        </button>
                    </div>
                </div>
            </div>
            { showQRModal
                ? <QRModal
                    key={'qr'}
                    toggleModal={showNewQRModal}
                    closeOnClick={closeQR}
                    modalText={modalText}
                    qrCodeObj={
                        { nonce }
                    } />
                : null}

            { showTorusModal
                ? <TorusModal />
                : null}
        </div>
    );
}


export default ConnectWalletModal;