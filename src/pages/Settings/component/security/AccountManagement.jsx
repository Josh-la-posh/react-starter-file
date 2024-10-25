import React from 'react';

function AccountManagement() {
    const handleDeactivate = () => {
        // Logic for deactivating account
        alert("Account deactivated!");
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
            // Logic for deleting account
            alert("Account permanently deleted!");
        }
    };

    return (
        <div className="mb-8 bg-white px-5 py-4">
            <h2 className="text-xl font-medium mb-4">Account Management</h2>
            <div className="space-x-4">
                <button 
                    onClick={handleDeactivate}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                >
                    Deactivate Account
                </button>
                <button 
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                    Permanently Delete Account
                </button>
            </div>
        </div>
    );
}

export default AccountManagement;
