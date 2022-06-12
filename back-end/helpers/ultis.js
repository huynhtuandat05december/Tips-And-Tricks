const jsonResponse = (data, message) => {
  return {
    errCode: message ? 1 : 0,
    errDetail: message ? message : null,
    data,
  };
};

module.exports = {
  jsonResponse,
};
