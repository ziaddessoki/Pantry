const express = require ("express");
const cors = require ("cors");
const mongoose = require ('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

const uri = process.env.ATLAS_URI;
mongoose.connect(uri ,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open',() => {
    console.log(`MongoDB is up`);
});

const userRouter = require ('./routes/user');

app.use('/user', userRouter);


app.listen(port,() => {
    console.log(`App listening on PORT ${port}`);
})