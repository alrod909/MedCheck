// Author: Alfredo Rodriguez, Brooklee Wilson, Mya Nguyen
// File: JS - server.js
// Date: 10/10/2017

// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require("method-override");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 6969;


// Requiring our models for syncing
var db = require("./models");

// Set Handlebars.
// var exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);

require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(process.env.PORT || PORT, function() {
  console.log("App listening on PORT " + PORT);
});
});