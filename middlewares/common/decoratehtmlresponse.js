let decoratehtmlresponse = (params) => {
  return function (req, res, next) {
    res.locals.html = true;
    res.locals.title = `${params} - TalkUnity`;
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
  };
};

module.exports = decoratehtmlresponse;
