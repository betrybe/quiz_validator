const validate = require('./validate')
const core = require('@actions/core');
const root = process.env.GITHUB_WORKSPACE || process.cwd();
const files = core.getInput('files')
    .split(" ")
    .filter(file => !file.includes(".yml"));

validate(files)
    .then(console.log)
    .catch(console.error)