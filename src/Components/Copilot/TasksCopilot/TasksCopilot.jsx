import React from "react";
import './TasksCopilot.css'
import TecXotic from '../../../assets/TecXotic.svg'
import Icon from '../../../assets/Icon.svg'
import DNA from "../eDNA/DNA";
import pilot from "../../../assets/pilot.svg"
import { useNavigate } from "react-router-dom";

const TasksCopilot = ({ option, setOption }) => {
    const navigate = useNavigate()

    const pilotView = () => {
        navigate('/')
    }
    return (
        <>
            <div className='navbar-background'>
                <div>
                    <button
                        className={option === 0 ? 'button-selected' : 'button-normal'}
                        onClick={() => setOption(0)}>MEASURE</button>
                    <button
                        className={option === 1 ? 'button-selected' : 'button-normal'}
                        onClick={() => setOption(1)}>eDNA</button>
                    <button
                        className={option === 2 ? 'button-selected' : 'button-normal'}
                        onClick={() => setOption(2)}>360° VIEW</button>
                    <button
                        className={option === 3 ? 'button-selected' : 'button-normal'}
                        onClick={() => setOption(3)}>CARP TRACK</button>
                </div>
                <div className='icons'>
                    <button className='button-text-icon' onClick={pilotView}>
                        <p>Pilot View</p>
                        <img className='copilot-icon' src={pilot}/>
                    </button>
                    <img src={TecXotic}></img>
                    <img src={Icon}></img>
                </div>
            </div>
            <div className='settings-background'>
                {option === 0 && 
                <div className="task-container">
                    <p>a</p>
                </div>
                }
                {option === 1 && 
                <div className="task-container">
                    <DNA />
                </div>
                }
            </div>
        </>
    )
}

export default TasksCopilot