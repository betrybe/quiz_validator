const validate = require('./validate')
const core = require('@actions/core');
const root = process.env.GITHUB_WORKSPACE || process.cwd();
core.notice(root)

const files = core.getInput('files').split(" ");
core.notice(files)

validate(files)