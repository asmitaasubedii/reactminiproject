import React from "react";

export const Button = (props) => {
  const { buttonText, onClick, type, className } = props;
  return (
    <div>
      <button className={className} type={type} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
};
