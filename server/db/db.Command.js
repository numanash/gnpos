const db = require('./connection');

db.connect();
let query = "Select * from `category` ";

    db.query(query, (err, result) => {
        if (err) console.log("error", err);
        console.log(result);
    });