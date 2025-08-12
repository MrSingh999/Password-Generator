import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Particles from "./particles";

const App = () => {
  const [length, setlength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenterator = useCallback(() => {
    let pass = "";

    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let str = lowerCase + upperCase;
    if (numberAllowed) {
      str += numbers;
    }
    if (symbolAllowed) {
      str += symbols;
    }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setPassword(pass);
  }, [length, numberAllowed, symbolAllowed]);

  useEffect(() => {
    passwordGenterator();
  }, [passwordGenterator, length, numberAllowed, symbolAllowed]);

  const copytoClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const text = "Password Generator";
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const chars = textRef.current.children;
    gsap.fromTo(
      chars,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        repeat: -1,
        repeatDelay: 1,
        duration: 0.5,
      }
    );
  }, []);

  const handleButtonClick = () => {
    const button = buttonRef.current;
    const textSpan = button.querySelector(".button-text");
    const checkSpan = button.querySelector(".check-icon");

    // Animate text out
    gsap.to(textSpan, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsClicked(true);

        // Animate checkmark in
        gsap.fromTo(
          checkSpan,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3 }
        );

        // Reset after delay
        setTimeout(() => {
          gsap.to(checkSpan, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              setIsClicked(false);
              gsap.to(textSpan, { y: 0, opacity: 1, duration: 0.3 });
            },
          });
        }, 2000);
      },
    });
  };

  return (
    <div className="bg-[#212124] flex w-screen h-screen justify-center items-center z-auto">
      <div className="bg-zinc-900 absolute card  rounded-lg shadow-lg p-3 h-[90vh] w-[90vw] sm:h-[80vh] sm:w-[60vw] lg:h-[96vh] lg:w-[32vw] text-center overflow-hidden z-10">
        <div className="h-20 relative z-50  backdrop-filter backdrop-blur-[4.2px] ">
          <h1
            className="text-3xl text-orange-500 font-extrabold pt-4"
            ref={textRef}
          >
            {text.split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </h1>
        </div>
        <div
          className="absolute inset-0 z-0"
          style={{ width: "100%", height: "100%" }}
        >
          <Particles
            particleColors={["#fb923c", "#fb923c"]}
            particleCount={700}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={true}
          />
        </div>
        <div className="relative z-40 flex p-4 gap-0  h-auto ">
          <input
            className={`h-14 text-2xl outline-none rounded-l-lg text-zinc-100 p-2 font-mono w-full hover:border-orange-400  border border-transparent bg-[rgba(0,_0,_0,_0.21)] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[4.2px]`}
            type="text"
            value={password}
            readOnly
            onChange={passwordGenterator}
          />
          <button
            ref={buttonRef}
            className=" bg-zinc-800 h-14 w-16 rounded-r-lg text-white text-xl font-medium flex-shrink-0 relative overflow-hidden"
            onClick={(e) => {
              handleButtonClick(e), copytoClipboard(e);
            }}
          >
            <span className="button-text absolute inset-0 flex items-center justify-center">
              Copy
            </span>
            {isClicked && (
              <span className="check-icon absolute inset-0 flex items-center justify-center">
                ✓
              </span>
            )}
          </button>
        </div>
        <div className="  flex flex-col h-auto  mr-6  p-4 relative z-30bg-[rgba(0,_0,_0,_0.21)] rounded-[16px] [box-shadow:0_4px_30px_rgba(0,_0,_0,_0.1)] backdrop-filter backdrop-blur-[4.2px] overflow-hidden ">
          <div className="flex items-center p-2   gap-2 ">
            <label
              htmlFor="range"
              className="text-zinc-100  flex gap-2 items-center font-semibold"
            >
              <span className=" text-base">Range:</span>
              <span className="text-orange-400  text-base font-semibold">
                {length}
              </span>
            </label>
            <input
              id="range"
              value={length}
              onChange={(e) => setlength(e.target.value)}
              type="range"
              min={6}
              max={32}
              className=" h-2   accent-orange-400   cursor-pointer w-full"
            />
          </div>
          <div className="flex items-center  gap-2  p-2 rounded-lg">
            <input
              id="number"
              defaultValue={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              type="checkbox"
              className="cursor-pointer w-5 h-5 accent-orange-400 bg-zinc-800 border-2 border-orange-400 rounded"
            />
            <label
              htmlFor="number"
              className="text-zinc-100 min-w-[rem] flex text-base items-center font-semibold"
            >
              Number
            </label>
          </div>

          <div className="flex items-center  gap-2  p-2 rounded-lg">
            <input
              id="symbol"
              defaultValue={symbolAllowed}
              onChange={(e) => setSymbolAllowed(e.target.checked)}
              checked={symbolAllowed}
              type="checkbox"
              className="cursor-pointer w-5 h-5 accent-orange-400 bg-zinc-800 border-2 border-orange-400 rounded"
            />
            <label
              htmlFor="symbol"
              className="text-zinc-100 min-w-[rem] flex text-base items-center  font-semibold"
            >
              Symbol
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
