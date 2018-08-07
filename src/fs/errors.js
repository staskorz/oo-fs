const createErrorClass = name => {
  const CustomError = class extends Error {}
  CustomError.prototype.name = name
  return CustomError
}

// could be made shorter by iterating over an array with error names,
// but that would ruin IDE autocompletion
module.exports = {
  IllegalFileSystemOperationError: createErrorClass(
    "IllegalFileSystemOperationError",
  ),
  NotTextFileError: createErrorClass("NotTextFileError"),
  PathAlreadyExistsError: createErrorClass("PathAlreadyExistsError"),
  PathNotFoundError: createErrorClass("PathNotFoundError"),
}
