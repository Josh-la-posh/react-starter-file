import React, { useEffect, useRef, useState } from 'react';
import AuthInputField from '../../../../components/AuthInptField';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;

function ChangePassword() {
    const errRef = useRef();
    const [newPassword, setNewPassword] = useState('');
    const [validNewPassword, setValidNewPassword] = useState(false);
    const [NewPasswordFocus, setNewPasswordFocus] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [ConfirmPasswordFocus, setConfirmPasswordFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const result = PWD_REGEX.test(newPassword);
        setValidNewPassword(result);
    }, [newPassword])

    useEffect(() => {
        const result = confirmPassword === newPassword;
        setValidConfirmPassword(result);
    }, [confirmPassword, newPassword])

    useEffect(() => {
        setErrMsg('');
    }, [newPassword, confirmPassword])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Password change logic (validation and API calls)
        if (formData.newPassword === formData.confirmPassword) {
            alert("Password successfully changed!");
        } else {
            alert("Passwords do not match!");
        }
    };

    return (
        <div className="mb-8  bg-white px-5 py-5">
            <h2 className="text-xl font-medium mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInputField
                    label="New Password"
                    type='password'
                    icon={faLock}
                    validName={validNewPassword}
                    valueName={newPassword}
                    id="currentPassword"
                    onChange={handleChange}
                    setOnFocus={setNewPasswordFocus}
                    nameFocus={NewPasswordFocus}
                    errNote={(
                        <>
                            Password must be 7 and 24 characters
                            <br />
                            Password should contain a capital letter
                            <br />
                            Password should contain a small letter
                            <br />
                            Password should contain a number
                            <br />
                            Password should contain a special character
                        </>
                    )}
                />
                
                <input 
                    type="password" 
                    name="currentPassword" 
                    value={formData.currentPassword} 
                    onChange={handleChange} 
                    placeholder="Current Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input 
                    type="password" 
                    name="newPassword" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                    placeholder="New Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input 
                    type="password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    placeholder="Confirm New Password" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button 
                    type="submit"
                    className="py-2 px-4 bg-priColor text-xs text-white rounded-md"
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}

export default ChangePassword;
