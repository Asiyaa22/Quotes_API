import express, { request } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json(quotes);
})

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
    //retrieve the quoteType via url
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
    const filteredQuotes = quotes.filter(q => q.quoteType.toLowerCase() === type.toLowerCase());

    if (filteredQuotes.length > 0) {
      res.json(filteredQuotes);
    } else {
      res.status(404).json({ error: `No Quotes found for type: ${type}` });
    }
});

//post Method
//Adding new quote
app.post("/quotes", (req, res) => {
    console.log("form data received:", req.body);
    const { quoteContent, quoteType } = req.body;
    
    if( !quoteContent || !quoteType ){
        return res.status(404).json({ error: 'qouteContent and quoteType are required'});
    }

    const newQuote = {
        id: quotes.length + 1,  // Set ID based on current length
        quoteContent: quoteContent, // Assign content from form
        quoteType: quoteType, // Assign type from form
    };

    quotes.push(newQuote);
    console.log("Quote Added:", newQuote);
    res.status(201).json(newQuote);
});

app.put("/quotes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    //ONE method
    const updatedQuote = {
        id: id,
        quoteContent: req.body.quoteContent,
        quoteType: req.body.quoteType,
    };
    //another Method
    // const { qouteContent, quoteType } = req.body;
    // const updateQuote  = {
    //     id: id,
    //     qouteContent,
    //     quoteType,
    // }
    const searchIndex = quotes.findIndex((q) => q.id === id);
    quotes[searchIndex] = updatedQuote;
    res.json(updatedQuote);
});

app.delete("/quotes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const searchIndex = quotes.findIndex((q) => q.id === id);
    if( searchIndex > -1 ){
        quotes.splice(searchIndex, 1);
        res.status(201);
    }else{
        res.status(404).json({error:`quote with Id ${id} is not found`});
    }
});

//deleting EveryThing

const masterKey = "IA1M-H1S-H$-MINE";
app.delete("/quotes", (req, res) => {
    const userKey = req.query.key;
    if( userKey === masterKey ){
        quotes = [];
        res.status(200);
    }else{
        res.status(404).json({error:`Everything is Deleted....The user has successfully moved on🌻`});
    }
});



app.listen(5000, () => {
    console.log(`API is running on port ${port}`);
});

const quotes = [
    {
        id: 1,
        quoteContent: "Money is Motivation💴", 
        quoteType: "motivation",
    },
{
    id: 2,
    quoteContent: "It will be worth it", 
    quoteType: "endgame",
},
{
    id: 3,
    quoteContent: "The tougher it gets the closer it is to relief🍀", 
    quoteType: "endgame",
},
{
    id: 4,
    quoteContent: "Hardwork paysoff", 
    quoteType: "motivation",
},
{
    id: 5,
    quoteContent: "You have to.....Do You Understand?", 
    quoteType: "tate",
},
{
    id: 6,
    quoteContent: "If it would be easy, everyone would have done that!!", 
    quoteType: "tate",
},
]