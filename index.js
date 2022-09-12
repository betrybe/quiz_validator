const validate = require('./validate')
const core = require('@actions/core');
const files2 = core.getInput('files');

core.notice(files2)
const files = ['1.md', '2.md']

validate(files)