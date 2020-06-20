// dependencies
const path = require("path");

// Routing

module.exports = function(app) {

    /* 
        When routing, using this file (htmlRoutes.js) requires that any relative paths that we want to return to the client be in relation to htmlRoutes.js!

        ex: this file is in ./routes/ folder, and the file accessed is in another folder a directory/layer above this file (htmlRoutes.js). To access the files we need, use:
        
        ../public/NAME_OF_FILE
    */

    // default page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // notes page
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // default page
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}