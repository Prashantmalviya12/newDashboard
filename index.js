const express = require("express");
const app = express();
const connectDB = require("./config/dbs");
const userRouter = require('./routers/UserRoute')
const loginRoute = require('./routers/AuthRoute')
const cors = require("cors");

const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

app.use('/user',userRouter)
app.use('/login',loginRoute)

app.get("/", (req, res) => {
  res.send("Hello, Node.js!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
