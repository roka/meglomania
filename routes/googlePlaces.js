var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET Closest Places. */
router.post('/', function (req, res, next) {
    fetch(req.body.url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET"
        })
        .then(resp => {
            return resp.buffer();
        })
        .then(buffer => {
            var resJson = JSON.parse(buffer);
            res.send(resJson);

        })
        .catch(error => console.error('Error:', error))
});

module.exports = router;
