import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  console.log(localStorage.getItem("token"));
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <div className="ml-64 pt-16 min-h-screen bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;