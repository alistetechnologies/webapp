import { useState } from "react";

export function AutoCutTimeInput({ state, setState }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <input
          id="hours"
          type="number"
          min={0}
          max={23}
          value={state.hours}
          onChange={(e) => {
            console.log("HOUrs", e.target.value);
            const value = Number(e.target.value);
            if (value <= 23 && value >= 0) {
              setState((prev) => {
                console.log("prev", prev);
                return {
                  ...prev,
                  hours: Number(value),
                };
              });
            }
          }}
          className="w-20 text-center p-2 border border-gray-300 rounded-md"
          placeholder="hr"
        />
      </div>

      <span className="text-lg font-semibold">hr</span>

      <div className="flex flex-col items-center">
        <input
          id="minutes"
          type="number"
          min="0"
          max="59"
          value={state.minutes}
          onChange={(e) => {
            console.log("minutes", e.target.value);

            const value = e.target.value;

            if (value <= 59 && value >= 0) {
              setState((prev) => ({
                ...prev,
                minutes: value,
              }));
            }
          }}
          className="w-20 text-center p-2 border border-gray-300 rounded-md"
          placeholder="min"
        />
      </div>

      <span className="text-lg font-semibold">min</span>

      <div className="flex flex-col items-center">
        <input
          id="seconds"
          type="number"
          min="0"
          max="59"
          value={state.seconds}
          onChange={(e) => {
            console.log("Seconds", e.target.value);

            const value = e.target.value;

            if (value <= 59 && value >= 0) {
              setState((prev) => ({
                ...prev,
                seconds: value,
              }));
            }
          }}
          className="w-20 text-center p-2 border border-gray-300 rounded-md"
          placeholder="sec"
        />
      </div>

      <span className="text-lg font-semibold">sec</span>
    </div>
  );
}
