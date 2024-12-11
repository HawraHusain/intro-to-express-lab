//Import the packages 

const express = require('express')
const app = express()

// 1. Be Polite, Greet the User
//http://localhost:3000/greetings/Hawra
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});


//2. Rolling the Dice
//http://localhost:3000/roll/9
//http://localhost:3000/roll/s
app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    const parsedNumber = parseInt(number, 10);

    if (isNaN(parsedNumber)) {
        res.send("You must specify a number.");
    } else {
        const randomRoll = Math.floor(Math.random() * (parsedNumber + 1));
        res.send(`You rolled a ${randomRoll}.`);
    }
});

// 3. I Want THAT One!
//http://localhost:3000/collectibles/5
//http://localhost:3000/collectibles/0
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);

    if (index < 0 || index >= collectibles.length || isNaN(index)) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

// 4. Filter Shoes by Query Parameters
//http://localhost:3000/shoes?min-price=40&max-price=100
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
    let filteredShoes = shoes;

    if (minPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= parseFloat(maxPrice));
    }

    if (type) {
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }

    res.json(filteredShoes);
});

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })
  
