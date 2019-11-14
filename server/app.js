const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");

// const cookieParser = require("cookie-parser");

// const db = require('./db/connection');
// const categories = require('./routes/allInOne');
// const allInOne = require('./routes/allInOne');
// const products = require('./routes/allInOne');
// let action;
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
require("./models/index");
require("./startup/globalAccess");
require("./startup/routes")(app);
require("./startup/config")();
// app.use("/api/supplies", supplies);
// app.use("/api/suppliers", suppliers);
// app.use("/api/customers", customers);
// app.use("/api/orders", orders);
// app.use("/api/reports", reports);
// app.use("/api/users", users);

// db.connect((error)=>{
//     if(error) throw error;
//     console.log("Connected");
// });

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.listen(PORT, () => {
  console.log("Listening to prot", PORT);
});
