import React, { useState } from 'react';
import Icon from '../../../assets/Icon.svg'
import TecXotic from '../../../assets/TecXotic.svg'
import './buttons.css'
const Buttons =({ option, setOption, getSliderValue, onChange }) => { 
    const [speed, setSpeed] = useState(100);
    return (
    <>
    <div className='navbar-background'> 
        <div>
            <button 
                className={option === 0 ? 'button-selected' : 'button-normal'}
                onClick={() => setOption(0)}>SETTINGS</button>
            <button 
                className={option === 1 ? 'button-selected' : 'button-normal'}
                onClick={() => setOption(1)}>CONTROLS</button>
        </div>
        <div className='icons'>
            <img src={TecXotic}></img>
            <img src={Icon}></img>
        </div>
    </div> 
    <div className='settings-background'>
        {option === 0  &&  
        <div className='settings-input-range'>
            <p>
            SPEED: <span style={{ display: 'inline-block', minWidth: '3ch', textAlign: 'right' }}>{speed}</span>
            </p>
            <input 
                type='range'
                min={0}
                max={300}
                value={speed}
                onChange={(e) => {
                    const newSpeed = Number(e.target.value);
                    setSpeed(newSpeed);
                    getSliderValue?.(newSpeed);
                    onChange?.(newSpeed);
                }}
            />
        </div>
        }
        {option === 1  &&  
        <p>Vista controls</p>
        }
    </div>  
    </>
  )
}

export default Buttons;
