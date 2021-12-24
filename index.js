const express = require("express"); //importing express
const app = express(); //creating an express application
const port = 5000; //define a port
const cors = require("cors");
const { notesRouter } = require("./api/v1/index.js");
require("./db/index.js");

app.use(express.json());

app.use(cors());

//root (/)
app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(`Notes backend app running on port http://localhost:${port}`);
});
