import React, { useEffect, useRef, useState } from 'react';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { useParams } from 'react-router-dom';
import AuthInputField from '../../components/AuthInptField';

const BUSINESS_REGEX = /^[a-zA-Z0-9\s\-']{3,50}$/;

function MerchantProfileUpdate() {
    const { merchantCode } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const dispatch = useDispatch();

    const [countryList, setCountryList] = useState([]);
    const [showCountryListReload, setShowCountryListReload] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [showStateListReload, setShowStateListReload] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [showCityListReload, setShowCityListReload] = useState(false);
    const [industryList, setIndustryList] = useState([]);
    const [showIndustryListReload, setShowIndustryListReload] = useState(false);
    const [industryCategoryList, setIndustryCategoryList] = useState([]);
    const [showIndustryCategoryListReload, setShowIndustryCategoryListReload] = useState(false);
    const [showIndustryCategories, setShowIndustryCategories] = useState(false);
    const [industryId, setIndustryId] = useState(null);

    const [validMerchantName, setValidMerchantName] = useState(false);
    const [merchantNameFocus, setMerchantNameFocus] = useState(false);

    const [validMerchantCode, setValidMerchantCode] = useState(false);
    const [merchantCodeFocus, setMerchantCodeFocus] = useState(false);

    const [validMerchantAddress, setValidMerchantAddress] = useState(false);
    const [merchantAddressFocus, setMerchantAddressFocus] = useState(false);

    const [validPostalCode, setValidPostalCode] = useState(false);
    const [postalCodeFocus, setPostalCodeFocus] = useState(false);

    const [validBusinessType, setValidBusinessType] = useState(false);
    const [businessTypeFocus, setBusinessTypeFocus] = useState(false);

    const [validRegistrationType, setValidRegistrationType] = useState(false);
    const [registrationTypeFocus, setRegistrationTypeFocus] = useState(false);


    const [formData, setFormData] = useState({
        merchantName: '',
        merchantCode: '',
        merchantAddress: '',
        merchantCity: '',
        merchantState: '',
        postalCode: '',
        country: 'NG',
        status: '',
        isWhitelisted: false,
        businessType: '',
        registerationType: '',
        industryCategoryId: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCountryChange = () => {}

    const handleStateChange = () => {}

    const handleCityChange = () => {}

    const handleStatusChange = () => {}

    const handleWhitelistedChange = () => {}

    useEffect(() => {
        const result = BUSINESS_REGEX.test(formData.businessName);
        setValidMerchantName(result);
    }, [formData.businessName]);

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
            <p className='text-lg'>Update Merchant Profile</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-base font-[700] text-gray-600">
            <AuthInputField
                label="Merchant Name"
                type='text'
                validName={validMerchantName}
                valueName={formData.merchantName}
                id="businessName"
                onChange={handleChange}
                setOnFocus={setMerchantNameFocus}
                nameFocus={merchantNameFocus}
                errNote={(
                    <>
                        Merchant name is required.
                        <br />
                        Merchant name must be between 3 and 50 characters.
                        <br />
                        Merchant name can only contain letters, numbers, spaces, hyphens, and apostrophes.
                        <br />
                        Merchant name cannot start or end with a space.
                    </>
                )}
            />
            <AuthInputField
                label="Merchant Code"
                type='text'
                validName={validMerchantCode}
                valueName={formData.merchantCode}
                id="merchantCode"
                onChange={handleChange}
                setOnFocus={setMerchantCodeFocus}
                nameFocus={merchantCodeFocus}
                errNote={(
                    <>
                        Merchant code is required.
                        <br />
                        Merchant code must be between 3 and 50 characters.
                        <br />
                        Merchant code can only contain letters, numbers, spaces, hyphens, and apostrophes.
                        <br />
                        Merchant code cannot start or end with a space.
                    </>
                )}
            />
            <AuthInputField
                label="Address"
                type='text'
                validName={validMerchantAddress}
                valueName={formData.merchantAddress}
                id="address"
                onChange={handleChange}
                setOnFocus={setMerchantAddressFocus}
                nameFocus={merchantAddressFocus}
                errNote={(
                    <>
                        Address is required.
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
                    onChange={(e) => handleCountryChange(e)}
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
                <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="state">
                    State
                </label>
                <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={(e) => handleStateChange(e)}
                    className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                    required
                >
                    {stateList.map((state) => (
                        <option key={state.id} value={state.id}>
                            {state.stateName}
                        </option>
                    ))}
                </select>
                {showStateListReload && <div className="w-full mt-2">
                    <Link to='' onClick={getState} className='text-priColor text-xs text-right cursor'>Retry</Link>
                </div>}
            </div>
            <div className="mb-6 w-full">
                <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="city">
                    City
                </label>
                <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={(e) => handleCityChange(e)}
                    className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                    required
                >
                    {cityList.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.cityName}
                        </option>
                    ))}
                </select>
                {showCityListReload && <div className="w-full mt-2">
                    <Link to='' onClick={getCity} className='text-priColor text-xs text-right cursor'>Retry</Link>
                </div>}
            </div>
            <AuthInputField
                label="Postal Code"
                type='text'
                validName={validPostalCode}
                valueName={formData.postalCode}
                id="postalCode"
                onChange={handleChange}
                setOnFocus={setPostalCodeFocus}
                nameFocus={postalCodeFocus}
                errNote={(
                    <>
                        Postal code is required.
                    </>
                )}
            />
            <div className="mb-6 w-full">
                <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="status">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(e) => handleStatusChange(e)}
                    className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                    required
                >
                    {/* {countryList.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.countryName}
                        </option>
                    ))} */}
                </select>
            </div>
            <div className="mb-6 w-full">
                <label className="text-black text-[11px] lg:text-[13px] mb-1 lg:mb-2 flex items-center" htmlFor="whitelisted">
                    White Listed
                </label>
                <select
                    id="whitelisted"
                    name="whitelisted"
                    value={formData.isWhitelisted}
                    onChange={(e) => handleWhitelistedChange(e)}
                    className="w-full px-3 py-2 text-sm border border-gray rounded-lg focus:outline-none bg-transparent"
                    required
                >
                    {/* {countryList.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.countryName}
                        </option>
                    ))} */}
                </select>
            </div>
            <AuthInputField
                label="Business Type"
                type='text'
                validName={validBusinessType}
                valueName={formData.businessType}
                id="businessType"
                onChange={handleChange}
                setOnFocus={setBusinessTypeFocus}
                nameFocus={businessTypeFocus}
                errNote={(
                    <>
                        Business type is required.
                    </>
                )}
            />
            <AuthInputField
                label="Registration Type"
                type='text'
                validName={validRegistrationType}
                valueName={formData.registerationType}
                id="registrationType"
                onChange={handleChange}
                setOnFocus={setRegistrationTypeFocus}
                nameFocus={registrationTypeFocus}
                errNote={(
                    <>
                        Registration type is required.
                    </>
                )}
            />
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
    </div>
  )
}

export default MerchantProfileUpdate;