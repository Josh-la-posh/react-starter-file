import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import MerchantService from '../../../../services/api/merchantApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAuth from '../../../../services/hooks/useAuth';

function MerchantDocumentFilter() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const { merchantDocumentType } = useSelector((state) => state.merchant);
    const dispatch = useDispatch();
    const [documents, setDocuments] = useState(merchantDocumentType);
    const [canUpload, setCanUpload] = useState(false);
    const [file, setFile] = useState(null);
    const [documentId, setDocumentId] = useState('');

    const handleFileCharge = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDocumentId(value);
    }

    useEffect(() => {
        setDocuments(merchantDocumentType);
    }, [merchantDocumentType])

    useEffect(() => {
        loadDocument();
    }, [])

    const loadDocument = async () => {
        await merchantService.fetchMerchantDocumentTypes(dispatch);
    }

    const uploadDocument = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        const merchantCode = auth?.merchant?.merchantCode;
        const formData = new FormData();
        formData.append("file", file);
        await merchantService.createMerchantDocument(merchantCode, documentId, formData, dispatch);
    }
    
  return (
    <div className="flex justify-end items-center mb-5">
        <div className="">
            {/* {file && <p>Selected file: {file.name}</p>} */}
            <div className="flex items-center gap-4">
                { canUpload &&
                    <div className ="flex items-center justify-center gap-2">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                            <select name="" id="documents" value={documents.id} onChange={handleChange} className='px-2 py-2 outline-none text-xs'>
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
                                type="file"
                                accept='image/*, .pdf'
                                onChange={handleFileCharge}
                                className='text-xs'
                            />
                        </div>
                        <button
                            className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
                            onClick={uploadDocument}
                            >
                                Upload
                        </button>
                    </div>
                }
                {
                    canUpload === false ?
                    <button
                        onClick={() => setCanUpload(true)}
                        className={`w-9 h-9 text-white flex justify-center items-center bg-priColor text-xs font-[600] rounded-full shadow-xl`}
                        >
                            <Plus size='22px' />
                    </button>
                    : <button
                        onClick={() => setCanUpload(false)}
                        className={`w-4 h-4 text-white flex justify-center items-center bg-priColor text-xs font-[600] rounded-full shadow-xl`}
                        >
                            <X size='12px' />
                    </button>
                }
            </div>
        </div>
    </div>
  )
}

export default MerchantDocumentFilter;