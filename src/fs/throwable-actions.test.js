const { parsePath } = require("./throwable-actions")

describe("throwable-actions", () => {
  it("correctly parses path", () => {
    const pathString = "drive1\\folder1\\folder2"

    const { drive, folders } = parsePath(pathString)

    expect(drive).toBe("drive1")
    expect(folders).toEqual(["folder1", "folder2"])
  })
})
