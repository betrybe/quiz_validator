/* eslint-disable no-undef */
const github = require('@actions/github')
const token = process.env.INPUT_TOKEN
const issue_number = process.env.INPUT_PR_NUMBER
const client = github.getOctokit(token)
const { owner, repo } = github.context.issue

async function createComment(body){
	await client.rest.issues.createComment({
		owner,
		repo,
		issue_number,
		body
	})
}

async function deleteComment(comment_id){
	await client.rest.issues.deleteComment({ owner, repo, comment_id })
}

async function listComments(){
	return await client.rest.issues.listComments({ owner, repo, issue_number })
}

module.exports = {
	createComment,
	deleteComment, 
	listComments
}