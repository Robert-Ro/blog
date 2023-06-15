const fs = require('fs')
const path = require('path')

const [, , entry] = process.argv
const dir = path.resolve(__dirname, entry)
fs.readdirSync(dir, { withFileTypes: true }).forEach((file) => {
  if (file.isFile()) {
    const [name, ext] = file.name.split('.')
    const nameArr = name.split(' ').join('-')
    fs.renameSync(`${dir}/${file.name}`, `${dir}/${nameArr}.${ext}`)
  } else if (file.isDirectory()) {
    const nameArr = file.name.split(' ').join('')
    fs.renameSync(`${dir}/${file.name}`, `${dir}/${nameArr}`)
  }
})
