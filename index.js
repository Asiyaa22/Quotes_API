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

app.get("/quotes/:id", (req, res) => {
    const quoteID = req.params.id;
    //Retrieves The ID
    const findQuote = quotes.find(quote => quote.id == quoteID);
    // const content = findQuote.qouteContent;
    //Finds the quote by ID
    //res.send(content);//this line will give the output of actual content of quote at a particular ID
    if(findQuote){
        res.json(findQuote); //If quote exists the return quote else 404
    }else{
        res.status(404).json({error:`Jokw with id: ${quoteID} not found`});
    }
});


// app.get("/filter", (req, res) => {
//     const quoteType = req.query.quoteType; // Retrieve quoteType from the query string
//     const findType = quotes.find(q => q.type == quoteType); // Find the quote by type

//     if (findType) {
//         res.json(findType); // Send the found quote as a JSON response
//     } else {
//         res.status(404).send(`Error: quote type ${quoteType} not found`); // Send a 404 error if not found
//     }
// });
//Filter Route
// app.get("/filter", (req, res) => {
//     const quoteType = req.query.quoteType;
//     //retrieve the quoteType via url
//     const findType = quotes.find( q => q.type == quoteType);

//     if(findType){
//         res.json(findType);
//     }else{
//         res.status(404).send("error : `quote type ${quoteType} not found`");
//     }
// });

app.get("/filter", (req, res) => {
    const { type } = req.query;
    if(!type){
        return
        res.status(404).json({ error: `not found ${type}`});
    }
    const filteredQuotes = quotes.filter(j => j.quoteType.toLowerCase() === type.toLowerCase());

    if (filteredQuotes.length > 0) {
      res.json(filteredQuotes);
    } else {
      res.status(404).json({ error: `No Quotes found for type: ${type}` });
    }
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