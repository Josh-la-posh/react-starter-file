import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';


const Header = ({ openSidebar, setOpenSidebar, title }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const storedUserData = localStorage.getItem('userData');
  const userData = storedUserData ? JSON.parse(storedUserData) : null;

  const handleLogout = (e) => {
    e.preventDefault();

    setTimeout(() => {
      toast.success("Logout successful"); // Success toast
      localStorage.clear();
      dispatch(logout());
      navigate('/login');
    }, 1000)
  }

  const handleSidebar = ({title}) => {
    setOpenSidebar(true);
  }

  return (
    <header className="bg-white z-10 flex justify-between items-center p-4 relative">
      {openSidebar === false && <button className="absolute left-2 block md:hidden" onClick={handleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>}

      <div className={`text-lg font-semibold ${openSidebar === false && 'ml-12'}`}>{title}</div>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center">
        
          <span className="ml-2">{userData?.firstName} {userData?.lastName}</span>
          <FiChevronDown className="ml-1" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
            <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"><Link to="/login">Logout</Link></button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;