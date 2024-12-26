"use client"
import React, { useState } from "react";

const DeviceMotionAndOrientation = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [motionData, setMotionData] = useState({});
  setInterval(() => {
    if (typeof window !== 'undefined' && !isTracking) {
      // Define the motion handler function
      const handleMotion = (event) => {
        setMotionData({
          x: event.acceleration.x,
          y: event.acceleration.y,
          z: event.acceleration.z,
          interval: event.interval,
        });
      };

      // Define the orientation handler function
      const handleOrientation = (event) => {
        return 0;
      };

      // Add event listeners for device motion and orientation
      window.addEventListener("devicemotion", handleMotion);
      window.addEventListener("deviceorientation", handleOrientation);

      // Store cleanup methods in state
      setIsTracking(() => ([
        handleMotion,
        handleOrientation,
      ]));
    }
  }, 5000);
  // Start tracking motion and orientation
  const startTracking = () => {
    return 0;
  };

  // Stop tracking motion and orientation
  const stopTracking = () => {
    if (isTracking) {
      window.removeEventListener("devicemotion", isTracking.handleMotion);
      window.removeEventListener("deviceorientation", isTracking.handleOrientation);

      setIsTracking(false);
    }
  };

  return (
    <div>
      <h1>Device Motion and Orientation</h1>
      <button onClick={startTracking} disabled={isTracking}>
        Start Tracking
      </button>
      <button onClick={stopTracking} disabled={!isTracking}>
        Stop Tracking
      </button>
      <p>Press "Start Tracking" to monitor motion and orientation data.</p>
      <p>Check the developer console for real-time data.</p>

      {
        // Display the motion and orientation data
        isTracking ?
          <>
            "Acceleration x:" {motionData.x}
            "Acceleration y:" {motionData.y}
          </>: 
          null

      }
    </div>
  );
};

export default DeviceMotionAndOrientation;
