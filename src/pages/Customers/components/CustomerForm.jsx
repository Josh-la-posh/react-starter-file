import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import CustomModal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import { v4 as uuidv4 } from 'uuid';
import AuthInputField from '../../../components/AuthInptField';


const CUSTOMER_URL = '/api/customers';
const ADD_CUSTOMER_URL ='add';
const UPDATE_CUSTOMER_URL ='edit';

function CustomerForm({ handleOpenModal, selectedCustomerData, title, merchantCode }) {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const customers = useSelector(state => state.customer);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    merchantCode: merchantCode,
    customerId: uuidv4(),
    customerLastName: '',
    customerFirstName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    customerAddress: '',
    customerCity: '',
    customerStateCode: '',
    customerPostalCode: '',
    customerCountryCode: '',
    status: false,
  });

  useEffect(() => {
    if (selectedCustomerData) {
      setFormData({
        merchantCode: selectedCustomerData.merchantCode || '',
        customerId: selectedCustomerData.customerId || '',
        customerLastName: selectedCustomerData.customerLastName || '',
        customerFirstName: selectedCustomerData.customerFirstName || '',
        customerEmail: selectedCustomerData.customerEmail || '',
        customerPhoneNumber: selectedCustomerData.customerPhoneNumber || '',
        customerAddress: selectedCustomerData.customerAddress || '',
        customerCity: selectedCustomerData.customerCity || '',
        customerStateCode: selectedCustomerData.customerStateCode || '',
        customerPostalCode: selectedCustomerData.customerPostalCode || '',
        customerCountryCode: selectedCustomerData.customerCountryCode || '',
        status: selectedCustomerData.status || true,
      });
    }
  }, [selectedCustomerData]);

  useEffect(() => {

  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = () => {
    setFormData({
      ...formData,
      status: title === 'View' ? formData.status : formData.status === false ? true : false,
    });
    console.log(formData.status);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // setLoading(true);
    // try {
    //   if (selectedCustomerData) {
    //     const updateRequest = await axiosPrivate.put(`${CUSTOMER_URL}/${UPDATE_CUSTOMER_URL}/${selectedCustomerData.customerId}`, JSON.stringify(formData));
    //     if (updateRequest.status === 200) {
    //       const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
    //       const result = response.data.responseData;
    //       console.log('result came ', result.length)
    //       dispatch(customerData(result));
    //       setLoading(false);
    //       toast.success('Customer updated successfully');
    //       handleOpenModal();
    //     } else {
    //       console.log('Problem dey occur')
    //     }
    //   } else {
    //     const addRequest = await axiosPrivate.post(`${CUSTOMER_URL}/${ADD_CUSTOMER_URL}`, JSON.stringify(formData));
    //     if (addRequest.status === 200) {
    //       const response = await axiosPrivate.get(`${CUSTOMER_URL}/${merchantData.merchantCode}`);
    //       const result = response.data.responseData;
    //       dispatch(customerData(result));
    //       setLoading(false);
    //       toast.success('Customer added successfully');
    //       handleOpenModal();
    //     }
    //   }
    // } catch (err) {
    //   if (!err.response) {
    //     toast.error('No Server Response')
    //   } else {
    //     toast.error('An unexpected error occurred');
    //   }
    // } finally {
    //   setLoading(false);
    // }
  };

  if (loading) return <Spinner />

  return (
    <CustomModal handleOpenModal={handleOpenModal}>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>{title === 'View' ? 'Customer Details' : `${title} Customer`}</div>
        {title !== 'View' && <div className='text-[14px] font-[400] text-[#475367]'>Kindly {title.toLowerCase()} all the customer’s details</div>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid lg:grid-cols-3 gap-4'>
            <AuthInputField
                label="First Name"
                type='text'
                // validName={validBusinessName}
                valueName={formData.customerFirstName}
                id="customerFirstName"
                onChange={handleChange}
                // setOnFocus={setBusinessNameFocus}
                // nameFocus={businessNameFocus}
                errNote={(
                    <>
                        First name is required.
                        <br />
                        First name must be between 3 and 50 characters.
                        <br />
                        First name cannot start or end with a space.
                    </>
                )}
            />
        </div>
        <div className="mb-4">
          <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerFirstName">
            First Name
          </label>
          <input
            type="text"
            id="customerFirstName"
            name="customerFirstName"
            placeholder="Enter first name"
            value={formData.customerFirstName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerLastName">
            Last Name
          </label>
          <input
            type="text"
            id="customerLastName"
            name="customerLastName"
            placeholder="Enter last name"
            value={formData.customerLastName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerEmail">
            Email
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            placeholder="Enter email address"
            value={formData.customerEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerPhoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="customerPhoneNumber"
            name="customerPhoneNumber"
            placeholder="Enter phone number"
            value={formData.customerPhoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4">
          <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerAddress">
            Address
          </label>
          <input
            type="text"
            id="customerAddress"
            name="customerAddress"
            placeholder="Enter Address"
            value={formData.customerAddress}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
          />
        </div>
        <div className="mb-4 flex gap-4">

          <div className="">
            <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerCity">
              City
            </label>
            <input
              type="text"
              id="customerCity"
              name="customerCity"
              placeholder="Enter City"
              value={formData.customerCity}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
            disabled={title === 'View' ? true : false}
            />
          </div>
          <div className="">
            <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerCountryCode">
              Country
            </label>
            <input
              type="text"
              id="customerCountryCode"
              name="customerCountryCode"
              placeholder="Enter Country"
              value={formData.customerCountryCode}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled={title === 'View' ? true : false}
            />
          </div>
          <div className="">
            <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerStateCode">
              State
            </label>
            <input
              type="text"
              id="customerStateCode"
              name="customerStateCode"
              placeholder="Enter State"
              value={formData.customerStateCode}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled={title === 'View' ? true : false}
            />
          </div>
        </div>
        <div className="mb-4 flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="customerPostalCode">
              Postal Code
            </label>
            <input
              type={title === 'View' ? 'text' : 'number'}
              id="customerPostalCode"
              name="customerPostalCode"
              placeholder="Enter Postal Code"
              value={formData.customerPostalCode}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs md:text-sm border border-gray rounded-lg focus:outline-none"
              disabled={title === 'View' ? true : false}
            />
          </div>
          <div className="flex-1 flex items-center gap-8 mb-2">
            <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="status">
              Status
            </label>
            {/* <ToggleSwitch handleToggle={handleToggle} isOn={formData.status === true ? true : false}/> */}
            {/* <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleToggle}
              className="w-full px-3 py-2 bg-white text-sm border border-gray rounded-lg focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select> */}
          </div>
        </div>
        {title !== 'View' && <div className="flex justify-between mt-10">
          <button
            type="button"
            className="border border-[#D9D9D9] rounded-[8px] text-sm text-[#787070] p-2"
            onClick={() => handleOpenModal(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-priColor text-sm text-white p-2 rounded-lg"
          >
            {title === 'Add' ? 'Add Customer' : 'Save Changes'}
          </button>
        </div>}
      </form>
    </CustomModal>
  );
}

export default CustomerForm;