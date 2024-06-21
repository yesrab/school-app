import React from "react";

const Header = ({ headerName }) => {
  return (
    <header className='rounded-md drop-shadow-md bg-white p-3'>
      <h1 className='text-3xl font-bold'>{headerName}</h1>
      <hr />
      <p>School Management</p>
    </header>
  );
};

export default Header;
