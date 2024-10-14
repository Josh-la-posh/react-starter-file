import { graphFailure, graphStart, lumpsumFailure, lumpsumStart, lumpsumSuccess } from "../../redux/slices/dashboardSlice";

class DashboardService {
    constructor(axiosPrivate, auth) {
      this.axiosPrivate = axiosPrivate;
      this.auth = auth;
    }
  
    async fetchLumpsum(merchantCode, interval, env, dispatch) {
        dispatch(lumpsumStart());
      try {
        const response = await this.axiosPrivate.get(
          `api/Dashboard/tnx/lumpsum/${merchantCode}?env=${env}&interval=${interval}`,
        );
        const data = response.data.responseData;
        console.log('This is the lumpsum data ', data);
        dispatch(lumpsumSuccess(data))
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(lumpsumFailure('No response from server'));
        } else {
            dispatch(lumpsumFailure('Failed to load dashboard data. Try again.'));
        }
      } finally {
      }
    }
  
    async fetchGraph(merchantCode, interval, dispatch) {
      try {
        dispatch(graphStart());
        const response = await this.axiosPrivate.get(
          `api/Dashboard/tnx/graph/${merchantCode}?interval=${interval}`,
        );
        console.log('This is the graph data ', response.data);
        return response.data;
      } catch (err) {
        if (!err.response) {
            dispatch(graphFailure('No response from server'));
        } else {
            dispatch(graphFailure('Failed to load data. Try again.'));
        }
      } finally {
      }
    }
  }
  
  export default DashboardService;
  