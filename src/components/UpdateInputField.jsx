import React from 'react'
import '../pages/Auth/auth.css';

function UpdateInputField({ label, type, valueName, id, onChange, icon, disabled }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
                {label}
            </label>
            <div className="relative mt-1 w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md">
                <div className="absolute top-2 left-3">
                    {icon}
                </div>
                <input
                    type={type}
                    id={id}
                    name={id}
                    value={valueName}
                    onChange={onChange}
                    disabled={disabled}
                    className="bg-transparent block text-sm text-gray-900 focus:outline-none w-full"
                />
            </div>
        </div>
    )
}

export default UpdateInputField;