const assert = require('assert')
const util = require('util')
const execFile = util.promisify(require('child_process').execFile)
const ffprobePath = require('@ffprobe-installer/ffprobe').path

module.exports = async function (filename, type, select, parameter) {
    const meta = await execFile(ffprobePath, [
        '-v', 'error',
        '-of', 'default=nw=1',
        '-select_streams', `${select}:0`,
        '-show_entries', `${type}=${parameter}`,
        filename
    ])

    let stdout = meta.stdout 
    let entries = []
    let list = []
  
    parameter.replace(/(\w+)/g, (string, match) => {
        entries.push(match)
    })
  
    for (let i=0 ; i < entries.length ; i++) {
        let values = (new RegExp(`${entries[i]}=(.+)`).exec(stdout))
        assert(values, `Parameter ${entries[i]} Not Found!`)
        list.push(values[1])
    }
    
    return list       
}
