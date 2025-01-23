const Photo = require("../models/Photo");

const mongoose = require("mongoose");
const User = require("../models/User");

//Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    //Create a phot
    const newPhoto = await Photo.create({
      image,
      title,
      userId: user._id,
      userName: user.name,
    });

    //if photo was created successfull, return data
    if (!newPhoto) {
      return res.status(422).json({
        errors: ["Houve um problema, por favor tente novamente mais tarde."],
      });
    }

    return res.status(201).json(newPhoto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      errors: [
        "Ocorreu um erro no servidor. Por favor, tente novamente mais tarde.",
      ],
    });
  }
};

//Remove a photo from DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));

    //check if photo exists
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }

    //Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, por favor tente mais tarde."] });
    }
    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Foto não encontrada!"] });
    return;
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
