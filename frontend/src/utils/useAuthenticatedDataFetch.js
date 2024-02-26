import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function useAuthenticatedDataFetch(url, method, sendData, navigateUrl) {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    let reqData = JSON.stringify(sendData);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.request({
                    method: method,
                    url: url,
                    headers: { Authorization: `Bearer ${token}` },
                    data: reqData
                });
                if (response.data) {
                    setData(response.data);
                }

            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate(navigateUrl);
                } else {
                    setError("unable to fetch data");
                }
            }
        };

        fetchData();

    }, [url, navigateUrl]);

    return [data, error];
}

export default useAuthenticatedDataFetch;
