const messages = {
	'check_answers': {
		true: '✅ Número de alternativas',
		false: '❌ Não foi possível identificar a alternativa correta.'
	},
	'check_codestrings': {
		true: '✅ Todos os códigos inline estão corretos',
		false: '❌ Algum código inline não está com a sintaxe correta'
	},
	'check_feedbacks': {
		true: '✅ Feedback das alternativas ',
		false: '❌ Não foi possível identificar todos os feedbacks das alternativas.'
	},
	'check_codeblocks': {
		true: '✅ Todos os blocos de código estão corretos',
		false: '❌ Algum bloco de código está com a sintaxe errada'
	},
	'check_question': {
		true: '✅ Enunciado abrindo e fechando corretamente',
		false: '❌ O Enunciado não está abrindo ou fechando corretamente'
	},
	'success': '### ✅ Nenhum erro de sintaxe foi encontrado 💚👏',
	'error': '## ⚠️ Errors de sintaxe encontrados',
	'supported': '> supported by [Diagnóstico](https://betrybe.slack.com/archives/C01Q3PY8LLW) 💚',
	'sac': '🔗 Para mais informações sobre a sintaxe acesse [Quizzes Playbook](https://playbook.betrybe.com/docs/funcionais/squads-multifuncionais/tribos/aprendizagem/squad-diagnostico/quizzes/#criaratualizar-quiz-em-flagship)'
}

module.exports = messages