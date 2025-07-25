import React, { useState } from "react";
import Icon from "../../../assets/Icon.svg";
import TecXotic from "../../../assets/TecXotic.svg";
import STARTMEASURING from "../../../assets/startMeasuring.svg";
import copilot from "../../../assets/copilot.svg"
import "./buttons.css";
import { useNavigate } from "react-router-dom";
const Buttons = ({
  option,
  setOption,
  getSpeedValue,
  getAlphaValue,
  getBetaValue,
  onChange,
}) => {
  const [speed, setSpeed] = useState(100);
  const [alpha, setAlpha] = useState(60);
  const [beta, setBeta] = useState(60);

  const navigate = useNavigate();

  const copilotView = () => {
    navigate('/Copilot')
  }

  return (
    <>
      <div className="navbar-background">
        <div>
          <button
            className={option === 0 ? "button-selected" : "button-normal"}
            onClick={() => setOption(0)}
          >
            SETTINGS
          </button>
          <button
            className={option === 1 ? "button-selected" : "button-normal"}
            onClick={() => setOption(1)}
          >
            CONTROLS
          </button>
        </div>
        <div className="icons">
          <button className='button-text-icon' onClick={copilotView}>
            <p>Copilot View</p>
                <img className='copilot-icon' src={copilot}/>
          </button>
          <img src={TecXotic}></img>
          <img src={Icon}></img>
        </div>
      </div>
      <div className="settings-background">
        {option === 0 && (
          <div className="settings-input-range">
            <p>
              SPEED:{" "}
              <span
                style={{
                  display: "inline-block",
                  minWidth: "3ch",
                  textAlign: "right",
                }}
              >
                {speed}
              </span>
            </p>
            <input
              type="range"
              min={0}
              max={300}
              value={speed}
              onChange={(e) => {
                const newSpeed = Number(e.target.value);
                setSpeed(newSpeed);
                getSpeedValue?.(newSpeed);
                onChange?.(newSpeed);
              }}
            />
          </div>
        )}
        {option === 1 && (
          <div className="brightness-wrapper">
            <p className="brightness-label">BRIGHTNESS</p>
            <div className="controls-input-range-container">
              <div className="controls-input-range">
                <p>
                  ALPHA:{" "}
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "3ch",
                      textAlign: "right",
                    }}
                  >
                    {alpha}
                  </span>
                </p>
                <input
                  type="range"
                  min={0}
                  max={200}
                  value={alpha}
                  onChange={(e) => {
                    const newAlpha = Number(e.target.value);
                    setAlpha(newAlpha);
                    getAlphaValue?.(newAlpha);
                    onChange?.(newAlpha);
                  }}
                />
              </div>
              <div className="controls-input-range">
                <p>
                  BETA:{" "}
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "3ch",
                      textAlign: "right",
                    }}
                  >
                    {beta}
                  </span>
                </p>
                <input
                  type="range"
                  min={0}
                  max={150}
                  value={beta}
                  onChange={(e) => {
                    const newBeta = Number(e.target.value);
                    setBeta(newBeta);
                    getBetaValue?.(newBeta);
                    onChange?.(newBeta);
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Buttons;
