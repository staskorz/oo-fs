const ParentFsEntity = require("./ParentFsEntity")
const { FS_ENTITY_TYPES } = require("../../constants")

module.exports = class Folder extends ParentFsEntity {
  constructor({ name, parent }) {
    super({
      type: FS_ENTITY_TYPES.ZIP_FILE,
      name,
      parent,
    })
  }

  getSize() {
    return Math.ceil(super.getSize() / 2)
  }
}
