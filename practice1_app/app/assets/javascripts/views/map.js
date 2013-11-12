App.Views.MapView = Backbone.View.extend({
  marker: null,
  addMarker: function($input, map, event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();

    $input.attr('data-lat-lng', latitude + ',' + longitude);

    // delete the marker from the map
    if (this.marker !== null) {
      this.marker.setMap(null);
    }

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      title: "Here!"
    });

    // add the marker to the map
    if (this.marker !== null) {
      this.marker.setMap(map);
    }
  },
  addMap: function($input, $mapWrap) {
    var _this = this;

    var latLng = $input.attr('data-lat-lng');
    latLng = (latLng !== '') ? latLng.split(',') : '';


    var mapCenter = (latLng !== '') ? latLng : [-34.397, 150.644];
    var map = new google.maps.Map($mapWrap.get(0), {
      center: new google.maps.LatLng(mapCenter[0], mapCenter[1]),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // add marker if latLng has number.
    if (latLng !== '') {
      this.marker = new google.maps.Marker({
        position: new google.maps.LatLng(latLng[0], latLng[1]),
        title: "Here!"
      });

      // add the marker to the map
      if (this.marker !== null) {
        this.marker.setMap(map);
      }
    }

    // add marker at rightclick
    google.maps.event.addListener(map, 'rightclick', function(event) {
      _this.addMarker($input, map, event);
    });
  }
});
