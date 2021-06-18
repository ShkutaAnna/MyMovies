const express = require('express');
const app = express();

const fs = require('fs'); 
const parse = require('csv-parse');

let movies = [];
let headers = [];

fs.createReadStream('movies.csv')
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        movies.push(csvrow);        
    })
    .on('end',function() {
      headers = [movies[0]]
      movies = movies.slice(1)
    });

app.get('', (req, res) => {
    res.json({
        "data": "default page",
        "statusCode": 200,
        "statusMessage": "SUCCESS"
    })
})

app.get('/movies', (req, res) => {
    res.json({
        "statusCode": 200,
        "tableHeader": JSON.stringify(headers),
        "data" : JSON.stringify(movies)
    })
})

app.get('/years', (req, res) => {
    res.json({
        "statusCode": 200,
        "data" : JSON.stringify([...new Set(movies.map(elem => elem[4]))].sort((a, b) => a > b))
    })
})

app.get('/genres', (req, res) => {
    res.json({
        "statusCode": 200,
        "data" : JSON.stringify([...new Set(movies.map(elem => elem[2]).concat(movies.map(elem => elem[3])))].filter(elem => !elem.isEmpty()))
    })
})

app.get('/moviesFilteredByYears', (req, res) => {
    let count = parseInt(req.query.amount)
    let years = []
    for(let i = 0; i < count; i++) {
        years.push(parseInt(req.query[`year${i+1}`]));
    }
    res.json({
        "statusCode": 200,
        "tableHeader": JSON.stringify(headers),
        "data" : JSON.stringify(movies.filter(elem => {
            return years.includes(parseInt(elem[4]));
        }))
    })
})

app.get('/moviesFilteredByGenres', (req, res) => {
    let count = parseInt(req.query.amount)
    let genres = []
    for(let i = 0; i < count; i++) {
        genres.push(req.query[`genre${i+1}`].toLowerCase());
    }
    res.json({
        "statusCode": 200,
        "tableHeader": JSON.stringify(headers),
        "data" : JSON.stringify(movies.filter(elem => {
            return genres.includes(elem[2].toLowerCase() || elem[3].toLowerCase())
        }))
    })
})

app.listen(3000, (req, res) => {
    console.log('Express API is running at port 3000');
});

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};