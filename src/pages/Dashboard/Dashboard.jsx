import React, { useEffect, useState } from 'react'
import useTitle from '../../services/hooks/useTitle';
import useAuth from '../../services/hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../services/hooks/useAxiosPrivate';

function Dashboard() {
    const { appTitle, setAppTitle } = useTitle();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [isLumpsumLoading, setIsLumpsumLoading] = useState(false);
    const [isGraphLoading, setIsGraphLoading] = useState(false);
    const [interval, setInterval] = useState('Daily');
    const [lumpsumErr, setLumpsumErr] = useState('');
    const [graphErr, setGraphErr] = useState('');
    const merchant = auth.data.merchants[0];

    console.log('I am very active ', merchant);

    useEffect(() => {
        setAppTitle('Dashboard');
    }, []);

    useEffect(() => {
        fetchLumpsum();
        fetchGraph();
    }, [interval]);

    const fetchLumpsum = async () => {
        setIsLumpsumLoading(true);
        try {
            const lumpsum = await axiosPrivate.get(
                `api/Dashboard/tnx/lumpsum/${merchant.merchantCode}?interval=${interval}`,
            );
            console.log('This is the lumpsum data ', lumpsum.data);
        } catch (err) {
            if (!err.response) {
                setLumpsumErr('No response from server');
            } else {
                setLumpsumErr('Failed to load dashboard data. Try again.');
            }
        } finally {
            setIsLumpsumLoading(false);
        }
    };

    const fetchGraph = async () => {
        setIsGraphLoading(true);
        try {
            const graph = await axiosPrivate.get(
                `api/Dashboard/tnx/graph/${merchant.merchantCode}?interval=${interval}`,
            );
            console.log('This is the graph data ', graph.data);
        } catch (err) {
            if (!err.response) {
                setLumpsumErr('No response from server');
            } else {
                setLumpsumErr('Failed to load data. Try again.');
            }
        } finally {
            setIsGraphLoading(false);
        }
    };

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard;