import React, { useEffect, useRef, useState } from 'react';
import { faContactCard } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import AuthInputField from '../../components/AuthInptField';
import useSettingsTitle from '../../services/hooks/useSettingsTitle';
import MerchantService from '../../services/api/merchantApi';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';
import useAuth from '../../services/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import useTitle from '../../services/hooks/useTitle';

const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function ContactPage() {
    const errRef = useRef();
    const { auth } = useAuth();
    const dispatch = useDispatch();
    const { merchantContact } = useSelector((state) => state.merchant);
    const { setSettingsTitle } = useSettingsTitle();
    const { setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const merchantCode = auth?.merchant?.merchantCode;

    const [validDisputesEmail, setValidDisputesEmail] = useState(false);
    const [disputesEmailFocus, setDisputesEmailFocus] = useState(false);

    const [validSupportEmail, setValidSupportEmail] = useState(false);
    const [supportEmailFocus, setSupportEmailFocus] = useState(false);

    const [validBusinessEmail, setValidBusinessEmail] = useState(false);
    const [businessEmailFocus, setBusinessEmailFocus] = useState(false);

    const [validContactEmail, setValidContactEmail] = useState(false);
    const [contactEmailFocus, setContactEmailFocus] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        disputeEmail: merchantContact.disputeEmail ?? '',
        supportEmail: merchantContact.supportEmail ?? '',
        businessEmail: merchantContact.businessEmail ?? '',
        contactEmail: merchantContact.contactEmail ?? '',
    });

    useEffect(() => {
        setFormData({
            disputeEmail: merchantContact.disputeEmail ?? '',
            supportEmail: merchantContact.supportEmail ?? '',
            businessEmail: merchantContact.businessEmail ?? '',
            contactEmail: merchantContact.contactEmail ?? '',
        });
    }, [merchantContact]);
    

    useEffect(() => {
        setAppTitle('Settings');
        setSettingsTitle('Contact');
    }, []);

  useEffect(() => {
    const loadData = async () => {
        await merchantService.fetchMerchantContact(merchantCode, dispatch);
    };
    loadData();
  }, [merchantCode, dispatch]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.disputeEmail);
        setValidDisputesEmail(result);
    }, [formData.disputeEmail])

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.supportEmail);
        setValidSupportEmail(result);
    }, [formData.supportEmail])

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.businessEmail);
        setValidBusinessEmail(result);
    }, [formData.businessEmail])

    useEffect(() => {
        const result = EMAIL_REGEX.test(formData.contactEmail);
        setValidContactEmail(result);
    }, [formData.contactEmail])

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const v1 = formData.currentPassword;
        const v2 = formData.newPassword;
        const v3 = formData.confirmPassword;

        if (v1 === '' && v2 === '' && v3 === '') {
            toast('No field must be empty');
            return;
        }

        if (v2 !== v3) {
            toast('Passwords do not match!');
            return;
        }
        setIsLoading(true);
        toast('You are good to go');
        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    };

    return (
        <div className="mb-8  bg-white px-5 py-5">
            <p className="text-xs font-normal my-8 text-center px-5">As soon as a dispute (chargeback or fraud claim) is raised for a transaction or more support is required from your team, Paystack will notify you via email in the email addresses that you specify below.</p>
            <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <AuthInputField
                    label="Dispute emails"
                    type='text'
                    icon={faContactCard}
                    validName={validDisputesEmail}
                    valueName={formData.disputeEmail}
                    id="disputeEmail"
                    onChange={handleChange}
                    setOnFocus={setDisputesEmailFocus}
                    nameFocus={disputesEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Support email"
                    type='text'
                    icon={faContactCard}
                    validName={validSupportEmail}
                    valueName={formData.supportEmail}
                    id="supportEmail"
                    onChange={handleChange}
                    setOnFocus={setSupportEmailFocus}
                    nameFocus={supportEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Business email"
                    type='text'
                    icon={faContactCard}
                    validName={validBusinessEmail}
                    valueName={formData.businessEmail}
                    id="businessEmail"
                    onChange={handleChange}
                    setOnFocus={setBusinessEmailFocus}
                    nameFocus={businessEmailFocus}
                    errNote={(
                        <>
                            Enter a valid email address
                        </>
                    )}
                />
                <AuthInputField
                    label="Contact email"
                    type='text'
                    icon={faContactCard}
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
                <div className="w-full flex justify-end">
                    <button 
                        type="submit"
                        className="py-3 px-6 bg-priColor text-xs text-white rounded-md"
                    >
                        {isLoading ? 'Updating ...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactPage;
