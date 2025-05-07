import React, { useState } from 'react';
import './camera.css'
import CAMERA1 from '../../../assets/camera1.svg'
import CAMERA2 from '../../../assets/camera2.svg'
import CameraProp from '../CameraProp/CameraProp';
import { flask_address } from '../../Constants';

const Camera =() => { 
  const [option, setOption] = useState(0);
  const videoSrc = `${flask_address}/video${option + 1}`;

  return (
    <div className='background-camera'>
      <div className='camera-container'> 
        <div className='camera-frame'>
          <CameraProp src={videoSrc} />
        </div>
        <div className='camera-frame'>
          <CameraProp src={videoSrc} />
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Camera;
