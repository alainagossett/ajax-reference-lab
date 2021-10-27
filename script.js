// CONSTANTS
const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = 'Q12TTtYUnHgSTgAoxuKf2ibl9JgdCQf6lnM3qEZl';

// STATE VARIABLES
let apiData;

// CACHED ELEMENT REFERENCES
const $main = $('main');


// EVENT LISTENERS
$main.on('click', 'article', handleHover);

// FUNCTIONS
getData();

function getData() {
    //get API data and assign it to our apiData variable
    $.ajax(BASE_URL + '?api_key=' + API_KEY + '&count=9')
    .then(function(data) {
        apiData = data;
        render();
    }, function(error) {

    });
}

function handleHover() {
    $(this).children('h3').fadeOut(900, function() {
        $(this).siblings().toggleClass('hidden');
    });
}

function render() {
    //transfer API data to the DOM
    const photoCards = apiData.map(function(photoObject) {
        return `
            <article style="background-image: url(${photoObject.url})">
                <h3>${photoObject.title}</h3>
                <p class="hidden">${photoObject.explanation}</p>
            </article>`;
    }).join('');
    $main.html(`<section>${photoCards}</section>`);
}