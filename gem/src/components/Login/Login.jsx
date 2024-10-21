import React, { useState } from 'react';
import './Login.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';

export default function Login() {
	const [loginFormData, setLoginFormData] = useState({
		email: '',
		password: '',
	});
	const [status, setStatus] = useState('idle');
	const [error, setError] = useState(null);
	const location = useLocation();
	const navigate = useNavigate();
	const fromLocation = location.state?.from || '/'; // Change from "form" to "from"

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus('submitting');

		loginUser(loginFormData)
			.then((data) => {
				setError(null);
				localStorage.setItem('loggedin', true); // Ensure the key matches AuthRequired
				navigate(fromLocation, { replace: true });
			})
			.catch((err) => {
				setError(err.message || 'An error occurred');
			})
			.finally(() => {
				setStatus('idle');
			});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Check if the user is already logged in
	if (localStorage.getItem('loggedin')) {
		return <Navigate to={fromLocation} replace />;
	}

	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2>Login to Gemini</h2>
				{error && <p className='error-message'>{error}</p>}
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						value={loginFormData.email}
						onChange={handleChange}
						required
						placeholder='Enter your email'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						value={loginFormData.password}
						onChange={handleChange}
						required
						placeholder='Enter your password'
					/>
				</div>
				<button type='submit' className='login-button' disabled={status === 'submitting'}>
					{status === 'submitting' ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
}
