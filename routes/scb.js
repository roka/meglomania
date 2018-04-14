var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET users listing. */
router.get('/', function (req, res, next) {
    fetch("http://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    query: [
                        {
                            code: "ContentsCode",
                            selection: {
                                filter: "item",
                                values: [
                                    "BE0101N1"
                                ]
                            }
                        },
                        {
                            code: "Tid",
                            selection: {
                                filter: "item",
                                values: [
                                    "2000",
                                    "2001",
                                    "2002",
                                    "2003",
                                    "2011",
                                    "2016",
                                    "2017"
                                ]
                            }
                        }
                    ],
                    response: {
                        "format": "json"
                    }
                }
            )
        })
        .then(resp => {
            return resp.buffer();
        })
        .then(buffer => {
            resJson = JSON.parse(buffer.slice(3, buffer.length).toString());
            res.send(resJson);
        }) 
        .catch(error => console.error('Error:', error))
});

module.exports = router;
