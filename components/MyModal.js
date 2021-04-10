import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const MyModal = (props, {
    display = 'block', /* Hidden by default */
    position = 'fixed', /* Stay in place */
    zIndex = 1, /* Sit on top */
    left = 0,
    top = 0,
    width = '100%', /* Full width */
    height = '100%', /* Full height */
    overflow = 'auto', /* Enable scroll if needed */
    backgroundColor = 'rgba(0,0,0,0.4)' /* Black w/ opacity */
}) => {
    return (
    <div id="myModal" style={{ display, position, zIndex, left, top, width, height, overflow, backgroundColor}}>
        <div style={{
              backgroundColor: 'rgba(105,105,105, 0.95)',
              margin: '15% auto',
              padding:'20px',
              border: '1px solid #888',
              width: '60%' /* Could be more or less, depending on screen size */}}
              className="flex-col justify-center"
        >
            {/* <span className="close">&times;</span> */}
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
              className="m-0"
            />

            <div className="w-80 m-0 bg-white m-auto">
                <p className="">{props.modalText}</p>
            </div>
            <div className="m-auto">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={props.toggleModal}>Close
                </button>
                </div>
        </div>
    </div>
    )
}

export default MyModal;