import { ArrowDownWideNarrow, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function MerchantFilter() {
    const [canSearch, setCanSearch] = useState(false);
    const [formData, setFormData] = useState({
        name : '',
        code : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    
  return (
    <div className="flex justify-end gap-4">
        { canSearch &&
            <div className ="flex items-center justify-center gap-2">
                <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none text-xs"
                    placeholder="MErchant name"
                />
                <input
                    type="text"
                    value={formData.code}
                    onChange={handleChange}
                    className="p-2 pl-8 border border-gray-300 rounded-lg focus:outline-none text-xs"
                    placeholder="Merchant code"
                />
                <button
                    className={`text-white border border-gray bg-priColor text-xs font-[600] py-2 px-2 rounded-sm flex justify-between items-center gap-2`}
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