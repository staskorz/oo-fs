const ParentFsEntity = require("./ParentFsEntity")
const { FS_ENTITY_TYPES } = require("../../constants")

module.exports = class Drive extends ParentFsEntity {
  constructor({ name, parent }) {
    super({
      type: FS_ENTITY_TYPES.DRIVE,
      name,
      parent,
    })
  }
}
