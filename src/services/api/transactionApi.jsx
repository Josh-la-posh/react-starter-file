import { toast } from "react-toastify";
import { transactionFailure, transactionStart, transactionSuccess } from "../../redux/slices/transactionSlice";

class TransactionService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }
  
    async downloadTransactionReceipt(merchantCode, pageNumber, pageSize, env) {
      try {
        const response = await this.axiosPrivate.post(
          `api/Transaction/search/download?merchantCode=${merchantCode}&pageNumber=${pageNumber}&pageSize=${pageSize}&env=${env}`
        );
        toast('Transations downloaded successfully');
      } catch (err) {
        console.log('The response is: ', err)
        if (!err.response) {
            toast('No response from server');
        } else {
            toast('Failed to download transactions data. Try again.');
        }
      } finally {
      }
    }
  
    async fetchtransactionsByPaymentReference(merchantCode, paymentReference, env, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/bypaymentreference/${paymentReference}?merchantCode=${merchantCode}&env=${env}`
        );
        console.log('This is the transaction data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to load Customer transactions. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchtransactionsByDate(merchantCode, startDate, endDate, pageNumber, pageSize, env, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/bydate/${startDate}/${endDate}?merchantCode=${merchantCode}&pageNumber=${pageNumber}&pageSize=${pageSize}&env=${env}`
        );
        console.log('This is the transaction data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to load Customer transactions. Try again.'));
        }
      } finally {
      }
    }
  
    async searchTransaction(merchantCode, pageNumber, pageSize, env, data, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/Transaction/search?merchantCode=${merchantCode}&pageNumber=${pageNumber}&pageSize=${pageSize}&env=${env}`,
          JSON.stringify({data})
        );
        console.log('transaction created ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to create transaction. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchtransactionsByCustomerEmail(merchantCode, customerEmail, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/bycustomeremail/${customerEmail}?merchantCode=${merchantCode}`
        );
        console.log('This is the transaction data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to load Customer transactions. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchtransactions(merchantCode, env, pageNumber, pageSize, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/paginated/${pageNumber}/${pageSize}?merchantCode=${merchantCode}&env=${env}`
        );
        const data = response.data.data;
        console.log('Transaction data: ', response.data);
        dispatch(transactionSuccess(data));
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to load Customer transactions. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchTransactionReceipt(transactionId) {
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/receipt/${transactionId}`
        );
        console.log('This is the transaction receipt ', response.data);
        toast('Transaction receipt downloaded successfully');
      } catch (err) {
        if (!err.response) {
            toast('No response from server');
        } else {
            toast('Failed to download transaction receipt. Try again.');
        }
      } finally {
      }
    }
  }
  
  export default TransactionService;