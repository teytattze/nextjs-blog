import admin from 'firebase-admin';

try {
	admin.initializeApp({
		credential: admin.credential.cert({
			project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
			private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
			client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
		} as admin.ServiceAccount),
	});
} catch (err) {
	if (!/already exists/u.test((err as any).message)) {
		// eslint-disable-next-line no-console
		console.error('Firebase admin initialization error', (err as any).stack);
	}
}

export { admin };
