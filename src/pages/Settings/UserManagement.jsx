import React, { useEffect, useState } from 'react'
import useAuth from '../../services/hooks/useAuth';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import UserService from '../../services/api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import UserManagementTable from './component/UserManagementTable';
import { Plus } from 'lucide-react';
import AddUserForm from './component/AddUserForm';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';

function UserManagement() {
  const { setSettingsTitle } = useSettingsTitle();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [filteredData, setFilteredData] = useState(users);
  const merchantCode = auth?.merchant?.merchantCode;
  const userService = new UserService(axiosPrivate, auth);
  const pageNumber = 1;
  const pageSize = 20;

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setSettingsTitle('Teams');
  }, []);

  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  useEffect(() => {
    const loadData = async () => {
        console.log(merchantCode)
      if (merchantCode) {
        await userService.fetchUsersByMerchantCode(merchantCode, pageNumber, pageSize, dispatch);
      }
    };
    loadData();
  }, [merchantCode, dispatch]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  return (
    <div>
        <div className="bg-white p-3 flex justify-end mb-5">
            <button onClick={handleModalOpen} className='flex items-center justify-center gap-2 bg-priColor text-xs text-white py-2 px-5 rounded-sm'>
                <Plus size='16px' />
                Add User
            </button>
            {isModalOpen === true && <AddUserForm handleModalClose={handleModalClose} />}
        </div>
        <UserManagementTable filteredData={filteredData}/>
    </div>
  )
}

export default UserManagement;