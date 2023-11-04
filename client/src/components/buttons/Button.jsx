import React from 'react';

const Button = ({text}) => {
  return (
    <div className="Button w h-[34px] px-3 py-1.5 bg-yellow-400 rounded-[34px] justify-start items-center gap-2.5 inline-flex hover:bg-white border-2 border-yellow-400 transition-all duration-300 ease-in-out">
        <div className="GetStarted text-black text-base font-serif font-['Noto Serif']">{text}</div>
    </div>
  );
}

export default Button;