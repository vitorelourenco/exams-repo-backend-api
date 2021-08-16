import { Request, Response } from 'express';
import Exam from '../entities/Exam';
import * as signServices from '../services/signServices';
import { getSalt } from '../utils/database';

export async function signS3(req: Request, res: Response) {
	try {
		const fileName = req.query['file-name'];
		const salt = await getSalt(Exam);
		const newFileName = salt + fileName;
		const fileType = req.query['file-type'];
		const signedRequest = await signServices.signS3(newFileName, fileType);
		res.send({ awsData: signedRequest, newFileName });
	} catch (err) {
		console.error(err.message);
		res.sendStatus(500);
	}
}

export default {
	signS3,
};
