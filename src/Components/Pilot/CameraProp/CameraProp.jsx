import React from "react";

export default function CameraProp(props) {
    return (
        <img src={props.src} alt="Video source" className="camera-image"/>
    );
}
