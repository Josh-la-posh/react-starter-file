import { aggregatorBankFailure, aggregatorBankStart, aggregatorFailure, aggregatorMerchantFailure, aggregatorMerchantStart, aggregatorStart } from "../../redux/slices/aggregatorSlice";
import { disputeFailure, disputeStart } from "../../redux/slices/disputeSlice";

class AggregatorService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }

    // fetch aggregator
  
    async fetchAggregator() {
        dispatch(aggregatorStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/Aggregator',
        );
        console.log('This is the aggregator data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorFailure('No response from server'));
        } else {
            dispatch(aggregatorFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator merchants
  
    async fetchAggregatorMerchants() {
        dispatch(aggregatorMerchantStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/Aggregator/merchants',
        );
        console.log('This is the aggregator data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorMerchantFailure('No response from server'));
        } else {
            dispatch(aggregatorMerchantFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // update aggregator
  
    async updateAggregator(data) {
        dispatch(aggregatorStart());
      try {
        const response = await this.axiosPrivate.put(
          'api/Aggregator',
          JSON.stringify({data})
        );
        console.log('This is the aggregator data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorFailure('No response from server'));
        } else {
            dispatch(aggregatorFailure('Failed to load Customer data. Try again.'));
        }
      } finally {
      }
    }

    // aggregator bank

    // fetch aggregator bank
  
    async fetchAggregatorBank() {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorBank',
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator bank by id
  
    async fetchAggregatorBankById({id}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorBank/${id}`,
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // add aggregator bank
  
    async addAggregatorBankById() {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.post(
          'api/AggregatorBank',
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // update aggregator bank by id
  
    async updateAggregatorBankById({id, data}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/AggregatorBank/${id}`,
          JSON.stringify({data})
        );
        console.log('This is the aggregator bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // deactivate aggregator bank
  
    async updateAggregatorBankById({id}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.post(
          `api/AggregatorBank/deactivate/${id}`,
          JSON.stringify({data})
        );
        console.log('Deactivated bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default AggregatorService;