/* eslint-disable no-undef */
import '../jestNamespace';

import supertest from 'supertest';
import { getConnection } from 'typeorm';

import app, { init } from '../../src/app';

import toMatchSchema from '../schemas/toMatchSchema';

import { clearDatabase, fillDatabase } from '../utils/database';

beforeAll(async () => {
	await init();
	await clearDatabase();
	await fillDatabase();
});

afterAll(async () => {
	await clearDatabase();
	await fillDatabase();
	await getConnection().close();
});
expect.extend({ toMatchSchema });
const agent = supertest(app);

describe('GET /instructors/:degreeId', () => {
	beforeEach(async () => {
		await clearDatabase();
		await fillDatabase();
	});

	it('should respond with status 200', async () => {
		const response = await agent.get('/instructors/1');
		expect(response.status).toBe(200);
	});

	it('should respond with status 404 for degreeId not found', async () => {
		const response = await agent.get('/instructors/2147483647');
		expect(response.status).toBe(404);
	});
});
