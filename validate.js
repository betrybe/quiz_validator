const { readFile } = require('fs/promises')
const Messages = require('./messages')

const rules = [
    ['wrong_answers', "( )"],
    ['right_answers', "(x)"],
    ['open_curly', "{{"],
    ['close_curly', "}}"],
    ['codeblocks_count', "```"],
    ['codestring_count', "`"],
    ['open_question', "<<"],
    ['close_question', ">>"]
]

const checks = [
    ['check_answers', [4, 1], ['wrong_answers', 'right_answers']],
    ['check_codestrings', null, ['codestring_count']],
    ['check_feedbacks', [5, 5], ['open_curly', 'close_curly']],
    ['check_codeblocks', null, ['codeblocks_count']],
    ['check_question', [1,1], ['open_question', 'close_question']]
]

async function validate(files){

    const comments = await Promise.all(files.map(async (filename) => {

        const file = await readFile(`/home/runner/work/aceleracao-c-sharp/aceleracao-c-sharp/${filename}`, 'utf8' );
        const result = rules.reduce((acc, rule) => split_and_count_by_separator(file, acc, rule[0], rule[1]), {})
        const checks_result = checks.reduce((acc, check) => {
            const check_name = check[0]
            const check_expected = check[1]
            const check_rule = check[2]
            acc[check_name] = check_expected !== null? check_compare(result, check_expected, check_rule) : check_remainder(result, check_rule)
    
            return acc
        }, {})

        return comment(checks_result, filename)
    }))

    return comments.join('\n')
}

function comment(checks_result, filename){

    const comment = `| *${filename}* |\n| ------------- |\n`;
    const table = Object
        .entries(checks_result)
        .reduce((acc, check) => `${acc}| ${Messages[check[0]][check[1]]} |\n`, '')

    return `${comment}${table}`
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