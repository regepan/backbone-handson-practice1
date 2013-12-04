class App.Views.MapView extends Backbone.View
  marker: null
  
  addMarker: ($input, map, event) ->
    latitude = event.latLng.lat()
    longitude = event.latLng.lng()
    
    $input.attr('data-lat-lng', latitude + ',' + longitude)
    
    # delete the marker from the map
    @marker.setMap(null) if (@marker isnt null)

    @marker = new google.maps.Marker(
      position: new google.maps.LatLng(latitude, longitude)
      title: "Here!"
    )

    # add the marker to the map
    @marker.setMap(map) if (@marker isnt null)
  
  addMap: ($input, $mapWrap) ->
    latLng = $input.attr('data-lat-lng')
    latLng = if (latLng isnt '') then latLng.split(',') else ''

    mapCenter = if (latLng isnt '') then latLng else [-34.397, 150.644]
    map = new google.maps.Map($mapWrap.get(0), {
      center: new google.maps.LatLng(mapCenter[0], mapCenter[1])
      zoom: 8
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })

    # add the marker if latLng has number.
    if (latLng isnt '')
      @marker = new google.maps.Marker(
        position: new google.maps.LatLng(latLng[0], latLng[1])
        title: "Here!"
      )

      # add the marker to the map
      @marker.setMap(map) if (@marker isnt null)

    # add the marker at rightclick position
    google.maps.event.addListener(map, 'rightclick', (event) =>
      @addMarker($input, map, event)
    )
