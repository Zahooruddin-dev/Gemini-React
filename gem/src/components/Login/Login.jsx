import React, { useState } from 'react';
import './Login.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const handleSubmit = (e) => {
		e.preventDefault();
		//logic need to be put here
		console.log('Login data:', { email, password });
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<Navigate 
			to='..' 
			state={{ message: 'You must log in first' }} 
			replace />
		);
	}
	
	return (
		<div className='login-container'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h2>Login to Gemini</h2>
				<div className='form-group'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder='Enter your email'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder='Enter your password'
					/>
				</div>
				<button type='submit' className='login-button'>
					Login
				</button>
			</form>
		</div>
	);
}
