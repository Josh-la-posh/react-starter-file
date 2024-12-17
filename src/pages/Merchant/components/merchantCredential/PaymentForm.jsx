import React, { useEffect, useState } from 'react'
import CustomModal from '../../../../components/Modal'
import UpdateInputField from '../../../../components/UpdateInputField';
import useAuth from '../../../../services/hooks/useAuth';

function PaymentForm({setIsModalOpen}) {
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        amount: '',
        currency: '',
        merchantReference: '',
        narration: '',
        callBackUrl: '',
        notificationUrl: '',
        customerId: '',
        customerFirstName: '',
        customerLastName: '',
        customerEmail: '',
        customerPhoneNumber: '',
        customerAddress: '',
        customerCity: '',
        customerStateCode: '',
        customerPostalCode: '',
        customerCountry: '',
        integrationKey: '',
        shouldTokenizeCard: false,
        mccCategory: '',
        merchantDescription: '',
    });

    useEffect(() => {
        console.log('Printed data: ', auth?.data)
    }, [])

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <CustomModal handleOpenModal={handleCloseModal} width='w-[95%] md:w-[75%]'>
            <div className="mb-8">
                <div className='text-sm font-[500] pb-3 border-b border-b-black'>Create Advice</div>
            </div>
            <div className="grid grid-cols-3 gap-5 md:gap-10">
                <UpdateInputField 
                    label='Amount'
                    type='number'
                    id='amount'
                    valueName={formData.amount}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='Currency'
                    type='text'
                    id='currency'
                    valueName={formData.currency}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='Merchant Reference'
                    type='text'
                    id='merchantReference'
                    valueName={formData.merchantReference}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='Narration'
                    type='text'
                    id='narration'
                    valueName={formData.narration}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='CallBack Url'
                    type='text'
                    id='callBackUrl'
                    valueName={formData.callBackUrl}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='Notification Url'
                    type='text'
                    id='notificationUrl'
                    valueName={formData.notificationUrl}
                    onChange={handleChange}
                    disabled={false}
                />
                <UpdateInputField 
                    label='Customer ID'
                    type='text'
                    id='customerId'
                    valueName={formData.customerId}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Customer First Name'
                    type='text'
                    id='customerFirstName'
                    valueName={formData.customerFirstName}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Customer Last Name'
                    type='text'
                    id='customerLastName'
                    valueName={formData.customerLastName}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Customer Email'
                    type='email'
                    id='customerEmail'
                    valueName={formData.customerEmail}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Customer Phone Number'
                    type='tetelt'
                    id='customerPhoneNumber'
                    valueName={formData.customerPhoneNumber}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Customer Address'
                    type='text'
                    id='customerAddress'
                    valueName={formData.customerAddress}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='City'
                    type='text'
                    id='customerCity'
                    valueName={formData.customerCity}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='State Code'
                    type='text'
                    id='customerStateCode'
                    valueName={formData.customerStateCode}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Postal Code'
                    type='text'
                    id='customerPostalCode'
                    valueName={formData.customerPostalCode}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Country'
                    type='text'
                    id='customerCountry'
                    valueName={formData.customerCountry}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Integration Key'
                    type='text'
                    id='integrationKey'
                    valueName={formData.integrationKey}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Should Tokenize Card'
                    type='text'
                    id='shouldTokenizeCard'
                    valueName={formData.shouldTokenizeCard}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='MCC Category'
                    type='text'
                    id='mccCategory'
                    valueName={formData.mccCategory}
                    onChange={handleChange}
                    disabled={true}
                />
                <UpdateInputField 
                    label='Merchant Description'
                    type='text'
                    id='merchantDescription'
                    valueName={formData.merchantDescription}
                    onChange={handleChange}
                    disabled={true}
                />
            </div>

            <button className='py-2 px-4 bg-priColor text-white text-xs rounded-sm'>
                Submit
            </button>
        </CustomModal>
    )
}

export default PaymentForm;