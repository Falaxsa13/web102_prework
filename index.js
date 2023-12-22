/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // Add the class game-card to the list
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
            <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
            <p>Goal: $${games[i].goal.toLocaleString()}</p>
            <p>Backers: ${games[i].backers}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

const contributionsCard = document.getElementById("num-contributions");

const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

contributionsCard.innerHTML = totalContributions.toLocaleString();


// Grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// Use reduce() to find the total amount raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Set the inner HTML using the length of the GAMES_JSON array
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Logging the number of games in thWWe array returned by filterUnfundedOnly
    console.log(unfundedGames.length);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);

    // Logging the number of games in the array returned by filterFundedOnly
    console.log(fundedGames.length);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// Call the showAllGames function to display all games
showAllGames();

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log(numUnfundedGames);


// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesString = `
  ${raisedCard.textContent} has been raised for ${gamesCard.textContent} games.
  ${numUnfundedGames === 0 ? "All games are funded!" : `There ${numUnfundedGames === 1 ? "is" : "are"} ${numUnfundedGames} ${numUnfundedGames === 1 ? "game" : "games"} that still ${numUnfundedGames === 1 ? "needs" : "need"} funding.`}
`;

console.log(unfundedGamesString);

// create a new DOM element containing the template string and append it to the description container
const paragraphElement = document.createElement("p");
paragraphElement.innerHTML = unfundedGamesString;
descriptionContainer.appendChild(paragraphElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame, ...restOfGames] = sortedGames;

// create a new element to hold the name of the top pledge game
const topGameNameElement = document.createElement("p");
topGameNameElement.textContent = topGame.name;

// append it to the correct element
firstGameContainer.appendChild(topGameNameElement);

// do the same for the runner-up item
const secondGameNameElement = document.createElement("p");
secondGameNameElement.textContent = secondGame.name;

// append it to the correct element
secondGameContainer.appendChild(secondGameNameElement);

// seaworthy
// OOZEdiveTRAPpine
// 6games-container.stats-card15
// 11seafoamGAMES_JSON
// 19187800268BRAIN
// 74FLANNELCLICK
// toLocaleString<div>1ivy
// ZooFrosthaven