// Dependencies
const express = require("express");

// tells node that we are creating an "express" server
const app = express();

// PORT
const PORT  = process.env.PORT || 8080;

// sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// routes
//require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
})