const rp = require("request-promise")

const request = require('request');


var options = {
    method: 'GET',
    url : "https://reclutamiento-14cf7.firebaseio.com/personas.json",
    json: true
};

request(options, (error, res, body) =>
{
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        console.log(JSON.stringify(body,null,4));
    };
});