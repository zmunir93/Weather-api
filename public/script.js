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
    console.log(place);
    userLocation = place.formatted_address;
    console.log(userLocation);
    console.log(typeof userLocation);
    
    let params = new URLSearchParams({
        access_key: '33b75764c314778e974be58e0d3eb310',
        query: userLocation,
        units: 'f'
    })

    function filter(data) {
        const temp = `${data.current.temperature}°`;
        const description = `${data.current.weather_descriptions[0]}`;
        const wind = `${data.current.wind_speed}`;
        const rain = `${data.current.precip}%`;
        const humid = `${data.current.humidity}`
        var home = JSON.stringify(data);
       console.log(JSON.parse(home));
       document.querySelector('#temp').innerHTML = temp;
       document.querySelector('#description').innerHTML = description;
       document.querySelector('#wind').innerHTML = wind;
       document.querySelector('#rain').innerHTML = rain;
       document.querySelector('#humid').innerHTML = humid;
       

    }

    fetch(`http://api.weatherstack.com/current?${params}`)
    .then(response => response.json())
    .then(function(data) {
        filter(data)
    });

    

    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a place';
    } else {
        document.getElementById('details').innerHTML = place.formatted_address;
    }
} 