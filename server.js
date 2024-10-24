import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5050;
const API_URL = "http://localhost:5000";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get("/", async(req, res) => {
    try{
    const response = await axios.get(`${API_URL}/`);
    // console.log("Home Page DATA In Server:", response);
    res.render("index.ejs", { quotes: response.data });
    }catch(error){
      res.status(500).json({ message: "Error fetching data"});
    }
});

app.get('/random', async(req, res) => {
  try{
    const response = await axios.get(`${API_URL}/random`);
    res.render("modify.ejs", { quotes: response.data});
    console.log(response.data);

  }catch(error){
    res.status(500).json({ message: "Error fetching random quotes"});
  }
});

app.get("/new", async(req, res) => {
  try{
    res.render("modify.ejs", { quotes: null });
  }catch(error){
    res.status(404).json({ error:"Oops sick MAN Mera Admi I mean Garam nakko seedha bolo kya hona hai so"});
  }
});

app.post("/quotes", async (req, res) => {
  try{
    await axios.post(`${API_URL}/quotes`, req.body); 
    res.redirect("/");
    
  }catch(error){
    res.status(404).json({ error: "Error creating new post"});
  }
});

app.listen(5050, () => {
    console.log(`server is running on port ${port}`);
});
