import React from "react";

export const Input = (props) => {
  const { type, placeholder, name, value, onChange, className, id } = props;

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={className}
        required
      />
    </>
  );
};
