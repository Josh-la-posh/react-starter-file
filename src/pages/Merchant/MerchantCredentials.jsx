import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { Eye } from 'lucide-react';
import useAuth from '../../services/hooks/useAuth';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';

function MerchantCredential() {
  const { auth } = useAuth();
  const merchantCode = auth?.merchant?.merchantCode;
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantCredentials } = useSelector((state) => state.merchant);
  const credential = merchantCredentials?.integrations;
  const [userData, setUserData] = useState(credential);
  const [viewSecret, setViewSecret] = useState(false);
  const [viewKey, setViewKey] = useState({});

  useEffect(() => {
      setAppTitle('Merchant');
      setSettingsTitle('Credential')
  }, []);

  useEffect(() => {
    setUserData(credential);
  }, [merchantCredentials])

  useEffect(() => {
    loadData();
  }, [merchantCode, dispatch]);
  
  const loadData = async () => {
      await merchantService.fetchMercahntCredentials(merchantCode, dispatch);
  };

  const handleIntegrationKey = (index) => {
    setViewKey((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  }
  return (
    <div>
      <div className="bg-white p-4">
        <div className="">
          <div className="flex border-b py-4">
            <p className='text-xs w-32 mr-32'>Client ID</p>
            <p className='text-xs'>Client Secret</p>
          </div>
          <div className="flex border-b py-4 text-xs">
            <p className='w-32 mr-32'>{merchantCredentials?.clientId}</p>
            <div className='flex items-center gap-5'>
              {viewSecret === true ? merchantCredentials?.clientSecret : '************'}
              <button onClick={() => setViewSecret(!viewSecret)} className='text-priColor'><Eye size={'15px'} /></button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-4">
          Integration Settings
        </div>
        <div className="">   
          <div className="flex border-b py-4">
            <p className='text-xs w-32 mr-32'>Environment</p>
            <p className='text-xs w-32'>Integration Key</p>
          </div>
        </div>

        { userData &&
          userData.map((data, index) => (
            <div key={data.index} className="flex border-b py-4 text-xs">
              <p className='w-32 mr-32'>{data?.env === 'Test' ? 'Sandbox' : 'Production'}</p>
              <div className='flex items-center gap-5 mr-auto'>
                {viewKey[index] === true ? data?.integrationKey : '************'}
                <button onClick={() => handleIntegrationKey(index)} className='text-priColor'><Eye size={'15px'} /></button>
              </div>
              <button className='text-priColor '>Make Payment</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MerchantCredential;