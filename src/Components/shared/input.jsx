import React from "react";

export const Input = (props) => {
  const { type, placeholder, name, value, onChange, className } = props;

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
    </>
  );
};
