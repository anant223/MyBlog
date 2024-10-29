import React from "react";

const Notification = ({ type, message }) => {
  return (
    <div className="transition-all ease-in-out visible animate-fadein m-0 p-0 ml-[7px] w-full box-border">
      <h2 className="m-0 p-0 font-light tracking-[2px] text-[28px]">{type}</h2>
      <p className="m-0 p-0 font-thin text-[18px] tracking-[1px] text-[#616161]">
        {message}
      </p>
    </div>
  );
};

export default Notification;
