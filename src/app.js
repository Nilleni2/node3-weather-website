const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nils Edstrom'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nils Edstrom'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nils Edstrom',
        helpMessage: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No adress filled in!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error, })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error, })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    } 
    
    console.log(req.query)
    res.send({
        products: []
    })  
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        name: 'Nils Edstrom',
        title: 'ERROR 404'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        name: 'Nils Edstrom',
        title: 'ERROR 404'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})