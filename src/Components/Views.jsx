import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Pilot/PilotContainer/PilotContainer'
import Copilot from "../Pages/Copilot/Copilot";
const Views = () => {
  return (
    <Routes>
        <Route path = "/Copilot" element={<Copilot/>}></Route>
        <Route path = "/" element={<Home/>}></Route>
    </Routes>
  )
}

export default Views;