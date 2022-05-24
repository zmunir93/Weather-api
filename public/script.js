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
    userLocation = place.name;
    console.log(userLocation);
    console.log(typeof userLocation);

    
    let params = new URLSearchParams({
        access_key: '33b75764c314778e974be58e0d3eb310',
        query: userLocation,
        units: 'f'
    })
    
    fetch(`http://api.weatherstack.com/current?${params}`)
    .then(response => response.json())
    .then(data => console.log(data));



    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a place';
    } else {
        document.getElementById('details').innerHTML = place.name;
        document.getElementById('details').innerHTML = place.name;
    }
}
