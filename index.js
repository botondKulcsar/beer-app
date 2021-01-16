// Create a filter for the Hoppiness :)
// 1. Create a const for the radio group
// 2. Create a variable to track the options selected
// 3. Create an event listener to update the option selected
//      - all = ""
//      - weak = "ibu_lt=35"
//      - medium = "ibu_gt=34&ibu_lt=75"
//      - strong = "ibu_gt=74"
// 4. Implement the new options into the url being fetched 


// variables
const urlBase = "https://api.punkapi.com/v2/beers?page=";
const filterABV = document.getElementById('filterABV');
const filterIBU = document.getElementById('filterIBU');
const pageText = document.getElementById('pageNumber');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
let optionsABV = '';
let optionsIBU = '';
let page = 1;


// filters
filterIBU.addEventListener('change', e => {
    const value = e.target.value;

    switch (value) {
        case 'all':
            optionsIBU = '';
            break;
        case 'weak':
            optionsIBU = '&ibu_lt=35';
            break;
        case 'medium':
            optionsIBU = '&ibu_gt=34&ibu_lt=75';
            break;
        case 'strong':
            optionsIBU = '&ibu_gt=74';
            break;
    }
    page = 1;
    getBeers();
})

filterABV.addEventListener('change', e => {
    const value = e.target.value;

    switch (value) {
        case 'all':
            optionsABV = '';
            break;
        case 'weak':
            optionsABV = '&abv_lt=4.6';
            break;
        case 'medium':
            optionsABV = '&abv_gt=4.5&abv_lt=7.6';
            break;
        case 'strong':
            optionsABV = '&abv_gt=7.5';
            break;
    }
    page = 1;
    getBeers();
})

// Create an async function called "getBeers" that uses fetch to get our beer data from the urlBase.
// Render each beer name inside the div with the class of beers that currently exists in the HTML file.

async function getBeers() {
    const url = urlBase + page + optionsABV + optionsIBU;
    //fetch
    const beerPromise = await fetch(url);
    const beers = await beerPromise.json();


    // pagination

    pageText.innerText = page;

    if (page === 1) {
        prevPage.disabled = true;
    } else {
        prevPage.disabled = false;
    }
    if (beers.length < 25) {
        nextPage.disabled = true;
    } else {
        nextPage.disabled = false;
    }


    //rednder data

    let beerHtml = '';
    const beersDiv = document.querySelector('.beers');

    beers.forEach(beer => {
        beerHtml += `
        <div class = 'beer-wrapper card'>
          <div class = 'beer'>
            <img class='beer__img' src='${beer.image_url}'>
            <h3>${beer.name}</h3>
            <span class ='beer__info'>
                <span>ABV: ${beer.abv}%</span>
                <span>IBU: ${beer.ibu}</span>
            </span>

          </div>
          <div class = 'beer__content'>
            <div class='beer__name'>${beer.name}</div>
            <div class='beer__tagline'>${beer.tagline}</div>
            <div class='beer__description'>${beer.description}</div>
            <div class='beer__food-pairing'>
                Pair with: ${beer.food_pairing.join(', ')}
            </div>
          </div>
        </div>`;
    });
    beersDiv.innerHTML = beerHtml;
}

prevPage.addEventListener('click', () => {
    page--;
    getBeers();
});

nextPage.addEventListener('click', () => {
    page++;
    getBeers();
});


getBeers();