const Photo = require("../models/Photo")

const mongoose = require("mongoose")
const User = require("../models/User")

//Insert a photo, with an user related to it 
const insertPhoto = async (req, res) => {
    try{
    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user

    const user = await User.findById(reqUser._id)

    //Create a phot
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    })

    //if photo was created successfull, return data
   if(!newPhoto) {
       return res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde."],
        })
    }

     return res.status(201).json(newPhoto)
    } catch(error) {
        console.error(error);
        return res.status(500).json({
            errors: ["Ocorreu um erro no servidor. Por favor, tente novamente mais tarde."],
            });
        }
    
    }

module.exports = {
    insertPhoto
}
