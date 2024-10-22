import React from 'react';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFoundPage/NotFound';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthRequired from './components/Auth/AuthRequired';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthRequired />}>
                    <Route path="/" element={<SearchBar />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
