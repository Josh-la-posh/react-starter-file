import { customerFailure, customerStart } from "../../redux/slices/customerSlice";

class CustomerService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }
  
    async fetchAllCustomer(merchantCode, pageNumber, pageSize, dispatch) {
        dispatch(customerStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Customer/paginated/${pageNumber}/${pageSize}?merchantCode=${merchantCode}`,
        );
        console.log('This is the customer paginated data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(customerFailure('No response from server'));
        } else {
            dispatch(customerFailure('Failed to load Customer data. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchCustomerByEmail(merchantCode, customerEmail, dispatch) {
        dispatch(customerStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Customer/paginated/${customerEmail}?merchantCode=${merchantCode}`,
        );
        console.log('This is the customer by email data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(customerFailure('No response from server'));
        } else {
            dispatch(customerFailure('Failed to load Customer data. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchCustomerById(merchantCode, customerId, dispatch) {
        dispatch(customerStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Customer/paginated/${customerId}?merchantCode=${merchantCode}`,
        );
        console.log('This is the customer by id data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(customerFailure('No response from server'));
        } else {
            dispatch(customerFailure('Failed to load Customer data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default CustomerService;
  