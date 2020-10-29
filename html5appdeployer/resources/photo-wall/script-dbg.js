var urlParams = new URLSearchParams(window.location.search);
var game;
var characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

onAPIError = function () {
    document.getElementById('title').innerText = "Error in API Call :/";
}

onDataLoaded = function (data) {

    game = data.id; // Set game

    // Show game section
    document.getElementById('title').innerText = "Good luck!";
    document.getElementById('characters').style.display = 'block';
    document.getElementById('picture').style.display = 'block';
    document.getElementById('word').style.display = 'block';
    document.getElementById('create').style.display = 'none';

    document.getElementById('word').innerText = "test"; //Init  data

    // Load picture
    document.getElementById('picture').src = "img/" + (6 - data.lives)+ ".png";

    // Display word
    document.getElementById('word').innerText = data.word;

    // Hide guessed characters
    for(var i=0; i<characters.length; i++) {
        document.getElementById("char-" + characters[i]).setAttribute("aria-disabled", data.guesses.includes(characters[i]));
    }

    // Check for win/loose
    if (data.lives < 1) {
        document.getElementById('title').innerText = "You loose!";
        document.getElementById('characters').style.display = 'none';
        document.getElementById('create').style.display = 'inline';
    } else if (!data.word.includes("_")) {
        document.getElementById('title').innerText = "You win!";
        document.getElementById('characters').style.display = 'none';
        document.getElementById('create').style.display = 'inline';
        document.getElementById('photo').style.display = 'inline';
    }
}

onButtonPressed = async function () {

    // Get guessed character
    var char = this.innerText;

    // Send guess to backend
    let response = await fetch("api/games/" + game + "/guesses",{
        method: 'POST',
        headers:{
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({ "value": char })
    });

    // Process response
    if(!response.ok){
        onAPIError();
    } else {
        response.json()
        .then(response_json => onDataLoaded(response_json));
    }        
}

onCreateGame = async function () {

    // Request new game
    let response = await fetch("api/games/",{
        method: 'POST'
    });

    // Process response
    if(!response.ok){
        onAPIError();
    } else {
        response.json()
        .then(response_json => onDataLoaded(response_json));
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // Create a button for each character
    for (i in characters) {
        var char_button = document.createElement('button');
        char_button.setAttribute('class','fd-button');
        char_button.setAttribute('id','char-' + characters[i]);
        char_button.innerText = characters[i];
        document.getElementById('characters').append(char_button);
        document.getElementById('char-' + characters[i]).addEventListener('click',onButtonPressed);
    }

    // Show start section
    document.getElementById('characters').style.display = 'none';
    document.getElementById('picture').style.display = 'none';
    document.getElementById('word').style.display = 'none';
    document.getElementById('title').style.display = 'block';
    document.getElementById('create').style.display = 'inline';

    // Event listener for game creation
    document.getElementById('create').addEventListener('click',onCreateGame);

});