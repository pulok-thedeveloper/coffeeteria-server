const express = require('express');
const cors = require('cors');
const app =express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tftz42f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//Connecting Database
async function dbConnect() {
  try {
    await client.connect();
    console.log("Database Connected");
  } catch (error) {
    console.log(error.name, error.message);
    res.send({
      success: false,
      error: error.message,
    });
  }
}

dbConnect();

const MENU = client.db("coffeeteria").collection("menu");
app.get('/menu', async (req, res) =>{
    try{
        const cursor = MENU.find({});
        const result = await cursor.toArray();

        res.send({
            success: true,
            data: result
        })
    }
    catch (error) {
        res.send({
            success: false,
            data: error.message
        });
    }
});

app.get("/", (req, res) => {
    try{
        res.send("Coffeeteria is running...")
    }
    catch (error) {
        res.send(error.message)
    }
});

app.listen(port, ()=> console.log("Coffeeteria is running on port", port));
