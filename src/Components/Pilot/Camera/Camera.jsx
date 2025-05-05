import React, { useState } from 'react';
import './camera.css'
import CAMERA1 from '../../../assets/camera1.svg'
import CAMERA2 from '../../../assets/camera2.svg'
const Camera =() => { 
  const [option, setOption] = useState(0);
  return (
    <div className='background-camera'>
      <div>
      <p>{option === 0 ? 'Camera 1' : 'Camera 2'}</p>
      </div>
      <div className='buttons'>
        <button 
          className={option === 0 ? 'button-camera-selected' : 'button-camera'}
          onClick={()=>{setOption(0)}}>
          <img src={CAMERA1}/>
        </button>
        <button
          className={option === 1 ? 'button-camera-selected' : 'button-camera'}
          onClick={()=>{setOption(1)}}>
          <img src={CAMERA2}/>
        </button>
      </div>
    </div>
  )
}

export default Camera;
