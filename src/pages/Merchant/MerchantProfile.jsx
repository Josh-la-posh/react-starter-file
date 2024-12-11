import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function MerchantProfile() {
    const { merchantCode } = useParams();
    const { setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
            <button onClick={() => navigate(-1)} className='text-priColor mb-5 flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
            <div className="mb-8 flex justify-between items-center">
                <p className='text-lg'>Merchant ({merchantProfile.merchantName})</p>
                <Link to={`/merchants/profile/update/${merchantCode}`} className='bg-priColor text-xs text-white py-2 px-5 rounded-md'>
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
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.address ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>City:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.city ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>State:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.state ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Phone Number:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.phoneNumber ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Postal Code:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.postalCode ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Country:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.countryCode ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Status:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.status ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>White Listed:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.isWhitelisted === true ? 'True' : 'False'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Business type:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.businessType ?? 'N/A'}</span>
                </div>
                <div className="flex">
                    <p className='flex-1'>Registration Type:</p>
                    <span className='font-[400] ml-4 flex-1'>{merchantProfile.registrationType ?? 'N/A'}</span>
                </div>
            </div>
        </div>
    )
}

export default MerchantProfile;