const BaseFsEntity = require("./BaseFsEntity")
const { FS_ENTITY_TYPES } = require("../../constants")

module.exports = class TextFile extends BaseFsEntity {
  constructor({ name, parent }) {
    super({ type: FS_ENTITY_TYPES.TEXT_FILE, name, parent })

    this.content = ""
  }

  getSize() {
    return this.content.length
  }
}
