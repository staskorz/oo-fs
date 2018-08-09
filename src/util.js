const alnumRegex = /^[a-zA-Z0-9]+$/

const isAlnum = str => alnumRegex.test(str)

module.exports = {
  isAlnum,
}
