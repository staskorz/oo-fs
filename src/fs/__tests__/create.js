const Fs = require("..")
const { FS_ENTITY_TYPES } = require("../../constants")
const {
  IllegalFileSystemOperationError,
  PathAlreadyExistsError,
} = require("../errors")

describe("create", () => {
  it("correctly adds a Drive to an FS", () => {
    const fs = new Fs()
    const driveName = "drive1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })
    expect(fs.children.has(driveName)).toBeTruthy()

    const drive = fs.children.get(driveName)
    expect(drive.name).toBe(driveName)
    expect(drive.type).toBe(FS_ENTITY_TYPES.DRIVE)
    expect(drive.parent).toBe(fs)
  })

  it("throws IllegalFileSystemOperationError when trying to create a Drive with path", () => {
    const fs = new Fs()
    const driveName = "drive1"

    expect(() => {
      fs.create({
        name: driveName,
        type: FS_ENTITY_TYPES.DRIVE,
        path: "nonEmptyPath",
      })
    }).toThrow(IllegalFileSystemOperationError)
  })

  it("throws PathAlreadyExistsError when trying to create a Drive with same name as an existing one", () => {
    const fs = new Fs()
    const driveName = "drive1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })

    expect(() => {
      fs.create({
        name: driveName,
        type: FS_ENTITY_TYPES.DRIVE,
        path: null,
      })
    }).toThrow(PathAlreadyExistsError)
  })

  it("correctly adds a Folder to a Drive", () => {
    const fs = new Fs()
    const driveName = "drive1"
    const folderName = "folder1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({
      name: folderName,
      type: FS_ENTITY_TYPES.FOLDER,
      path: driveName,
    })

    const drive = fs.children.get(driveName)
    expect(drive.children.has(folderName)).toBeTruthy()

    const folder = drive.children.get(folderName)
    expect(folder.name).toBe(folderName)
    expect(folder.type).toBe(FS_ENTITY_TYPES.FOLDER)
    expect(folder.parent).toBe(drive)
  })

  it("throws IllegalFileSystemOperationError when trying to create a Folder without path", () => {
    const fs = new Fs()
    const folderName = "folder1"

    expect(() => {
      fs.create({
        name: folderName,
        type: FS_ENTITY_TYPES.FOLDER,
        path: null,
      })
    }).toThrow(IllegalFileSystemOperationError)
  })

  it("throws PathAlreadyExistsError when trying to create a Folder with name similar to an existing one", () => {
    const fs = new Fs()
    const driveName = "drive1"
    const folderName = "folder1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({
      name: folderName,
      type: FS_ENTITY_TYPES.FOLDER,
      path: driveName,
    })

    expect(() => {
      fs.create({
        name: folderName,
        type: FS_ENTITY_TYPES.FOLDER,
        path: driveName,
      })
    }).toThrow(PathAlreadyExistsError)
  })

  it("correctly adds a Zip File to a Folder", () => {
    const fs = new Fs()
    const driveName = "drive1"
    const folderName = "folder1"
    const zipFileName = "zipFile1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({
      name: folderName,
      type: FS_ENTITY_TYPES.FOLDER,
      path: driveName,
    })
    fs.create({
      name: zipFileName,
      type: FS_ENTITY_TYPES.ZIP_FILE,
      path: `${driveName}\\${folderName}`,
    })

    const drive = fs.children.get(driveName)
    const folder = drive.children.get(folderName)
    expect(folder.children.has(zipFileName)).toBeTruthy()

    const zipFile = folder.children.get(zipFileName)
    expect(zipFile.name).toBe(zipFileName)
    expect(zipFile.type).toBe(FS_ENTITY_TYPES.ZIP_FILE)
    expect(zipFile.parent).toBe(folder)
  })

  it("correctly adds a Text File to a Zip File", () => {
    const fs = new Fs()
    const driveName = "drive1"
    const folderName = "folder1"
    const zipFileName = "zipFile1"
    const textFileName = "textFile1"

    fs.create({ name: driveName, type: FS_ENTITY_TYPES.DRIVE, path: null })
    fs.create({
      name: folderName,
      type: FS_ENTITY_TYPES.FOLDER,
      path: driveName,
    })
    fs.create({
      name: zipFileName,
      type: FS_ENTITY_TYPES.ZIP_FILE,
      path: `${driveName}\\${folderName}`,
    })
    fs.create({
      name: textFileName,
      type: FS_ENTITY_TYPES.TEXT_FILE,
      path: `${driveName}\\${folderName}\\${zipFileName}`,
    })

    const drive = fs.children.get(driveName)
    const folder = drive.children.get(folderName)
    const zipFile = folder.children.get(zipFileName)
    expect(zipFile.children.has(textFileName)).toBeTruthy()

    const textFile = zipFile.children.get(textFileName)
    expect(textFile.name).toBe(textFileName)
    expect(textFile.type).toBe(FS_ENTITY_TYPES.TEXT_FILE)
    expect(textFile.parent).toBe(zipFile)
  })
})
