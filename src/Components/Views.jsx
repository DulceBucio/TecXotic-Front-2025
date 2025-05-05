import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../Pages/Pilot/Home/Home'
import Copilot from "../Pages/Copilot/Copilot";
const Views = () => {
  return (
    <Routes>
        <Route path = "/" element={<Copilot/>}></Route>
        <Route path = "/Piloto" element={<Home/>}></Route>
    </Routes>
  )
}

export default Views;