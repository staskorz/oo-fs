const BaseFsEntity = require("./BaseFsEntity")

module.exports = class ParentFsEntity extends BaseFsEntity {
  constructor({ type, name, parent }) {
    super({ type, name, parent })

    this.children = new Map()
  }

  getSize() {
    return [...this.children.values()].reduce(
      (acc, elem) => acc + elem.getSize(),
      0,
    )
  }
}
