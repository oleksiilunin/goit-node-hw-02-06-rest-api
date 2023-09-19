const path = require("path");
const fs = require("node:fs/promises");
const jimp = require("jimp");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const {
    path: tempPath,
    filename,
    // destination
  } = req.file;

  const newFileName = `${_id}_250x250_${filename}`;
  // const resizedTempPath = path.join(destination, newFileName);
  const resultPath = path.join(avatarsDir, newFileName);

  await jimp
    .read(tempPath)
    .then((img) =>
      img.autocrop().resize(250, 250, jimp.RESIZE_BEZIER).write(resultPath)
    )
    .catch((error) => {
      throw error;
    });

  // const newFileName = `${_id}_${filename}`;

  // await fs.rename(tempPath, resultPath);

  await fs.unlink(tempPath);

  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true }).exec();

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
