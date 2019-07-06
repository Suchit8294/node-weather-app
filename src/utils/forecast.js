const request = require('request');


const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/ff6e40b9a9503db3bf12a77777be4083/' + latitude + ',' + longitude

request({url, json: true}, (error, { body })=>{
if(error){
callback('Unable to connect to weather service', undefined);
} else if(body.error){
callback('Unable to find Location!', undefined);
} else {
    console.log(body.daily.data[0]);
callback(undefined, body.daily.data[0].summary+' It is currently ' + body.currently.temperature + ' degree out. The high today is ' + body.daily.data[0].temperatureHigh + ' with the low of ' + body.daily.data[0].temperatureLow + '. There is '+ body.currently.precipProbability + ' % chance of rain.'
);
}
})
}

module.exports = forecast