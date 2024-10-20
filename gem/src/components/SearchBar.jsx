import React, { useState } from 'react';

function SearchBar() {
    const [textValue, setTextValue] = useState('');
    const [responseText, setResponseText] = useState(''); // State to store the API response
    const [error, setError] = useState(null); // State to store error messages

    const URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'; // API URL
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Accessing the API key from Vite's environment variables

    // Handle textarea change
    const handleTextChange = (e) => {
        setTextValue(e.target.value);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setResponseText(''); // Clear previous response
        setError(null); // Clear previous error messages

        try {
            const body = {
                contents: [
                    {
                        parts: [
                            {
                                text: textValue, // Use the textarea value as text
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
            console.log('Response Data:', data); // Log the API response data

            // Extract the text content from the response
            if (data.candidates && data.candidates.length > 0) {
                const content = data.candidates[0].content.parts[0].text;
                setResponseText(content); // Set the API response to responseText
            } else {
                setError("No meaningful content returned.");
            }
        } catch (error) {
            console.error('Fetch Error:', error); // Log fetch errors
            setError(error.message); // Set error message
        }

        // Clear the textarea after submission
        setTextValue('');
    };

    return (
        <div className='app-container'>
            <div className='content'>
                <h1 className='title'>GEMINI Clone</h1>

                {/* This section will display the response content */}
                <div className='display-content'>
                    <h2>Response:</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                    {responseText && <p>{responseText}</p>} {/* Display the response text */}
                </div>
            </div>

            {/* Fixed form at the bottom */}
            <form className='form-container' onSubmit={handleSubmit}>
                <textarea
                    value={textValue}
                    onChange={handleTextChange}
                    className='search-input'
                    placeholder='Type something here...'
                    spellCheck='false'
                />
                <button className='submit-button' type='submit'>
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SearchBar;
