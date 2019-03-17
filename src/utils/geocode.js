const request = require('request')

const geocode = (address, callback) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDhFWIjMDbjwsECeFFkRyHxhpI3hJJKKx8&address=${address}`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if ( body.results === undefined || body.results.length == 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            var location    = body.results[0].formatted_address;
            var locLat      = body.results[0].geometry.location.lat;
            var locLong     = body.results[0].geometry.location.lng;

            callback(undefined, {
                latitude: locLat,
                longitude: locLong,
                location: location
            })
        }
    })
}

module.exports = geocode