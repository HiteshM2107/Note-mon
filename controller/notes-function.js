const express = require("express");

const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const { validationResult } = require("express-validator");
const Notes = require("../models/note-schema");
// const { use } = require("../routes/user-routes");
const User = require("../models/user-schema");
const mongoose = require("mongoose");

// const viewAll = async (req, res, next) => {
//   var NOTES = "",
//     NOTES = await Notes.find()
//       .then()
//       .catch((err) => {
//         console.log(err);
//         return next("an error occured");
//       });
//   res.json({ NOTES });
// };

const viewnotesById = async (req, res, next) => {
  const creator = req.params.uid;
  var note = "";
  try {
    note = await Notes.find({ creator: creator });
  } catch (err) {
    console.log(err);
    return next("cannot find note", 500);
  }
  if (!note) {
    return next("could not find a note for given user id", 404);
  }
  res.json({ note: note }); // => { place } => { place: place }
};

const getnotebyname = async (req, res, next) => {
  const name = req.params.uname;
  let note;
  try {
    note = (await note) - schema.find({ creatorname: name });
  } catch (err) {
    console.log(err);
    return next("cannot find note");
  }
  if (!note || note.length === 0) {
    const error = "could not find any note for given username";
    return next(error);
  }
  res.json({ note: note.map((note) => note.toObject({ getters: true })) });
};

//function to CREATE a note
const createNote = async (req, res, next) => {
  const creator = req.params.uid;
  const { title, body } = req.body;
  console.log(req.body);
  const createdNote = new Notes({
    title,
    body,
    creator,
  });
  //console.log("sswfewf-",createdNote);
  let user;
  try {
    console.log(creator);
    user = await User.findById(creator);
    console.log(user);
  } catch (err) {
    console.log(err);
    return next("user not found!!");
  }
  //console.log("user----",user);
  if (!user) {
    return next("cannot find user");
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdNote.save({ session: sess });
    console.log("session---", sess);
    user.notes.push(createdNote);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    return next("FAILED!!!");
  }
  res.status(200).json({ note: createdNote });
};

//function to UPDATE a note
const updateNote = async (req, res, next) => {
  const { title, body } = req.body;
  const userId = req.params.uid;

  let note;
  try {
    note = await Notes.findById(userId);
  } catch (err) {
    console.log(err);
    return next("Something went wrong");
  }

  note.title = title;
  note.body = body;

  try {
    await note.save();
  } catch (err) {
    console.log(err);
    return next("Something went wrong");
  }
  res.status(200).json({ note: note.toObject({ getters: true }) });
};

//function to DELETE a note
const deleteNote = async (req, res, next) => {
  const userId = req.params.uid;

  let note;
  try {
    note = await Notes.findById(userId).populate("creator");
  } catch (err) {
    console.log("error----", err);
    console.log("note--", note);
    return next("something went wrong, 500");
  }

  if (!note) {
    return next("cannot find note, 404");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await note.remove({ session: sess });
    note.creator.notes.pull(note);
    await note.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    //console.log(err);

    return next("Something went wrong here!!  500");
  }

  res.status(200).json({ message: "deleted!!!" });
};

exports.viewnotesById = viewnotesById;
exports.getnotebyname = getnotebyname;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
// exports.viewAll = viewAll;
