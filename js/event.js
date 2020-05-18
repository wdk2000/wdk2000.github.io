let request = new XMLHttpRequest();
let APIKEY = "nScmb5ehJnReWvueGw60fT6GWgXztU1K";
let apiData;


function removeOptions(selectbox) {
    for (let i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}


function populateCity(apiData) {
    let select = document.getElementById("city-select");
    if (select.options.length > 0) {
        removeOptions(select);
    }
    let cityArray = [];
    for (i in apiData["_embedded"].events) { 
        let currentEvent = apiData["_embedded"].events[i];
        let city = currentEvent["_embedded"].venues[0].city.name;
        if (cityArray.indexOf(city) == -1) { 
            let opt = document.createElement('option');
            opt.value = city;
            opt.innerHTML = city;
            select.appendChild(opt);
            cityArray.push(city);
        }
    }
    let eleCountry = document.getElementById("country-select");
    let country = eleCountry.options[eleCountry.selectedIndex].value;
    let eleCity = document.getElementById("city-select");
    let city = eleCity.options[eleCity.selectedIndex].text;    
    let eleGenre = document.getElementById("genre-select");
    let genre = eleGenre.options[eleGenre.selectedIndex].text;
    displayNicely(apiData, country, city, genre);
}

function populateGenre(apiData) {
    let select = document.getElementById("genre-select");
    if (select.options.length > 0) {
        removeOptions(select);
    }   
    let eleCity = document.getElementById("city-select");
    let city = eleCity.options[eleCity.selectedIndex].text;
    let genreArray = [];
    for (i in apiData["_embedded"].events) { 
        if (apiData._embedded.events[i]._embedded.venues[0].city.name == city) {
            let currentEvent = apiData["_embedded"].events[i];
            let segment = currentEvent.classifications[0].segment.name;
            if (genreArray.indexOf(segment) == -1) {
                let opt = document.createElement('option');
                opt.value = segment;
                opt.innerHTML = segment;
                select.appendChild(opt);
                genreArray.push(segment);
            }
        }
    }
    let eleCountry = document.getElementById("country-select");
    let country = eleCountry.options[eleCountry.selectedIndex].value;    
    let eleGenre = document.getElementById("genre-select");
    let genre = eleGenre.options[eleGenre.selectedIndex].text;
    displayNicely(apiData, country, city, genre);
}
function displayNicely(apiData, country, city, genre) {
    console.log(apiData); 
    let htmlString=""; 
    for (let i = 0; i < apiData._embedded.events.length; i++) {
        if (apiData._embedded.events[i]._embedded.venues[0].city.name == city) {
            if (apiData._embedded.events[i].classifications[0].segment.name == genre) {
                if (typeof(apiData._embedded.events[i].name) !== "undefined") {
                    htmlString += "<h2>" + apiData._embedded.events[i].name + "</h2>";
                }
                if (typeof(apiData._embedded.events[i].images) !== "undefined") {
                    htmlString += "<div class='row justify-content-center'><img src= " + apiData._embedded.events[i].images[0].url + " class='artist-image rounded img-fluid'> </div>"; //artist image***    
                }
                if (typeof(apiData._embedded.events[i].classifications[0].segment.name) !== "undefined") {
                    htmlString += "<p><strong>SEGMENT: </strong> " + apiData._embedded.events[i].classifications[0].segment.name + "</p>";
                }
                if (typeof(apiData._embedded.events[i].classifications[0].genre.name) !== "undefined") {
                    htmlString += "<p><strong>GENRE: </strong>" + apiData._embedded.events[i].classifications[0].genre.name + "</p>";
                }
                if (typeof(apiData._embedded.events[i].classifications[0].subGenre.name) !== "undefined") {
                    htmlString += "<p><strong>SUBGENRE: </strong>" + apiData._embedded.events[i].classifications[0].subGenre.name + "</p>";
                }
                if (typeof(apiData["_embedded"].events[i].classifications[0].type) !== "undefined") {
                    if (apiData["_embedded"].events[i].classifications[0].type.name !== "Undefined") {
                        htmlString += "<p><strong>TYPE: </strong>" + apiData._embedded.events[i].classifications[0].type.name + "</p>";
                    }
                }
                if (typeof(apiData._embedded.events[i].sales.public.startDateTime) !== "undefined") {
                    htmlString += "<p><strong>START DATE TIME: </strong>" + apiData._embedded.events[i].sales.public.startDateTime + "</p>";
                }

                if (typeof(apiData._embedded.events[i].sales.public.endDateTime) !== "undefined") {
                    htmlString += "<p><strong>END DATE TIME: </strong>" + apiData._embedded.events[i].sales.public.endDateTime + "</p>";
                }
                if (typeof(apiData._embedded.events[i].dates.timezone) !== "undefined") {
                    htmlString += "<p><strong>TIMEZONE: </strong>" + apiData._embedded.events[i].dates.timezone + "</p>";
                }
                if (typeof(apiData._embedded.events[i].dates.status.code) !== "undefined") {
                    htmlString += "<p><strong>STATUS: </strong>" + apiData._embedded.events[i].dates.status.code + "</p>";
                }
                if (typeof(apiData._embedded.events[i].info) !== "undefined") {
                    htmlString += "<p><strong>INFORMATION: </strong>" + apiData._embedded.events[i].info + "</p>";
                }
                if (typeof(apiData._embedded.events[i].pleaseNote) !== "undefined") {
                    htmlString += "<p><strong>PLEASE NOTE: </strong>" + apiData._embedded.events[i].pleaseNote + "</p>";
                }
                if (typeof(apiData._embedded.events[i].priceRanges) !== "undefined") {

                    htmlString += "<p><strong>PRICE TYPE: </strong>" + apiData._embedded.events[i].priceRanges[0].type + "</p>";
                    htmlString += "<p><strong>CURRENCY: </strong>" + apiData._embedded.events[i].priceRanges[0].currency + "</p>";
                    htmlString += "<p><strong>PRICE RANGE: </strong>" + apiData._embedded.events[i].priceRanges[0].min + " - ";
                    htmlString += apiData._embedded.events[i].priceRanges[0].max + "</p>";
                }
                if (typeof(apiData._embedded.events[i].ticketLimit) !== "undefined") {
                    htmlString += "<p><strong>TICKET LIMIT INFORMATION: </strong>" + apiData._embedded.events[i].ticketLimit.info + "</p>";
                }
                if (typeof(apiData._embedded.events[i].products) !== "undefined") {
                    htmlString += "<p><strong>PRODUCT TYPE: </strong>" + apiData._embedded.events[i].products[0].type + "</p>";
                }
                if (typeof(apiData._embedded.events[i].seatmap) !== "undefined") {
                    htmlString += "<h3>SEATMAP</h3><div class='row justify-content-center'><img src = " + apiData._embedded.events[i].seatmap.staticUrl + " class='seat-map img-fluid'></div>"; 
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].city.name) !== "undefined") {
                    htmlString += "<p><strong>CITY: </strong>" + apiData._embedded.events[i]._embedded.venues[0].city.name + "</p>"; 
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].country.name) !== "undefined") {
                    htmlString += "<p><strong>COUNTRY: </strong>" + apiData._embedded.events[i]._embedded.venues[0].country.name + "</p>";
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].country.countryCode) !== "undefined") {
                    htmlString += "<p><strong>COUNTRY CODE: </strong>" + apiData._embedded.events[i]._embedded.venues[0].country.countryCode + "</p>";
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].address.line1) !== "undefined") {
                    htmlString += "<p><strong>VENUE'S ADDRESS: </strong>" + apiData._embedded.events[i]._embedded.venues[0].address.line1 + "</p>";
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].generalInfo) !== "undefined") {
                    htmlString += "<p><strong>CHILD INFORMATION: </strong>" + apiData._embedded.events[i]._embedded.venues[0].generalInfo.childRule + "</p>";
                    htmlString += "<p><strong>GENERAL INFORMATION: </strong>" + apiData._embedded.events[i]._embedded.venues[0].generalInfo.generalRule + "</p>";
                }
                if (typeof(apiData["_embedded"].events[i]["_embedded"].venues[0].images) !== "undefined") { 

                    htmlString += "<h3>VENUE: </h3><div class='row justify-content-center'><img src =" + apiData._embedded.events[i]._embedded.venues[0].images[0].url + " class='venue-img rounded img-fluid'></div>";
                }
                if (typeof(apiData._embedded.events[i]._embedded.venues[0].parkingDetail) !== "undefined") {
                    htmlString += "<p><strong>PARKING DETAILS: </strong>" + apiData._embedded.events[i]._embedded.venues[0].parkingDetail + "</p>";
                }
                if (typeof(apiData._embedded.events[i].url) !== "undefined") {
                    htmlString += "<p><i class='fas fa-ticket-alt ticket'></i> <strong>BUY YOUR TICKETS HERE: </strong>" + "<a href=" + apiData._embedded.events[i].url + ">Click here</a></p>";
                }
                htmlString += "<hr>";
            }
        }
    }document.getElementById("concert-data").innerHTML = htmlString; 
}

function refreshCities() { 
    let eleCountry = document.getElementById("country-select");
    let country = eleCountry.options[eleCountry.selectedIndex].value;   
    let eleCity = document.getElementById("city-select");
    let city = eleCity.options[eleCity.selectedIndex].text;
    let eleGenre = document.getElementById("genre-select");
    let genre = eleGenre.options[eleGenre.selectedIndex].text;
    populateGenre(apiData); 
}

function refreshGenres() { 
    let eleCountry = document.getElementById("country-select");
    let country = eleCountry.options[eleCountry.selectedIndex].value;   
    let eleCity = document.getElementById("city-select");
    let city = eleCity.options[eleCity.selectedIndex].text;  
    let eleGenre = document.getElementById("genre-select");
    let genre = eleGenre.options[eleGenre.selectedIndex].text;
    displayNicely(apiData, country, city, genre); 
}


function obtainCountry() {
    let countrySelect = document.getElementById("country-select"); 
    let CountryCode = countrySelect.options[countrySelect.selectedIndex].value; 
    request.open("GET", "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=" + CountryCode + "&apikey=7TkYHgRvPvsqBndGfHJNnG68N7nWVHoZ"); 
    request.send();
}



request.onreadystatechange = function() { 
    if (this.readyState == 4) {
        if (this.status == 200) {
            apiData = JSON.parse(this.responseText)
            populateCity(apiData);
            populateGenre(apiData);
        }
        else if (this.status == 404) {
            document.getElementById("concert-data").innerHTML = "<h2>City not found! Please try again</h2>"
        }
    }
}

