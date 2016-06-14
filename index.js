// declare some stuff - ideally would be in separate file(s), but for the sake of
// coding exercise it's fine here

var GOOGLE_API_KEY = 'AIzaSyA-CgXTQCNbSq44Vdfd-USv1n0XSOvJ0ZM';

// unfortunately google doesn't let you query their APIs with plain
// $.getJSON or something. Isolate minimal stuff copy-pasted from google
// docs into this object.
var googleAjaxModule = function (coordinates) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coordinates,
    zoom: 15
  });
  this.service = new google.maps.places.PlacesService(map);
}

// run the application code when page finishes loading.
$(function () {
  new PlaceFinder($('.place-finder')[0], GOOGLE_API_KEY);
});
