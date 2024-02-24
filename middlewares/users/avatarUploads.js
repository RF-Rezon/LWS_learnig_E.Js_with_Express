const uploder = require("../../utils/singleUpload");

const avatarUploads = (req, res, next) => {
  const upload = uploder(
    "avatars",
    ["image/jpg", "image/png", "image/jpeg"],
    1000000,
    "Only jpg, jpeg and png formet supported."
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
};

module.exports = avatarUploads;
