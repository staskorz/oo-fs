const ParentFsEntity = require("./ParentFsEntity")
const { FS_ENTITY_TYPES } = require("../../constants")

module.exports = class Folder extends ParentFsEntity {
  constructor({ name, parent }) {
    super({
      type: FS_ENTITY_TYPES.FOLDER,
      name,
      parent,
    })
  }
}
