import React, { useState } from 'react';

function SecurityNotifications() {
    const [notifications, setNotifications] = useState({
        loginAttempts: true,
        passwordChanges: true,
        unusualActivity: false
    });

    const handleToggle = (event) => {
        const { name, checked } = event.target;
        setNotifications({ ...notifications, [name]: checked });
    };

    return (
        <div className="mb-8">
            <h2 className="text-xl font-medium mb-4">Security Notifications</h2>
            <div className="space-y-4">
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="loginAttempts"
                            checked={notifications.loginAttempts}
                            onChange={handleToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Notify on login attempts</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="passwordChanges"
                            checked={notifications.passwordChanges}
                            onChange={handleToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Notify on password changes</span>
                    </label>
                </div>
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            name="unusualActivity"
                            checked={notifications.unusualActivity}
                            onChange={handleToggle}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Notify on unusual activity</span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SecurityNotifications;
