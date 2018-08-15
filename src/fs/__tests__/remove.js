const Fs = require("..")
const { FS_ENTITY_TYPES } = require("../../constants")
const { PathNotFoundError } = require("../errors")

describe("remove", () => {
  let fs

  beforeEach(() => {
    fs = new Fs()
    fs.create({ name: "drive1", type: FS_ENTITY_TYPES.DRIVE, path: null })
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

  it("correctly removes a Drive", () => {
    fs.remove({ path: "drive1" })
    expect(fs.children.has("drive1")).toBeFalsy()
  })

  it("throws PathNotFoundError when trying to remove a non-existing Drive", () => {
    expect(() => {
      fs.remove({ path: "nonExistingDrive" })
    }).toThrow(PathNotFoundError)
  })

  it("correctly removes a Folder", () => {
    fs.remove({ path: "drive1\\folder1" })
    expect(fs.children.get("drive1").children.has("folder1")).toBeFalsy()
  })

  it("throws PathNotFoundError when trying to remove a non-existing child entity", () => {
    expect(() => {
      fs.remove({ path: "drive1\\nonExistingChildEntity" })
    }).toThrow(PathNotFoundError)
  })
})
