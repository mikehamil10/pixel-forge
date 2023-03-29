"use client";

import { useState } from "react";

export default function PromptInput() {
  const [input, setInput] = useState("");

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row border rounded-md shadow-md shadow-slate-400/10 lg:divide-x">
        <textarea
          placeholder="Enter a subject or press 'New Suggestion' for inspiration..."
          className="flex-1 p-4 outline-none rounded-md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          type="submit"
          disabled={!input}
          className={`p-4 font-bold transition-colors duration-200 ${
            input
              ? "bg-violet-500 text-white"
              : "text-gray-300 cursor-not-allowed"
          }`}
        >
          Generate
        </button>
        <button
          type="button"
          className="p-4 bg-violet-400 text-white font-bold transition-colors duration-200 disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Use Suggestion
        </button>
        <button
          type="button"
          className="p-4 bg-white text-violet-500 font-bold border-none transition-colors rounded-b-md md:rounded-r-md md:rounded-bl-none duration-200"
        >
          New Suggestion
        </button>
      </form>
    </div>
  );
}
