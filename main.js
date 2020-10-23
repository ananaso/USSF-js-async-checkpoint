// file I/O to read in pokemon name list
// for each pokemon name, get their types from pokeapi.co
// console.log it all

const fs = require('fs');
const fetch = require('node-fetch');

// read in pokemon names
let names = fs.readFileSync('input.txt').toString().split('\n');
console.log(names);

names = names.forEach(pokemon => {
    let capitalName = pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
    let entry = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => response.json())
    .then(data => data.types.map(slot => {
        return slot.type.name;
    }))
    .then(types => {
        return `${types.join(', ')}`;
    });
}).then(names => {
    console.log(names);
})

// booo, doesn't work for some reason
// yet maybe we need to save the names to a variable not sure
// no, doesn't seem like it: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// I think we just need to find some way to wait for the fetches to finish
// reemove the capitalName
// i cant run the terminal im in read only mode
// ahh, okay. I'll push it all.