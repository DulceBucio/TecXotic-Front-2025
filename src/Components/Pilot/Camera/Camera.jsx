import React, { useState } from 'react';
import './camera.css'

import CameraProp from '../CameraProp/CameraProp';
import { flask_address } from '../../Constants';

const Camera = () => { 
  const [option, setOption] = useState(0);
  const videoSrc = `${flask_address}/video${option + 1}`;

  return (
    <div className='background-camera'>
      <div className='camera-container'> 
        <div className='camera-frame'>
          <CameraProp src={`${flask_address}/video1`} />
        </div>
        <div className='camera-frame'>
          <CameraProp src={`${flask_address}/video2`} />
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Camera;
