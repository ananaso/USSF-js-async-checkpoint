// file I/O to read in pokemon name list
// for each pokemon name, get their types from pokeapi.co
// console.log it all

const fs = require('fs');
const fetch = require('node-fetch');

// read in pokemon names
let names = fs.readFileSync('input.txt').toString().split('\n');

// get all types from pokeapi
let types = [];
names.forEach(pokemon => {
    types.push(fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => data.types.map(slot => {
        return slot.type.name;
    }))
    .then(types => {
        return `${types.join(', ')}`;
    }));
})

// after all types have been fetched
Promise.all(types)  // resolve the promises
    .then(types => {
        names.forEach((pokemon, indx) => {
            let capitalName = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);   // capitalize first letter of pokemon name
            console.log(`${capitalName}: ${types[indx]}`);  // log pokemon name with types in defined format
        })
    });
