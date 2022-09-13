const validate = require('./validate')
const core = require('@actions/core');
const { readdir } = require('fs/promises')
const root = process.env.GITHUB_WORKSPACE || process.cwd();
core.notice(root)
// readdir(root)
//     .then((data) => core.notice(data))
//     .catch((data) => core.error(data))

const files = core.getInput('files').split(" ").shift();
core.notice(files)

validate(files)