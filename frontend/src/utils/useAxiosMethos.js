import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function axiosMethods(url, method, sendData) {


    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log({
                method: method,
                url: url,
                headers: { Authorization: `Bearer ${token}` },
                data: sendData
            })
            const response = await axios.request({
                method: method,
                url: url,
                headers: { Authorization: `Bearer ${token}` },
                data: sendData
            });
            if (response.data) {
                return response
            }

        } catch (err) {
            if (err.response && err.response.status === 401) {
                return err.response.status
            } else {
                return err
            }
        }
    };

    return fetchData();
}

