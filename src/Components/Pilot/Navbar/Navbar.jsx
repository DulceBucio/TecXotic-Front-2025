import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import TasksCopilot from "../../Copilot/TasksCopilot/TasksCopilot";

const NavBar = ({
  pilot,
  copilot,
  getSpeedValue,
  getAlphaValue,
  getBetaValue,
}) => {
  const [option, setOption] = useState(0);

  return (
    <>
      {pilot && (
        <Buttons
          option={option}
          setOption={setOption}
          getSpeedValue={getSpeedValue}
          getAlphaValue={getAlphaValue}
          getBetaValue={getBetaValue}
        />
      )}
      {copilot && <TasksCopilot option={option} setOption={setOption} />}
    </>
  );
};

export default NavBar;
