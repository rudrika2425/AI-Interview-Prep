import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, List, StickyNote, Pin, LogOut } from 'lucide-react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const nevigate = useNavigate();
  const {logout} = useContext(UserContext);
  
  const menuItems = [
    { path: '/dashboard/add-questions', icon: Plus, label: 'Add Interview Questions', color: 'text-blue-600' },
    { path: '/dashboard/view-list', icon: List, label: 'View Your List', color: 'text-green-600' },
    { path: '/dashboard/make-notes', icon: StickyNote, label: 'Make Notes', color: 'text-yellow-600' },
    { path: '/dashboard/view-notes', icon: StickyNote, label: 'your Notes', color: 'text-orange-600' },
    { path: '/dashboard/pinned-questions', icon: Pin, label: 'Pinned Important Questions', color: 'text-red-600' },
  ];

  const Logout = () => {
    logout();
    nevigate('/');
  }

  return (
    <>
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-0 pt-16 border-r border-gray-200 flex flex-col">
      <div className="p-6 flex-1">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 ${
                    isActive
                       ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 shadow-sm'
                       : 'hover:shadow-sm'
                  }`
                }
              >
                <Icon className={`w-5 h-5 mr-3 ${item.color}`} />
                <span className="font-medium text-gray-700">
                  {item.label}
                </span>
                               
              </NavLink>
                                          
            );
          })}
        </nav>
      </div>
      
      {/* Logout button at bottom */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={Logout}
          className="w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-red-50 hover:shadow-sm border border-gray-200 hover:border-red-200"
        >
          <LogOut className="w-5 h-5 mr-3 text-red-600" />
          <span className="font-medium text-gray-700 hover:text-red-600">
            LogOut
          </span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;