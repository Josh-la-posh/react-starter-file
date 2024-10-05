import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const location  = useLocation();


    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.data.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response.status === 401) {
                    try {
                        // const logout = await axiosPrivate.put('api/account/logout');
                        setAuth({});
                        navigate('/login', {state: {from: location}, replace: true});
                    } catch (err) {
                        console.log('New error ', err);
                    }
                }
                // if (error?.response?.status === 401 && !prevRequest?.sent) {
                //     prevRequest.sent = true;
                //     try {
                //         const newAccessToken = await refresh();
                //         prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                //         return axiosPrivate(prevRequest);
                //     } catch (refreshError) {
                //         await axiosPrivate('api/account/logout');
                //         console.log('It has worked out');
                //         setAuth({});
                //         navigate('/login', {state: {from: location}, replace: true});
                //     }
                // } 
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh, navigate, setAuth]);

    return axiosPrivate;
}

export default useAxiosPrivate;