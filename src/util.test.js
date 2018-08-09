const { isAlnum } = require("./util")

describe("isAlnum", () => {
  it("returns true for a string with digits and mixed-case letters", () => {
    expect(isAlnum("aA1")).toBeTruthy()
  })

  it("returns false for a string with special characters", () => {
    expect(isAlnum("aA1_")).toBeFalsy()
  })

  it("returns false for a string with spaces", () => {
    expect(isAlnum("aA1 ")).toBeFalsy()
  })

  it("returns false for an empty string", () => {
    expect(isAlnum("")).toBeFalsy()
  })
})
