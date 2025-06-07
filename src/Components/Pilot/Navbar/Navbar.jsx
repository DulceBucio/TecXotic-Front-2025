import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import TasksCopilot from "../../Copilot/TasksCopilot/TasksCopilot";

const NavBar = ({ pilot, copilot, getSliderValue }) => {
    const [option, setOption] = useState(0);

    return (
        <>
            {pilot && <Buttons option={option} setOption={setOption} getSliderValue={getSliderValue}/>}
            {copilot && <TasksCopilot option={option} setOption={setOption} />}
        </>
    );
};

export default NavBar;
