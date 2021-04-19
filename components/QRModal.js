import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRModal = (props, {
    display = 'block',
    position = 'fixed',
    zIndex = 1,
    left = 0,
    top = 0,
    width = '100%',
    height = '100%',
    overflow = 'auto',
    backgroundColor = 'rgba(0,0,0,0.8)'
}) => {
    return (
    <div id="qrModal" style={{ display, position, zIndex, left, top, width, height, overflow, backgroundColor}}>
        <div style={{
              backgroundColor: 'rgba(105,105,105, 0.85)',
              margin: '5% auto',
              padding:'20px',
              border: '1px solid #888',
              width: '50%',
              borderRadius: '25px'}}
              className="flex-col justify-center"
        >
            {/* <span className="close">&times;</span> */}
            <div className="mt-3 mb-3">
                <QRCode
                value={`{
                    "address":"0xe5dfc64fad45122545b0a5b88726ff7858509600"
                    "tokenId":0,
                    "hash":"wnGO5OQLkAEJ"
                }`}
                logoImage="/isologo.svg"
                logoWidth={140}
                logoHeight={140}
                bgColor="gold"
                size={420}
                className="m-auto mb-25"
                />

                <div id="joinModalText" className="m-0 bg-white m-auto text-center pt-1 pr-3 pl-3 pb-1">
                    <p className="">{props.modalText}</p>
                </div>
                
                <div className="m-auto">
                    {/* DELETE THE BUTTON AFTER LONGPOLLING */}
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={props.toggleModal}>Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default QRModal;