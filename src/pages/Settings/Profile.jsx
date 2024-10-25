import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';
import UpdateInputField from '../../components/UpdateInputField';
import { Mail, Phone, User } from 'lucide-react';

function ProfilePage() {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
});

const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value
    }));
}

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('print valid result');
    setEditing(false);
}

  useEffect(() => {
      setAppTitle('Settings');
      setSettingsTitle('Accounts');
  }, []);
  return (
    <div className="px-5 py-4 bg-white h-full">
        {/* <h3 className='text-gray-700 text-md font-[600]'>Profile</h3>
        <p className='text-gray-500 text-sm font-[500]'>This information will be displayed publicly so be careful what you share.</p> */}

        <div className="flex items-center space-x-16">
            <div className='h-24 w-24 rounded-full bg-gray-500'></div>
            <div className="flex space-x-3">
                <button type='submit' className='bg-priColor p-2 rounded-sm text-white text-[9px] font-[500]'>
                    Upload New
                </button>
                <button type='submit' className='bg-gray-300 p-2 rounded-sm text-black text-[9px] font-[500]'>
                    Delete avatar
                </button>
            </div>
        </div>

        <form onSubmit={handleSubmit} className='mt-8'>
            <div className="flex gap-1 md:gap-4 lg:gap-8">
                <div className="w-full">
                    <UpdateInputField
                        label="First Name"
                        type='firstName'
                        icon={<User size={18}/>}
                        valueName={formData.firstName}
                        id="firstName"
                        disabled={!editing}
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full">
                    <UpdateInputField
                        label="Last Name"
                        type='lastName'
                        icon={<User size={18} />}
                        valueName={formData.lastName}
                        id="lastName"
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </div>
                
            </div>
            <div className="flex gap-1 md:gap-4 lg:gap-8">
                <div className="w-full">
                    <UpdateInputField
                        label="Email"
                        type='email'
                        icon={<Mail size={18}/>}
                        valueName={formData.email}
                        id="email"
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </div>
                <div className="w-full">
                    <UpdateInputField
                        label="Mobile Number"
                        type='phone'
                        icon={<Phone size={18}/>}
                        valueName={formData.phone}
                        id="phone"
                        onChange={handleChange}
                        disabled={!editing}
                    />
                </div>
                
            </div>
            {editing ? (
                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="py-3 px-8 bg-gray-300 text-xs font-[500] rounded-sm"
                    >
                        Cancel
                    </button>
                    <button 
                        type='submit' 
                        className='bg-priColor px-8 py-3 rounded-sm text-white text-xs font-[500]'>
                        Save Changes
                    </button>
                
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="bg-priColor px-8 py-3 rounded-sm text-white text-xs font-[500]"
                >
                    Edit Profile
                </button>
            )}

        </form>
    </div>
  )
}

export default ProfilePage;