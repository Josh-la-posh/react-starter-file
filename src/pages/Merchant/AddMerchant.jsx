import React, { useEffect, useRef, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import MerchantSelector from '../../components/MerchantSelector';
import AuthInputField from '../../components/AuthInptField';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const BUSINESS_REGEX = /^[a-zA-Z0-9\s\-']{3,50}$/;
const NAME_REGEX = /^[a-zA-Z]{2,24}$/;
// const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_@]{3,24}$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{7,24}$/;
const PHONE_REGEX = /^[0-9\s\-()]{10,15}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function AddMerchantPage() {
  const { setAppTitle } = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const merchants = auth?.data?.merchants || [];
  const [merchant, setMerchant] = useState(merchants[0] || {});
  const merchantCode = merchant.merchantCode;
  const merchantService = new MerchantService(axiosPrivate, auth);

  useEffect(() => {
      setAppTitle('Merchant');
  }, []);

  const [countryList, setCountryList] = useState([]);
  const [showCountryListReload, setShowCountryListReload] = useState(false);
  const [industryList, setIndustryList] = useState([]);
  const [showIndustryListReload, setShowIndustryListReload] = useState(false);
  const [industryCategoryList, setIndustryCategoryList] = useState([]);
  const [showIndustryCategoryListReload, setShowIndustryCategoryListReload] = useState(false);
  const [showIndustryCategories, setShowIndustryCategories] = useState(false);
  const [industryId, setIndustryId] = useState(null);
  const errRef = useRef();

  const [validBusinessName, setValidBusinessName] = useState(false);
  const [businessNameFocus, setBusinessNameFocus] = useState(false);

  const [validContactEmail, setValidContactEmail] = useState(false);
  const [contactEmailFocus, setContactEmailFocus] = useState(false);

  const [validContactPhoneNumber, setValidContactPhoneNumber] = useState(false);
  const [contactPhoneNumberFocus, setContactPhoneNumberFocus] = useState(false);

  const [validContactFirstName, setValidContactFirstName] = useState(false);
  const [contactFirstNameFocus, setContactFirstNameFocus] = useState(false);

  const [validContactLastName, setValidContactLastName] = useState(false);
  const [contactLastNameFocus, setContactLastNameFocus] = useState(false);

  // const [validIndustryCategoryId,setValidIndustryCategoryId] = useState(false);
  // const [industryCategoryIdFocus,setIndustryCategoryIdFocus] = useState(false);

  // const [validCountry,setValidCountry] = useState(false);
  // const [countryFocus,setCountryFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);


  const [formData, setFormData] = useState({
      businessName: '',
      industryCategoryId: '',
      contactEmail: '',
      supportEmail: '',
      disputeEmail: '',
      businessEmail: '',
      phoneNumber: 1,
      website: 1,
      bvn: 1,
      accountBalance: 1,
      address: 1,
      stateCode: 1,
      postalCode: 1,
      countryCode: 1,
      businessDescription: 1,
      returnUrl: 1,
      notificationURL: 1,
  });

  const getCountry = async () => {
      // e.preventDefault();
      try {
          const response = await axiosPrivate.get('api/country');
          if (response.data.message === 'Successful') {
              console.log('The new response is ', response.data);
              setCountryList(response.data.responseData);
              setShowCountryListReload(false);
          } else {
              setShowCountryListReload(true);
          }
      } catch (err) {
          console.log('Error printing country ', err.response);
          setShowCountryListReload(true);
      }
  }

  const getIndustry = async () => {
      // e.preventDefault();
      try {
          const response = await axiosPrivate.get('api/industry');
          if (response.data.message === 'Successful') {
              console.log('The new response is ', response.data);
              setIndustryList(response.data.responseData);
              setShowIndustryListReload(false);
          } else {
              setShowIndustryListReload(true);
          }
      } catch (err) {
          console.log('Error printing industry ', err.response);
          setShowIndustryListReload(true);
      }
  }

  const getIndustryCategories = async (id) => {
      try {
          const response = await axiosPrivate.get(`api/industry/categories/${id}`);
          if (response.data.message === 'Successful') {
              console.log('The new industry categories are ', response.data);
              setIndustryCategoryList(response.data.responseData);
              setShowIndustryCategoryListReload(false);
          } else {
              setShowIndustryCategoryListReload(true);
          }
      } catch (err) {
          console.log('Error printing industry categories ', err.response);
          setShowIndustryCategoryListReload(true);
      }
  }

  useEffect(() =>  {
      if (countryList.length < 1) {
          getCountry();
      }
      getIndustry();
  }, [])

  useEffect(() => {
      const result = BUSINESS_REGEX.test(formData.businessName);
      setValidBusinessName(result);
  }, [formData.businessName])

  useEffect(() => {
      const result = EMAIL_REGEX.test(formData.contactEmail);
      setValidContactEmail(result);
  }, [formData.contactEmail])

  useEffect(() => {
      const result = PHONE_REGEX.test(formData.contactPhoneNumber);
      setValidContactPhoneNumber(result);
  }, [formData.contactPhoneNumber])

  useEffect(() => {
      const result = NAME_REGEX.test(formData.contactFirstName);
      setValidContactFirstName(result);
  }, [formData.contactFirstName])

  useEffect(() => {
      const result = NAME_REGEX.test(formData.contactLastName);
      setValidContactLastName(result);
  }, [formData.contactLastName])

  useEffect(() => {
      setErrMsg('');
  }, [formData.businessName, formData.contactEmail, formData.contactFirstName, formData.contactLastName, formData.contactPhoneNumber])

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const handleCategoryChange = (e) => {
      setIndustryId(e.target.value);
      getIndustryCategories(e.target.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      const v1 = BUSINESS_REGEX.test(formData.businessName);
      const v2 = EMAIL_REGEX.test(formData.contactEmail);
      const v3 = PHONE_REGEX.test(formData.contactPhoneNumber);
      const v4 = NAME_REGEX.test(formData.contactFirstName);
      const v5 = NAME_REGEX.test(formData.contactLastName);


      if (!v1 || !v2 || !v3 || !v4 || !v5) {
          setErrMsg('Invalid Entry');
          return;
      }
      setLoading(true);

      try {
          const response = await axiosPrivate.post('',
              JSON.stringify(formData),
              {
                  headers: { 'Content-Type': 'application/json' },
                  // withCredentials: true
              })
          setSuccess(true);
          toast.success("Registration successful! Please check your email to confirm your account.");

          // Clear the form fields after successful submission
          setFormData({
              country: 'NG',
              businessName: '',
              contactEmail: '',
              contactPhoneNumber: '',
              contactFirstName: '',
              contactLastName: '',
              industryCategoryId: 1,
          });

      } catch (err) {
          if (err.response.status === 400) {
              toast(err.response.data.message);
          } else if (!err.response) {
              setErrMsg('No Server Response');
          } else {
              setErrMsg('An error occured. Try again later');
          }

          errRef.current.focus();
      } finally {
          setLoading(false);
      }
  };


  return (
    <div>
        <form onnSubmit={handleSubmit}>
            <div className='grid lg:grid-cols-3 gap-4'>
                <AuthInputField
                    label="Business Name"
                    type='text'
                    validName={validBusinessName}
                    valueName={formData.businessName}
                    id="businessName"
                    onChange={handleChange}
                    setOnFocus={setBusinessNameFocus}
                    nameFocus={businessNameFocus}
                    errNote={(
                        <>
                            Business name is required.
                            <br />
                            Business name must be between 3 and 50 characters.
                            <br />
                            Business name can only contain letters, numbers, spaces, hyphens, and apostrophes.
                            <br />
                            Business name cannot start or end with a space.
                        </>
                    )}
                />
                <AuthInputField
                    label="Address"
                    type='text'
                    validName={validBusinessName}
                    valueName={formData.businessName}
                    id="businessName"
                    onChange={handleChange}
                    setOnFocus={setBusinessNameFocus}
                    nameFocus={businessNameFocus}
                    errNote={(
                        <>
                            Address is required.
                            <br />
                            Address must be between 3 and 50 characters.
                            <br />
                            Address cannot start or end with a space.
                        </>
                    )}
                />
                <AuthInputField
                    label="City"
                    type='text'
                    validName={validBusinessName}
                    valueName={formData.businessName}
                    id="businessName"
                    onChange={handleChange}
                    setOnFocus={setBusinessNameFocus}
                    nameFocus={businessNameFocus}
                    errNote={(
                        <>
                            City is required.
                        </>
                    )}
                />
                <AuthInputField
                    label="Postal Code"
                    type='text'
                    validName={validBusinessName}
                    valueName={formData.businessName}
                    id="businessName"
                    onChange={handleChange}
                    setOnFocus={setBusinessNameFocus}
                    nameFocus={businessNameFocus}
                    errNote={(
                        <>
                            Postal code is required.
                            <br />
                            Address cannot start or end with a space.
                        </>
                    )}
                />
                <AuthInputField
                    label="Business Email"
                    type='email'
                    validName={validContactEmail}
                    valueName={formData.contactEmail}
                    id="contactEmail"
                    onChange={handleChange}
                    setOnFocus={setContactEmailFocus}
                    nameFocus={contactEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Contact Email"
                    type='email'
                    validName={validContactEmail}
                    valueName={formData.contactEmail}
                    id="contactEmail"
                    onChange={handleChange}
                    setOnFocus={setContactEmailFocus}
                    nameFocus={contactEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Dispute Email"
                    type='email'
                    validName={validContactEmail}
                    valueName={formData.disputeEmail}
                    id="contactEmail"
                    onChange={handleChange}
                    setOnFocus={setContactEmailFocus}
                    nameFocus={contactEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Support Email"
                    type='email'
                    validName={validContactEmail}
                    valueName={formData.supportEmail}
                    id="contactEmail"
                    onChange={handleChange}
                    setOnFocus={setContactEmailFocus}
                    nameFocus={contactEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Phone Number"
                    type='tel'
                    validName={validContactPhoneNumber}
                    valueName={formData.contactPhoneNumber}
                    id="contactPhoneNumber"
                    onChange={handleChange}
                    setOnFocus={setContactPhoneNumberFocus}
                    nameFocus={contactPhoneNumberFocus}
                    errNote={(
                        <>
                            Please enter a valid phone number (10 to 15 digits).
                        </>
                    )}
                />
                <AuthInputField
                    label="Website"
                    type='text'
                    validName={validContactFirstName}
                    valueName={formData.contactFirstName}
                    id="contactFirstName"
                    onChange={handleChange}
                    setOnFocus={setContactFirstNameFocus}
                    nameFocus={contactFirstNameFocus}
                    errNote={(
                        <>
                            Website is required.
                            <br />
                            website cannot contain spaces.
                        </>
                    )}
                />

                <AuthInputField
                    label="Return Url"
                    type='text'
                    validName={validContactLastName}
                    valueName={formData.contactLastName}
                    id="contactLastName"
                    onChange={handleChange}
                    setOnFocus={setContactLastNameFocus}
                    nameFocus={contactLastNameFocus}
                    errNote={(
                        <>
                            Return url is required.
                            <br />
                            Return url cannot contain spaces.
                        </>
                    )}
                />
                <AuthInputField
                    label="Notification Url"
                    type='text'
                    validName={validContactLastName}
                    valueName={formData.contactLastName}
                    id="contactLastName"
                    onChange={handleChange}
                    setOnFocus={setContactLastNameFocus}
                    nameFocus={contactLastNameFocus}
                    errNote={(
                        <>
                            Notification url is required.
                            <br />
                            Notification url cannot contain spaces.
                        </>
                    )}
                />
                <AuthInputField
                    label="Business Description"
                    type='text'
                    validName={validContactLastName}
                    valueName={formData.contactLastName}
                    id="contactLastName"
                    onChange={handleChange}
                    setOnFocus={setContactLastNameFocus}
                    nameFocus={contactLastNameFocus}
                    errNote={(
                        <>
                            Business description is required.
                            <br />
                            Business description cannot contain spaces.
                        </>
                    )}
                />
                <div className="mb-6 w-full">
                    <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="country">
                        Country
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                        required
                    >
                        {countryList.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.countryName}
                            </option>
                        ))}
                    </select>
                    {showCountryListReload && <div className="w-full mt-2">
                        <Link to='' onClick={getCountry} className='text-priColor text-xs text-right cursor'>Retry</Link>
                    </div>}
                </div>
                <div className="mb-6 w-full">
                    <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="industry">
                        Industry
                    </label>
                    <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={(e) => handleCategoryChange(e)}
                        className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                        required
                    >
                        {industryList.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                                {industry.industryName}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    industryId !== null &&
                    <div className="mb-6 w-full">
                        <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="industryCategoryId">
                            Industry Category
                        </label>
                        <select
                            id="industryCategoryId"
                            name="industryCategoryId"
                            value={formData.industryCategoryId}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                            required
                        >
                            {industryCategoryList.map((industry) => (
                                <option key={industry.id} value={industry.id}>
                                    {industry.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                }
            </div>
            <button
                type="submit"
                className="bg-priColor text-sm text-white py-2 px-5 rounded-md"
                // disabled={loading || !validBusinessName || !validContactEmail || !validContactFirstName || !validContactLastName || !validContactPhoneNumber ? true : false}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    </div>
  )
}

export default AddMerchantPage;