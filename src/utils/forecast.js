const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6cbdedbea793a109eab33323f25cdf8e&query=' +  latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to connect to location service!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees. And the humidity is: ' + body.current.humidity)
        }
    })
}

module.exports = forecast