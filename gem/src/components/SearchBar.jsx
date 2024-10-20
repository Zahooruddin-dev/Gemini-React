import React, { useState } from 'react';
import Result from './Result';

function SearchBar() {
	const [textValue, setTextValue] = useState('');
	const [typeText, setTypeText] = useState();

	// Handle textarea change
	const handleTextChange = (e) => {
		setTextValue(e.target.value);
	};

	// Handle form submit
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitted Text:', textValue);
		// Display the submitted content
		setTextValue('');
	};

	React.useEffect(() => {
		setTypeText(textValue);
	}, []);

	return (
		<div className='app-container'>
			<div className='content'>
				<h1 className='title'>GEMINI Clone</h1>

				{/* This section will display the content */}
				<div className='display-content'>
					<h2>Answer Content:</h2>
					{/*           <p>{typeText}</p>
					 */}{' '}
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
