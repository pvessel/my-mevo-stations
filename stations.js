var my_stations_script = document.createElement('script');
my_stations_script.onload = function () {
    myPlacesIds = getMyPlacesIds();
    allPlaces = getAllPlaces();
    myPlaces = getMyPlaces(allPlaces, myPlacesIds);
    html = createHtml(myPlaces);
    myPlacesList = document.getElementById("places");
    myPlacesList.innerHTML = html;
};
my_stations_script.setAttribute('src','https://rowermevo.pl/locations.js?key=' + identifier);
document.head.appendChild(my_stations_script);

function getMyPlacesIds() {
    const urlParams = new URLSearchParams(window.location.search);
    const placesParam = urlParams.get('places');
    const trimmedPlaces = placesParam.trim();
    const myPlaces = trimmedPlaces.split(",");

    return myPlaces;
}

function getAllPlaces() {
    const placesDBparsed = JSON.parse(NEXTBIKE_PLACES_DB);
    const placesDB = placesDBparsed[0]['places'];
    
    return placesDB;
}

function getMyPlaces(allPlaces, myPlacesIds) {
    var myPlaces = [];

    var allPlacesLength = allPlaces.length;
    var myPlacesLength = myPlacesIds.length;
    for (var i = 0; i < myPlacesLength; i++) {
    myPlacesId = myPlacesIds[i];
        number = myPlacesId.match(/[0-9]{4,}/);
        description = myPlacesId.replace(number, "");
        
        for (var j = 0; j < allPlacesLength; j++) {
            if(parseInt(number) === allPlaces[j]['number']) {
                found = allPlaces[j];
                found["description"] = description;
                myPlaces.push(found);
                break; // assuming station exist once in all stations list
            }
        }
    }

    return myPlaces;
}

function createHtml(myPlaces) {
    var html = "";
    var arrayLength = myPlaces.length;
    for (var i = 0; i < arrayLength; i++) {
        if(myPlaces[i]['bikes'] > 1) {
            html += ' <li class="available"> ';
        } else if(myPlaces[i]['bikes'] == 1) {
            html += ' <li class="one"> ';           
        } else {
            html += ' <li class="none"> '; 
        }

        html = html.concat('<strong>' + myPlaces[i]['bikes'] + '🚲 - ' + myPlaces[i]['description'] + ' </strong><small><em>' + myPlaces[i]['city'] + ' #' + myPlaces[i]['name'] + '</small></em></li>' );
    }
    
    return html;
}
    