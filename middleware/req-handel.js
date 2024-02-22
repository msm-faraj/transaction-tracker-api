const reqHandler = (callBack) => {
  return async (req, res, next) => {
    try {
      await callBack(req, res, next);
    } catch (error) {
      console.error(error.message);
    }
  };
};

module.exports = reqHandler;
