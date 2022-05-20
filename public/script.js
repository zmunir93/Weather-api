let autocomplete;

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            types: ['postal_code', 'locality'],
            fields: ['place_id', 'geometry', 'name', 'formatted_address', 'address_component']
        });

    autocomplete.addListener('place_changed', onPlaceChanged);
}

function onPlaceChanged() {
    var place = autocomplete.getPlace();

    console.log(place);

    if (!place.geometry) {
        document.getElementById('autocomplete').placeholder = 'Enter a place';
    } else {
        document.getElementById('details').innerHTML = place.name;
    }
}
