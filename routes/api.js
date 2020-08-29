const express = require("express");
const router = express();
const func = require("../controller/notes-function");

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.get("/view/:uid", func.viewnotesById);

router.post("/create/:uid", func.createNote);

router.patch("/update/:uid", func.updateNote);

router.delete("/delete/:uid", func.deleteNote);

// router.get("/viewAll", func.viewAll);
// router.get("/view/:title", func.viewNotes);
// router.patch("/update/:_id", func.updateNotes);
// router.delete("/delete/:title", func.deleteNotes);

module.exports = router;
