const BaseFsEntity = require("./BaseFsEntity")
const { IllegalNameError } = require("../errors")

describe("BaseFsEntity", () => {
  it("correctly instantiates a BaseFsEntity", () => {
    const baseFsEntity = new BaseFsEntity({
      name: "name1",
      type: null,
      parent: null,
    })

    expect(baseFsEntity.name).toBe("name1")
  })

  it("throws IllegalNameError for non-alphanumeric name", () => {
    expect(() => {
      new BaseFsEntity({ name: "non-alphanumeric", type: null, parent: null })
    }).toThrow(IllegalNameError)
  })
})
