var API_KEY = 'AIzaSyA-CgXTQCNbSq44Vdfd-USv1n0XSOvJ0ZM';

var PlaceFinder = function($el, api_key) {
  this.$el = $el;
  this.$input = $el.find('input');
  this.$search = $el.find('button');
  this.url;
  // tie event listeners.
};


navigator.geolocation.getCurrentPosition(function(position) {
  // debugger;
  //(position.coords.latitude, position.coords.longitude);
});
