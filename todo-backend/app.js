const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParsr = require("cookie-parser");
const app = express();
const db = require("./utils");
const port = require("./config").port;

db.InitDBConnection();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParsr());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Routes
app.use("/", require("./routes/index"));

app.listen(port, () => console.log(`Listening on port : ${port}`));
