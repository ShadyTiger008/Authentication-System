import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";

const port = process.env.PORT || 8000;

dotenv.config({
  path: "/.env",
});

connectDB()
  .then(() =>
    app.listen(port, (req, res) => {
      console.log(`⚙️  Server listening on ${process.env.PORT}.....`);
    })
  )
  .catch((error) =>
    console.log(`Error listening on ${process.env.PORT}`, error)
  );
