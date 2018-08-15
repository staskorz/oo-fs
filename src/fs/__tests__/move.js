const Fs = require("..")
const { FS_ENTITY_TYPES } = require("../../constants")
const {
  IllegalFileSystemOperationError,
  PathNotFoundError,
  PathAlreadyExistsError,
} = require("../errors")

describe("move", () => {
  let fs

  beforeEach(() => {
    fs = new Fs()
    fs.create({ name: "drive1", type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({ name: "drive2", type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({ name: "folder1", type: FS_ENTITY_TYPES.FOLDER, path: "drive1" })
    fs.create({
      name: "zipFile1",
      type: FS_ENTITY_TYPES.ZIP_FILE,
      path: "drive1\\folder1",
    })
    fs.create({
      name: "textFile1",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder1\\zipFile1",
    })
  })

  it("correctly moves a Folder", () => {
    fs.move({ srcPath: "drive1\\folder1", dstPath: "drive2" })
    expect(fs.children.get("drive1").children.has("folder1")).toBeFalsy()

    const drive2 = fs.children.get("drive2")
    expect(drive2.children.has("folder1")).toBeTruthy()
    expect(drive2.children.get("folder1").parent).toBe(drive2)
  })

  it("throws IllegalFileSystemOperationError when trying to move a Drive", () => {
    expect(() => {
      fs.move({ srcPath: "drive1", dstPath: "drive2" })
    }).toThrow(IllegalFileSystemOperationError)
  })

  it("throws PathNotFoundError when trying to move a non-existing Folder", () => {
    expect(() => {
      fs.move({ srcPath: "drive1\\nonExistingFolder", dstPath: "drive2" })
    }).toThrow(PathNotFoundError)
  })

  it("throws PathAlreadyExistsError when trying to move a Text File to a location where entity with the same name exists", () => {
    fs.create({
      name: "zipFile1",
      type: FS_ENTITY_TYPES.FOLDER,
      path: "drive2",
    })

    expect(() => {
      fs.move({ srcPath: "drive1\\folder1\\zipFile1", dstPath: "drive2" })
    }).toThrow(PathAlreadyExistsError)
  })
})
