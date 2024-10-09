import { aggregatorBankFailure, aggregatorBankStart, aggregatorDocumentFailure, aggregatorDocumentStart, aggregatorFailure, aggregatorMerchantFailure, aggregatorMerchantStart, aggregatorStart } from "../../redux/slices/aggregatorSlice";
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
        const response = await this.axiosPrivate.put(
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
  
    async deactivateAggregatorBankById({id}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/deactivate/${id}`
        );
        console.log('Deactivated bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to deactivate bank. Try again.'));
        }
      } finally {
      }
    }

    // activate aggregator bank
  
    async activateAggregatorBankById({id}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/activate/${id}`
        );
        console.log('activated bank data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to activate bank. Try again.'));
        }
      } finally {
      }
    }

    // set aggregator bank as primary account
  
    async setAggregatorBankAsPrimary({id}) {
        dispatch(aggregatorBankStart());
      try {
        const response = await this.axiosPrivate.put(
          `api/AggregatorBank/set-primary-account/${id}`,
          JSON.stringify({data})
        );
        console.log('set bank as primary: ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorBankFailure('No response from server'));
        } else {
            dispatch(aggregatorBankFailure('Failed to set as primary account. Try again.'));
        }
      } finally {
      }
    }


    // aggregator documents

    // fetch aggregator document type
  
    async fetchAggregatorDocumentTypes() {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorDocuments/document-types',
        );
        console.log('This are the aggregator document types ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // fetch aggregator document
  
    async fetchAggregatorDocuments() {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          'api/AggregatorDocuments',
        );
        console.log('This are the aggregator documents ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }

    // download aggregator document
  
    async downloadAggregatorDocuments({id}) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorDocuments/download/${id}`,
        );
        console.log('This is the aggregator download ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to download data. Try again.'));
        }
      } finally {
      }
    }

    // post aggregator document
  
    async postAggregatorDocuments({documentId, data}) {
        dispatch(aggregatorDocumentStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/AggregatorDocuments/document/${documentId}`,
          JSON.stringify({data})
        );
        console.log('Uploading aggregator download ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(aggregatorDocumentFailure('No response from server'));
        } else {
            dispatch(aggregatorDocumentFailure('Failed to download data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default AggregatorService;