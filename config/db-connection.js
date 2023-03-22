const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB connection established successfully!");
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
