function controllerWrapper(controllerFunction) {
  async function wrapperFunction(req, res, next) {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  }
  return wrapperFunction;
}

export default controllerWrapper;
