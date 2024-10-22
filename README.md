
# GEMINI Clone

GEMINI Clone is a web application developed using React, designed to simulate content generation using Google's Gemini API. The app provides users with an intuitive platform to generate text based on input queries and store recent responses locally for easy access. The project is deployed on Vercel for fast and reliable access and ensures a smooth experience across different devices.

## Features

- **Text Generation**: Users can input queries, and the app generates responses using the Gemini API.
- **Local Storage**: Recent responses are saved locally for users to review past queries and responses.
- **Authentication**: The app includes a secure login page, requiring user authentication before accessing the content generation feature.
- **Responsive Design**: The app is designed to be responsive, providing seamless navigation across both desktop and mobile devices.
- **Error Handling**: Robust error management ensures that users receive clear feedback in case of issues during API calls.
- **Vercel Deployment**: Hosted on Vercel for fast access and performance.

## Technologies Used

- **Frontend**: React.js, React Router, JavaScript
- **API**: Google's Gemini API for content generation
- **Icons**: React Icons (CgProfile for the profile icon)
- **State Management**: React hooks (useState, useEffect) for managing local state
- **Local Storage**: Utilized to store and retrieve recent responses from user queries

## How to Use

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```
4. Run the app locally using `npm start`.
5. Open [http://localhost:3000](http://localhost:3000) to use the app.

## Future Improvements

- Add user profile management for a more personalized experience.
- Integrate additional languages for multilingual content generation.
- Enhance error handling to provide more detailed feedback.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
