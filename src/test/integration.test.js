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
		process.env.INPUT_FILES = 'src/test/data/1.md'
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
		process.env.INPUT_FILES = 'src/test/data/2.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Não foi possível identificar a alternativa correta.'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual(expect.objectContaining({check_answers: false}))
	})

	test('must return with check_feedbacks false', async () => {
		process.env.INPUT_FILES = 'src/test/data/3.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Não foi possível identificar todos os feedbacks das alternativas.'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual(expect.objectContaining({check_feedbacks: false}))
	})

	test('must return with check_question false', async () => {
		process.env.INPUT_FILES = 'src/test/data/4.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'O Enunciado não está abrindo ou fechando corretamente'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual(expect.objectContaining({check_question: false}))
	})

	test('must return with check_codeblocks false', async () => {
		process.env.INPUT_FILES = 'src/test/data/5.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Algum bloco de código está com a sintaxe errada'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual(expect.objectContaining({check_codeblocks: false}))
	})

	test('must return with check_codestrings false', async () => {
		process.env.INPUT_FILES = 'src/test/data/6.md'
		const result = await validate()
		const {tableText, objectResult} = result.pop()
		const expectedText = 'Algum código inline não está com a sintaxe correta'

		expect(tableText).toEqual(expect.stringContaining(expectedText))
		expect(objectResult).toEqual(expect.objectContaining({check_codestrings: false}))
	})

	test('must return false when no files pass by the filters', async () => {
		process.env.INPUT_FILES = 'src/test/data/perfect_quiz_example.md'
		const result = await validate()
		expect(result).toEqual(false)
	})

	test('must return false when no files is markdown', async () => {
		const files = ['test.js', 'test.yml', 'test.html', 'test.md', 'metadados.md', '.cspell.json']
		process.env.INPUT_FILES = files.concat(' ')

		const result = await validate()
		expect(result).toEqual(false)
	})
})