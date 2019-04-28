function validateForm()
{
    var places = document.getElementById("places");
    var placesValue = places.value; 
    
    if (!(/^[0-9]{4,}/.test(placesValue))) {
        alert("Type at least one station number");
        return false;
    }

  return true;
}    