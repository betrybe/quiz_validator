const { readFile } = require('fs/promises')
const core = require('@actions/core')
const Messages = require('./messages')
const GitHubClient = require('./githubClient')

const rules = [
	['wrong_answers', '( )'],
	['right_answers', '(x)'],
	['open_curly', '{{'],
	['close_curly', '}}'],
	['codeblocks_count', '```'],
	['codestring_count', '`'],
	['open_question', '<<'],
	['close_question', '>>']
]

const checks = [
	['check_answers', [4, 1], ['wrong_answers', 'right_answers']],
	['check_codestrings', null, ['codestring_count']],
	['check_feedbacks', [5, 5], ['open_curly', 'close_curly']],
	['check_codeblocks', null, ['codeblocks_count']],
	['check_question', [1,1], ['open_question', 'close_question']]
]

async function validate(){
	try {

		const files = process.env.FILES
			.split(' ')
			.filter(file => !file.includes('.yml'))

		core.notice(`Iniciando leitura ${files}`)
		
		const checkResult = await validateRules(files)
		const fullComment = buildFullComment(checkResult)

		await maybeDeletePreviousComment()
		await GitHubClient.createComment(fullComment)

		return checkResult

	} catch (error) {
		console.error(error)
		core.setFailed(`${error}`)
	}
}

async function maybeDeletePreviousComment(){

	try {
		const comments = await GitHubClient.listComments()

		const commentIssue = comments?.data?.find(comment => comment.body.includes('## ❌ Errors de sintaxe encontrados'))
		
		if (commentIssue) {
			await GitHubClient.deleteComment(commentIssue.id)
		}
	
	} catch (error) {
		console.error(error)
	}
}

async function validateRules(files){
	const promises = files.map(async (filename) => {
		const checks_result = await evaluate(filename)
		return { tableText: buildTable(checks_result, filename), objectResult: checks_result } 
	})

	return await Promise.all(promises)
}

function buildFullComment(checkResult){
	const tables = checkResult.map((item) => item.tableText)
	const tableComment = tables.join('\n')

	if(tableComment === '') return '### ✅ Nenhum erro de sintaxe foi encontrado 💚👏🏾'
	return `## ❌ Errors de sintaxe encontrados\n${tableComment}`
}

async function evaluate (filename){

	const root = process.env.GITHUB_WORKSPACE || process.cwd()
	const file = await readFile(`${root}/${filename}`, 'utf8' )
	const result = rules.reduce((acc, rule) => split_and_count_by_separator(file, acc, rule[0], rule[1]), {})
	return checks.reduce((acc, check) => {
		const check_name = check[0]
		const check_expected = check[1]
		const check_rule = check[2]
		acc[check_name] = check_expected !== null? check_compare(result, check_expected, check_rule) : check_remainder(result, check_rule)

		return acc
	}, {})
}

function buildTable(checks_result, filename){

	const checks = Object.entries(checks_result)

	if(is_successful_quiz(checks)) return ''

	const headTable = `| *${filename}* |\n| ------------- |\n`
	const table = Object
		.entries(checks_result)
		.reduce((acc, check) => `${acc}| ${Messages[check[0]][check[1]]} |\n`, '')

	return `${headTable}${table}`
}

function is_successful_quiz(checks){
	return !checks.some((check) => !check[1])
}

function check_compare(result, expected, rule){
	return expected[0] == result[rule[0]] && result[rule[1]] == expected[1]
}

function check_remainder(result, rule){
	return result[rule[0]] % 2 == 0
}

function split_and_count_by_separator(file, object, key, separator){
	const value = file.split(separator).length
	object[key] = value - 1
	return object
}

module.exports = validate