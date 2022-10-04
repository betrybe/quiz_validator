/* eslint-disable no-undef */
const validate = require('../validate')
const github = require('@actions/github')
const GitHubClient = require('../githubClient')

jest.mock('@actions/core')

describe('Test quiz validator', () =>{
	afterEach(() => jest.restoreAllMocks())
	beforeEach(() => {	
		jest.spyOn(github, 'getOctokit').mockImplementation(jest.fn(() => ({context: { issue: {owner: '', repo: ''}}})))
		jest.spyOn(GitHubClient, 'deleteComment').mockImplementation(jest.fn(() => ({ status: 201 })))
		jest.spyOn(GitHubClient, 'createComment').mockImplementation(jest.fn(() => ({ status: 201 })))
		jest.spyOn(GitHubClient, 'listComments').mockImplementation(jest.fn(() => ([])))
	})

	test('must return with any check false', async () => {
		process.env.FILES = 'src/test/data/perfect_example.md'
		const result = await validate()
		expect(result).toEqual([
			{
				tableText: '',
				objectResult: {
					check_answers: true,
					check_codestrings: true,
					check_feedbacks: true,
					check_codeblocks: true,
					check_question: true
				}
			}
		])
	})

	test('must return with check_answers false', async () => {
		process.env.FILES = 'src/test/data/check_answers_example.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Não foi possível identificar a alternativa correta.'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual( expect.objectContaining({check_answers: false}))
	})

	test('must return with check_feedbacks false', async () => {
		process.env.FILES = 'src/test/data/check_feedbacks_example.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Não foi possível identificar todos os feedbacks das alternativas.'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual( expect.objectContaining({check_feedbacks: false}))
	})

	test('must return with check_question false', async () => {
		process.env.FILES = 'src/test/data/check_question_example.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'O Enunciado não está abrindo ou fechando corretamente'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual( expect.objectContaining({check_question: false}))
	})

	test('must return with check_codeblocks false', async () => {
		process.env.FILES = 'src/test/data/check_codeblocks_example.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Algum bloco de código está com a sintaxe errada'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual( expect.objectContaining({check_codeblocks: false}))
	})

	test('must return with check_codestrings false', async () => {
		process.env.FILES = 'src/test/data/check_codestrings_example.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Algum código inline não está com a sintaxe correta'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual( expect.objectContaining({check_codestrings: false}))
	})

})