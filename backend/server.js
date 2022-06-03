const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
const dotenv = require("dotenv").config();

//json
app.use(express.json());
app.use(cors());


const { readdirSync } = require("fs");


//select route dynamically
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));


//database connection

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => console.log("mongodb connected 🔥")).catch((error) => console.log(error))







const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

