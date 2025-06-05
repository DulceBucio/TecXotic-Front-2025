import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import TasksCopilot from "../../Copilot/TasksCopilot/TasksCopilot";

const NavBar = ({ pilot, copilot }) => {
    const [option, setOption] = useState(0);
    console.log(option);
    
    return (
        <>
            {pilot && <Buttons option={option} setOption={setOption} />}
            {copilot && <TasksCopilot option={option} setOption={setOption} />}
        </>
    );
};

export default NavBar;
