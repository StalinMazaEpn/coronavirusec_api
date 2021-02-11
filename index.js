const express = require('express'); //server
const request = require('request'); //http request
const cheerio = require('cheerio'); //jquery on server
const app = express(); //app server

const port = 8040;

function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

app.get('/', function (req, res) {
    // The scraping magic will happen here
    let urlDatosProvinciales = 'https://www.coronavirusecuador.com/datos-provinciales/';
    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(urlDatosProvinciales, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            let $ = cheerio.load(html);
            // Finally, we'll define the variable we're going to capture
            // We'll be using Cheerio's function to single out the necessary information
            // using DOM selectors which are normally found in CSS.
            let provincial_table_html = $('.tablepress').html()
            console.log('provincial_table_html', provincial_table_html);

            let headersDataArray = [];
            let bodyDataArray = [];
            let headers = $('.tablepress').find('thead > tr > th').get();
            let body = $('.tablepress').find('tbody > tr > td').get();

            let jsonApiArr = [];

            $(headers).each(function () {
                const theadText = $(this).text();
                console.log('theadText', theadText);
                headersDataArray.push(theadText)
            });
            $(body).each(function () {
                const tbodyText = $(this).text();
                console.log('tbodyText', tbodyText);
                bodyDataArray.push(tbodyText)
            });
            // for (let index = 0; index < bodyDataArray.length; index++) {
            //     const bodyValue = bodyDataArray[index];

            // }
            let bodyChunk = [...chunks(bodyDataArray, headersDataArray.length)];
            let finalChunck = [headersDataArray, ...bodyChunk]
            // And now, the JSON format we are going to expose
            let json = {
                provincial_table_html: provincial_table_html,
                headersDataArray,
                bodyDataArray,
                bodyChunk,
                finalChunck
            };
            res.send(json)
        }
    });
});
app.listen(port);
console.log(`API is running on http://localhost:${port}`);
module.exports = app;
