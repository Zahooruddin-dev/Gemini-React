import React, { useState, useEffect } from 'react';
import Result from './Result';
import Form from './Form';

function SearchBar() {
	const [textValue, setTextValue] = useState('');
	const [responseText, setResponseText] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [recentResponses, setRecentResponses] = useState([]);

	const URL =
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
	const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

	// Load recent responses from localStorage on component mount
	useEffect(() => {
		const storedResponses = JSON.parse(localStorage.getItem('recentResponses')) || [];
		setRecentResponses(storedResponses);
	}, []);

	// Store recent responses in local storage
	const storeResponseInLocalStorage = (response) => {
		let updatedResponses = [response, ...recentResponses];

		// Keep only the latest 5 responses
		if (updatedResponses.length > 5) {
			updatedResponses = updatedResponses.slice(0, 5);
		}

		setRecentResponses(updatedResponses);
		localStorage.setItem('recentResponses', JSON.stringify(updatedResponses));
	};

	// Handle textarea change
	const handleTextChange = (e) => {
		setTextValue(e.target.value);
	};

	// Handle form submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		setResponseText('');
		setError(null);
		setLoading(true);

		try {
			const body = {
				contents: [
					{
						parts: [
							{
								text: textValue,
							},
						],
					},
				],
			};

			const response = await fetch(`${URL}?key=${API_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();

			// Extract and store the response text
			if (data.candidates && data.candidates.length > 0) {
				const content = data.candidates[0].content.parts[0].text;
				setResponseText(content);

				// Store the successful response in local storage
				storeResponseInLocalStorage(content);
			} else {
				setError('No meaningful content returned.');
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}

		setTextValue('');
	};

	return (
		<div className='app-container'>
			<div className='content'>
				<h1 className='title'>GEMINI Clone</h1>
				<Result loading={loading} error={error} responseText={responseText} />

				{/* Display recent responses */}
				<div className='recent-responses'>
					<h2>Recent Responses</h2>
					<ul>
						{recentResponses.map((resp, index) => (
							<li key={index}>{resp}</li>
						))}
					</ul>
				</div>
			</div>

			<Form handleSubmit={handleSubmit} textValue={textValue} handleTextChange={handleTextChange} />
		</div>
	);
}

export default SearchBar;
