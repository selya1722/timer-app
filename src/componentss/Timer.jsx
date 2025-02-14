import React, { useState, useEffect, useRef } from "react";
import "../componentss/Timer.css";
import "../componentss/WindowFrame.css";
import cookingGif from "../assets/bubu.gif";
import cookedGif from "../assets/done.gif";
import fryingSound from "../assets/frying.wav";
import doneSound from "../assets/ding.wav";
import clickSoundFile from "../assets/click.wav"; // Click sound

const Timer = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("Please enter the time in seconds.");
  const [animation, setAnimation] = useState(cookingGif);

  const cookingSoundRef = useRef(new Audio(fryingSound));
  const doneSoundRef = useRef(new Audio(doneSound));
  const clickSoundRef = useRef(new Audio(clickSoundFile));

  const playClickSound = () => {
    clickSoundRef.current.currentTime = 0;
    clickSoundRef.current.play();
  };

  useEffect(() => {
    let timerInterval = null;

    if (isActive && timeLeft > 0) {
      setMessage("Your dish is cooking...");
      setAnimation(cookingGif);
      cookingSoundRef.current.loop = true;
      cookingSoundRef.current.play();

      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isActive) {
      clearInterval(timerInterval);
      setIsActive(false);
      setMessage("Dish is ready!");
      setAnimation(cookedGif);

      cookingSoundRef.current.pause();
      cookingSoundRef.current.currentTime = 0;
      doneSoundRef.current.play();
    }

    return () => clearInterval(timerInterval);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    playClickSound();
    if (Number(userInput) > 0) {
      setTimeLeft(Number(userInput));
      setIsActive(true);
      setMessage("Your dish is cooking...");
    } else {
      setMessage("Please enter a valid time.");
    }
  };

  const resetTimer = () => {
    playClickSound();
    setIsActive(false);
    setTimeLeft(0);
    setUserInput("");
    setMessage("Please enter the time in seconds.");
    setAnimation(cookingGif);

    cookingSoundRef.current.pause();
    cookingSoundRef.current.currentTime = 0;
    doneSoundRef.current.pause();
    doneSoundRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (isClosed) return null;

  return (
    <div className="iphone-mockup">
      <div className="window-frame">
        <div className="window-header"></div>
        {!isMinimized && (
          <div className="window-content">
            <div className="timer-container">
              <h2 className="heading">Set Time!</h2>
              <p className="instruction">{message}</p>
              <img src={animation} alt="Dish Icon" className="dish-icon" />
              <input
                type="number"
                placeholder="Time (sec)"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="time-input"
              />
              <h1 className="timer-display">{formatTime(timeLeft)}</h1>
              <div className="timer-buttons">
                <button
                  onClick={() => {
                    playClickSound();
                    startTimer();
                  }}
                  className="cute-button"
                >
                  Start
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    resetTimer();
                  }}
                  className="cute-button reset"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timer;
