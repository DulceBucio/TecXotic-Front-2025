import NavBar from "../../Pilot/Navbar/Navbar"
import Camera from "../../Pilot/Camera/Camera"
import FloatData from "../FloatData/FloatData"
import './CopilotContainer.css'


export default function CopilotContainer() {
    return (
        <>
            <div className="parent">
                <NavBar copilot={true}/>
                <div className="content">
                    <div className="cameras-container">
                        <Camera />
                    </div>
                    <div className="float-data">
                        <FloatData />
                    </div>
                </div>  
            </div>
        </>
    )   
}