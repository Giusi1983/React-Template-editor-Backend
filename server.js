const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//connessione a MongoDB
mongoose
  .connect("mongodb://localhost:27017//test")
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => console.error(err));

// Modello Mongoose per i Template
const templateSchema = new mongoose.Schema({
  name: String,
  content: Object,
});

const Template = mongoose.model("Template", templateSchema);

// Endpoint per creare un nuovo template
app.post("/templates", async (req, res) => {
  const { name, content } = req.body;

  try {
    const newTemplate = new Template({ name, content });
    await newTemplate.save();
    res.status(201).send(newTemplate);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint per ottenere tutti i template
app.get("/templates", async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).send(templates);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
