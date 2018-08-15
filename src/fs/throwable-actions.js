const {
  PathNotFoundError,
  PathAlreadyExistsError,
  IllegalFileSystemOperationError,
} = require("./errors")
const { FS_ENTITY_TYPES } = require("../constants")
const ParentFsEntity = require("./entities/ParentFsEntity")
const Drive = require("./entities/Drive")
const Folder = require("./entities/Folder")
const TextFile = require("./entities/TextFile")
const ZipFile = require("./entities/ZipFile")

const parsePath = str => {
  const [drive, ...folders] = str.split("\\")

  return {
    drive,
    folders,
  }
}

const createEntityOrThrow = props => {
  switch (props.type) {
    case FS_ENTITY_TYPES.DRIVE:
      return new Drive(props)
    case FS_ENTITY_TYPES.FOLDER:
      return new Folder(props)
    case FS_ENTITY_TYPES.TEXT_FILE:
      return new TextFile(props)
    case FS_ENTITY_TYPES.ZIP_FILE:
      return new ZipFile(props)
    default:
      throw new IllegalFileSystemOperationError("Unknown entity type")
  }
}

const getFolderOrThrow = ({ children, folders }) => {
  const [first, ...rest] = folders

  if (!children.has(first)) {
    throw new PathNotFoundError()
  }

  if (rest.length) {
    const siblingChildren = children.get(first).children

    if (siblingChildren) {
      return getFolderOrThrow({ children: siblingChildren, folders: rest })
    } else {
      throw new PathNotFoundError()
    }
  } else {
    return children.get(first)
  }
}

const getEntityOrThrow = ({ path, fs }) => {
  const { drive, folders } = parsePath(path)

  if (!fs.children.has(drive)) {
    throw new PathNotFoundError()
  }

  if (folders.length) {
    const { children } = fs.children.get(drive)
    return getFolderOrThrow({ children, folders })
  } else {
    return fs.children.get(drive)
  }
}

const getParentEntityOrThrow = ({ path, fs }) => {
  const entity = getEntityOrThrow({ path, fs })

  if (entity instanceof ParentFsEntity) {
    return entity
  } else {
    throw new IllegalFileSystemOperationError("Not a parent entity")
  }
}

const getParentEntityByTypeOrThrow = ({ type, path, fs }) => {
  if (type === FS_ENTITY_TYPES.DRIVE) {
    if (path) {
      throw new IllegalFileSystemOperationError("Drive cannot have path")
    } else {
      return fs
    }
  } else {
    if (path) {
      return getParentEntityOrThrow({ path, fs })
    } else {
      throw new IllegalFileSystemOperationError(
        `FS Entity of type ${type} must have non-empty path`,
      )
    }
  }
}

const addOrThrow = ({ entity }) => {
  if (entity.parent.children.has(entity.name)) {
    throw new PathAlreadyExistsError()
  } else {
    entity.parent.children.set(entity.name, entity)
  }
}

const removeOrThrow = ({ path, fs }) => {
  const entity = getEntityOrThrow({ path, fs })
  entity.parent.children.delete(entity.name)
  return entity
}

module.exports = {
  parsePath,
  createEntityOrThrow,
  getEntityOrThrow,
  getParentEntityOrThrow,
  getParentEntityByTypeOrThrow,
  addOrThrow,
  removeOrThrow,
}
