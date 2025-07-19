import React, { useState, useRef, useEffect } from "react";
import './MeasureTask.css'
import { flask_address } from "../../Constants";

const MeasureTask = () => {
    const [alpha, setAlpha] = useState(60);
    const [beta, setBeta] = useState(60);
    const [measure, setMeasure] = useState(0);
    const [isCalibrating, setIsCalibrating] = useState(true);
    const pollRef = useRef(null)

    const debounce = (fn, delay) => {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
      };
    };
  
    // POSTs --------------------------------------------------------------------
    const postAlpha = async (value) => {
      await fetch(`${flask_address}/alpha/measurement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alpha: value }),
      });
    };
  
    const postBeta = async (value) => {
      await fetch(`${flask_address}/beta/measurement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ beta: value }),
      });
    };

    const debouncedPostAlpha = useRef(debounce(postAlpha, 120)).current;
    const debouncedPostBeta  = useRef(debounce(postBeta, 120)).current;

    const startMeasuring = async () => {
      setIsCalibrating(false);
      // send current settings one last time
      await postAlpha(alpha);
      await postBeta(beta);
      // start polling
      pollRef.current = setInterval(async () => {
        try {
          const r = await fetch(`${flask_address}/video1/measurement/result`);
          if (r.ok) {
            const { maxXDistance } = await r.json();
            setMeasure(maxXDistance);
          }
        } catch (e) {
          console.error("poll error", e);
        }
      }, 800);
    };

    useEffect(() => {
      // start polling as soon as the component mounts
      pollRef.current = setInterval(async () => {
        try {
          const r = await fetch(`${flask_address}/video1/measurement/result`);
          if (r.ok) {
            const { maxXDistance } = await r.json();
            setMeasure(maxXDistance);
          }
        } catch (e) {
          console.error("poll error", e);
        }
      }, 800);               // 0.8 s is usually responsive enough
      return () => clearInterval(pollRef.current);  // cleanup on unmount
    }, []);

    
    const stopMeasuring = async () => {
      clearInterval(pollRef.current);
      setMeasure(0);
      pollRef.current = null;
      setIsCalibrating(true);
      /* OPTIONAL – only if you create the endpoint:
      await fetch(`${flask_address}/measurement/reset`, { method: "POST" });
      */
    };


      const post_brightness_alpha = async (alpha) => {
        try {
          const response = await fetch(`${flask_address}/alpha/measurement`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ alpha }),
          });
    
          if (!response.ok) {
            console.error("Error sending alpha:", response.statusText);
          }
        } catch (error) {
          console.error("Error in post_brightness_alpha:", error);
        } 
      };
    
      const post_brightness_beta = async (beta) => {
        try {
          const response = await fetch(`${flask_address}/beta/measurement`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ beta }),
          });
    
          if (!response.ok) {
            console.error("Error sending beta:", response.statusText);
          }
        } catch (error) {
          console.error("Error in post_brightness_beta:", error);
        } 
      };
    return(
        <div className="measure-task-container">
            <div className="measurement-actions-containers">
              {isCalibrating ? (
            
                <button className="action-button" onClick={startMeasuring}>
                  START MEASURING
                </button>
              ) : (
                <button className="action-button" onClick={stopMeasuring}>
                  STOP MEASURING
                </button>
              )}
              <p className="measurement-result">MEASUREMENT: {measure}</p>
            </div>
            <div className="brightness-wrapper">
                <p className="label"> BRIGHTNESS</p>
                <div className="controls-input-range-container">
                    <div className="controls-input-range">
                        <p>
                            ALPHA: <span>{alpha}</span>
                            <span
                                style={{
                                    display: "inline-block",
                                    minWidth: "3ch",
                                    "textAlign":"right",
                                }}
                            >
                            </span>
                        </p>
                        <input className="slider" type="range" min={0} max={200} value={alpha} onChange={(e) => {
                const v = Number(e.target.value);
                setAlpha(v);
                debouncedPostAlpha(v);
              }}/>
                    </div>
                    <div className="controls-input-range">
                        <p>
                            BETA: <span>{beta}</span>
                            <span
                                style={{
                                    display: "inline-block",
                                    minWidth: "3ch",
                                    "textAlign":"right",
                                }}
                            >
                            </span>
                        </p>
                        <input className="slider" type="range" min={0} max={200} value={beta} onChange={(e) => {
                const v = Number(e.target.value);
                setBeta(v);
                debouncedPostBeta(v);
              }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeasureTask;