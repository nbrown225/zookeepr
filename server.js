const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
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

// takes in the id and array of animals and returns single amimal object
findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
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
//rout for animal id
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result); 
    } else {
        res.send('ERROR: 404! THE REQUESTED RESOURCE COULD NOT BE FOUND. TRY AGAIN IDIOT')
    }
})

// store data from user
app.post('/api/animals', (req, res) => {
    //req.body is where our incoming content will be
    console.log(req.body);
    res.json(req.body)
});
// LISTEN FOR REQUESTS
app.listen(PORT, () => {
    console.log(`API SERVER IS NOW ON PORT ${PORT}! USE heroku open`);
})
