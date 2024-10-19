import React, { useState } from "react";
import Typewriter from 'typewriter-effect';
import ArrowCircleUpTwoToneIcon from '@mui/icons-material/ArrowCircleUpTwoTone';
const Prompt = () => {
  const [query, setQuery] = useState("");
  const [savedQuery, setSavedQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const saveQuery = () => {
    setSavedQuery(query);
    console.log("Saved:", query);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveQuery();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#dce4ef]">
      <div className="text-center w-full max-w-4xl px-4">
      <h1 className="text-2xl font-semibold text-[#2c3e50] mb-6">
          <Typewriter
            options={{
              strings: ['What can I help you with?'],
              autoStart: true,
              loop: false, 
              delay: 75, 
              deleteSpeed: Infinity, 
            }}
          />
        </h1>

        <div className="relative flex items-center justify-center">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
                    className="w-full h-11 p-2 pr-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-center"
              placeholder="Type here..."
            />

            <button
              onClick={saveQuery}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500"
            >
              {/* <svg
                width="24"
                height="24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              > */}
                {/* <path d="M12 2L20 12L12 22V15H4V9H12V2Z" />
              </svg> */}
               <ArrowCircleUpTwoToneIcon fontSize="large" sx={{ color: '#41506D' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
