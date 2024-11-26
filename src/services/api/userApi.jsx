import { toast } from "react-toastify";
import { invoiceFailure, invoiceStart } from "../../redux/slices/invoiceSlice";
import { usersFailure, usersStart, usersSuccess } from "../../redux/slices/userSlice";

class userService {
    constructor(axiosPrivate, auth, setAuth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
      this.setAuth = setAuth;
    }
  
    async createUser(merchantCode, data, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/Users/createuser/${merchantCode}`,
          JSON.stringify({data})
        );
        console.log('User created ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to create user. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUsersByMerchantCode(merchantCode, pageNumber, pageSize, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Users/bymerchant/${merchantCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        console.log('This is the user data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to load users. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUsersMerchantByAggregatorCode(aggregatorCode, pageNumber, pageSize, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Users/merchant/${aggregatorCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        console.log('This is the user data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to load users. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUserMerchantByAggregatorCode(userId, aggregatorCode, pageNumber, pageSize, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Users/${userId}/merchant/${aggregatorCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        console.log('This is the user data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to load users. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUserByAggregatorCode(aggregatorCode, pageNumber, pageSize, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Users/byaggregator/${aggregatorCode}?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
        console.log('This is the user data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to load users. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchUserProfile(merchantCode, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Users/profile?merchantCode=${merchantCode}`
        );
        console.log('This is the user data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to load users. Try again.'));
        }
      } finally {
      }
    }
  
    async updateUserData(userId, formData, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/Users/${userId}`,
          JSON.stringify(formData)
        );
        const data = response.data.responseData;
        dispatch(usersSuccess(data));
        this.setAuth(prev => {
          return {...prev, firstName: data.firstName, lastName: data.lastName, email: data.email, phoneNumber: data.phoneNumber}
        });
        toast('success', 'Profile updated successfully');
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to updata user data. Try again.'));
        }
      } finally {
      }
    }
  
    async activateUser(userId, data, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/Users/activate`,
          JSON.stringify({data})
        );
        console.log('User data has been activated ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to activate user. Try again.'));
        }
      } finally {
      }
    }
  
    async updateUser(data, dispatch) {
        dispatch(usersStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/Users/deactivate`,
          JSON.stringify({data})
        );
        console.log('User data has been deactivated ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(usersFailure('No response from server'));
        } else {
            dispatch(usersFailure('Failed to deactivate user data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default userService;