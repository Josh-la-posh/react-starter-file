import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import MerchantService from '../../../../services/api/merchantApi';
import { useDispatch } from 'react-redux';
import useAuth from '../../../../services/hooks/useAuth';
import { toast } from 'react-toastify';

function MerchantFilter() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const merchantService = new MerchantService(axiosPrivate);
    const dispatch = useDispatch();
    const [canSearch, setCanSearch] = useState(false);
    const [formData, setFormData] = useState({
        merchantName : '',
        merchantCode : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSearch = (e) => {
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
        loadData();
    }
    
    const loadData = async () => {
        const aggregatorCode = auth?.data?.aggregator?.aggregatorCode;
        await merchantService.searchMerchantAggregator(formData, aggregatorCode, dispatch);
    };
    
  return (
    <div className="flex justify-end gap-4">
        { canSearch &&
            <div className ="flex items-center justify-center gap-2">
                <input
                    type="text"
                    name='merchantName'
                    value={formData.merchantName}
                    onChange={handleChange}
                    className="p-2 pl-4 border border-gray-300 rounded-lg focus:outline-none text-xs"
                    placeholder="Merchant name"
                    required
                />
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
                    onClick={handleSearch}
                    >
                        Search
                </button>
            </div>
        }
        {
            canSearch === false &&
            <button
                onClick={() => setCanSearch(true)}
                className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
                >
                    <Search size='14' />
                    Search
            </button>
        }
        <Link
            to='/merchants/addNew'
            className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
            >
                <Plus size='14' />
                Add
        </Link>
    </div>
  )
}

export default MerchantFilter;