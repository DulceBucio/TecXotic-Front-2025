import NavBar from "../../../Components/Pilot/Navbar/Navbar";
import Camera from "../../../Components/Pilot/Camera/Camera";
import BottomNavBar from "../../../Components/Pilot/BottomNavBar/BottomNavBar";
import "./Home.css";
import { web_socket_address } from "../../../Components/Constants";
import { useEffect, useState, useRef } from "react";

const RANGE = 1000,
NEUTRAL = 0;
const THROTTLE_RANGE = 500,
NEUTRAL_THROTTLE = 500;

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const Home = () => {
  const apiURL = "http://192.168.5.1:8080";
  
  const [websocket, setWebsocket] = useState(null);
  const [counter, setCounter] = useState(0);
  const [powerLimit, setPowerLimit] = useState(1.0);
  const powerLimitRef = useRef();
  powerLimitRef.current = powerLimit;
  const isPostingRef = useRef(false);

  
  const stoppedRef = useRef(true);

  let modes = "MANUAL";

  const calculatePotency = (joystick) => {
    return parseInt(joystick * RANGE * powerLimitRef.current);
  };

  const calculateThrottlePotency = (input) => {
    const result =
      input * THROTTLE_RANGE * powerLimitRef.current + NEUTRAL_THROTTLE;
    return Math.min(1000, Math.max(0, parseInt(result)));
  };

  const post_commands_instancestop = async (action) => {
    // if (isPostingRef.current) return; // Skip if a request is on
  
    isPostingRef.current = true; // Lock the request
    try {
      const response = await fetch(`${apiURL}/actuators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actions: action }),
      });
  
      if (!response.ok) {
        console.error("Error sending commands:", response.statusText);
      }
    } catch (error) {
      console.error("Error in post_commands_instance:", error);
    } finally {
      isPostingRef.current = false; // Unlock after done
    }
  };

  const post_commands_instance = async (action) => {
    if (isPostingRef.current) return; // Skip if a request is ongoing
  
    isPostingRef.current = true; // Lock the request
    try {
      const response = await fetch(`${apiURL}/actuators`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ actions: action }),
      });
  
      if (!response.ok) {
        console.error("Error sending commands:", response.statusText);
      }
    } catch (error) {
      console.error("Error in post_commands_instance:", error);
    } finally {
      isPostingRef.current = false; // Unlock after done
    }
  };
  

  let yawInput = 0;

  // websocket init
  useEffect(() => {
    if (counter === 0) {
      const wsClient = new WebSocket(web_socket_address);

      wsClient.onopen = () => {
        setWebsocket(wsClient);
        const start_commands_instance = {
          throttle: 500,
          roll: 0,
          pitch: 0,
          yaw: 0,
          arm_disarm: true,
          mode: "MANUAL",
        };
        wsClient.send(JSON.stringify(start_commands_instance));
        setWebsocket(wsClient);
      };
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const gamepads = navigator.getGamepads();

      const controller = gamepads[0];

      let commands_yaw = 0;
      let commands_pitch = 0;
      let commands_roll = 0;
      let commands_throttle = 500;
      let commands_mode = "MANUAL";


      if (controller) {
        const safeZone = 0.012;

        // lx for roll, ly for pitch
        const lx = controller.axes[0];
        const ly = controller.axes[1];

        // triggers for throttle
        const lt = controller.buttons[6].value;
        const rt = controller.buttons[7].value;

        commands_pitch =
          ly > safeZone || ly < -safeZone ? calculatePotency(-ly) : NEUTRAL;
        commands_roll =
          lx > safeZone || lx < -safeZone ? calculatePotency(lx) : NEUTRAL;

        const throttleInput = rt - lt; // RT increases, LT decreases
        commands_throttle =
          Math.abs(throttleInput) > safeZone
            ? calculateThrottlePotency(throttleInput)
            : NEUTRAL_THROTTLE;

        let yawInput = 0;

        // Simple digital bumpers
        if (controller.buttons[4].pressed) {
          yawInput -= 1;
        }
        if (controller.buttons[5].pressed) {
          yawInput += 1;
        }

        commands_yaw = yawInput !== 0 ? calculatePotency(yawInput) : NEUTRAL;
        // letters for modes
        if (controller.buttons[3].pressed) commands_mode = "MANUAL";
        else if (controller.buttons[1].pressed) commands_mode = "STABILIZE";
        else if (controller.buttons[0].pressed) commands_mode = "ACRO";

        if (controller.buttons[12].pressed) {
          stoppedRef.current = false;
          try {
            post_commands_instance("CLAW_OPEN");
          } catch (error) {
            console.error("Error in post_commands_instance:", error);
          }
        } else if (controller.buttons[13].pressed) {
          stoppedRef.current = false;
          try {
            post_commands_instance("CLAW_CLOSE");
          } catch (error) {
            console.error("Error in post_commands_instance:", error);
          }
        } else if (controller.buttons[14].pressed) {
          stoppedRef.current = false;
          try {
            post_commands_instance("LEFTROLL");
          } catch (error) {
            console.error("Error in post_commands_instance:", error);
          }
        } else if (controller.buttons[15].pressed) {
          stoppedRef.current = false;
          try {
            post_commands_instance("RIGHTROLL");
          } catch (error) {
            console.error("Error in post_commands_instance:", error);
          }
        } 
        else {
          if (!stoppedRef.current) {
            stoppedRef.current = true;
            try {
              post_commands_instancestop("STOP");
            } catch (error) {
              console.error("Error in post_commands_instance:", error);
            }
          }
        }
      }
      if (websocket !== null) {
        websocket.onmessage = (event) => {
          const commands_instance = {
            throttle: commands_throttle,
            roll: commands_roll,
            pitch: commands_pitch,
            yaw: commands_yaw,
            arm_disarm: true,
            mode: commands_mode,
          };
          websocket.send(JSON.stringify(commands_instance));
        };
      }
    }, 4);
  });

  return (
    <div className="Background-home">
      <NavBar />
      <Camera />
      <BottomNavBar />
    </div>
  );
};

export default Home;
