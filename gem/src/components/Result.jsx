import React from 'react';

function Result({ loading, error, responseText }) {
	return (
		<>
			<div className='display-content'>
				<h2>Ask any questions you want!</h2>
				{loading && <p>Loading...</p>} {/* Display loading message */}
				{error && <p style={{ color: 'red' }}>{error}</p>}{' '}
				{/* Display error message */}
				{responseText && <p>{responseText}</p>}{' '}
				{/* Display the response text */}
			</div>
		</>
	);
}

export default Result;
