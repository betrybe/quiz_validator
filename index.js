const validate = require('./src/validate')
const files = process.env.FILES
	.split(' ')
	.filter(file => !file.includes('.yml'))
    
validate(files)
	.then(console.log)
	.catch(console.error)   
