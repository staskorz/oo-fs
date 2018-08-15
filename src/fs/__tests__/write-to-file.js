const Fs = require("..")
const { FS_ENTITY_TYPES } = require("../../constants")
const { PathNotFoundError, NotTextFileError } = require("../errors")

describe("writeToFile", () => {
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
  })

  it("correctly writes to a Text File", () => {
    fs.writeToFile({
      path: "drive1\\folder1\\textFile1",
      content: "test content",
    })

    expect(
      fs.children
        .get("drive1")
        .children.get("folder1")
        .children.get("textFile1").content,
    ).toBe("test content")
  })

  it("throws PathNotFoundError when trying to write to a Text File with non-existing path", () => {
    expect(() => {
      fs.writeToFile({
        path: "drive1\\nonExistingTextFile",
        content: "test content",
      })
    }).toThrow(PathNotFoundError)
  })

  it("throws NotTextFileError when trying to write content to a Folder", () => {
    expect(() => {
      fs.writeToFile({
        path: "drive1\\folder1",
        content: "test content",
      })
    }).toThrow(NotTextFileError)
  })
})
