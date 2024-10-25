import React, { useState, useEffect } from 'react';

function MerchantSelector({ merchants, onMerchantChange }) {
  const [selectedMerchant, setSelectedMerchant] = useState(merchants[0] || {});

  useEffect(() => {
    // Inform the parent component about the initially selected merchant
    onMerchantChange(selectedMerchant);
  }, [selectedMerchant, onMerchantChange]);

  const handleMerchantChange = (e) => {
    const selectedMerchantId = e.target.value;
    const selected = merchants.find((m) => m.id.toString() === selectedMerchantId);
    setSelectedMerchant(selected);
    onMerchantChange(selected);
  };

  return (
    <div className="mt-8">
      <label htmlFor="merchant" className="mr-2 text-sm">Merchant:</label>
      <select
        id="merchant"
        value={selectedMerchant.id || ''}
        onChange={handleMerchantChange}
        className="p-2 border focus:outline-none rounded-md"
      >
        {merchants.map((merchant) => (
          <option value={merchant.id} key={merchant.id}>
            {merchant.merchantName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MerchantSelector;
