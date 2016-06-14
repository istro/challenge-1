// This is the main component that ties in with markup.
// It uses other components to do different tasks (e.g. get location or query google)
var PlaceFinder = function(el, api_key) {
  var $el = $(el);
  var $input = $el.find('.search-input');
  var $search = $el.find('.search-button');
  var locator = new Locator($('.locator')[0]);
  var gotBrowserLocation = locator.getBrowserLocation();
  var gotUserInputLocation = locator.custom_location_promise;

  gotBrowserLocation.done(function() {
    enableSearch();
  });
  gotUserInputLocation.done(function () {
    enableSearch();
  });

  var enableSearch = function () {
    $search.removeAttr('disabled');
  };

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
    var current = locator.use_browser_location;
    var latlng = current ? locator.browser_location : locator.user_provided_location;
    queryGoogle(keyword, latlng).done(displayResults);
  }

  var displayResults = function (results_array) {
    $('#results').empty();
    var result_template = _.template($('#results-template').text());

    _.each(results_array, function(result) {
      var result_html = result_template({ result: result });
      $('#results').append(result_html);
    });
  }

  // event listeners to actually perform the search
  $input.on('keydown', function (event) {
    if (event.keyCode === 13) {
      performSearch();
    }
  });
  $search.on('click', performSearch);
};
