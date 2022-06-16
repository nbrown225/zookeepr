const express = require('express');
const { animals } = require('./data/animals.json');

//INITIATE SERVER
const app = express();

// query filter
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        //save personality traits as a dedicated array
        //if personality traits is a string, place it in a new array
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in array
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}
//ROUTE FOR FRONT END TO REQUEST DATA FROM
app.get('/api/animals', (req, res) => {
    let results = animals;
//call filterByQuery()
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
  });

    // REMOVED TO CHANGE TO JSON
    //res.send('HELLO THERE')

// LISTEN FOR REQUESTS
app.listen(3001, () => {
    console.log(`API SERVER NOW ON PORT 3001! PLEASE HEAD TO http://localhost:3001/api/animals`);
});

