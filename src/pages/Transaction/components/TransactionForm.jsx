import React from 'react';
import CustomModal from '../../../components/Modal';
import { dateFormatter } from '../../../utils/dateFormatter';
import { Cloud } from 'lucide-react';

function TransactionForm({ handleCloseModal, data }) {
  return (
    <CustomModal handleOpenModal={handleCloseModal} width=' w-[90%] md:w-[70%]'>
      <div className="mb-8">
        <div className='text-[20px] font-[500]'>Transaction Details</div>
      </div>
      <div className="flex flex-col md:flex-row mb-4">
        <div className="flex-1 space-y-3 text-md font-[700] text-gray-600">
            <p>Account Number: <span className='font-[400]'>{data.accountNumberMask}</span></p>
            <p>Amount: <span className='font-[400]'>{data.currencyCode} {data.amountCollected}</span></p>
            <p>Reference: <span className='font-[400]'>{data.paymentReference}</span></p>
            <p>Customer Name: <span className='font-[400]'>{data.customerName}</span></p>
            <p>Customer Phone: <span className='font-[400]'>{data.customerPhone}</span></p>
            <p>Customer Email: <span className='font-[400]'>{data.customerEmail}</span></p>
            <p>Processor: <span className='font-[400]'>{data.processorName}</span></p>
            <p>Transaction Method: <span className='font-[400]'>{data.channelCode}</span></p>
            <p>Transaction Type: <span className='font-[400]'>{data.transactionType}</span></p>
            <p>Processor Message: <span className='font-[400]'>{data.processorMessage}</span></p>
            <p>Status: <span className='font-[400]'>{data.transactionStatus}</span></p>
        </div>
        <div className="flex-1">
            <div className="flex justify-end">
              <div className="flex gap-5">
                <button className='text-white text-xs bg-priColor py-3 px-6 rounded-md'>Resend Notification</button>
                <button className='text-priColor text-xs rounded-md flex items-center justify-center gap-2 hover:bg-priColor hover:bg-opacity-[0.56] p-3 hover:text-[#121212]'><Cloud size={'15px'}/> Download Receipt</button>
              </div>
                
            </div>
            <div className="mt-4 text-gray-600">
                <p className='mb-3'>Transaction Logs</p>
                <ul className='list-disc pl-5 space-y-3'>
                    <li className='text-sm font-[700]'>Transaction Initiated: <span className='font-[400]'>{dateFormatter(data.createdDate)}</span></li>
                    <li className='text-sm font-[700]'>Transaction Completed: <span className='font-[400]'>{dateFormatter(data.modifiedDate)}</span></li>
                    <li className='text-sm font-[700]'>Callback Sent Response Code: <span className='font-[400]'>{data.isNotified === true ? '200' : '400'}</span></li>
                </ul>
            </div>
        </div>
      </div>
    </CustomModal>
  );
}

export default TransactionForm;