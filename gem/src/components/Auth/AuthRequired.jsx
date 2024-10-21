import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthRequired({ children }) {
	const isLoggedIn = localStorage.getItem('loggedin') === 'true';

	// Check if the user is logged in
	if (!isLoggedIn) {
		return <Navigate to='/login' replace />;
	}

	return children; // Render child components if logged in
}
