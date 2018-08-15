const { isAlnum } = require("../../util")
const { IllegalNameError } = require("../errors")

const validNameOrThrow = name => {
  if (isAlnum(name)) {
    return name
  } else {
    throw new IllegalNameError()
  }
}

module.exports = class BaseFsEntity {
  constructor({ type, name, parent }) {
    this.name = validNameOrThrow(name)
    this.type = type
    this.parent = parent
  }
}
