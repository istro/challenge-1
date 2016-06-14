// this object will specify lat/lng for the query to Google Places API
var Locator = function(el) {
  var self = this;
  var $el = $(el);
  var $input = $el.find('.location');
  var fetcher = new LocationFetcher($el.find('.user-provided'));
  // hide icons after rendering to ensure css animations get triggered
  $el.find('i').hide();


  // public functions / attributes
  this.custom_location_promise = $.Deferred();
  this.use_browser_location = false;
  this.browser_location = {};
  this.user_provided_location = {};

  this.getBrowserLocation = function () {
    var geoLocated = $.Deferred();

    navigator.geolocation.getCurrentPosition(function(position) {
      self.browser_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      geoLocated.resolve();
    });

    geoLocated.done(function () {
      self.showLinks();
      self.toggle();
    });

    return geoLocated;
  };

  this.showLinks = function () {
    $el.find('a').show();
  };
  this.showFetcher = function () {
    $el.find('.user-provided').show();
  };
  this.toggle = function () {
    // prevent toggling when typing
    if ($input.is(':focus')) { return; }
    this.use_browser_location = !this.use_browser_location;
    $el.find('span').toggle();
  };

  this.showFetcher();

  // event listeners for functionality of locator
  $el.find('a').click(function(){
    this.toggle();
  }.bind(this));

  $input.blur(function () {
    var location_promise = fetcher.fetch();
    location_promise.done(function (data) {
      this.custom_location_promise.resolve();
      this.user_provided_location = data.geometry.location;
    // not sure why, but using `self` didn't work in here...
    }.bind(this));
  }.bind(this));
}
