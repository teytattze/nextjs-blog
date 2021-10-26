import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { admin } from '../../../lib/firebase-admin';

const handler = nc<NextApiRequest, NextApiResponse>().post(async (req, res) => {
	const { email } = req.body;

	console.log(email);

	const result = await admin.auth().generateEmailVerificationLink(email);
	console.log(result);

	return result;
});

export default handler;
