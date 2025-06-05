/* eslint-disable no-unused-vars */
import { useState } from "react";
import PilotContainer from "../../Components/Pilot/PilotContainer/PilotContainer";
//import { socket_address } from "../../Constants";

const  NavBar = () => {
    const [wifiStatus, setWifiStatus] = useState(true);
    const [gamepadStatus, setGamepadStatus] = useState(true);
    const [flagStatus, setFlagStatus] = useState(false);
    const [gearStatus, setGearStatus] = useState(true);
    const [rotation, setRotation] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(90);
    return (
    <>
        <PilotContainer wifiStatus={wifiStatus} gamepadStatus={gamepadStatus} flagStatus={flagStatus} gearStatus={gearStatus} rotation={rotation} pitch={pitch} yaw={yaw}/>
    </>
    )
}

export default NavBar;