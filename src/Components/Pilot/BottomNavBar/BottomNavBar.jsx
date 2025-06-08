import React, { useState } from 'react';
import WIFI from '../../../assets/Wifi.svg'
import CONTROL from '../../../assets/control.svg'
import TAKEPHOTO from '../../../assets/takePhoto.svg'
import PAUSE from '../../../assets/pause.svg'
import RECORD from '../../../assets/record.svg'
import Crosshair from '../CrossHair/CrossHair';
import "./BottomNavBar.css"
import { flask_address } from '../../Constants';
const BottomNavBar =({rotation, roll, pitch, yaw}) => { 

    const TakePhoto = async (camera) => {
        try {
            const response = await fetch(`${flask_address}/screenshot/${camera}`, {
                method: "GET"
            })

            if (!response.ok) {
                throw new Error('Failed to fetch image')
            }

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'screenshot.jpg';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) { 
            console.error('Error taking photo...', error)
        }
    };
    return (
        <div className='Background-Bottom-Navbar'>
            
            <button className='button-icon'>
                <img src={WIFI}/>
            </button>
            
            <button className='button-icon'> 
                <img src={CONTROL}/>
            </button>
            
            <p className='button-icon'>PITCH: {pitch}°</p>

            <p className='button-icon'>ROLL: {roll}°</p>
            <Crosshair rotation={rotation} />
            
            <p className='button-icon'>YAW: {yaw}°</p>
            
            <button className='button-text-icon' onClick={() => TakePhoto(1)}>
                <p>CAMERA <br/>1</p>
                <img src={TAKEPHOTO}/>
            </button>
            
            <button className='button-text-icon' onClick={() => TakePhoto(2)}>
                <p>CAMERA <br/>2</p>
                <img src={TAKEPHOTO}/>
            </button>
        </div>
    )
}

export default BottomNavBar;
