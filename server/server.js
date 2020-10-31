const express = require("express");
const cors = require("cors");
const storeRouter = require("./routes/store");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/store", storeRouter);

app.listen(port, () => console.log(`Server is running on port: ${port}`));
