// dependencies
const fs = require("fs");
const path = require("path");
// this one pulls the json object to noteData variable
const noteData = require(path.join(__dirname, "../db/db.json"));
let counterId = noteData[noteData.length-1].id;

module.exports = function (app) {

    // Saving notes
    app.post("/api/notes", function (req, res) {
        // first, set the new data to a variable
        let newData = req.body;

        // we add an id parameter (should always be a unique id)
        counterId++;
        newData.id = counterId;

        // pushes data and saves it to the array
        noteData.push(newData);

        // append that data to the db.json file.
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData), function(err){
            if(err) throw err;

            console.log("Success! wrote to db.");
        });

        // send a true statement to trigger the rest of the index.js functions ()
        res.json(true);
    });

    // deleting notes
    app.delete("/api/notes/:number", function (req, res) {
        // save the number to a variable
        let idNum = parseInt(req.params.number);

        // for loop to go through the noteData array
        for (let i = 0; i < noteData.length; i++) {
            
            // if the id in the array matches the number sent...
            if (noteData[i].id === idNum) {
                
                console.log("found it: " + noteData[i].id);
                
                // we splice it out of the array
                noteData.splice(i, 1);

                // then save that new array to the file
                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(noteData), function(err){
                    if(err) throw err;
        
                    console.log("Success! wrote to db.");

                    // lastly, send a value to index.js to continue with the event and render
                    res.json(true);
                    
                });

                

            }
        }

        

    });

    // opening the webpage
    app.get("/api/notes", function (req, res) {
        return res.json(noteData);
    });
}