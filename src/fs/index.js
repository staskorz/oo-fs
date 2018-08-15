const { FS_ENTITY_TYPES } = require("../constants")

const {
  createEntityOrThrow,
  getParentEntityByTypeOrThrow,
  getParentEntityOrThrow,
  getEntityOrThrow,
  addOrThrow,
  removeOrThrow,
} = require("./throwable-actions")

const {
  IllegalFileSystemOperationError,
  NotTextFileError,
} = require("./errors")

module.exports = class Fs {
  constructor() {
    this.children = new Map()
  }

  create({ type, name, path }) {
    const target = getParentEntityByTypeOrThrow({
      type,
      path,
      fs: this,
    })

    addOrThrow({
      entity: createEntityOrThrow({ type, name, parent: target }),
    })
  }

  remove({ path }) {
    removeOrThrow({ path, fs: this })
  }

  move({ srcPath, dstPath }) {
    const srcEntity = getEntityOrThrow({ path: srcPath, fs: this })

    if (srcEntity.type === FS_ENTITY_TYPES.DRIVE) {
      throw new IllegalFileSystemOperationError("Drives are not movable")
    }

    removeOrThrow({ path: srcPath, fs: this })

    const dstEntity = getParentEntityOrThrow({ path: dstPath, fs: this })
    srcEntity.parent = dstEntity

    addOrThrow({ entity: srcEntity })
  }

  writeToFile({ path, content }) {
    const entity = getEntityOrThrow({ path, fs: this })

    if (entity.type !== FS_ENTITY_TYPES.TEXT_FILE) {
      throw new NotTextFileError()
    }

    entity.content = content
  }

  getSize({ path }) {
    return getEntityOrThrow({ path, fs: this }).getSize()
  }
}
