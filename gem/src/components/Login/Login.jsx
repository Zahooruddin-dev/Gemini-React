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
	const [isSubmitted, setIsSubmitted] = useState(false);

	const location = useLocation();
	const navigate = useNavigate(); // Changed to lowercase
	const fromLocation = location.state?.form || '/';

	const handleSubmit = (e) => {
		e.preventDefault();
		setStatus('submitting');

		loginUser(loginFormData)
			.then((data) => {
				setError(null);
				localStorage.setItem('loggedIn', true);
				// Redirect after successful login
				navigate(fromLocation, { replace: true }); // Changed to lowercase
				setIsSubmitted(true); // Set isSubmitted to true after successful login
			})
			.catch((err) => {
				setError(err.message || 'An error occurred'); // Set error message
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

	if (isSubmitted) {
		return (
			<Navigate to='..' state={{ message: 'You must log in first' }} replace />
		);
	}

	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2>Login to Gemini</h2>
				{error && <p className='error-message'>{error}</p>} {/* Display error message */}
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
					{status === 'submitting' ? 'Logging in...' : 'Login'} {/* Button text changes while submitting */}
				</button>
			</form>
		</div>
	);
}
