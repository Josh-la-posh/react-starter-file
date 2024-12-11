import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import MerchantService from '../../../../services/api/merchantApi';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../../../services/hooks/useAuth';
import { toast } from 'react-toastify';

function MerchantDocumentFilter() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const { merchantDocumentType } = useSelector((state) => state.merchant);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [documents, setDocuments] = useState(merchantDocumentType);
    const [canUpload, setCanUpload] = useState(false);
    const [formData, setFormData] = useState({
        documents : '',
        merchantCode : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.value);
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        setDocuments(merchantDocumentType);
    }, [merchantDocumentType])

    const handleUpload = (e) => {
        const v1 = formData.merchantName;
        const v2 = formData.merchantCode;

        if (v1 === '' && v2 === '') {
            toast('Fields cannot be empty');
            return;
        }

        if (v1 === '' && v2 !== '') {
            toast('Merchant name cannot be empty');
            return;
        }

        if (v1 !== '' && v2 === '') {
            toast('Merchant code cannot be empty');
            return;
        }
    }

    useEffect(() => {
        loadDocument();
    }, [])

    const loadDocument = async () => {
        await merchantService.fetchMerchantDocumentTypes(dispatch);
    }

    const uploadDocument = async (documentId) => {
        await merchantService.createMerchantDocument('tes0000449', documentId, formData, dispatch);
    }
    
  return (
    <div className="flex justify-between items-center mb-5">
        <button onClick={() => navigate(-1)} className='text-priColor flex items-center gap-2 text-xs'><ArrowLeft size={'14px'}/> Go Back</button>
        <div className="flex gap-4">
            { canUpload &&
                <div className ="flex items-center justify-center gap-2">
                    <select name="" id="documents" value={documents} onChange={handleChange}>
                        {
                            documents.map(document => {
                                return (
                                    <option value={document.id} className='text-xs'>
                                        {document.documentName}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input
                        type="text"
                        name='merchantCode'
                        value={formData.merchantCode}
                        onChange={handleChange}
                        className="p-2 pl-4 border border-gray-300 rounded-lg focus:outline-none text-xs"
                        placeholder="Merchant code"
                        required
                    />
                    <button
                        className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
                        onClick={handleUpload}
                        >
                            Upload
                    </button>
                </div>
            }
            {
                canUpload === false &&
                <button
                    onClick={() => setCanUpload(true)}
                    className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
                    >
                        <Plus size='14' />
                        Upload
                </button>
            }
        </div>
    </div>
  )
}

export default MerchantDocumentFilter;