/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

declare namespace jest {
	interface Matchers<R> {
		toMatchSchema(value: any): CustomMatcherResult;
	}
}
