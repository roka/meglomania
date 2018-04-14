var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const crimeUrl = "https://brottsplatskartan.se/api/events/?location=";

/* Get crimes in city. */
router.post('/', function (req, res, next) {
    var location = req.body;

    fetch(crimeUrl + location.city,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
        .then(resp => resp.json())
        .then(json => {
            console.log(json);

            if(json.links.total >= 1) {
                var crimeJson = {
                    "title": json.data[0].title_type,
                    "date": json.data[0].pubdate_iso8601,
                    "location": json.data[0].title_location,
                    "description": json.data[0].description
                };
                console.log(crimeJson);
                res.send(crimeJson);
            } else {
                res.send({
                    "title": "Inga brott",
                    "date": "",
                    "location": "",
                    "description": ""
                });
            }
        })
        .catch(error => {
            console.log("error fetching crimes: ", error);
        });

});

module.exports = router;
