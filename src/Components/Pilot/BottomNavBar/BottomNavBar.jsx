import React, { useState } from 'react';
import WIFI from '../../../assets/Wifi.svg'
import CONTROL from '../../../assets/control.svg'
import TAKEPHOTO from '../../../assets/takePhoto.svg'
import PAUSE from '../../../assets/pause.svg'
import RECORD from '../../../assets/record.svg'
import "./BottomNavBar.css"
const BottomNavBar =({option,setOption}) => { 
    const [record,setRecord] = useState(0);

    return (
        <div className='Background-Bottom-Navbar'>
            
            <button className='button-icon'>
                <img src={WIFI}/>
            </button>
            
            <button className='button-icon'> 
                <img src={CONTROL}/>
            </button>
            
            <p className='button-icon'>PITCH 0°</p>
            <p>Balanceador</p>
            <p className='button-icon'>YAW 0°</p>
            
            <button className='button-text-icon' onClick={() => setRecord(record === 0 ? 1 : 0)}>
                <p>
                    {record === 0 ? 
                        (   
                            <p>Record</p>   
                        ) : 
                        (   
                            <p>Stop <br/> Recording</p>
                        )
                    }
                </p>
                <img src={record === 0 ? RECORD : PAUSE}/>
            </button>
            
            <button className='button-text-icon'>
                <p>TAKE <br/>PHOTO</p>
                <img src={TAKEPHOTO}/>
            </button>
        </div>
    )
}

export default BottomNavBar;
