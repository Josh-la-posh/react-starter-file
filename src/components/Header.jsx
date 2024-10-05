import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import useTitle from '../services/hooks/useTitle';
import useAuth from '../services/hooks/useAuth';
import useAxiosPrivate from '../services/hooks/useAxiosPrivate';

const Header = ({ openSidebar, setOpenSidebar }) => {
  const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { appTitle, setAppTitle } = useTitle();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log('The title is: ', appTitle)

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      // const logoutResponse = await axiosPrivate.put('api/account/logout');
      setTimeout(() => {
        toast.success("Logout successful");
        localStorage.clear();
        dispatch(logout());
        setAppTitle('');
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.log('Network no dey');
    }
  }

  const handleSidebar = () => {
    setOpenSidebar(true);
  }

  return (
    <header className="flex justify-between items-center relative">
      {
        openSidebar === false && 
          <button className="absolute left-2 block md:hidden" onClick={handleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
      }

      <div className={`text-lg font-semibold ${openSidebar === false && 'ml-12'}`}>{appTitle}</div>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!isDropdownOpen)} className={`flex items-center ${isDropdownOpen ? 'bg-white mr-10' : 'bg-priColor'} rounded-full py-1 px-2`}>
          <span className={`ml-2 ${!isDropdownOpen ? 'text-white' : 'text-priColor'}`}>{(auth.data.user.firstName).slice(0,1) ?? ''} {(auth.data.user.lastName).slice(0,1) ?? ''}</span>
          {
            !isDropdownOpen
              ? <FiChevronDown className="ml-1 text-white" />
              : <FiChevronUp className="ml-1 text-priColor" />
          }
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg pt-2 z-10">
            <Link to="/settings" className="block px-4 py-2 text-gray-700 text-sm font-[400] hover:bg-priColor hover:text-white">Profile</Link>
            <button onClick={handleLogout} className="block px-4 py-2 text-gray-700 text-sm font-[400] hover:bg-priColor hover:text-white w-full text-left"><Link to="/login">Logout</Link></button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;