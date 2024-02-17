const createError = require("http-errors");

// 404 errors
const notFoundHandler = (req, res, next) => {
  next(createError(404, "The req content was not found."));
};

// general errors
const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    // Response as A HTML Page
    res.render("error", {
      title: "Error Page",
    });
  } else {
    // Response as A json obj
    res.json(res.locals.error);
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
