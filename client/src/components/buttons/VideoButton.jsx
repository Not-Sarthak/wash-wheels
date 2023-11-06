import React from 'react';

const VideoButton = ({ text }) => {
  return (
    <button className="bg-white text-black rounded-full font-serif py-2 px-3 text-sm hover:transform hover:translate-y-[-4px] hover:translate-x-[-2px] hover:shadow-md hover:border-yellow-600 transition-transform duration-300 ease-in-out active:transform active:translate-y-[2px] active:translate-x-[1px] active:shadow-none active:border-none border border-yellow-400 cursor-pointer">
  {text}
</button>

  );
};

export default VideoButton;
