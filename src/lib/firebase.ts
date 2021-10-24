import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAeI1DVLWeu4XKHiXo9EoMnD7U1SoxjgGo',
	authDomain: 'nextjs-blog-app-2e13c.firebaseapp.com',
	projectId: 'nextjs-blog-app-2e13c',
	storageBucket: 'nextjs-blog-app-2e13c.appspot.com',
	messagingSenderId: '826008693892',
	appId: '1:826008693892:web:e2f21491e126686e24e6d1',
	measurementId: 'G-P4CKHWK588',
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth, db };
