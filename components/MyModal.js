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
              width: '60%' /* Could be more or less, depending on screen size */
        }}>
            <span class="close">&times;</span>
            <QRCode
              value={`{
                "address":"0xe5dfc64fad45122545b0a5b88726ff7858509600"
                "tokenId":0,
                "hash":"wnGO5OQLkAEJ"
              }`}
              logoImage="/isologo.svg"
              logoWidth={60}
              logoHeight={60}
              bgColor="transparent"
              size={180}
            />
            <p>{props.modalText}</p>
            <button onClick={props.toggleModal}>Close</button>
        </div>
    </div>
    )
}

export default MyModal;