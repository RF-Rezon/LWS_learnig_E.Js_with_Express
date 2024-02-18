let decoratehtmlresponse = (params) => {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${params} - TalkUnity`;
    next();
  };
};

module.exports = decoratehtmlresponse;
