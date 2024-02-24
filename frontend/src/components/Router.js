import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn';
import Login from './Login';
import Crud from './Crud';
import ProtectedRoute from './ProtectedRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Crud />} />
                </Route>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<SignIn />} />
            </Routes>
        </BrowserRouter>

    );
};

export default Router;