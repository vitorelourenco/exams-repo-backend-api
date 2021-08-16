import { getRepository } from 'typeorm';

export async function getSalt(entitiy: any) {
	const response: any[] = await getRepository(entitiy).find({
		select: ['id'],
		order: { id: 'DESC' },
		take: 1,
	});

	let salt = 10001;
	const id = response[0]?.id;
	if (id) {
		salt += id;
	}
	const saltStr:string = `${salt}`;
	return saltStr;
}

export default {
	getSalt,
};
