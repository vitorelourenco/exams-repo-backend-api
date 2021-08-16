/* eslint-disable no-undef */
import '../jestNamespace';

import supertest from 'supertest';
import { getConnection } from 'typeorm';

import app, { init } from '../../src/app';

import toMatchSchema from '../schemas/toMatchSchema';

import { clearDatabase, fillDatabase } from '../utils/database';
import { categoriesArr } from '../schemas/categories';

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

describe('GET /categories', () => {
	beforeAll(async () => {
		await clearDatabase();
		await fillDatabase();
	});

	it('should respond with status 200', async () => {
		const response = await agent.get('/categories');
		expect(response.status).toBe(200);
	});

	it('should respond with an array of categories', async () => {
		const response = await agent.get('/categories');
		expect(response.body).toMatchSchema(categoriesArr);
	});
});
