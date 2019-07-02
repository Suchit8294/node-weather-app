const request = require('request');


const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/ff6e40b9a9503db3bf12a77777be4083/' + latitude + ',' + longitude

request({url, json: true}, (error, { body })=>{
if(error){
callback('Unable to connect to weather service', undefined);
} else if(body.error){
callback('Unable to find Location!', undefined);
} else {
callback(undefined, body.daily.data[0].summary+' It is currently ' + body.currently.temperature + ' degree out. There is '+ body.currently.precipProbability + ' % chance of rain.'
);
}
})
}

module.exports = forecast