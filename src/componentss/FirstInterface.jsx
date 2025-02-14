import React, { useState, useEffect } from "react";
import "../componentss/FirstInterface.css"; // Ensure this is the correct path for your CSS file
import clicksound from "../assets/click.wav"; // Ensure the correct path
import bgsound from "../assets/bg.wav"; // Ensure the correct path to background music

const FirstInterface = ({ onStartCooking }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [music] = useState(new Audio(bgsound)); // Initialize music instance only once

  useEffect(() => {
    // Start the background music as soon as the FirstInterface is shown
    music.loop = true; // Loop the music
    music.play().catch((error) => {
      console.log("Error playing background music:", error);
    });

    // Cleanup: stop background music when the component is unmounted
    return () => {
      music.pause();
      console.log("Background music stopped.");
    };
  }, [music]); // Run only once when the component is mounted

  const playClickSound = () => {
    const clickSound = new Audio(clicksound); // Ensure the correct path to click sound
    clickSound.play();
  };

  const handleClick = () => {
    playClickSound(); // Play the click sound
    onStartCooking();  // Trigger the cooking action
    music.pause(); // Stop the background music when the button is clicked
  };

  if (isClosed) {
    return null; // App is closed
  }

  return (
    <div className="iphone-mockup">
      {/* Notch at the top */}
      <div className="iphone-notch"></div>

      {/* Main Content */}
      {!isMinimized && (
        <div className="first-interface">
          <button
            onClick={handleClick} // Play the click sound and trigger the cooking action
            className="lets-cook-button"
          >
            Let's Cook!
          </button>
        </div>
      )}
    </div>
  );
};

export default FirstInterface;
