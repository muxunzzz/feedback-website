//imports
const db = require("../routes/db-config");      //database configuration

const mState = (req, res) => {
    //request all data from webpage body
    const data = req.body;
    const states = data.state;
    //for the number of feedback
    for(var i=0; i<states.length; i++){
        const id = i+1;
        const st = states[i];
        //selecting state which does not match
        db.query("SELECT state FROM feedback WHERE id = ? AND state != ?", [id, st], (err, result) => {
            if(err) console.log(err);
            if(!(result[0]==null)){
                //update state in database
                db.query("UPDATE feedback SET state = ? WHERE id = ?", [st, id], () => {
                    if(err) console.log(err);
                });
            }
        });
    }
    //redirect to view feedback page when finished
    res.redirect("/manager/feedback");
    console.log("Successfully updated states");
}

module.exports = mState;