const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://your_username:your_password@cluster0.yplhl9e.mongodb.net/sql_project")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

module.exports = mongoose;
