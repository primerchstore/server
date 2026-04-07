import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
