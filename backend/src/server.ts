import app from "./app.js";
import config from "./config/config.js";
import { connectDB } from "./config/db.js"


app.listen(config.port, () => {
  connectDB();
  console.log("Database connected successfully")
  console.log(`Server running on port ${config.port}`);
});
