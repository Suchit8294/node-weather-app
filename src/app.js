const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
res.render('index', {
    pageTitle: 'Weather',
    title: 'Weather',
    name: 'Suchit Kumar'
});
})

app.get('/help', (req, res)=>{
    res.render('help',{
        pageTitle: 'Help',
        title: 'Help',
        name: 'Suchit Kumar'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        pageTitle: 'About Us',
        title: 'About Us',
        name: 'Suchit Kumar'
    })
})

app.get('/weather', (req, res)=>{
if(!req.query.address){
    return res.send({
        error: 'You must need to provide address.'
    })
}

geocode(req.query.address, (error, { latitude, longitude, location } = {} )=>{
if(error){
return res.send( { error } )
}

forecast(latitude, longitude, (error, forecastData )=>{
    if(error){
return res.send({ error });
}
res.send( { 
    forecast: forecastData,
    location,
    address: req.query.address
} )
})

})

//     res.send({
// forcast: 'It is snowing',
// location: 'india',
// address: req.query.address
//     })

})

app.get('/help/*', (req, res)=>{
res.render('not-found',{
    pageTitle: '404',
    title: 'Help Article Not Found'
})
})

app.get('*', (req, res)=>{
    res.render('not-found', {
        pageTitle: '404',
        title: 'Page Not Found'
    });
})

app.listen(port, ()=>{
    console.log('Your Node Server is up and running!' + port);
});