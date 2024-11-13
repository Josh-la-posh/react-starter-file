import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { Link, useParams } from 'react-router-dom';

function MerchantProfile() {
    const { merchantCode } = useParams();
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const merchantService = new MerchantService(axiosPrivate);
  const dispatch = useDispatch();
  const { merchantProfile } = useSelector((state) => state.merchant);

  useEffect(() => {
      setAppTitle('Merchant Profile');
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await merchantService.fetchMerchantProfile(merchantCode, dispatch);
      }
    };
    loadData();
  }, [merchantCode, dispatch]);

  return (
    <div className="p-5">
        <div className="mb-8 flex justify-between items-center">
            <p className='text-lg'>Merchant ({merchantProfile.merchantName})</p>
            <Link to='/merchants/profile/update' className='bg-priColor text-xs text-white py-2 px-5 rounded-md'>
                Update profile
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-base font-[700] text-gray-600">
            {/* <div className="flex">
                <p className='flex-1'>Merchant Name:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.merchantName}</span>
            </div> */}
            <div className="flex">
                <p className='flex-1'>Merchant Code:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.merchantCode}</span>

            </div>
            <div className="flex">
                <p className='flex-1'>Address:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.paymentReference}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>City:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.city ?? 'Not Set'}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>State:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.state ?? 'Not Set'}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>Postal Code:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.postalCode}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>Country:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.countryCode}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>Status:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.status}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>White Listed:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.isWhitelisted}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>Business type:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.businessType}</span>
            </div>
            <div className="flex">
                <p className='flex-1'>Registration Type:</p>
                <span className='font-[400] ml-4 flex-1'>{merchantProfile.registrationType}</span>
            </div>
        </div>
    </div>
  )
}

export default MerchantProfile;