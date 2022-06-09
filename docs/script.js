let autocomplete;
let userLocation;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['locality'],
            fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_component']
        });

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {   

    var place = autocomplete.getPlace();
    userLocation = place.formatted_address;
    
    let params = new URLSearchParams({
        appid: '0ebc6937c14d7aa5f19e42331293f482',
        units: 'imperial'
    })

    function filter(data) {
        const description = `${data.weather[0].description}`;
        const temp = `${Math.floor(data.main.temp)}<sup>°f</sup>`;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0]["icon"]}@2x.png`;
        const wind = `${data.wind.speed} mph winds`;
        const humid = `${data.main.humidity}% humidity`
        document.querySelector('#description').innerHTML = description;
        document.querySelector('#temp').innerHTML = temp;
        document.querySelector('#icon').src = icon;
        document.querySelector('#wind').innerHTML = wind;
        document.querySelector('#humid').innerHTML = humid;
     }


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&${params}`)
        .then(response => response.json())
        .then(function(data) {
            filter(data);
        });



    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a place';
    } else {
        document.getElementById('details').innerHTML = place.formatted_address;
    }
} 