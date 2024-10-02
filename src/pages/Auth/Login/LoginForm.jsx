import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../../redux/slices/authSlice';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../services/hooks/useAuth';
import axios from '../../../services/api/axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Logo from '../../../assets/logo.jpg';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const LOGIN_URL = '/api/account';

const LoginForm = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({email, password}),
        {
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          // withCredentials: true
        }
      );
      
      const data = response.data.responseData;

      setAuth({data});
      dispatch(loginSuccess(data));
      toast.success("Login successful");

      const from = location.state?.from?.pathname || '/';
      navigate(from, {replace: true});
      
    } catch (err) {
      if (!err.response) {
        dispatch(loginFailure('No Server Response'));
      } else {
        if (err.response.status === 400) {
          toast.error(err.response.data.message ?? 'Login failed');
          dispatch(loginFailure(err.response.data.message));
        } else {
          toast.error('Login failed');
          dispatch(loginFailure('Login Failed'));
        }
      }
    }
  };

  return (
    <section className="pt-8">
      <div className="lg:flex justify-center">
        <img src={Logo} />
      </div>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Login</h2>
      <h2 className="text-[15px] text-black text-opacity-60 mb-6">Kindly fill the field below to login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label className="block text-black text-[13px] mb-1 lg:mb-2" htmlFor="email">
            Email
          </label>
          <div className="relative w-full pl-9 pr-3 py-2 border border-gray rounded-lg">
            <FontAwesomeIcon icon={faEnvelope} style={{color: 'gray'}} className='absolute top-3 left-3' />
            <input
              type="email"
              id="email"
              ref={userRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm focus:outline-none w-full bg-transparent"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-black text-[13px] mb-1 lg:mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative w-full pl-9 pr-12 py-2 border border-gray rounded-lg">
            <FontAwesomeIcon icon={faLock} style={{color: 'gray'}} className='absolute top-3 left-3' />
            <input
              type={!showPassword ? 'password' : 'text'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-sm focus:outline-none w-full bg-transparent"
              required
            />
            <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} onClick={handleShowPassword} style={{color: 'gray'}} className='absolute top-3 right-3' />
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="block text-black text-[11px] sm:text-xs mb-1 lg:mb-2 flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-xs lg:text-sm text-priColor hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit"
          className="w-full bg-priColor text-sm text-white py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log in'}
        </button>
        <div className="text-center mt-4">
          <Link to="/register" className="text-[12px] lg:text-sm">Don't have an account? <span className='text-priColor hover:underline'> Sign Up</span></Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;