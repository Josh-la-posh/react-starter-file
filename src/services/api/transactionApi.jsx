import { transactionFailure, transactionStart } from "../../redux/slices/transactionSlice";

class TransactionService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
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
  
    async fetchtransactionReceipt(transactionId, dispatch) {
        dispatch(transactionStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Transaction/receipt/${transactionId}`
        );
        console.log('This is the transaction receipt ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(transactionFailure('No response from server'));
        } else {
            dispatch(transactionFailure('Failed to load Customer transaction receipt. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default TransactionService;