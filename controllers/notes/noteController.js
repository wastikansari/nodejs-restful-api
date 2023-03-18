import { User } from "../../models";
import Joi from "joi";

const noteController = {
  async create(req, res, next) {
    console.log(req.body);
    const notesSchema = Joi.object({
      title: Joi.string().required(),
      message: Joi.string().required(),
    });

    const { error } = notesSchema.validate(req.body);
    console.log(error);
    if (error) {
      return next(error);
    }

    const { title, message } = req.body;

    let data;
    try {
      data = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            notes: {
              $each: [
                {
                  title: title,
                  message: message,
                },
              ],
              $position: 0,
            },
          },
        }
      );
      data.save({ new: true });
    } catch (err) {
      return next(err);
    }
    res.status(200).json({ status: true });
  },

  async read(req, res, next) {
    let userdata;
    try {
      userdata = await User.find({ _id: req.user._id }).select(
        "-password -updatedAt -__v"
      );
      console.log("user data" + userdata);
      if (!userdata) {
        return next(CustomErrorHandler.notFound());
      }
    } catch (err) {
      return next(err);
    }
    return res.json({ status: true, data: userdata });
  },

  async update(req, res, next) {
    console.log(req.body);
    const notesSchema = Joi.object({
      title: Joi.string().required(),
      message: Joi.string().required(),
    });

    const { error } = notesSchema.validate(req.body);
    console.log(error);
    if (error) {
      return next(error);
    }
    const id = req.params.id;

    const { title, message } = req.body;

    let data;

    data = await User.updateOne(
      // {_id:{ _id:req.user._id}},
      { "notes._id": id },
      {
        $set: {
          "notes.$.title": title,
          "notes.$.message": message,
        },
      },
      { new: true }
    );
    return res.json({ status: true });
  },

  async delete(req, res, next) {
    const id = req.params.id;

    let data;
    try {
      data = await User.updateOne(
        { "notes._id": id },
        {
          $pull: {
            notes: { _id: id },
          },
        },
        { new: true }
      );
      // data.save({new:true});
    } catch (err) {
      return next(err);
    }
    res.status(201).json({ status: true });
  },
};

export default noteController;
