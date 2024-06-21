import React from "react";

const FormInput = ({ labelName, placeholder, type, value, onChange, name }) => {
  return (
    <label htmlFor={name} className='flex flex-col '>
      <p className='my-2'>{labelName} :</p>
      <input
        type={type}
        id={name}
        name={name}
        className='border-2 rounded-md px-2 py-1 border-gray-300'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {/* <p className='text-red-500 text-sm'>Error</p> */}
    </label>
  );
};

export default FormInput;
