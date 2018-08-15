const Fs = require("..")
const { FS_ENTITY_TYPES } = require("../../constants")
const { PathNotFoundError } = require("../errors")

describe("size", () => {
  let fs

  beforeEach(() => {
    fs = new Fs()
    fs.create({ name: "drive1", type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({ name: "folder1", type: FS_ENTITY_TYPES.FOLDER, path: "drive1" })
    fs.create({
      name: "textFile1",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder1",
    })
    fs.create({
      name: "textFile2",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder1",
    })
    fs.create({
      name: "zipFile1",
      type: FS_ENTITY_TYPES.ZIP_FILE,
      path: "drive1\\folder1",
    })
    fs.create({
      name: "textFile3",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder1\\zipFile1",
    })
    fs.create({
      name: "textFile4",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder1\\zipFile1",
    })
    fs.writeToFile({ path: "drive1\\folder1\\textFile1", content: "abcd" })
    fs.writeToFile({ path: "drive1\\folder1\\textFile2", content: "abcdef" })
    fs.writeToFile({
      path: "drive1\\folder1\\zipFile1\\textFile3",
      content: "abcdefgh",
    })
    fs.writeToFile({
      path: "drive1\\folder1\\zipFile1\\textFile4",
      content: "abcdefghij",
    })
    fs.create({ name: "folder2", type: FS_ENTITY_TYPES.FOLDER, path: "drive1" })
    fs.create({
      name: "textFile5",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder2",
    })
    fs.create({
      name: "textFile6",
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: "drive1\\folder2",
    })
    fs.writeToFile({ path: "drive1\\folder2\\textFile5", content: "a" })
    fs.writeToFile({ path: "drive1\\folder2\\textFile6", content: "ab" })
  })

  it("correctly returns Text File size", () => {
    expect(fs.getSize({ path: "drive1\\folder1\\textFile1" })).toBe(4)
  })

  it("correctly returns Folder size", () => {
    expect(fs.getSize({ path: "drive1\\folder2" })).toBe(3)
  })

  it("correctly returns Zip File size", () => {
    expect(fs.getSize({ path: "drive1\\folder1\\zipFile1" })).toBe(9)
  })

  it("correctly returns Drive size", () => {
    expect(fs.getSize({ path: "drive1" })).toBe(22)
  })

  it("throws PathNotFoundError when trying to get the size of a non-existing entity", () => {
    expect(() => {
      fs.getSize({ path: "nonExistingDrive" })
    }).toThrow(PathNotFoundError)
  })
})
