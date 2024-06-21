import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";

const DashLayout = () => {
  return (
    <div className='flex min-h-screen'>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default DashLayout;
