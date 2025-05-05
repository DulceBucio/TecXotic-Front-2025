import { useState } from "react";
import Buttons from "../Buttons/Buttons";

const  NavBar = () => {
    const [option,setOption] = useState(0);
    console.log(option)
    return (
    <>
        <Buttons option={option} setOption={setOption}/>
    </>
    )
}

export default NavBar;