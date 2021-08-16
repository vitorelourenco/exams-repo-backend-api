import faker from 'faker';

export class FakeDegree {
	name: string;

	constructor(params: { name?: string; salt?: string }) {
		const salt = params?.salt || '';
		const name = params?.name;
		this.name = salt + (name ?? faker.name.lastName());
	}
}

export default {
	FakeDegree,
};
