const superRequest = require('superagent');

class GoogleGeocode {
  constructor() {
  }
  getGeocode(latitude,longitude) {
    let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GEOKEY}`
    return superRequest.get(geocodeURL)
                       .then((geocodeResponse) => {
                         return geocodeResponse.body.results
                       })
  }
  getRestaurant(latitude,longitude) {
    let geoPlaceURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100&type=restaurant&keyword=cruise&key=${process.env.PLACEKEY}`
    return superRequest.get(geoPlaceURL)
                       .then((geocodeResponse) => {
                         return geocodeResponse.body.results
                       })
  }
  getTouristSpot(latitude, longitude) {
    let geoSpotURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100&type=amusement_park|aquarium|art_gallery|campground|cemetery|church|city_hall|embassy|hindu_temple|mosque|museum|synagogue|zoo&keyword=cruise&key=${process.env.PLACEKEY}`
    return superRequest.get(geoSpotURL)
                       .then((geocodeResponse) => {
                         console.log('gg', geocodeResponse.body.results)
                         return geocodeResponse.body.results
                       })
  }
  getToDo(latitude, longitude) {
    let geoDoURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=100&type=beauty_salon|book_store|cafe|casino|night_club|jewelry_store|pet_store|spa|stadium|storage|store|subway_station|travel_agency&key=${process.env.PLACEKEY}`
    return superRequest.get(geoDoURL)
                       .then((geocodeResponse) => {
                         return geocodeResponse.body.results
                       })
  }


}

module.exports = GoogleGeocode;
