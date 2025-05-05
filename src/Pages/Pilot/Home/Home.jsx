import NavBar from "../../../Components/Pilot/Navbar/Navbar";
import Camera from "../../../Components/Pilot/Camera/Camera";
import BottomNavBar from "../../../Components/Pilot/BottomNavBar/BottomNavBar"
import "./Home.css"
const  Home = () => {
    return (
        <div className="Background-home">
            <NavBar/>
            <Camera/>
            <BottomNavBar/>
        </div>
    )
}

export default Home;