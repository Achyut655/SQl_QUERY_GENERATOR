const express = require("express");
const mongoose = require("./configs/db");
const cors = require("cors");
const app = express();

// const express = require('express');
// const cors = require('cors'); // Import the cors middleware
// const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:3000' 
  }));

const userRouter = require("./routes/user.route");
app.use("/user", userRouter);

app.listen(3001, async () => {
    try {
        await mongoose.connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Unable to connect to DB");
        console.log(error);
    }
    console.log(`Listening at port ${3001}`);
});
