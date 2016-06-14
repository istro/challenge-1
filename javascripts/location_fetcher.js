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
    this.showLoader();
    var promise = $.Deferred();
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + $input.val();
    $.getJSON(url, function (data) {
      this.showSuccess();
      promise.resolve(data.results[0]);
    }.bind(this));
    return promise;
  }
};
