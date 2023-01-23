const express = require("express");
const connectDB = require("./db/connect");
require("dotenv").config();
const app = express();
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transaction");
const auth = require("./middleware/authentication");
const errorMiddleWare = require("./error/error");
const updateSetting = require("./Controller/updateSetting");
const multer = require("multer");
const upload = multer()
const path = require('path')
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.use("/authenticate", authRouter);

app.use("/transaction", auth, transactionRouter);

app.use("/updatesetting", auth,upload.single('image'), updateSetting);

app.get('/*',(req,res)=>{
  res.sendFile(path.join(__dirname + '/public/index.html' ))
})

app.use(errorMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
