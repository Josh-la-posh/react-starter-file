import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import MerchantService from '../../services/api/merchantApi';
import { Link, useParams } from 'react-router-dom';
import AuthInputField from '../../components/AuthInptField';

const NAME_REGEX = /^[a-zA-Z0-9\s\-']{3,50}$/;

function MerchantProfileUpdate() {
    const { merchantCode } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const dispatch = useDispatch();
    const { merchantProfile } = useSelector((state) => state.merchant);

    const [countryList, setCountryList] = useState([]);
    const [showCountryListReload, setShowCountryListReload] = useState(false);
    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
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
        merchantName: merchantProfile.merchantName ?? '',
        merchantCode: merchantProfile.merchantCode ?? '',
        merchantAddress: merchantProfile.address ?? '',
        merchantCity: merchantProfile.city ?? '',
        merchantState: merchantProfile.state ?? '',
        postalCode: merchantProfile.postalCode ?? '',
        country: 'NG',
        status: merchantProfile.status ?? '',
        isWhitelisted: merchantProfile.isWhitelisted === true ? 'True' : 'False' ?? false,
        businessType: merchantProfile.businessType ?? '',
        registerationType: merchantProfile.registrationType ?? '',
        industryCategoryId: 1,
    });

    useEffect(() => {
      const loadData = async () => {
        if (merchantCode) {
          await merchantService.fetchMerchantProfile(merchantCode, dispatch);
        }
      };
      loadData();
    }, [merchantCode, dispatch]);
    
    useEffect(() => {
        getCountry();
    }, [])
    
    useEffect(() => {
        getIndustry();
    }, [])

    const getCountry = async () => {
        try {
            const response = await axiosPrivate.get('api/country');
            if (response.data.message === 'Successful') {
                setCountryList(response.data.responseData);

                const selectedStateList = response.data.responseData
                    .find(country => country.id === 'NG').states;
        
                setStateList(selectedStateList);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCountryChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        const selectedStateList = countryList
            .find(country => country.id === e.target.value).states;

        setStateList(selectedStateList);
    }

    const handleStateChange = () => {}

    const handleCityChange = () => {}

    const handleStatusChange = () => {}

    const handleWhitelistedChange = () => {}

    const handleIndustryChange = (e) => {
        getIndustryCategories(e.target.value);
    }

    useEffect(() => {
        const result = NAME_REGEX.test(formData.merchantName);
        setValidMerchantName(result);
    }, [formData.merchantName]);

  useEffect(() => {
    const loadData = async () => {
      if (merchantCode) {
        await merchantService.fetchMerchantProfile(merchantCode, dispatch);
      }
    };
    loadData();
  }, [merchantCode, dispatch]);

  return (
    <div className="py-10 px-5 bg-white h-full">
        <div className="mb-12 flex justify-between items-center">
            <p className='text-base font-[600]'>Update Merchant Profile</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 text-sm font-medium text-gray-700">
            <AuthInputField
                label="Merchant Name"
                type='text'
                validName={validMerchantName}
                valueName={formData.merchantName}
                id="merchantName"
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
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="country">
                    Country
                </label>
                <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleCountryChange}
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
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="state">
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
            </div>
            <div className="mb-6 w-full">
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="city">
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
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="status">
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
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                </select>
            </div>
            <div className="mb-6 w-full">
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="whitelisted">
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
                    <option value='true'>True</option>
                    <option value='false'>False</option>
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
                <label className="mb-1 lg:mb-2 flex items-center" htmlFor="industry">
                    Industry
                </label>
                <select
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={(e) => handleIndustryChange(e)}
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
                    <label className="mb-1 lg:mb-2 flex items-center" htmlFor="industryCategoryId">
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