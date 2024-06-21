import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className='display: hidden md:block py-2 border-2 md:w-[15vw]'>
      <div className='flex justify-center items-center gap-2'>
        <span className='material-symbols-rounded text-5xl text-orange-500'>
          history_edu
        </span>
        <h1 className='font-weight: 700; text-2xl'>School</h1>
      </div>
      <div className='my-10 flex flex-col gap-5'>
        <NavLink
          className={`flex items-center justify-center gap-2 p-2 aria-[current=page]:bg-gradient-to-r from-orange-500 to-yellow-50`}
          to='/'>
          <span className='material-symbols-rounded'>dashboard</span>
          Dashboard
        </NavLink>
        <NavLink
          className={`flex items-center justify-center gap-2 p-2 aria-[current=page]:bg-gradient-to-r from-orange-500 to-yellow-50`}
          to='/students'>
          <span className='material-symbols-rounded justify-self-start'>
            groups
          </span>
          Students
        </NavLink>
        <NavLink
          className={`flex items-center justify-center gap-2 p-2 aria-[current=page]:bg-gradient-to-r from-orange-500 to-yellow-50`}
          to='/teachers'>
          <span className='material-symbols-rounded justify-self-start'>
            group
          </span>
          Teachers
        </NavLink>
        <NavLink
          className={`flex items-center justify-center gap-2 p-2 aria-[current=page]:bg-gradient-to-r from-orange-500 to-yellow-50`}
          to='/classes'>
          <span className='material-symbols-rounded justify-self-start'>
            card_membership
          </span>
          Classes
        </NavLink>
        <NavLink
          className={`flex items-center justify-center gap-2 p-2 aria-[current=page]:bg-gradient-to-r from-orange-500 to-yellow-50`}
          to='/analytics'>
          <span className='material-symbols-rounded justify-self-start'>
            card_membership
          </span>
          Analytics
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;
