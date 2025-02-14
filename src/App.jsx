import React, { useState, useEffect } from "react";
import FirstInterface from "./componentss/FirstInterface";
import Timer from "./componentss/Timer";
import './App.css';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/baloo-bhaijaan-2"; // Defaults to weight 400

const App = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);


  // Trigger music once user interacts with the page (e.g., clicks anywhere)
  useEffect(() => {
    // Create an invisible button or listen for any user interaction to trigger music
    const handleUserInteraction = () => {
      if (!isMusicPlaying) {
        playMusic(); // Start the music after user interaction
        window.removeEventListener("click", handleUserInteraction); // Remove listener after the first interaction
      }
    };

    // Listen for any click on the window to trigger music
    window.addEventListener("click", handleUserInteraction);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, [isMusicPlaying]);

  const handleStartCooking = () => {
    setShowTimer(true); // Show the Timer component
  };

  return (
    <div>
      {/* Conditionally render the components */}
      {!showTimer ? (
        <FirstInterface onStartCooking={handleStartCooking} />
      ) : (
        <Timer />
      )}
    </div>
  );
};

export default App;
