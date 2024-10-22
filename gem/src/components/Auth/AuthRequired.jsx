import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem("loggedin") === 'true'; // Ensure it's compared as a string
    const location = useLocation();

    console.log('AuthRequired: isLoggedIn:', isLoggedIn);

    // Only redirect if the user is not logged in
    if (!isLoggedIn) {
        console.log("Redirecting to login, user not logged in.");
        return (
            <Navigate 
                to="/login" 
                state={{ message: "You must log in first", from: location.pathname }} 
                replace
            />
        );
    }

    console.log("User is logged in, rendering child routes.");
    return <Outlet />;
}
