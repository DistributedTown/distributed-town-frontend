import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRModal = (props, {
    display = 'block',
    position = 'fixed',
    zIndex = 2,
    left = 0,
    top = 0,
    width = '100%',
    height = '100%',
    overflow = 'auto',
    backgroundColor = 'rgba(0,0,0,0.8)'
}) => {
    return (
    <div style={{ display, position, zIndex, left, top, width, height, overflow, backgroundColor}}>
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
            <div className="flex-col mt-3 mb-3">
                <div id="qrBackground" className="rounded-3xl w-8/12 pt-8 pb-4 mb-4 bg-grey-500 m-auto ">
                <QRCode
                value={JSON.stringify(props.qrCodeObj)}
                logoImage="/dark-dito.svg"
                logoWidth={140}
                logoHeight={140}
                bgColor="#E9F2D5"
                size={420}
                className="m-auto mb-25"
                />
                </div>

                <div id="joinModalText" className="m-0 bg-white m-auto text-center pt-1 pr-3 pl-3 pb-1 rounded-2xl text-xl">
                    <p className="">{props.modalText}</p>
                </div>
                
                <div className="m-auto">
                    {/* DELETE THE BUTTON AFTER LONGPOLLING */}
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={props.closeOnClick}>Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default QRModal;