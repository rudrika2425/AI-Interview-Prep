import { Search, Bell, Settings, User } from "lucide-react";
import { useContext } from "react";
import {Link} from 'react-router-dom';
import { UserContext } from "../context/UserContext";
const Navbar = () => {

  const {user} = useContext(UserContext);
  
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">AI</span>
          </div>
          <Link to='/'>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Interview Prep
          </h1>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">Hello, {user?.fullName}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;