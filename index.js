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


// This is the main component that ties in with markup.
// It uses other components to do different tasks (e.g. get location or query google)
var PlaceFinder = function(el, api_key) {
  var $el = $(el);
  var $input = $el.find('.search-input');
  var $search = $el.find('.search-button');
  var locator = new Locator($('.locator')[0]);
  var gotBrowserLocation = locator.getBrowserLocation();

  var enableSearch = function () {
    $search.removeAttr('disabled');
  };

  gotBrowserLocation.done(function () {
    enableSearch();
  });

  var queryGoogle = function (keyword, coordinates) {
    var results_promise = $.Deferred();
    var googleModule = new googleAjaxModule(coordinates);

    googleModule.service.nearbySearch({
      location: coordinates,
      radius: 800,
      keyword: keyword,
    },
    function (data) {
      results_promise.resolve(data);
    });

    return results_promise;
  }

  var performSearch = function () {
    if ($search.is(':disabled')) { return; }
    var keyword = $input.val();
    var coordinates;

    if (locator.use_browser_location) {
      coordinates = formatCoordinates(locator.browser_location);
    } else {
      coordinates = formatCoordinates(locator.user_provided_location);
    }

    queryGoogle(keyword, coordinates).done(displayResults);
  }

  var formatCoordinates = function (coordinates) {
    return {
      lat: coordinates.latitude,
      lng: coordinates.longitude
    }
  }

  var displayResults = function (data) {
    // TODO:
    // iterate over data array,
    // use an underscore template with some styling to append results
  }

  // event listeners to actually perform the search
  $input.on('keydown', function (event) {
    if (event.keyCode === 13) {
      performSearch();
    }
  });
  $search.on('click', performSearch);
};

// this object will specify lat/lng for the query to Google Places API
var Locator = function(el) {
  var self = this;
  var $el = $(el);
  var $input = $el.find('.location');
  // hide icons after rendering to ensure css animations get triggered
  $el.find('i').hide();
  var fetcher = new LocationFetcher($el.find('.user-provided'));

  // event listeners for functionality of locator
  $el.find('a').click(function(){
    this.toggle();
  }.bind(this));

  $input.blur(function () {
    var location_promise = fetcher.fetch();
    location_promise.done(function (data) {
      // TODO:
      // set locator user_provided_location to info from data
      fetcher.showSuccess();
    });
  });

  // public functions / attributes
  this.use_browser_location = false;
  this.browser_location = {};
  this.user_provided_location = {};

  this.getBrowserLocation = function () {
    var geoLocated = $.Deferred();

    navigator.geolocation.getCurrentPosition(function(position) {
      self.browser_location = position.coords;
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
}

// this object will get lat/lng from google maps api if user refuses to allow using
// current location
var LocationFetcher = function(el) {
  var $el = $(el);
  var $input = $el.find('.location');

  this.showLoader = function () {
    $el.find('.success').hide();
    $el.find('.loading').show();
  }
  this.showSuccess = function () {
    $el.find('.success').show();
    $el.find('.loading').hide();
  }
  this.fetch = function () {
    var promise = $.Deferred();
    this.showLoader();
    // TODO:
    // make ajax call to get location
    // on success, hide loader and resolve deferred, enable search
    setTimeout(function () {
      promise.resolve();
    }, 1000);
    return promise;
  }
};

// run the application code when page finishes loading.
$(function () {
  new PlaceFinder($('.place-finder')[0], GOOGLE_API_KEY);
});
