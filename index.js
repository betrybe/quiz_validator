const validate = require('./validate')
const core = require('@actions/core');
const files = core.getInput('files').split(" ");
core.notice(files)

validate(files)