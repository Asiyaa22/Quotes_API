import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    res.json(randomQuote);
});




app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
});

const quotes = [
    {
        id: 1,
        qouteContent: "Money is Motivation💴", 
        quoteType: "motivation",
      },
{
    id: 2,
    qouteContent: "It will be worth it", 
    quoteType: "endgame",
},
{
    id: 3,
    qouteContent: "The tougher it gets the closer it is to relief🍀", 
    quoteType: "endgame",
},
{
    id: 4,
    qouteContent: "Hardwork paysoff", 
    quoteType: "motivation",
},
{
    id: 5,
    qouteContent: "You have to.....Do You Understand?", 
    quoteType: "tate",
},
{
    id: 6,
    qouteContent: "If it would be easy, everyone would have done that!!", 
    quoteType: "tate",
},
]