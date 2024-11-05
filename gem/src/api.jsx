import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyB8Z9p1UgHh5tPYefWLHd_J2D4EHfDGkHo',
	authDomain: 'gemini-clone-47ed8.firebaseapp.com',
	projectId: 'gemini-clone-47ed8',
	storageBucket: 'gemini-clone-47ed8.appspot.com',
	messagingSenderId: '348041731003',
	appId: '1:348041731003:web:da180751b074703c95029e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userCollectionRef = collection(db, 'user');

// Custom login function
export async function loginUser(creds) {
	const { email, password } = creds;

	try {
		// Create a query to find the user by email
		const q = query(userCollectionRef, where('email', '==', email));
		const userSnapshot = await getDocs(q);

		if (userSnapshot.empty) {
			throw new Error('No user found with this email');
		}

		const userDoc = userSnapshot.docs[0]; // Get the first matching user
		const userData = userDoc.data();

		
		// Check if the passwords match directly (Not recommended for security reasons)
		if (userData.password !== password) {
			throw new Error('Invalid password');
		}

		// Return user data if login is successful
		return {
			id: userDoc.id,
			...userData,
		};
	} catch (error) {
		// Handle Errors here.
		throw {
			message: error.message,
		};
	}
}
