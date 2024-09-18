"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) {
      setTimeLeft(duration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };
  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };
  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-amber-400 dark:bg-gray-900">
      <div className=" bg-amber-100 dark:bg-gray-800 shadow-lg rounded p-8 w-full max-w-md shadow-orange-900">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark: text-black-200 text-center">
          Countdown Timer
        </h1>
        <div className="flex-items-center mb-6 ">
          <input
            type="number"
            id="duration"
            placeholder="Enter Time in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-t mr-4 rounded border-yellow-900  dark: bg-orange-200 dark hover:opacity-50 dark:text-gray-200 p-3 w-8/12 text-left shadow-orange-900"
          />
          <Button
            onClick={handleSetDuration}
            variant={"outline"}
            className="text-gray-800 dark: text-black-200 bg-orange-300 p-5 rounded text-lg  shadow-yellow-800 border-0 "
          >
            set
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark: text-black-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark: text-black-200 text-lg rounded bg-amber-400 shadow-orange-900 border-0 "
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark: text-black-200 text-lg rounded bg-amber-400 shadow-orange-900 border-0"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark: text-black-200 text-lg rounded bg-amber-400 shadow-orange-900 border-0"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}