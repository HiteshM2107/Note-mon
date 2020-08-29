const express = require("express");
const router = express();
const func = require("../controller/user-func");

var bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post("/signup", func.signup);

router.post("/login", func.login);

module.exports = router;
